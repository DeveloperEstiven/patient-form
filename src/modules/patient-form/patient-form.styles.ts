import { Button } from 'antd'
import styled from 'styled-components'

export const StyledPatientForm = {
  PatientForm: styled.form`
    display: flex;
    flex-direction: column;
    gap: 11px;
  `,

  Title: styled.h2`
    font-size: 23px;
    color: ${({ theme }) => theme.colors.font};
    margin-bottom: 24px;
  `,

  Row: styled.div`
    display: flex;
    gap: 20px;
  `,
  Col: styled.div`
    width: 100%;
  `,

  Button: styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
  `,

  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}
