import styled from 'styled-components';
import { ColorType, getColorValue } from '../types/colorType';

interface StyledTagProps {
  text: string;
  color: ColorType;
  backgroundColor: ColorType;
}

const Tag = ({ text, color, backgroundColor }: StyledTagProps) => {
  return (
    <StyledTag text={text} color={color} backgroundColor={backgroundColor}>
      {text}
    </StyledTag>
  );
};

const StyledTag = styled.p<StyledTagProps>`
  border-radius: 17px;
  display: inline-block;
  border: none;
  color: ${(props) => getColorValue(props.color)};
  background-color: ${(props) => getColorValue(props.backgroundColor)};
  padding: 5px;
  margin: 2px;
`;

export default Tag;
