import styled from 'styled-components';
import Header from '../../components/Header';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isLogin } from '../../utils/WebStorageControl';
import logo from '../../assets/app_logo.png';
import intro from '../../assets/intro.png';

interface BlankProps {
  height?: string;
}

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      navigate('/main');
    }
  }, []);

  const registerButtonInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'large',
    text: '지금 바로 시작하기',
    backgroundColor: 'primary',
    color: 'white',
    fontWeight: 'bold',
    onClick: () => {
      navigate('/register');
    },
  };

  const loginButtonInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'large',
    text: '로그인하기',
    backgroundColor: 'primary',
    color: 'white',
    fontWeight: 'bold',
    onClick: () => {
      navigate('/login');
    },
  };

  return (
    <Container>
      <Header />
      <ContentsContainer>
        <Title>
          운동과 식단관리, 지금부턴{' '}
          <StyledLogoImage src={logo} alt="로고 이미지" />
          에서 시작하세요!{' '}
        </Title>
        <Blank height="18rem" />
        <DynamicButton info={registerButtonInfo} />
        <Blank />
        <p>이미 사용중이라면?</p>
        <Blank />
        <DynamicButton info={loginButtonInfo} />
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${intro});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ContentsContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    color: white;
    font-size: 12px;
  }
`;

const Title = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  word-break: keep-all;
  line-height: 1.4em;
`;

const Blank = styled.div<BlankProps>`
  height: ${(props) => props.height || '2rem'};
`;

const StyledLogoImage = styled.img`
  width: 90px;
  height: auto;
`;
export default Intro;
