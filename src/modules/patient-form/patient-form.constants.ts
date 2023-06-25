import { DefaultOptionType } from 'antd/es/select'
import { TPatientFormFields } from './patient-form.types'
import { TGender } from 'services/doctor.service'
import dayjs from 'dayjs'

export const patientFormInitialValues: TPatientFormFields = {
  email: '',
  phoneNumber: '',
  name: '',
  birthDate: '',
  gender: null,
  city: '',
  doctorSpeciality: '',
  doctor: '',
}

export const DATE_FORMAT = 'DD/MM/YYYY'

export const GENDERS: DefaultOptionType[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

export const GENDER_OPTIONS: [TGender, TGender] = ['Female', 'Male']

export const GENDER_OPPOSITE: Record<TGender, TGender> = {
  Male: 'Female',
  Female: 'Male',
}

export const EMAIL_MAX_LENGTH = 256

export const NOW = dayjs()
export const MAX_DATE = NOW.endOf('day')
export const MIN_DATE = NOW.year(MAX_DATE.year() - 100)
export const CURRENT_DATE_MINUS_18 = NOW.year(NOW.year() - 18)
export const DATE_LIMIT_INITIAL = { min: MIN_DATE, max: MAX_DATE }
