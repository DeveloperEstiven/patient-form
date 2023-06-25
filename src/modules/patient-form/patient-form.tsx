import React from 'react'

import { FormDatePicker } from 'components/form-date-picker'
import { FormInput } from 'components/form-input'
import { FormSelect } from 'components/form-select'
import { FormikProvider } from 'formik'
import { DATE_FORMAT, EMAIL_MAX_LENGTH } from './patient-form.constants'
import { usePatientForm } from './patient-form.state'
import { StyledPatientForm as Styled } from './patient-form.styles'
import { IPatientFormProps } from './patient-form.types'

export const PatientForm: React.FC<IPatientFormProps> = ({ onSubmit }) => {
  const {
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
  } = usePatientForm({ onSubmit })

  return (
    <FormikProvider value={form}>
      <Styled.Title>Please, fill all required fields to continue</Styled.Title>
      <Styled.PatientForm onSubmit={form.handleSubmit}>
        <FormInput showCount maxLength={20} placeholder='Steve' label='Name' name='name' />

        <FormInput
          maxLength={EMAIL_MAX_LENGTH}
          placeholder='example@halo-lab.team'
          label='Email'
          name='email'
        />

        <FormInput placeholder='+3801234567891' label='Phone number' name='phoneNumber' />

        <FormDatePicker
          showToday={false}
          disabledDate={disabledDate}
          label='Birthdate'
          onChange={onChangeBirthDate}
          name='birthDate'
          placeholder='31/12/2001'
          format={DATE_FORMAT}
        />

        <Styled.Row>
          <Styled.Col>
            <FormSelect
              placeholder='Male'
              label='Sex'
              name='gender'
              onChange={onChangeGender}
              value={form.values.gender}
              options={genders}
            />
          </Styled.Col>
          <Styled.Col>
            <FormSelect
              name='city'
              label='City'
              loading={isLoading}
              showSearch
              onChange={onChangeCity}
              value={form.values.city}
              options={citiesOptions}
            />
          </Styled.Col>
        </Styled.Row>

        <Styled.Row>
          <Styled.Col>
            <FormSelect
              name='doctorSpeciality'
              label='Doctor Speciality'
              loading={isLoading}
              showSearch
              onChange={onChangeSpeciality}
              value={form.values.doctorSpeciality}
              options={specialitiesOptions}
            />
          </Styled.Col>

          <Styled.Col>
            <FormSelect
              loading={isLoading}
              onChange={onChangeDoctor}
              showSearch
              name='doctor'
              label='Doctor'
              value={form.values.doctor}
              options={doctorsOptions}
            />
          </Styled.Col>
        </Styled.Row>

        <Styled.ButtonWrapper>
          <Styled.Button
            loading={form.isSubmitting}
            disabled={!form.isValid}
            htmlType='submit'
            type='primary'
            shape='round'
            size={'large'}>
            Submit
          </Styled.Button>
        </Styled.ButtonWrapper>
      </Styled.PatientForm>
    </FormikProvider>
  )
}
