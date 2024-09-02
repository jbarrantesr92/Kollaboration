import '@/styles/globals.css';
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { LocaleContext } from "../components/plasmic/standalone_event_ticketing/PlasmicGlobalVariant__Locale";
import { usePlasmicAuthData } from "../utils/usePlasmicAuth";

function PlasmicRootProviderWithUser(props: { children: React.ReactNode }) {
  const { isUserLoading, plasmicUser, plasmicUserToken } = usePlasmicAuthData();
  const router = useRouter();
  
  // Only assign "es" or undefined to locale
  const locale = router.locale === "es" ? "es" : undefined;

  return (
    <PlasmicRootProvider
      Head={Head}
      isUserLoading={isUserLoading}
      user={plasmicUser}
      userAuthToken={plasmicUserToken}
    >
      <LocaleContext.Provider value={locale}>
        {props.children}
      </LocaleContext.Provider>
    </PlasmicRootProvider>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Only assign "es" or undefined to locale
  const locale = router.locale === "es" ? "es" : undefined;

  if (pageProps.withoutUseAuth) {
    return (
      <PlasmicRootProvider Head={Head}>
        <LocaleContext.Provider value={locale}>
          <Component {...pageProps} />
        </LocaleContext.Provider>
      </PlasmicRootProvider>
    );
  }

  return (
    <PlasmicRootProviderWithUser>
      <Component {...pageProps} />
    </PlasmicRootProviderWithUser>
  );
}
