import { object, ObjectSchema, string } from 'yup'

import { TPatientFormFields } from './patient-form.types'
import { REG_EXP } from 'constants/regexp'

export const patientFormValidationSchema: ObjectSchema<TPatientFormFields> = object({
  email: string()
    .test('required', 'Enter email or phone number', function (value) {
      return !!value || !!this.parent.phoneNumber
    })
    .test('email', 'Invalid email format', function (value) {
      return !value || REG_EXP.email.test(value)
    }),
  phoneNumber: string()
    .test('required', 'Enter phone number or email', function (value) {
      return !!value || !!this.parent.email
    })
    .test('phoneFormat', 'Invalid phone number format', function (value) {
      return !value || REG_EXP.phoneNumber.test(value)
    }),
  name: string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name format')
    .required('Name is required'),
  birthDate: string().required('Birthday date is required'),
  gender: string().oneOf(['Male', 'Female']).required('Gender is required'),
  city: string().required('City is required'),
  doctorSpeciality: string(),
  doctor: string().required('Doctor is required'),
})
