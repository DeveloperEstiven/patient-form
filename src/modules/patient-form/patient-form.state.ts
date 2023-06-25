import { useFormik } from 'formik'
import {
  CURRENT_DATE_MINUS_18,
  DATE_LIMIT_INITIAL,
  GENDERS,
  GENDER_OPPOSITE,
  GENDER_OPTIONS,
  MAX_DATE,
  MIN_DATE,
  patientFormInitialValues,
} from './patient-form.constants'
import { patientFormValidationSchema } from './patient-form.schema'
import { IFilter, TPatientFormFields, IPatientFormProps } from './patient-form.types'

import { DefaultOptionType } from 'antd/es/select'
import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { ICity, cityService } from 'services/city.service'
import { IDoctor, ISpeciality, TGender, doctorService } from 'services/doctor.service'
import {
  getCitiesOptions,
  getDoctorsOptions,
  getIsPediatrician,
  getSpecialitiesOptions,
} from './patient-form.utils'
import { DatePickerProps } from 'antd'

export const usePatientForm = ({ onSubmit }: IPatientFormProps) => {
  const form = useFormik<TPatientFormFields>({
    initialValues: patientFormInitialValues,
    validationSchema: patientFormValidationSchema,
    onSubmit,
  })

  const [cities, setCities] = useState<ICity[]>([])
  const [specialities, setSpecialities] = useState<ISpeciality[]>([])
  const [doctors, setDoctors] = useState<IDoctor[]>([])
  const [genders, setGenders] = useState(GENDERS)
  const [dateLimit, setDateLimit] = useState(DATE_LIMIT_INITIAL)

  const [isLoading, setIsLoading] = useState(true)

  const [citiesOptions, setCitiesOptions] = useState<DefaultOptionType[]>([])
  const [specialitiesOptions, setSpecialitiesOptions] = useState<DefaultOptionType[]>([])
  const [doctorsOptions, setDoctorsOptions] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await cityService.getCities()
        const specialitiesResponse = await doctorService.getDoctorSpecialities()
        const doctorsResponse = await doctorService.getDoctors()

        unstable_batchedUpdates(() => {
          setCities(citiesResponse)
          setCitiesOptions(getCitiesOptions(citiesResponse))
          setSpecialities(specialitiesResponse)
          setSpecialitiesOptions(getSpecialitiesOptions(specialitiesResponse))
          setDoctors(doctorsResponse)
          setDoctorsOptions(getDoctorsOptions(doctorsResponse))
        })
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filterCities = ({ doctorId, doctorSpecialityId, gender, selectedBirthDate }: IFilter) => {
    let resultCities: ICity[] = cities

    if (doctorId !== undefined && (doctorId || form.values.doctor)) {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === (doctorId || form.values.doctor),
      )!
      resultCities = resultCities.filter((city) => city.id === selectedDoctor.cityId)
    }

    if (doctorSpecialityId !== undefined && (doctorSpecialityId || form.values.doctorSpeciality)) {
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.specialityId === (doctorSpecialityId || form.values.doctorSpeciality),
      )
      resultCities = resultCities.filter((city) =>
        filteredDoctors.some((doctor) => city.id === doctor.cityId),
      )
    }

    if (gender !== undefined && (gender || form.values.gender)) {
      const filteredSpecialities = specialities.filter(
        (speciality) =>
          speciality.params?.gender !== GENDER_OPPOSITE[gender || form.values.gender!],
      )
      const filteredDoctors = doctors.filter((doctor) =>
        filteredSpecialities.some((s) => s.id === doctor.specialityId),
      )
      resultCities = resultCities.filter((city) =>
        filteredDoctors.some((doctor) => city.id === doctor.cityId),
      )
    }

    if (selectedBirthDate || form.values.birthDate) {
      const isPediatrician = getIsPediatrician(selectedBirthDate || form.values.birthDate)
      const filteredDoctors = doctors.filter((doctor) => doctor.isPediatrician === isPediatrician)
      resultCities = resultCities.filter((city) =>
        filteredDoctors.some((doctor) => city.id === doctor.cityId),
      )
    }

    setCitiesOptions(getCitiesOptions(resultCities))
  }

  const filterDoctors = ({ cityId, doctorSpecialityId, gender, selectedBirthDate }: IFilter) => {
    let resultDoctors: IDoctor[] = doctors

    if (cityId !== undefined && (cityId || form.values.city)) {
      resultDoctors = resultDoctors.filter(
        (doctor) => doctor.cityId === (cityId || form.values.city),
      )
    }

    if (gender !== undefined && (gender || form.values.gender)) {
      const filteredSpecialities = specialities.filter(
        (speciality) =>
          speciality.params?.gender !== GENDER_OPPOSITE[gender || form.values.gender!],
      )
      resultDoctors = resultDoctors.filter((doctor) =>
        filteredSpecialities.some((s) => s.id === doctor.specialityId),
      )
    }

    if (doctorSpecialityId !== undefined && (doctorSpecialityId || form.values.doctorSpeciality)) {
      resultDoctors = resultDoctors.filter(
        (doctor) => doctor.specialityId === (doctorSpecialityId || form.values.doctorSpeciality),
      )
    }

    if (selectedBirthDate || form.values.birthDate) {
      const isPediatrician = getIsPediatrician(selectedBirthDate || form.values.birthDate)
      resultDoctors = resultDoctors.filter((doctor) => doctor.isPediatrician === isPediatrician)
    }

    setDoctorsOptions(getDoctorsOptions(resultDoctors))
  }

  const filterDoctorsSpecialities = ({ doctorId, cityId, gender, selectedBirthDate }: IFilter) => {
    let resultDoctorsSpecialities: ISpeciality[] = specialities

    if (cityId !== undefined && (cityId || form.values.city)) {
      const filteredDoctors = doctors.filter(
        (doctor) => doctor.cityId === (cityId || form.values.city),
      )
      setDoctorsOptions(getDoctorsOptions(filteredDoctors))
      resultDoctorsSpecialities = resultDoctorsSpecialities.filter((speciality) =>
        filteredDoctors.some((doc) => speciality.id === doc.specialityId),
      )
    }

    if (gender !== undefined && (gender || form.values.gender)) {
      resultDoctorsSpecialities = resultDoctorsSpecialities.filter(
        (speciality) =>
          speciality.params?.gender !== GENDER_OPPOSITE[gender || form.values.gender!],
      )
    }

    if (doctorId !== undefined && (doctorId || form.values.doctor)) {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === (doctorId || form.values.doctor),
      )!
      resultDoctorsSpecialities = resultDoctorsSpecialities.filter(
        (speciality) => speciality.id === selectedDoctor.specialityId,
      )
    }

    if (selectedBirthDate || form.values.birthDate) {
      const isPediatrician = getIsPediatrician(selectedBirthDate || form.values.birthDate)
      const filteredDoctors = doctors.filter((doctor) => doctor.isPediatrician === isPediatrician)
      resultDoctorsSpecialities = resultDoctorsSpecialities.filter((speciality) =>
        filteredDoctors.some((doc) => speciality.id === doc.specialityId),
      )
    }

    setSpecialitiesOptions(getSpecialitiesOptions(resultDoctorsSpecialities))
  }

  const filterGenders = ({ cityId, doctorSpecialityId, doctorId, selectedBirthDate }: IFilter) => {
    let resultGenders: DefaultOptionType[] = GENDERS

    if (cityId) {
      const filteredDoctors = doctors.filter((doctor) => doctor.cityId === cityId)
      const filteredSpecialities = specialities.filter((speciality) =>
        filteredDoctors.some((doc) => speciality.id === doc.specialityId),
      )

      const gendersInSpecialities: TGender[] = []
      for (const speciality of filteredSpecialities) {
        const specialityGender = speciality.params?.gender

        if (!specialityGender) {
          const missingGenders = GENDER_OPTIONS.filter(
            (gender) => !gendersInSpecialities.includes(gender),
          )
          gendersInSpecialities.push(...missingGenders)
          break
        }

        if (!gendersInSpecialities.includes(specialityGender)) {
          gendersInSpecialities.push(specialityGender)
        }
      }

      if (gendersInSpecialities.length === 1) {
        // Male or Female
        const updatedGenders = resultGenders.map((gender) => ({
          ...gender,
          disabled: gender.value !== gendersInSpecialities[0],
        }))
        resultGenders = updatedGenders
      } else {
        resultGenders = GENDERS
      }
    }

    if (doctorSpecialityId) {
      const selectedSpecialityGender = specialities.find(
        (speciality) => speciality.id === doctorSpecialityId,
      )!.params?.gender

      if (selectedSpecialityGender) {
        const updatedGenders = resultGenders.map((gender) => ({
          ...gender,
          disabled: gender.value !== selectedSpecialityGender,
        }))
        resultGenders = updatedGenders
      } else {
        resultGenders = GENDERS
      }
    }

    if (doctorId) {
      const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId)!
      const selectedSpecialityGender = specialities.find(
        (speciality) => speciality.id === selectedDoctor.specialityId,
      )!.params?.gender

      if (selectedSpecialityGender) {
        const updatedGenders = resultGenders.map((gender) => ({
          ...gender,
          disabled: gender.value !== selectedSpecialityGender,
        }))
        resultGenders = updatedGenders
      } else {
        resultGenders = GENDERS
      }
    }

    if (selectedBirthDate) {
      const isPediatrician = getIsPediatrician(selectedBirthDate || form.values.birthDate)
      const filteredDoctors = doctors.filter((doctor) => doctor.isPediatrician === isPediatrician)
      const filteredSpecialities = specialities.filter((speciality) =>
        filteredDoctors.some((doc) => speciality.id === doc.specialityId),
      )

      const gendersInSpecialities: TGender[] = []
      for (const speciality of filteredSpecialities) {
        const specialityGender = speciality.params?.gender

        if (!specialityGender) {
          const missingGenders = GENDER_OPTIONS.filter(
            (gender) => !gendersInSpecialities.includes(gender),
          )
          gendersInSpecialities.push(...missingGenders)
          break
        }

        if (!gendersInSpecialities.includes(specialityGender)) {
          gendersInSpecialities.push(specialityGender)
        }
      }

      if (gendersInSpecialities.length === 1) {
        // Male or Female
        const updatedGenders = resultGenders.map((gender) => ({
          ...gender,
          disabled: gender.value !== gendersInSpecialities[0],
        }))
        resultGenders = updatedGenders
      } else {
        resultGenders = GENDERS
      }
    }

    setGenders(resultGenders)
  }

  const applyFilters = (filter: IFilter) => {
    filterCities(filter)
    filterGenders(filter)
    filterDoctorsSpecialities(filter)
    filterDoctors(filter)
  }

  const onChangeBirthDate = (_: Dayjs | null, selectedBirthDate: string | null) => {
    applyFilters({
      selectedBirthDate,
      cityId: form.values.city,
      doctorId: form.values.doctor,
      doctorSpecialityId: form.values.doctorSpeciality,
      gender: form.values.gender,
    })
  }

  const onChangeCity = (cityId?: ICity['id']) => {
    applyFilters({
      selectedBirthDate: form.values.birthDate,
      cityId,
      doctorId: form.values.doctor,
      doctorSpecialityId: form.values.doctorSpeciality,
      gender: form.values.gender,
    })
  }

  const onChangeGender = (gender?: TGender) => {
    applyFilters({
      selectedBirthDate: form.values.birthDate,
      cityId: form.values.city,
      doctorId: form.values.doctor,
      doctorSpecialityId: form.values.doctorSpeciality,
      gender,
    })
  }

  const onChangeSpeciality = (doctorSpecialityId?: ISpeciality['id']) => {
    applyFilters({
      selectedBirthDate: form.values.birthDate,
      cityId: form.values.city,
      doctorId: form.values.doctor,
      doctorSpecialityId,
      gender: form.values.gender,
    })
  }

  const onChangeDoctor = (doctorId?: IDoctor['id']) => {
    applyFilters({
      selectedBirthDate: form.values.birthDate,
      cityId: form.values.city,
      doctorId,
      doctorSpecialityId: form.values.doctorSpeciality,
      gender: form.values.gender,
    })

    if (doctorId) {
      const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId)!
      setDateLimit(
        selectedDoctor.isPediatrician
          ? { max: MAX_DATE, min: CURRENT_DATE_MINUS_18 }
          : { max: CURRENT_DATE_MINUS_18, min: MIN_DATE },
      )

      if (!form.values.doctorSpeciality && !form.values.gender && !form.values.city) {
        form.setFieldValue('doctorSpeciality', selectedDoctor.specialityId)
        form.setFieldValue('city', selectedDoctor.cityId)
      }
    }
  }

  const disabledDate: DatePickerProps['disabledDate'] = (date) => {
    return !date || date.isBefore(dateLimit.min) || date.isAfter(dateLimit.max)
  }

  return {
    onChangeBirthDate,
    onChangeCity,
    onChangeGender,
    onChangeSpeciality,
    onChangeDoctor,
    disabledDate,
    specialitiesOptions,
    doctorsOptions,
    citiesOptions,
    genders,
    form,
    isLoading,
  }
}
