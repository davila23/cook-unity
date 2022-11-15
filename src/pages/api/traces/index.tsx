import { logger } from "@/logger";
import { DomainData } from "@/models/domain";
import { getCurrencyConvertion } from "@/modules/get-currency-data";
import { getDomainData } from "@/modules/get-domain-data";
import { updateStatistics } from "@/modules/statistics-info";
import { checkIfValidIP } from "@/utils/checkIfValidIP";
import { distanceToUsa } from "@/utils/distanceToUsa";
import { NextApiRequest, NextApiResponse } from "next";

const currencyBase = 'USD'

/**
 * @swagger
 * /api/traces:
 *   post:
 *     description: Returns traces
 *     parameters:
 *      - id: string
 *        description: ID
 *     responses:
 *       200:
 *         description: return information associated with that IP address
 */
export default async function handler (_req: NextApiRequest, res: NextApiResponse){
try {
 logger.info('[COOK-UNITY] => New request http://localhost:3000/api/traces')

 const {ip} = _req.body

 if(!checkIfValidIP(ip)) throw new Error('Ip paramete is invalid, try with the format 100.100.100.100');

 const domainInfo =  await getDomainData(ip as string)
  
 const enrichedCurrencies = await getCurrencyConvertion(domainInfo.currency, currencyBase)

 const distance = await distanceToUsa(domainInfo.lat, domainInfo.lon)

let enrichedData: DomainData ={
  ip: domainInfo.ip,
  name: domainInfo.country,
  code: domainInfo.countryCode,
  lat: domainInfo.lat,
  lon: domainInfo.lon,
  currencies: enrichedCurrencies,
  distante_to_usa: distance || 0
}

logger.info('[COOK-UNITY] => Response: ' + JSON.stringify(enrichedData ))
await updateStatistics(enrichedData)

res.status(200).json({body: enrichedData })

} catch (error) {
  res.status(500).json({statusCode: 500 , message: error.message})
  }
}

