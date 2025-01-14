import axios from "axios";



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



export const getName = async (value)  => {
   
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