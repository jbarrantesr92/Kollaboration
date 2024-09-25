import { NextApiRequest, NextApiResponse } from "next";
import { createDirectus, rest, createUser,staticToken, authentication, readMe } from "@directus/sdk";
import crypto from "crypto"; // Used to generate a random token

const directusClient = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string).with(staticToken(process.env.DIRECTUS_TOKEN as string)).with(rest());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { mode, email, password, firstName, lastName } = req.body;

  console.log("Received request with body:", req.body);

  try {
    if (mode === "signUp") {
      console.log("SignUp mode detected");

      // Get role from environment variables
      const userRoleId = process.env.DIRECTUS_USER_ROLE_ID;
      if (!userRoleId) {
        throw new Error("User role ID is not defined in environment variables");
      }

      // Generate a random token
      const token = crypto.randomBytes(16).toString("hex");

      // User registration with role and token
      const result = await directusClient.request(
        createUser({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role: userRoleId, // Assign the role from the env variable
          token, // Assign the randomly generated token
        })
      );

      console.log("Directus createUser result:", result);

      if (result) {
        console.log('Automatically logging in after sign-up');
        // Automatically log in the user after sign-up
        const authClient = directusClient.with(authentication());
        const loginResult = await authClient.login(email, password);

        if (loginResult) {
          console.log('Login successful after sign-up:', loginResult);
          
          // Optionally, set the token as a cookie
          res.setHeader('Set-Cookie', `directus_session_token=${loginResult.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
          
          // Retrieve the user data
          const user = await authClient.request(readMe({ fields: ['*'] }));
          res.status(200).json({ message: "User signed up and logged in successfully", user });
        } else {
          res.status(500).json({ error: "Failed to log in after sign-up" });
        }
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    } else if (mode === "signIn") {
      console.log("SignIn mode detected");

      // User login
      const authClient = directusClient.with(authentication());
      const loginResult = await authClient.login(email, password);

      if (loginResult) {
        console.log('Login successful:', loginResult);

        // Optionally, set the token as a cookie
        res.setHeader('Set-Cookie', `directus_session_token=${loginResult.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
        
        // Retrieve the user data
        const user = await authClient.request(readMe({ fields: ['*'] }));

        if (user) {
          console.log("User successfully logged in:", user);
          res.status(200).json({ message: "User signed in successfully", user });
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      console.log("Invalid mode:", mode);
      res.status(400).json({ error: "Invalid mode" });
    }
  } catch (error) {
    console.error("Error occurred:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
