import { useEffect, useState } from "react"

import { useDataContext } from "../../store/context";


export default function Nearestspot() {

    const [spots] = useState();

    const { nearestLocs } = useDataContext();
    

    useEffect(() => {
       
        
   
          
        
    }, [nearestLocs])

    return (
        
        <>
         
        </>
    )
}