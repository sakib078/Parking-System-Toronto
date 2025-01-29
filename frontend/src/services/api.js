import axios from "axios";


// admin side function to import the data to database using json file.
export const importData =  async (file) => {
  
    const formdata = new FormData();
  
    formdata.append('parkingData', file);

    console.log(formdata);

    try {

        const res = await axios.post('http://localhost:4242/admin/import-data', formdata, {
            headers : {
                'Content-Type' : 'multipart-form-data',
            }
        })

        console.log(res.data);
    }
    catch(error) {
        console.error('Error importing trhe file', error);
    }
}


// getting the coordinated based on the name on search-query
export const getCoordinates = async (value)  => {
   
    if (typeof value !== 'string') {
        throw new TypeError('The input value must be a string');
    }

    const finalvalue =  value.toUpperCase();

    console.log(finalvalue);

    try {
        const res = await axios.get(`http://localhost:4242/park/spots/search/${finalvalue}`).then(
            response => {

                console.log('dtaa',response.data.coordinates);

                return response.data.coordinates;
            }
        )

        return res;
    } catch (error) {
        console.error('Error fetching the data', error);
        throw error;
    }

}


// get the all names based on the search results on search input
export const getrelavantNames = async (value) => {
   
    if (typeof value !== 'string') {
        throw new TypeError('The input value must be a string');
    }

    const finalvalue =  value.toUpperCase();

    try {

        const res = await axios.get(`http://localhost:4242/park/spots/searchNames/${finalvalue}`).then(
            response => {

                console.log('dtaa',response.data.names);

                return response.data.names;
            }
        )

        return res;
    } catch (error) {
        console.error('Error fetching the data', error);
        throw error;
    }
     
}


export async function getspots() {
    
    try {
        const spots = await axios.get('http://localhost:4242/park/spots').then(
            res => {

                return res.data.spots;
            }
        )

        return spots;
         
    }
    catch(error) {
        console.error('Error fetching the data', error);
        throw error;
    }


}
