import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { ICity } from 'services/city.service'
import { IDoctor, ISpeciality } from 'services/doctor.service'
import { DATE_FORMAT, NOW } from './patient-form.constants'

export const getCitiesOptions = (data: ICity[]): DefaultOptionType[] =>
  data.map((item) => ({
    value: item.id,
    label: item.name,
  }))

export const getSpecialitiesOptions = (data: ISpeciality[]): DefaultOptionType[] =>
  data.map((item) => ({
    value: item.id,
    label: item.name,
  }))

export const getDoctorsOptions = (data: IDoctor[]): DefaultOptionType[] =>
  data.map((item) => ({
    value: item.id,
    label: `${item.name} ${item.surname}`,
  }))

export const getIsPediatrician = (dateStr: string | null) => {
  const date = dayjs(dateStr, DATE_FORMAT)
  const fullYears = NOW.diff(date, 'years')
  return fullYears < 18
}
