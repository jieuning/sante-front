import styled from 'styled-components';
import checkIcon from '../assets/check.png';

interface CheckBoxProps {
  checked: boolean;
  onChange: (e?: any) => void;
}

const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
  return (
    <CheckBoxContainer>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </CheckBoxContainer>
  );
};

export default CheckBox;

const CheckBoxContainer = styled.div`
  margin-bottom: 4px;
  margin-right: 10px;
  position: relative;

  input[type='checkbox'] {
    appearance: none;
    position: absolute;
    width: 15px;
    height: 15px;
    border: 1px solid var(--black-color);
  }

  input[type='checkbox']:checked::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -3px;
    width: 25px;
    height: 25px;
    background-image: url(${checkIcon});
    background-size: contain;
  }
`;
