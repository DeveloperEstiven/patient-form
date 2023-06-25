import React from 'react'
import { StyledFormControl as Styled } from './form-control.styles'
import { IFormControlProps } from './form-control.types'
import { ErrorMessage } from 'formik'

export const FormControl: React.FC<IFormControlProps> = (props) => {
  const { name, label, children } = props

  return (
    <div>
      <label htmlFor={name}>
        <Styled.Label>{label}</Styled.Label>
        {children}
      </label>

      <Styled.Error>
        <ErrorMessage name={name} />
      </Styled.Error>
    </div>
  )
}
