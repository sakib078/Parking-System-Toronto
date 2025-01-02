import { importData } from "../services/api";


export default function Admin() {

    const handleFileUpload = (event) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          importData(file);
        } else {
          console.error('No file selected');
        }
      };
      

    return  (
      <>
            <input type="file" onChange={handleFileUpload} accept=".json" />
      </>
    );
                   
}