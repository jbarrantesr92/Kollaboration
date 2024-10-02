import * as React from "react";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/react-web/lib/host";
import GlobalContextsProvider from "../components/plasmic/standalone_event_ticketing/PlasmicGlobalContextsProvider";
import { LocaleContext } from "../components/plasmic/standalone_event_ticketing/PlasmicGlobalVariant__Locale";
import { PlasmicHomepage } from "../components/plasmic/standalone_event_ticketing/PlasmicHomepage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Homepage() {
  const router = useRouter(); // Move useRouter inside the component
  const [locale, setLocale] = useState<"es" | "en">("en");

  useEffect(() => {
    // Update locale when the route changes
    if (router.locale === "es") {
      setLocale("es");
    } else {
      setLocale("en");
    }
  }, [router.locale]);

  return (
    <LocaleContext.Provider value={locale}>
      <GlobalContextsProvider>
        <PageParamsProvider__
          route={router?.pathname}  // Moved router here as well
          params={router?.query}
          query={router?.query}
        >
          <PlasmicHomepage />
        </PageParamsProvider__>
      </GlobalContextsProvider>
    </LocaleContext.Provider>
  );
}

export default Homepage;
