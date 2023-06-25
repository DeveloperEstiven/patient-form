import { DatePicker, DatePickerProps } from 'antd'
import { FormControl } from 'components/form-control'
import { IFormControlProps } from 'components/form-control/form-control.types'
import { useField } from 'formik'
import React from 'react'

export const FormDatePicker: React.FC<DatePickerProps & IFormControlProps> = (props) => {
  const [, meta, helpers] = useField(props.name)

  const isError = meta.touched && meta.error

  const onBlur = () => {
    helpers.setTouched(true)
  }

  const onChange: DatePickerProps['onChange'] = (date, str) => {
    helpers.setValue(str)
    props.onChange?.(date, str)
  }

  return (
    <FormControl name={props.name} label={props.label}>
      <DatePicker
        status={isError ? 'error' : ''}
        onBlur={onBlur}
        id={props.name}
        {...props}
        onChange={onChange}
      />
    </FormControl>
  )
}
