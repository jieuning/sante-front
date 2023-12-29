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
  fontSize?: string | number;
  value: string[] | string;
  items: string[];
  disabled?: string | boolean;
  onChange?: (value: string) => void;
  onClick?: (value: string) => void;
  onClickAll?: () => void;
};

type ReducedButtonInfo = Omit<
  InputButtonInfo,
  'onClick' | 'onClickAll' | 'value' | 'items'
>;
interface InputButtonProps {
  info: InputButtonInfo;
}

type isSelectedType = {
  isSelected: boolean;
};

const getButtonSize = (size: InputSize) => {
  switch (size) {
    case 'circle':
      return {
        width: '40px',
        height: '40px',
        fontSize: '15px',
      };
    case 'short-oval': // 중간너비타원
      return {
        width: '55px',
        height: '25px',
        fontSize: '15px',
      };
    case 'long-oval': // 긴너비타원
      return {
        width: '182.5px',
        height: '40px',
        fontSize: '13px',
      };
    default:
      return {
        width: 'auto',
        height: 'auto',
        fontSize: '16px',
      };
  }
};

const RadioLabel = styled.label<InputButtonInfo>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin-bottom: 10px;
  margin-left: 5px;
  &:first-of-type {
    margin-left: 0px;
  }

  cursor: pointer;
  width: ${(props) => getButtonSize(props.size).width};
  height: ${(props) => getButtonSize(props.size).height};
  color: ${(props) => getColorValue(props.color ?? 'white')};
  font-size: ${(props) => getButtonSize(props.size).fontSize};
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
  border: 1px solid var(--gray-light);
  border-radius: 10px;
  background-color: #fff;
  &:hover {
    border: 1px solid ${(props) => getColorValue(props.border ?? 'primary')};
    color: ${(props) => getColorValue(props.color ?? 'black')};
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
      border: 1px solid var(--primary-color);
      color: var(--black-color);
    }
  }
`;

const InputButtonContainer = styled.div`
  display: flex;
`;

const CheckButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InputcheckButtonBox = styled.div<Partial<ReducedButtonInfo>>`
  display: flex;
  cursor: pointer;
`;
const InputradioButtonBox = styled.div`
  display: flex;
  color: var(--white-background-color);
  cursor: pointer;
  margin-left: 5px;
  &:first-child {
    margin-left: 0px;
  }
`;
const CheckLabel = styled.label<isSelectedType & ReducedButtonInfo>`
  width: ${(props) => getButtonSize(props.size).width};
  height: ${(props) => getButtonSize(props.size).height};
  font-size: ${(props) => getButtonSize(props.size).fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin-left: 0.5vw;
  border-radius: 3rem;
  background-color: ${(props) =>
    props.isSelected
      ? 'var(--primary-color)'
      : getColorValue(props.backgroundColor ?? 'gray')};
  color: ${(props) => getColorValue(props.color ?? 'white')};
  cursor: pointer;

  transform: scale(0.9);
`;

const CheckAllDayLabel = styled.label<isSelectedType & ReducedButtonInfo>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin-top: 5px;
  margin-left: 0.5vw;
  border: ${(props) =>
    props.isSelected ? 'none' : `1px solid ${getColorValue('primary')}`};
  border-radius: 3rem;
  background-color: ${(props) =>
    props.isSelected ? getColorValue('primary') : 'white'};
  color: ${(props) => (props.isSelected ? 'white' : getColorValue('primary'))};
  cursor: pointer;
  width: 60px;
  height: 30px;
  font-size: ${(props) => getButtonSize(props.size).fontSize};
  transform: scale(0.9);
`;

const CheckButton = ({ info }: InputButtonProps) => {
  const { onClick, onClickAll, value, items, ...restInfo } = info;

  const handleDayClick = (day: string) => {
    // 각 요일 클릭 처리 로직
    if (onClick) {
      onClick(day);
    }
  };

  return (
    <CheckButtonContainer>
      {info.type === 'checkbox' && (
        <>
          {info.items.map((item, index) => (
            <InputcheckButtonBox key={index} {...restInfo}>
              <CheckInput
                type="checkbox"
                id={`check-${index}`}
                name="check-group"
                onClick={() => handleDayClick(item)}
              />
              <CheckLabel
                htmlFor={`check-${index}`}
                {...restInfo}
                isSelected={value.includes(item)}
              >
                <span>{item}</span>
              </CheckLabel>
            </InputcheckButtonBox>
          ))}

          <InputcheckButtonBox key="everyday">
            <CheckInput
              type="checkbox"
              id="everyday"
              name="check-group"
              onClick={onClickAll}
            />
            <CheckAllDayLabel
              htmlFor="everyday"
              {...restInfo}
              isSelected={value.length === items.length}
            >
              <span>매일</span>
            </CheckAllDayLabel>
          </InputcheckButtonBox>
        </>
      )}
    </CheckButtonContainer>
  );
};

const RadioButton = ({ info }: InputButtonProps) => {
  const handleRadioChange = (value: string) => {
    if (info.onChange) {
      info.onChange(value);
    }
  };

  return (
    <InputButtonContainer>
      {info.type === 'circleRadio' &&
        info.items.map((item, index) => (
          <InputradioButtonBox key={index}>
            <RadioInput
              type="radio"
              id={`radio-${info.type}-${index}`}
              name="radio-group"
              checked={info.value === item}
              onChange={() => handleRadioChange(item)}
            />
            <CircleRadioLabel htmlFor={`radio-${info.type}-${index}`} {...info}>
              <span>{item}</span>
            </CircleRadioLabel>
          </InputradioButtonBox>
        ))}
      {info.type === 'shortOvalRadio' &&
        info.items.map((item, index) => (
          <InputradioButtonBox key={index}>
            <RadioInput
              type="radio"
              id={`radio-${info.type}-${index}`}
              name="radio-group"
              checked={info.value === item}
              onChange={() => handleRadioChange(item)}
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
        info.items.map((item, index) => (
          <InputradioButtonBox key={index}>
            <RadioInput
              type="radio"
              id={`radio-${info.type}-${index}`}
              name="radio-group"
              checked={info.value === item}
              onChange={() => handleRadioChange(item)}
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
