import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { DailyDataType } from '../utils/api-types'

export default function useDailyData(): DailyDataType[] {
  const [data, setData] = useState<DailyDataType[]>([])

  const getGraphData = () => {
    api
      .get('api/daily')
      .then((response) => {
        const { data: dailyData }: { data: DailyDataType[] } = response
        setData(dailyData)
      })
      .catch((error) => console.error(`Error: ${error}`))
  }

  useEffect(() => {
    getGraphData()
  }, [])

  return data
}
