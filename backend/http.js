import https from 'https';

const packageId = "5c56aef2-dd4a-4e4a-9f2e-d3722622b7e6";

// promise to retrieve the package
const getPackage = new Promise((resolve, reject) => {
    https.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`, (response) => {
        let dataChunks = [];
        response
            .on("data", (chunk) => {
                dataChunks.push(chunk);
            })
            .on("end", () => {
                let data = Buffer.concat(dataChunks);
                resolve(JSON.parse(data.toString())["result"]);
                console.log(data);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
});

getPackage.then(pkg => {
    // this is the metadata of the package
    console.log(pkg);
}).catch(error => {
    console.error(error);
});



export default getPackage;