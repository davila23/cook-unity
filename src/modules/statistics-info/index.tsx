import { DomainData } from "@/models/domain"
import { Statistics } from "@/models/statistics"
import { logger } from "@/logger"

let count = 0
let maxDistance = 0
let country =''
let countryIterations = new Map();

export async function updateStatistics(domain? : DomainData) { 

  if(isNewRequestDomain(domain))  {
    logger.info('[COOK-UNITY] => Requesting statistics')

    if(countryIterations.size === 0) throw new Error('First, you must load some ips');
   
    const sortCountryIterations = new Map([...countryIterations.entries()].sort((a, b) => b[1] - a[1]));
  
    const firstElement = sortCountryIterations.entries().next().value;

    const statics: Statistics ={
      longest_distance:{
        country: country,
        value: maxDistance
      },
      most_traced:{
        country: firstElement[0] as string,
        value: firstElement[1] as number,
      }
    }
  
    return statics
  }

  logger.info('[COOK-UNITY] => Updating statistics')

  if(domain.distante_to_usa > maxDistance) {
      maxDistance=domain.distante_to_usa
      country= domain.name
   }

   count = count + 1

   countryIterations.set(domain.name, countryIterations.get(domain.name) + 1 || 1);

   logger.info('[COOK-UNITY] => Updated Country statistics: ' + [...countryIterations.entries()])
}

 const isNewRequestDomain = (domain? : DomainData)  => domain === undefined

