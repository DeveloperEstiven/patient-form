import { FormikHelpers } from 'formik'
import { TGender } from 'services/doctor.service'

export type TPatientFormFields = {
  email?: string
  phoneNumber?: string
  name: string
  birthDate: string
  gender: TGender | null
  city: string
  doctorSpeciality?: string
  doctor: string
}

export type TPatientFormSubmit = (
  values: TPatientFormFields,
  actions: FormikHelpers<TPatientFormFields>,
) => void

export interface IPatientFormProps {
  onSubmit: TPatientFormSubmit
}

export type TPatientFormFieldsKeys = keyof TPatientFormFields

export interface IFilter {
  doctorId?: string
  doctorSpecialityId?: string
  cityId?: string
  gender?: TGender | null
  selectedBirthDate?: string | null
}
