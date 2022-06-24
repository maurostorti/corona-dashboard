export interface ApiData {
  confirmed: { value: any }
  recovered: { value: any }
  deaths: { value: any }
  lastUpdate: string
}

export interface CountryType {
  name: string
  iso2?: string
  iso3?: string
}

export interface DailyDataType {
  confirmed: {
    total: number
  }
  deaths: {
    total: number
  }
  recovered: {
    total: number
  }
  reportDate: string
}
