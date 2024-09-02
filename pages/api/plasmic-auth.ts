import type { NextApiRequest, NextApiResponse } from "next";
import { getPlasmicAuthData } from "../../utils/plasmic-auth";

// This API endpoint is used to provide the Plasmic user in client-side code.
export default async function getPlasmicAuthDataHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Extract the session token from the HTTP-only cookie
  const sessionToken = req.cookies.directus_session_token;

  if (!sessionToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    // Call Directus API to verify the session token and get user data
    const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data from Directus');
    }

    const userData = await response.json();

    // Log user data for debugging
    console.log('Directus User Data:', userData);

    // Extract email from Directus user data (adjust based on structure)
    const email = userData.data.email; // Adjusted extraction

    if (!email) {
      throw new Error('No email found in Directus user data');
    }

    // Pass email to the Plasmic authentication function
    const plasmicAuthData = await getPlasmicAuthData(email);

    res.json(plasmicAuthData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
