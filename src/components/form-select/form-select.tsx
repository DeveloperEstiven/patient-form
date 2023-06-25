import { Select, SelectProps } from 'antd'
import { FormControl } from 'components/form-control'
import { IFormControlProps } from 'components/form-control/form-control.types'
import { useField } from 'formik'
import React from 'react'

const selectStyle = { width: '100%' }

export const FormSelect: React.FC<SelectProps & IFormControlProps> = (props) => {
  const [, meta, helpers] = useField(props.name)

  const isError = meta.touched && meta.error

  const onBlur = () => {
    helpers.setTouched(true)
  }

  const onChange: SelectProps['onChange'] = (value, option) => {
    helpers.setValue(value)
    props.onChange?.(value, option)
  }

  return (
    <FormControl name={props.name} label={props.label}>
      <Select
        status={isError ? 'error' : ''}
        optionFilterProp='label'
        style={selectStyle}
        onBlur={onBlur}
        id={props.name}
        allowClear
        {...props}
        onChange={onChange}
      />
    </FormControl>
  )
}
