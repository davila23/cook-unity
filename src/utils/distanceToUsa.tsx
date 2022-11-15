import { logger } from "@/logger"

    // Set NY as USA point of reference
    const newYork = {
        latitud: 40.6643,
        longitude: -73.9385,
    };

    // Radius of the Earth in kilometers
     const radius = 6571;

     const degreesToRadians= (degrees: number) => (degrees * Math.PI)/180;

    export const distanceToUsa = async ( latitude : number ,  longitude : number) =>{
        try {

        if (!latitude || !longitude)  throw new Error('Missing latitude or longitude parameters');
      
        let domainLat = degreesToRadians(latitude);
        let domainLong = degreesToRadians(longitude);

        let newYorkLat = degreesToRadians(newYork.latitud);
        let newYorkLong = degreesToRadians(newYork.longitude);


       const distanceInKilometers = Math.acos(Math.sin(domainLat) * Math.sin(newYorkLat) +
        Math.cos(domainLat) * Math.cos(newYorkLat) *
        Math.cos(domainLong - newYorkLong)) * radius;

        logger.info(`[COOK-UNITY] => There are ${distanceInKilometers} km between the domain coordinates and New York`)

        return distanceInKilometers
    } catch (error) {
        logger.error(error, `[COOK-UNITY] => Invalid request`)
        }
}





  
