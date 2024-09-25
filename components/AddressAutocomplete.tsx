import React, { useEffect, useRef } from 'react';
import styles from '../styles/AddressAutocomplete.module.css';

interface AddressAutocompleteProps {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  initialValue?: string; // New prop to accept initial value
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onPlaceSelected, initialValue = '' }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = initializeAutocomplete;
        document.head.appendChild(script);
      } else {
        initializeAutocomplete();
      }
    };

    const initializeAutocomplete = () => {
      if (inputRef.current && window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: [], // No restrictions on place types
          componentRestrictions: { country: 'us' }, // Restrict to US
          fields: ['formatted_address', 'geometry', 'name', 'place_id', 'types'], // Desired fields
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const latLng = place.geometry.location;
            const latitude = latLng.lat();
            const longitude = latLng.lng();
            const formattedAddress = place.formatted_address || 'Address not available';

            // Store latitude, longitude, and formatted address in sessionStorage
            sessionStorage.setItem('selectedLocation', JSON.stringify({ latitude, longitude, formattedAddress }));
            console.log('Location selected:', { latitude, longitude, formattedAddress });

            if (onPlaceSelected) {
              onPlaceSelected(place);
            }
          } else {
            console.error('No geometry information available for the selected place.');
          }
        });
      }
    };

    loadGoogleMapsScript();

    // Clear sessionStorage on page reload
    window.onbeforeunload = () => {
      sessionStorage.removeItem('selectedLocation');
    };

    return () => {
      window.onbeforeunload = null; // Cleanup on unload
    };
  }, [onPlaceSelected]);

  return (
    <div className={styles.autocompleteWrapper}>
      <input
        ref={inputRef}
        type="text"
        className={styles.autocompleteInput}
        placeholder="Enter a location"
        defaultValue={initialValue} // Set the initial value in the input
      />
    </div>
  );
};

export default AddressAutocomplete;
