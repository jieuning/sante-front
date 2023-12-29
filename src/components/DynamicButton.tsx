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
  width?: string;
  height?: string;
};

interface DynamicButtonProps {
  info: DynamicButtonInfo;
}

const DynamicButton = ({ info }: DynamicButtonProps) => {
  console.log(info.onClick);
  return (
    <Container {...info}>
      {info.type === 'solid' && (
        <SolidButton
          {...info}
          onClick={(event) => {
            event.stopPropagation();
            info.onClick?.();
          }}
        >
          {info.text}
        </SolidButton>
      )}
      {info.type === 'text' && (
        <TextButton
          {...info}
          onClick={(event) => {
            event.stopPropagation();
            info.onClick?.();
          }}
        >
          {info.text}
        </TextButton>
      )}
      {info.type === 'outline' && (
        <OutlineButton
          {...info}
          onClick={(event) => {
            event.stopPropagation();
            info.onClick?.();
          }}
        >
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
        width: 'auto',
        height: '3.25rem',
        fontSize: '14px',
      };
    case 'medium':
      return {
        width: '400px',
        height: '50px',
        fontSize: '20px',
      };
    case 'large':
      return {
        width: '18.75rem',
        height: '6.62rem',
        fontSize: '16px',
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
  width: ${(props) =>
    props.width ?? getButtonSize(props.size ?? 'default').width};
  height: ${(props) =>
    props.height ?? getButtonSize(props.size ?? 'default').height};

  cursor: pointer;
`;

const SolidButton = styled.button<DynamicButtonInfo>`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  padding: 2px 10px 2px 10px;
  border-radius: 10px;
  font-size: ${(props) => getButtonSize(props.size ?? 'medium').fontSize};
  background-color: ${(props) =>
    getColorValue(props.backgroundColor ?? 'primary')};
  color: ${(props) => getColorValue(props.color ?? 'white')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};

  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(87%);
  }
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
