import useSWR from "swr";
import { PLASMIC_AUTH_DATA_KEY } from "./cache-keys";

/**
 * Send a request from client to server to get the user and auth token.
 * This is going to use the user current session to get a valid plasmic user.
 */
export function usePlasmicAuthData() {
  const { data, error, isValidating } = useSWR(PLASMIC_AUTH_DATA_KEY, async () => {
    try {
      const response = await fetch("/api/plasmic-auth");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Error fetching Plasmic auth data:", err);
      throw err; // Re-throw to allow SWR to handle it
    }
  });

  const isLoading = !data && !error;

  return {
    isUserLoading: isLoading,
    plasmicUser: data?.plasmicUser,
    plasmicUserToken: data?.plasmicUserToken,
    error, // return the error as well for consumers of this hook to handle
  };
}
