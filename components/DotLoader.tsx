import styled, { keyframes } from "styled-components"

interface SpinnerProps {
  size: number
}

const createDynamicKeyframes = (size: number) => keyframes`
  0% { box-shadow: ${size * 1.67}px 0 #FFFFFF, -${size * 1.67}px 0 #FFFFFF22; background: #FFFFFF; }
  33% { box-shadow: ${size * 1.67}px 0 #FFFFFF, -${size * 1.67}px 0 #FFFFFF22; background: #FFFFFF22; }
  66% { box-shadow: ${size * 1.67}px 0 #FFFFFF22, -${size * 1.67}px 0 #FFFFFF; background: #FFFFFF22; }
`

const Spinner = styled.div<SpinnerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow:
    ${(props) => props.size * 1.67}px 0 #ffffff22,
    -${(props) => props.size * 1.67}px 0 #ffffff;
  animation: ${(props) => createDynamicKeyframes(props.size)} 1s infinite linear
    alternate;
`

enum DotLoaderSize {
  sm = "sm",
  md = "md",
  xs = "xs",
  lg = "lg",
  xl = "xl",
}

interface DotLoaderProps {
  size: DotLoaderSize
}

const DynamicSpinner = ({ size = 12 }) => {
  return <Spinner size={size} />
}

export { DynamicSpinner }
