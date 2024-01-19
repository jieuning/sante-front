import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import styled from 'styled-components';
import Input from '../../components/Input';
import { RegisterSelectBox, Option } from '../../components/SelectBox';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import CaloryRecommend from '../../utils/CaloryRecommend';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 30px;
`;

const InputContainer = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 50px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState('');
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);
  const [pwCheck, setPwCheck] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const URL = `${import.meta.env.VITE_API_URL}`;

  const navigate = useNavigate();

  const ageOptions: Option[] = [
    { value: '1', label: '12~14세' },
    { value: '2', label: '15~18세' },
    { value: '3', label: '19~29세' },
    { value: '4', label: '30~49세' },
    { value: '5', label: '50~64세' },
    { value: '6', label: '65세 이상' },
  ];

  useEffect(() => {
    const emailRegex = /^\S+@\S+.\S+$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  useEffect(() => {
    const pwRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (pwRegex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [pw]);

  const handlePwChange = (value: string) => {
    setPw(value);
  };

  useEffect(() => {
    if (pw === pwConfirm) {
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }
  }, [pw, pwConfirm]);

  const handlePwConfirmChange = (value: string) => {
    setPwConfirm(value);
  };

  const handleAgeSelectChange = (selectedValue: string) => {
    //setAge 할 필요 없이 selectedValue에 선택한 나이가 이미 들어있음
    setSelectedValue(selectedValue);
  };

  const radioGenderButtonInfo: InputButtonInfo & {
    onChange: (selectedGender: string) => void;
  } = {
    type: 'longOvalRadio',
    size: 'long-oval',
    value: selectedGender,
    items: ['남성', '여성'],
    backgroundColor: 'white',
    border: 'primary',
    color: 'inputText',
    fontWeight: 'regular',
    onChange: (selectedGender: SetStateAction<string>) => {
      setSelectedGender(selectedGender);
      if (selectedGender === '남성') {
        setSelectedGender('남성');
      } else {
        setSelectedGender('여성');
      }
      console.log(selectedGender);
    },
  };

  const todayCalory = CaloryRecommend(selectedGender, selectedValue);

  const buttonInfo: DynamicButtonInfo = {
    width: '370px',
    height: '50px',
    type: 'solid',
    size: 'medium',
    text: '가입하기',
    fontWeight: 'bold',
    onClick: () => {
      if (!emailValid) {
        alert('이메일을 확인해주세요.');
        return;
      }

      if (!pwValid) {
        alert('비밀번호를 확인해주세요.');
        return;
      }

      if (!pwCheck) {
        alert('동일한 비밀번호인지 확인해주세요.');
        return;
      }

      if (!selectedGender) {
        alert('성별을 선택해주세요.');
        return;
      }

      if (!selectedValue) {
        alert('나이를 선택해주세요.');
        return;
      }
      setIsFormValid(true);

      if (!isFormValid) {
        return;
      }

      const requestData = {
        email,
        password: pw,
        gender: selectedGender,
        age: selectedValue,
        todayCalory: todayCalory,
      };
      axios
        .post(`${URL}/register`, requestData)
        .then((response) => {
          console.log('성공', response.data);
          alert('가입이 완료되었습니다!');
          navigate('/login');
        })
        .catch((error) => {
          console.error('실패', error);
        });
    },
  };

  return (
    <StyledRegister>
      <Header />
      <ContentsContainer>
        <StyledTitle>회원가입</StyledTitle>
        <InputContainer>
          <Input
            type="text"
            name="email"
            placeholder="이메일을 입력해주세요."
            width="370px"
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
            width="370px"
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
            width="370px"
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
          <RegisterSelectBox
            width="370px"
            height="40px"
            placeholder="연령을 선택해주세요."
            ageOptions={ageOptions}
            onChange={handleAgeSelectChange}
          />
        </InputContainer>
        <ButtonContainer>
          <DynamicButton info={buttonInfo} />
        </ButtonContainer>
      </ContentsContainer>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  height: 100vh;
  background-color: var(--white-background-color);
`;

const ContentsContainer = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Register;
