import axios from 'axios';
import { logger } from "@/logger"

export async function getDomainData(ip : string) { 
 try {
    const requestOptions = {
     method: 'GET',
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const domain =  await axios(`http://ip-api.com/json/${ip}?fields=country,countryCode,lat,lon,currency`, requestOptions)

    return {ip, ...domain.data}
    } catch (error) {
      logger.error(error,`[COOK-UNITY] => Error getting information; domain = ${ip}`)
      throw new Error('ip-api is not responding, try later');
    }
}


