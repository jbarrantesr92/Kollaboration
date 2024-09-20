import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const DragAndDropUploader: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadProgress(0);

      // Call the Next.js API route instead of Directus directly
      const response = await axios.post('/api/uploadfile', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });

      const uploadedFileData = response.data;
      
      // Store the file ID in localStorage
      localStorage.setItem('uploadedFileId', uploadedFileData.id);

      setIsUploading(false);
    } catch (error: any) {
      setUploadError('File upload failed');
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <div className="upload-box">
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select one</p>
        )}
      </div>

      {isUploading && (
        <div className="uploading-status">
          {uploadProgress !== null ? (
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          ) : (
            <div className="spinner"></div>
          )}
        </div>
      )}

      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}

      <style jsx>{`
        .dropzone {
          width: 100%;
          height: 100%;
          border: 2px dashed #cccccc;
          padding: 20px;
          cursor: pointer;
          text-align: center;
          margin-top: 20px;
          border-radius: 10px;
          box-sizing: border-box;
        }
        .dropzone.active {
          background-color: #f0f8ff;
        }
        .upload-box {
          padding: 20px;
          font-size: 16px;
        }
        .uploading-status {
          margin-top: 10px;
          text-align: center;
        }
        .progress-bar-container {
          width: 100%;
          background-color: #e0e0e0;
          height: 10px;
          border-radius: 5px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background-color: #4caf50;
          transition: width 0.2s ease-in-out;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4caf50;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DragAndDropUploader;
