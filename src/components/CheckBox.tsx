import styled from 'styled-components';
import checkImg from '../assets/check.png';

const CheckBox = () => {
  return (
    <CheckBoxContainer>
      <input type="checkbox" />
    </CheckBoxContainer>
  );
};

export default CheckBox;

const CheckBoxContainer = styled.div`
  input[type='checkbox'] {
    appearance: none;
    position: absolute;
    width: 15px;
    height: 15px;
    border: 1px solid #0f0f0f;
  }

  input[type='checkbox']:checked::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -3px;
    width: 25px;
    height: 25px;
    background-image: url(${checkImg});
    background-size: contain;
  }
`;
