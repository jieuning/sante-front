import styled from 'styled-components';
import Header from '../../components/Header';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import { useNavigate } from 'react-router-dom';

interface BlankProps {
  height?: string;
}

const Intro = () => {
  const navigate = useNavigate();
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
      <ImgContainer>
        <ContentsContainer>
          <Title>
            운동과 식단관리, 지금부턴{' '}
            <StyledLogoImage src="./logo.png" alt="logoImage" />
            에서 시작하세요!{' '}
          </Title>
          <Blank height="25rem" />
          <DynamicButton info={registerButtonInfo} />
          <Blank />
          <p>이미 사용중이라면?</p>
          <Blank />
          <DynamicButton info={loginButtonInfo} />
        </ContentsContainer>
      </ImgContainer>
    </Container>
  );
};

const Container = styled.div``;

const ImgContainer = styled.div`
  width: 100%; /* 너비 지정 */
  height: 100vh; /* 높이 지정 */
  background-image: url('./intro.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
`;

const ContentsContainer = styled.div`
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
  margin-top: 10rem;
`;

const Blank = styled.div<BlankProps>`
  height: ${(props) => props.height || '2rem'};
`;

const StyledLogoImage = styled.img`
  width: 90px;
  height: auto;
`;
export default Intro;
