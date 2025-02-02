
function degToRad(degrees) {

    const redians = [];

    if (degrees) {

        for (const dg of degrees) {

            let dr = dg * (Math.PI / 180);

            redians.push(dr);
        }

        return redians;
    }

    return Error('No degrees got...');

}



// calculate the distance between coordinate-1 to coordinate-2.
function harvensine(lat1, long1, lat2, long2) {

    const earth_radius = 6371;

    let redian = degToRad([lat1, long1, lat2, long2]);

    // haversine formula 
    let dlat = redian.at(2) - redian.at(0);
 
    let dlong = redian.at(3) - redian.at(1);
 

    a = ( Math.sin(dlat / 2) ** 2 ) + Math.cos(redian.at(0)) * Math.cos(redian.at(2)) * ( Math.sin(dlong / 2) ** 2 );
   

    c = 2 * Math.asin(Math.sqrt(a));
    

    let km = Math.round(earth_radius * c * 100) / 100;

    return km

}

console.log(harvensine(43.750627, -79.257986, 43.79545, -79.34786));



// sort the all coordinates distance
function sorter() {


}



const nearestSpot = () => {
  
    
 
}



export default nearestSpot;