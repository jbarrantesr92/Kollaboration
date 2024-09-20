import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable, { IncomingForm, Fields, Files } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser to handle form-data
  },
};

// Helper to parse the form data
const parseForm = async (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
  const token = process.env.DIRECTUS_TOKEN;

  if (!apiUrl || !token) {
    return res.status(500).json({ message: 'Missing required environment variables' });
  }

  try {
    const { fields, files } = await parseForm(req);

    const formData = new FormData();
    formData.append('title', fields.title || 'Untitled File');

    const file = files.file;

    if (Array.isArray(file)) {
      const firstFile = file[0] as formidable.File;
      const fileStream = fs.createReadStream(firstFile.filepath);
      formData.append('file', fileStream, firstFile.originalFilename || 'uploaded-file');
    } else if (file && (file as formidable.File).filepath) {
      const singleFile = file as formidable.File;
      const fileStream = fs.createReadStream(singleFile.filepath);
      formData.append('file', fileStream, singleFile.originalFilename || 'uploaded-file');
    } else {
      throw new Error('File not found or invalid file format');
    }

    // Send file to Directus API
    const response = await axios.post(
      `${apiUrl}/files`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.getHeaders(),
        },
      }
    );

    const fileData = response.data.data; // Directus stores the file data inside the `data` object

    if (!fileData || !fileData.id) {
      throw new Error('Failed to retrieve file data');
    }

    // Construct the file URL (assuming Directus serves files under `/assets` by default)
    const fileUrl = `${apiUrl}/assets/${fileData.id}`;

    // Clean up the file after upload
    if (file) {
      const uploadedFile = Array.isArray(file) ? file[0] : file;
      fs.unlink((uploadedFile as formidable.File).filepath, (err) => {
        if (err) console.error('Error cleaning up file:', err);
      });
    }

    // Return file ID and URL
    res.status(200).json({ id: fileData.id, url: fileUrl });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ message: error.response?.data || 'Directus API error' });
    } else {
      res.status(500).json({ message: error.message || 'Something went wrong!' });
    }
  }
};

export default handler;
