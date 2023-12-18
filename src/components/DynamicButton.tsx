import styled from 'styled-components';
import { ColorType, getColorValue } from '../types/colorType';

type ButtonType = 'solid' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge' | 'default';

type DynamicButtonInfo = {
  type: ButtonType;
  size?: ButtonSize;
  text: string;
  backgroundColor?: ColorType;
  color?: ColorType;
  fontWeight?: string;
  onClick?: (e?: any) => void;
};

interface DynamicButtonProps {
  info: DynamicButtonInfo;
}

const DynamicButton = ({ info }: DynamicButtonProps) => {
  return (
    <Container {...info}>
      {info.type === 'solid' && (
        <SolidButton onClick={info.onClick} {...info}>
          {info.text}
        </SolidButton>
      )}
      {info.type === 'text' && (
        <TextButton onClick={info.onClick} {...info}>
          {info.text}
        </TextButton>
      )}
      {info.type === 'outline' && (
        <OutlineButton onClick={info.onClick} {...info}>
          {info.text}
        </OutlineButton>
      )}
    </Container>
  );
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return {
        width: '4.94rem',
        height: '3.25rem',
        fontSize: 'var(--font-size-small)',
      };
    case 'medium':
      return {
        width: '15.81rem',
        height: '4.00rem',
        fontSize: 'var(--font-size-medium)',
      };
    case 'large':
      return {
        width: '18.75rem',
        height: '6.62rem',
        fontSize: 'var(--font-size-large)',
      };
    case 'xlarge':
      return {
        width: '31.25rem',
        height: '5.94rem',
        fontSize: 'var(--font-size-large)',
      };
    default:
      return { width: 'auto', height: 'auto' }; // 여기서 기본값도 rem으로 변경
  }
};

const Container = styled.div<DynamicButtonInfo>`
  width: ${(props) => getButtonSize(props.size ?? 'default').width};
  height: ${(props) => getButtonSize(props.size ?? 'default').height};

  cursor: pointer;
`;

const SolidButton = styled.button<DynamicButtonInfo>`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: ${(props) => getButtonSize(props.size ?? 'medium').fontSize};
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ?? 'primary')};
  color: ${(props) => getColorValue(props.color ?? 'white')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
`;

const TextButton = styled.button<DynamicButtonInfo>`
  color: ${(props) => getColorValue(props.color ?? 'primary')};
  border: none;
  background-color: rgba(255, 0, 0, 0);
  font-size: 14px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  cursor: pointer;
`;

const OutlineButton = styled.button<DynamicButtonInfo>`
  background-color: rgba(255, 0, 0, 0);
  outline: none;
  border: solid 1px var(--gray-color);
  border-radius: 5px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  color: var(--gray-dark);
  cursor: pointer;
  font-size: 12px;
`;

export type { ButtonType, ButtonSize, DynamicButtonInfo };
export { DynamicButton };
