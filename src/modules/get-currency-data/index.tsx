import { logger } from "@/logger"
import { Currency } from "@/models/currency"
import axios from "axios"
import getSymbolFromCurrency from 'currency-symbol-map' // github => https://github.com/bengourley/currency-symbol-map

// TODO: currency could be an array, the method supports multiples currencies
export const getCurrencyConvertion = async (currency :string , currencyBase : string) =>{
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
           "apikey": process.env.API_KEY
        },
      };
      
      const conversionRate =  await axios(`https://api.apilayer.com/fixer/latest?symbols=${currency}&base=${currencyBase}`, requestOptions)
      
      const {rates} = conversionRate.data

      const enrichedCurrencies: Currency[] =[{
        iso: currency,
        symbol:getSymbolFromCurrency(currency) || '$',
        conversion_rate: 1 / rates[currency]
        },{
        iso: currencyBase,
        symbol: getSymbolFromCurrency(currencyBase)|| '$',
        conversion_rate: 1
        }]

      logger.info(`[COOK-UNITY] => Convesion Rate between ${currency} and ${currencyBase} is: ${rates[currency]}`)

      return enrichedCurrencies
    } catch (error) {
       logger.error(error, `[COOK-UNITY] => Error getting information api.apilayer.com`)
       throw new Error('api.apilayer.com is not responding, try later');
     }
}

