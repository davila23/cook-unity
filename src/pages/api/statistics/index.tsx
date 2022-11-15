import { logger } from "@/logger";
import { updateStatistics as statistics } from "@/modules/statistics-info";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     responses:
 *       200:
 *         description: return statistics information
 */
export default async  function handler (_req: NextApiRequest, res: NextApiResponse){
try {
  logger.info('[COOK-UNITY] => New request http://localhost:3000/api/statistics')

  const response = await statistics()

  res.status(200).json(response)
} catch (error) {
  res.status(500).end()
  }
}
