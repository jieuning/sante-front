import styled from 'styled-components';
import { ColorType, getColorValue } from '../types/colorType';

type InputType =
  | 'checkbox'
  | 'circleRadio'
  | 'shortOvalRadio'
  | 'longOvalRadio';
type InputSize = 'circle' | 'short-oval' | 'long-oval';

type InputButtonInfo = {
  type: InputType;
  size: InputSize;
  backgroundColor?: ColorType;
  color?: ColorType;
  border?: ColorType;
  fontWeight?: string | number;
  value: string[];
  checked: boolean[];
  onClick?: (e?: any) => void;
};

interface InputButtonProps {
  info: InputButtonInfo;
}

const getButtonSize = (size: InputSize) => {
  switch (size) {
    case 'circle':
      return {
        width: '50px',
        height: '50px',
        fontSize: 'var(--font-size-medium)',
      };
    case 'short-oval': // 중간너비타원
      return {
        width: '100px',
        height: '50px',
        fontSize: 'var(--font-size-primary)',
      };
    case 'long-oval': // 긴너비타원
      return {
        width: '200px',
        height: '50px',
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

const RadioLabel = styled.label<InputButtonInfo>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin-bottom: 5px;
  margin-left: 5px;
  cursor: pointer;
  width: ${(props) => getButtonSize(props.size).width};
  height: ${(props) => getButtonSize(props.size).height};
  color: ${(props) => getColorValue(props.color ?? 'white')};
`;

const CircleRadioLabel = styled(RadioLabel)`
  border-radius: 3rem;
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ?? 'gray')};
`;

const ShortOvalRadioLabel = styled(RadioLabel)`
  border: 2px solid ${(props) => getColorValue(props.border ?? 'primary')};
  border-radius: 3rem;
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ?? 'white')};
`;

const LongOvalRadioLabel = styled(RadioLabel)`
  border: 2px solid ${(props) => getColorValue(props.border ?? 'primary')};
  border-radius: 3rem;
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ?? 'primary')};
  &:hover {
    border: 2px solid ${(props) => getColorValue('primary')};
    color: ${(props) => getColorValue('black')};
  }
`;

const CheckInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;

  &:checked + label {
    background-color: var(--primary-color);
    color: white;
  }
`;

const RadioInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;

  &:checked {
    + ${RadioLabel}, + ${ShortOvalRadioLabel} {
      background-color: var(--primary-color);
      color: white;
    }
    + ${LongOvalRadioLabel} {
      border: 2px solid var(--primary-color);
      color: var(--black-color);
    }
  }
`;

const InputButtonContainer = styled.div`
  display: flex;
`;

const InputcheckButtonBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const CheckLabel = styled.label<InputButtonInfo>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin-bottom: 5px;
  margin-left: 5px;
  border-radius: 3rem;
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ?? 'gray')};
  color: ${(props) => getColorValue(props.color ?? 'white')};
  cursor: pointer;
  width: ${(props) => getButtonSize(props.size).width};
  height: ${(props) => getButtonSize(props.size).height};
`;

const InputradioButtonBox = styled.div`
  display: flex;
  color: var(--white-background-color);
  cursor: pointer;
`;

const CheckButton = ({ info }: InputButtonProps) => {
  return (
    <InputButtonContainer>
      {info.type === 'checkbox' &&
        info.value.map((item, index) => (
          <InputcheckButtonBox key={index} {...info}>
            <CheckInput type="checkbox" id={index + ''} name="check-group" />
            <CheckLabel htmlFor={index + ''} {...info}>
              <span>{item}</span>
            </CheckLabel>
          </InputcheckButtonBox>
        ))}
    </InputButtonContainer>
  );
};

const RadioButton = ({ info }: InputButtonProps) => {
  return (
    <InputButtonContainer>
      {info.type === 'circleRadio' &&
        info.value.map((item, index) => (
          <InputradioButtonBox key={index}>
            <RadioInput
              type="radio"
              id={`radio-${info.type}-${index}`}
              name="radio-group"
            />
            <CircleRadioLabel htmlFor={`radio-${info.type}-${index}`} {...info}>
              <span>{item}</span>
            </CircleRadioLabel>
          </InputradioButtonBox>
        ))}
      {info.type === 'shortOvalRadio' &&
        info.value.map((item, index) => (
          <InputradioButtonBox key={index}>
            <RadioInput
              type="radio"
              id={`radio-${info.type}-${index}`}
              name="radio-group"
            />
            <ShortOvalRadioLabel
              htmlFor={`radio-${info.type}-${index}`}
              {...info}
            >
              <span>{item}</span>
            </ShortOvalRadioLabel>
          </InputradioButtonBox>
        ))}
      {info.type === 'longOvalRadio' &&
        info.value.map((item, index) => (
          <InputradioButtonBox key={index}>
            <RadioInput
              type="radio"
              id={`radio-${info.type}-${index}`}
              name="radio-group"
            />
            <LongOvalRadioLabel
              htmlFor={`radio-${info.type}-${index}`}
              {...info}
            >
              <span>{item}</span>
            </LongOvalRadioLabel>
          </InputradioButtonBox>
        ))}
    </InputButtonContainer>
  );
};
export { CheckButton, RadioButton };
export type { InputType, InputSize, InputButtonInfo };
