import styled from 'styled-components';

interface ColorChipProps {
  color?: string;
  borderColor?: string;
  ratio?: number;
  display?: string;
}

const ChipDiv = styled.div<ColorChipProps>`
  height: ${({ ratio }) => (ratio ? `${ratio * 6}px` : '6px')};
  width: ${({ ratio }) => (ratio ? `${ratio * 6}px` : '6px')};
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: ${({ display }) => display || 'flex'};
  margin-left: 1px;
  border: ${({ borderColor, color }) =>
    color !== 'transparent' ? 'none' : `1px solid ${borderColor}`};
`;

const ColorChip: React.FC<ColorChipProps> = ({
  color = 'transparent',
  borderColor = '#8699FF',
  ratio = 1,
  display = 'flex',
}) => {
  return (
    <>
      {/* <Chip color={color} borderColor={borderColor} /> */}
      <ChipDiv
        color={color}
        borderColor={borderColor}
        ratio={ratio}
        display={display}
      />
    </>
  );
};

export default ColorChip;
