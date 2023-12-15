import styled from 'styled-components';

export type ButtonType = 'solid' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge' | 'default';

export const getButtonSize = (size: ButtonSize) => {
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

export interface ButtonProps {
  type: ButtonType;
  size?: ButtonSize;
  text: string;
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  onClick?: () => void;
}

const DynamicButton = (props: ButtonProps) => {
  const { text } = props;

  return (
    <Container {...props}>
      {props.type === 'solid' && (
        <SolidButton onClick={props.onClick} {...props}>
          {text}
        </SolidButton>
      )}
      {props.type === 'text' && (
        <TextButton onClick={props.onClick} {...props}>
          {text}
        </TextButton>
      )}
      {props.type === 'outline' && (
        <OutlineButton onClick={props.onClick} {...props}>
          {text}
        </OutlineButton>
      )}
    </Container>
  );
};

const Container = styled.div<ButtonProps>`
  width: ${(props) => getButtonSize(props.size ?? 'default').width};
  height: ${(props) => getButtonSize(props.size ?? 'default').height};

  cursor: pointer;
`;

const SolidButton = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: ${(props) => getButtonSize(props.size ?? 'medium').fontSize};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'var(--primary-color)'};
  color: ${(props) => (props.color ? props.color : 'white')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
`;

const TextButton = styled.button<ButtonProps>`
  color: ${(props) => (props.color ? props.color : '#81D8D0')};
  border: none;
  background-color: rgba(255, 0, 0, 0);
  font-size: 14px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  cursor: pointer;
`;

const OutlineButton = styled.button<ButtonProps>`
  background-color: rgba(255, 0, 0, 0);
  outline: none;
  border: solid 1px var(--gray-color);
  border-radius: 5px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
  color: var(--gray-dark);
  cursor: pointer;
  font-size: 12px;
`;

export default DynamicButton;
