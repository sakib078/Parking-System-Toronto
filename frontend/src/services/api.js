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