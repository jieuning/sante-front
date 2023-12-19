import Header from '../../components/Header';
import styled from 'styled-components';
import Input from '../../components/Input';
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
  text-align: center;
`;

const buttonInfo: DynamicButtonInfo = {
  type: 'solid',
  size: 'medium',
  text: '가입하기',
  fontWeight: 'bold',
  onClick: () => console.log('Button clicked!'),
};

const Register = () => {
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
        <Input
          type="text"
          placeholder="연령을 선택해주세요."
          width="400px"
          height="40px"
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
