import * as React from "react";
import {
  PlasmicAuthForm,
  DefaultAuthFormProps,
} from "./plasmic/standalone_event_ticketing/PlasmicAuthForm";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { PLASMIC_AUTH_DATA_KEY } from "../utils/cache-keys";

export interface AuthFormProps extends DefaultAuthFormProps {}

function AuthForm_(props: AuthFormProps, ref: HTMLElementRefOf<"div">) {
  const router = useRouter();

  return (
    <PlasmicAuthForm
      root={{ ref }}
      {...props}
      // @ts-ignore
      handleSubmit={async (
        mode: "signIn" | "signUp",  
        credentials: {
          email: string;
          password: string;
          firstName?: string;
          lastName?: string;
        }
      ) => {
        try {
          console.log('handleSubmit started');
          console.log('Mode:', mode);
          console.log('Credentials:', credentials);

          let response;

          if (mode === "signIn") {
            console.log('Attempting to sign in');
            // Sign-in logic
            response = await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mode: "signIn",  
                email: credentials.email,
                password: credentials.password,
              }),
            });

            console.log('Sign in response:', response);
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Sign in failed:', errorData);
              throw new Error("Login failed: " + errorData.error);
            }
          } else if (mode === "signUp") {
            console.log('Attempting to sign up');
            // Sign-up logic
            response = await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mode: "signUp",  
                email: credentials.email,
                password: credentials.password,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
              }),
            });

            console.log('Sign up response:', response);
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Sign up failed:', errorData);
              throw new Error("Sign-up failed: " + errorData.error);
            }

            console.log('Automatically logging in after sign-up');
            response = await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mode: "signIn",  
                email: credentials.email,
                password: credentials.password,
              }),
            });

            console.log('Login after sign-up response:', response);
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Login after sign-up failed:', errorData);
              throw new Error("Login after sign-up failed: " + errorData.error);
            }
          }

          console.log('Successfully authenticated, mutating data and redirecting');
          await mutate(PLASMIC_AUTH_DATA_KEY);
          router.push("/");
        } catch (error) {
          console.error("Authentication failed", error);

          // Type guard for error object
          if (error instanceof Error) {
            alert(error.message);  // Show the error message if it's an instance of Error
          } else {
            alert('An unknown error occurred');  // Fallback for non-Error types
          }
        }
      }}
    />
  );
}

const AuthForm = React.forwardRef(AuthForm_);
export default AuthForm;
