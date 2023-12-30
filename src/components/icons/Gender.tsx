import { SlSymbleFemale } from 'react-icons/sl';
import { SlSymbolMale } from 'react-icons/sl';

type GenderType = 'male' | 'female';

interface GenderProps {
  type: GenderType;
  size: 'string' | 'number';
  cursor: 'string';
}

const Gender = ({ type, size, cursor }: GenderProps) => {
  return (
    <>
      {type === 'male' && <SlSymbolMale size={size} style={{ cursor }} />}
      {type === 'female' && <SlSymbleFemale size={size} style={{ cursor }} />}
    </>
  );
};

export default Gender;
