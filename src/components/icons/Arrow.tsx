import { IoChevronBack } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';

type ArrowType = 'left' | 'right';

interface ArrowProps {
  type: ArrowType;
  size: 'string' | 'number';
  cursor: 'string';
}

const Arrow = ({ type, size, cursor }: ArrowProps) => {
  return (
    <>
      {type === 'left' && <IoChevronBack size={size} style={{ cursor }} />}
      {type === 'right' && <IoChevronForward size={size} style={{ cursor }} />}
    </>
  );
};

export default Arrow;
