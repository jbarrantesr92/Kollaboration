import { NextApiRequest, NextApiResponse } from "next";
import { createDirectus, rest, registerUser, staticToken, authentication, readMe, registerUserVerify } from "@directus/sdk";

// Initialize Directus client with your project URL and static token
const directusClient = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string)
  .with(staticToken(process.env.DIRECTUS_TOKEN as string))
  .with(rest());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { mode, email, password, firstName, lastName } = req.body;

  try {
    if (mode === "signUp") {
      // Sign-up mode
      const userRoleId = process.env.DIRECTUS_USER_ROLE_ID;
      if (!userRoleId) {
        throw new Error("User role ID is not defined in environment variables");
      }

      // Register a new user without triggering authentication
      try {
        await directusClient.request(
          registerUser(email, password, {
            first_name: firstName,
            last_name: lastName,
            verification_url: process.env.NEXT_PUBLIC_VERIFICATION_URL
          })
        );
        res.status(200).json({ message: "User registered successfully." });
      } catch (error) {
        console.error("Full error details:", error); // Log the full error message
      
        // Use specific error messages if available
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Failed to register user due to an unknown error." });
        }
      }
    } else if (mode === "signIn") {
      // Sign-in mode (unchanged)
      const authClient = directusClient.with(authentication());
      const loginResult = await authClient.login(email, password);

      if (loginResult) {
        res.setHeader('Set-Cookie', `directus_session_token=${loginResult.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
        const user = await authClient.request(readMe({ fields: ['*'] }));
        res.status(200).json({ message: "User signed in successfully", user });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }

    } else {
      res.status(400).json({ error: "Invalid mode" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }

  const verificationURL = process.env.NEXT_PUBLIC_VERIFICATION_URL;
  console.log(verificationURL); // Ensure it's exactly 'https://events.givebacktickets.org'
}
