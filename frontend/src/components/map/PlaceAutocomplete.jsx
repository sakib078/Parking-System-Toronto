import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react"



export default function PlaceAutocomplete ({ onPlaceSelect }) {

    const [placeAutocomplete, setplaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary('places');

    useEffect(() => {

        if (!places || !inputRef.current)
            return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setplaceAutocomplete(new places.Autocomplete(inputRef.current, options));

    }, [places]);

    useEffect(() => {

        if (!placeAutocomplete)
            return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);


    return (
        <div>
            <input ref={inputRef} />
        </div>
    )
} 