import { styled } from 'styled-components'

const LOGO_SIZE = 70

export const StyledApp = {
  App: styled.main`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Wrapper: styled.div``,

  Card: styled.div`
    position: relative;
    padding: 60px 30px 30px;
    width: 400px;
    border-radius: 20px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  `,

  Logo: styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    width: ${LOGO_SIZE}px;
    height: ${LOGO_SIZE}px;
    padding: 20px;
    position: absolute;
    border-radius: 50%;
    top: -${LOGO_SIZE / 2}px;
    left: 50%;
    transform: translateX(-50%);
    @keyframes rotate {
      0% {
        transform: translateX(-50%) rotate(0deg);
      }
      100% {
        transform: translateX(-50%) rotate(360deg);
      }
    }
    animation: rotate 1s;
  `,
}
