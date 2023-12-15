import styled from 'styled-components';

type ButtonType = 'solid' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return { width: '79px', height: '52px' };
    case 'medium':
      return { width: '253px', height: '64px' };
    case 'large':
      return { width: '300px', height: '106px' };
    case 'xlarge':
      return { width: '693px', height: '95px' };
    default:
      return { width: '200px', height: '50px' };
  }
};

interface ButtonProps {
  type: ButtonType;
  size: ButtonSize;
  text: string;
  backgroundColor?: string;
  color?: string;
  onClick?: () => void;
}

const DynamicButton = (props: ButtonProps) => {
  return (
    <>
      {props.type === 'solid' && (
        <SolidButton onClick={props.onClick} {...props}>
          {props.text}
        </SolidButton>
      )}
      {props.type === 'text' && (
        <TextButton onClick={props.onClick} {...props}>
          {props.text}
        </TextButton>
      )}
      {props.type === 'outline' && (
        <SolidButton {...props}>{props.text}</SolidButton>
      )}
    </>
  );
};

const SolidButton = styled.button<ButtonProps>`
  width: ${(props) => getButtonSize(props.size).width};
  height: ${(props) => getButtonSize(props.size).height};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#81D8D0'};
  color: ${(props) => (props.color ? props.color : 'white')};
`;

const TextButton = styled.button<ButtonProps>`
  color: ${(props) => (props.color ? props.color : '#81D8D0')};
  font-size:;
`;

export default DynamicButton;
