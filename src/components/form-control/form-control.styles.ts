import styled from 'styled-components'

const LEFT = 5

export const StyledFormControl = {
  Error: styled.span`
    height: 13px;
    display: block;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.danger};
    margin-left: ${LEFT}px;
  `,
  Label: styled.span`
    display: block;
    color: ${({ theme }) => theme.colors.font};
    margin-left: ${LEFT}px;
    margin-bottom: 3px;
  `,
}
