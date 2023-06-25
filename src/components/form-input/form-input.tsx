import { Input, InputProps } from 'antd'
import { FormControl } from 'components/form-control'
import { IFormControlProps } from 'components/form-control/form-control.types'
import { useField } from 'formik'
import React from 'react'

export const FormInput: React.FC<InputProps & IFormControlProps> = (props) => {
  const [field, meta] = useField(props.name)

  const isError = meta.touched && meta.error

  return (
    <FormControl name={props.name} label={props.label}>
      <Input status={isError ? 'error' : ''} id={props.name} {...field} {...props} />
    </FormControl>
  )
}
