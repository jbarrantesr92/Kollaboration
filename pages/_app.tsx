import '@/styles/globals.css';
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { LocaleContext } from "../components/plasmic/standalone_event_ticketing/PlasmicGlobalVariant__Locale";
import { usePlasmicAuthData } from "../utils/usePlasmicAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const { isUserLoading, plasmicUser, plasmicUserToken } = usePlasmicAuthData();
  const router = useRouter();
  
  const locale = router.locale === "es" ? "es" : undefined;

  return (
    <PlasmicRootProvider
      Head={Head}
      isUserLoading={!pageProps.withoutUseAuth ? isUserLoading : undefined}
      user={!pageProps.withoutUseAuth ? plasmicUser : undefined}
      userAuthToken={!pageProps.withoutUseAuth ? plasmicUserToken : undefined}
    >
      <LocaleContext.Provider value={locale}>
        <Component {...pageProps} />
      </LocaleContext.Provider>
    </PlasmicRootProvider>
  );
}

export default MyApp;
