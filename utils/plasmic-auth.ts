import { ensurePlasmicAppUser, PlasmicUser } from "@plasmicapp/auth-api";

const PLASMIC_AUTH_SECRET = process.env.PLASMIC_AUTH_SECRET;

export async function getPlasmicAuthData(email: string): Promise<{
  plasmicUser?: PlasmicUser | null;
  plasmicUserToken?: string | null;
  error?: string | null;
}> {
  if (!PLASMIC_AUTH_SECRET) {
    console.error('Plasmic auth secret is not defined.');
    return { plasmicUser: null, plasmicUserToken: null, error: 'Auth secret not configured' };
  }

  try {
    // Ensure user exists or create user
    const result = await ensurePlasmicAppUser({
      email,
      appSecret: PLASMIC_AUTH_SECRET,
    });

    if (result.error) {
      // Log the full error details
      console.error("Plasmic API error details:", result.error);
      return { plasmicUser: null, plasmicUserToken: null, error: `Plasmic API error: ${result.error}` };
    }

    const { user: plasmicUser, token: plasmicUserToken } = result;

    return {
      plasmicUser,
      plasmicUserToken,
      error: null
    };
  } catch (err) {
    // Log unexpected errors
    console.error('Unexpected error:', err);
    const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
    return {
      plasmicUser: null,
      plasmicUserToken: null,
      error: `Unexpected error: ${errorMessage}`
    };
  }
}
