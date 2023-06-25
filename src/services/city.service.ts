import { api } from './api.service'

export interface ICity {
  id: string
  name: string
}

export const cityService = {
  getCities: async () => {
    const response = await api.get<ICity[]>('/9fcb58ca-d3dd-424b-873b-dd3c76f000f4')
    return response.data
  },
}
