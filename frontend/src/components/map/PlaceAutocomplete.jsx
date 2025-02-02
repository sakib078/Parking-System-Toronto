import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";


export default function PlaceAutocomplete({ onPlaceSelect }) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      types: ["establishment", "geocode"]
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const listener = placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => listener.remove();
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div>
      <input 
        ref={inputRef} 
        placeholder="Search location..."
        style={{ width: '300px', padding: '8px' }}
      />
    </div>
  );
}
