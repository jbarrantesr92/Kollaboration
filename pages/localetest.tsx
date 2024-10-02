import { useLocale } from "../components/plasmic/standalone_event_ticketing/PlasmicGlobalVariant__Locale";
function SomeComponent() {
    const locale = useLocale();
  
    return (
      <div>
        The current locale is: {locale}
      </div>
    );
  }

  export default SomeComponent