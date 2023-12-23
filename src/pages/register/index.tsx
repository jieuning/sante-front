import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import Input from '../../components/Input';
import SelectBox, { Option } from '../../components/SelectBox';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 50px 0 30px 0;
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

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const buttonInfo: DynamicButtonInfo = {
  type: 'solid',
  size: 'medium',
  text: '가입하기',
  fontWeight: 'bold',
  onClick: () => alert('가입이 완료되었습니다!'),
};

const Register = () => {
  const [email, setEmail] = useState<string | number>('');
  const [pw, setPw] = useState<string | number>('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
//   const [age, setAge] = useState('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);
  const [pwCheck, setPwCheck] = useState<boolean>(false);

  const ageOptions: Option[] = [
    { value: '12~14세', label: '12~14세' },
    { value: '15~18세', label: '15~18세' },
    { value: 'option3', label: '19~29세' },
    { value: 'option4', label: '30~49세' },
    { value: 'option5', label: '50~64세' },
    { value: 'option6', label: '65세 이상' },
  ];

  useEffect(() => {
    console.log('Email:', email);
    const emailRegex = /^\S+@\S+.\S+$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const handleEmailChange = (value: string | number) => {
    setEmail(value);
  };

  useEffect(() => {
    console.log('Password:', pw);
    const pwRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (pwRegex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [pw]);

  const handlePwChange = (value: string | number) => {
    setPw(value);
  };

  useEffect(() => {
    console.log('pw confirm:', pwConfirm);
    if (pw === pwConfirm) {
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }
  }, [pw, pwConfirm]);

  const handlePwConfirmChange = (value: string | number) => {
    setPwConfirm(value);
  };

  const handleAgeSelectChange = (selectedValue: string) => {
    //setAge 할 필요 없이 selectedValue에 선택한 나이가 이미 들어있음
    console.log('Selected value:', selectedValue);
  };

  const radioGenderButtonInfo: InputButtonInfo = {
    type: 'longOvalRadio',
    size: 'long-oval',
    value: selectedValue,
    items: ['남성', '여성'],
    backgroundColor: 'white',
    border: 'primary',
    color: 'inputText',
    fontWeight: 'regular',
    onChange: (selectedGender) => {
      console.log('selectedValue:', selectedGender);
      setSelectedValue(selectedGender);
      if (selectedGender === '남성') {
        //남성에 대한 처리
        console.log('남성');
      } else {
        //여성에 대한 처리
        console.log('여성');
      }
    },
  };

  return (
    <StyledRegister>
      <Header />
      <StyledTitle>회원가입</StyledTitle>
      <InputContainer>
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          width="400px"
          height="40px"
          value={email}
          onChange={handleEmailChange}
          errorMessage={
            !emailValid && email.length > 0
              ? '올바른 이메일 형식으로 입력해주세요.'
              : undefined
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          width="400px"
          height="40px"
          value={pw}
          onChange={handlePwChange}
          errorMessage={
            !pwValid && pw.length > 0
              ? '8자리 이상 영문, 숫자, 특수문자를 포함해야 합니다.'
              : undefined
          }
        />
        <Input
          type="password"
          name="password-confirm"
          placeholder="비밀번호 확인을 위해 다시 입력해주세요."
          width="400px"
          height="40px"
          value={pwConfirm}
          onChange={handlePwConfirmChange}
          errorMessage={
            !pwCheck && pwConfirm.length > 0
              ? '동일한 비밀번호인지 확인해주세요.'
              : undefined
          }
        />
        <RadioButtonContainer>
          <RadioButton info={radioGenderButtonInfo} />
        </RadioButtonContainer>
        <SelectBox
          width="400px"
          height="40px"
          placeholder="연령을 선택해주세요."
          ageOptions={ageOptions}
          onChange={handleAgeSelectChange}
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
