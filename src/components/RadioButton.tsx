import styled from 'styled-components';
import { ColorType, getColorValue } from '../types/colorType';

type InputType = 'radio' | 'checkbox';
type InputSize = 'circle' | 'short-oval' | 'long-oval';

type InputButtonInfo = {
  type: InputType;
  size: InputSize;
  text: (string | number)[];
  backgroundColor?: ColorType;
  color?: ColorType;
  border?: ColorType;
  fontWeight?: string;
  onClick?: (e?: any) => void;
};

interface InputButtonProps {
  info: InputButtonInfo;
}

const InputButton = ({ info }: InputButtonProps) => {

  const handleClick = info.onClick || (() => {}); // 기본값 설정


  return (
    <Container {...info}>
      {info.type === 'checkbox' && (
        <CheckButton onClick={handleClick} {...info}>
          {info.text}
        </CheckButton>
      )}
      {info.type === 'radio' && (
        <RadioButton onClick={handleClick} {...info}>
          {info.text}
        </RadioButton>
      )}
      {info.type === 'radio' && (
        <RadioCategoryButton onClick={handleClick} {...info}>
          {info.text}
        </RadioCategoryButton>
      )}
      {info.type === 'radio' && (
        <RadioGenderButton onClick={handleClick} {...info}>
          {info.text}
        </RadioGenderButton>
      )}
    </Container>
  );
};

const getButtonSize = (size: InputSize) => {
  switch (size) {
    case 'circle':
      return {
        width: '3.125rem',
        height: '3.125rem',
        fontSize: 'var(--font-size-primary)',
      };
    case 'short-oval': // 중간너비타원
      return {
        width: '4.375rem',
        height: '3.125rem',
        fontSize: 'var(--font-size-primary)',
      };
    case 'long-oval': // 긴너비타원
      return {
        width: '6.15rem',
        height: '3.125rem',
        fontSize: 'var(--font-size-primary)',
      };
    default:
      return {
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--font-size-primary)',
      };
  }
};

const Container = styled.div<InputButtonInfo>`
  width: ${(props) => getButtonSize(props.size ?? 'default').width};
  height: ${(props) => getButtonSize(props.size ?? 'default').height};

  cursor: pointer;
`;

// 체크: 모양, 배경색의 변화만 있으면 됨_원/타원
const CheckButton = styled.input<InputButtonInfo>`
  color: var(--white-background-color);
  border: none;
  outline: none;
  cursor: pointer;

  // true일때 민트 false일때 gray로 설정하기
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ? 'primary' : 'gray')};
`;

// 라디오: 모양, 배경색, 글씨색, 테두리색의 변화 필요

const BaseInputButton = styled.input<InputButtonInfo>`
  color: var(--white-background-color);
  border: ${(props) =>
    props.type === 'radio'
      ? '1px solid ' + getColorValue(props.border || 'gray')
      : 'none'};
  outline: none;
  cursor: pointer;
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ? 'primary' : 'gray')};
`;


const RadioButton = styled(BaseInputButton)``;

const RadioCategoryButton = styled(BaseInputButton)`
  color: var(--black-color);
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ? 'primary' : 'white')};
`;

const RadioGenderButton = styled(BaseInputButton)`
  color: var(--black-color);
  background-color: var(--white-background-color);
`;

export default InputButton;
