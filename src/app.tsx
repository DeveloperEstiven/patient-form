import { PatientForm, TPatientFormSubmit } from 'modules/patient-form'
import { StyledApp as Styled } from './app.styles'
import { ReactComponent as Logo } from './assets/icons/logo.svg'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'theme/global-style'
import { theme } from 'theme/theme'

export const App = () => {
  const onSubmit: TPatientFormSubmit = async (values, actions) => {
    console.log('🟥  values:', values)
    try {
      // request to api
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
      console.error(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Styled.App>
        <Styled.Card>
          <Styled.Logo>
            <Logo />
          </Styled.Logo>
          <PatientForm onSubmit={onSubmit} />
        </Styled.Card>
      </Styled.App>
    </ThemeProvider>
  )
}
