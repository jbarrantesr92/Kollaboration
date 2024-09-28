// pages/api/verify-user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createDirectus, rest, registerUserVerify, staticToken } from "@directus/sdk";

// Initialize Directus client with your project URL and static token
const directusClient = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string)
  .with(staticToken(process.env.DIRECTUS_TOKEN as string))
  .with(rest());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract token from query string
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      res.status(400).json({ error: "Verification token is required" });
      return;
    }

    // Verify the registration token
    await directusClient.request(registerUserVerify(token));
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    // Handle any errors that occur during the verification process
    console.error("Error verifying user:", error);
    res.status(400).json({ error: "Invalid or expired verification token" });
  }
}
