import { api } from './api.service'

export type TGender = 'Female' | 'Male'

export interface ISpeciality {
  id: string
  name: string
  params?: {
    gender?: TGender
    maxAge?: number
    minAge?: number
  }
}

export interface IDoctor {
  id: string
  name: string
  surname: string
  specialityId: string
  isPediatrician: boolean
  cityId: string
}

export const doctorService = {
  getDoctorSpecialities: async () => {
    const response = await api.get<ISpeciality[]>('/e8897b19-46a0-4124-8454-0938225ee9ca')
    return response.data
  },
  getDoctors: async () => {
    const response = await api.get<IDoctor[]>(`/3d1c993c-cd8e-44c3-b1cb-585222859c21`)
    return response.data
  },
}
