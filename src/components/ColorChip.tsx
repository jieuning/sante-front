import styled from "styled-components";

interface ColorChipProps {
  color?: string;
  borderColor?: string;
  ratio?: number;
}

const ChipDiv = styled.div<ColorChipProps>`
  height: ${({ ratio }) => (ratio ? `${ratio * 11}px` : "11px")};
  width: ${({ ratio }) => (ratio ? `${ratio * 11}px` : "11px")};
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
  border: ${({ borderColor, color }) =>
    color ? "0" : `1px solid ${borderColor}`};
`;

const ColorChip: React.FC<ColorChipProps> = ({
  color = "transparent",
  borderColor = "#8699FF",
  ratio = 1,
}) => {
  return (
    <>
      {/* <Chip color={color} borderColor={borderColor} /> */}
      <ChipDiv color={color} borderColor={borderColor} ratio={ratio} />
    </>
  );
};

export default ColorChip;
