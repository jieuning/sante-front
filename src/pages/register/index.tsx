import Header from '../../components/Header';
import styled from 'styled-components';
import Input from '../../components/Input';
import SelectBox, { Option } from '../../components/SelectBox';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 50px 0;
`;

const InputContainer = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
`;

const buttonInfo: DynamicButtonInfo = {
  type: 'solid',
  size: 'medium',
  text: '가입하기',
  fontWeight: 'bold',
  onClick: () => console.log('Button clicked!'),
};

const Register = () => {
  const options: Option[] = [
    { value: 'option1', label: '12~14세' },
    { value: 'option2', label: '15~18세' },
    { value: 'option3', label: '19~29세' },
    { value: 'option4', label: '30~49세' },
    { value: 'option5', label: '50~64세' },
    { value: 'option6', label: '65세 이상' },
  ];

  const handleSelectChange = (selectedValue: string) => {
    console.log('Selected value:', selectedValue);
  };
  return (
    <StyledRegister>
      <Header />
      <StyledTitle>회원가입</StyledTitle>
      <InputContainer>
        <Input
          type="text"
          placeholder="이메일을 입력해주세요."
          width="400px"
          height="40px"
        />
        <p>유효성 검사 멘트</p>
        <Input
          type="text"
          placeholder="비밀번호를 입력해주세요. 8자리 이상 영문과 숫자를 포함해야 합니다."
          width="400px"
          height="40px"
        />
        <Input
          type="text"
          placeholder="비밀번호 확인을 위해 다시 입력해주세요."
          width="400px"
          height="40px"
        />
        <SelectBox
          width="400px"
          height="40px"
          placeholder="연령을 선택해주세요."
          options={options}
          onChange={handleSelectChange}
        />
      </InputContainer>
      <ButtonContainer>
        <DynamicButton info={buttonInfo} />
      </ButtonContainer>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  background-color: var(--white-background-color);
`;

export default Register;
