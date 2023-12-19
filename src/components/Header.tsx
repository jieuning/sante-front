import styled from 'styled-components';
// import logoImage from '../assets/logo.png';
import { DynamicButton, DynamicButtonInfo } from '../components/DynamicButton';

const LogoImage = () => {
  return <StyledLogoImage src="./logo.png" alt="logoImage" />;
};

const buttonInfo: DynamicButtonInfo = {
  type: 'solid',
  size: 'small',
  text: '로그인',
  fontWeight: 'bold',
  onClick: () => console.log('Button clicked!'),
};

const Header = () => {
  return (
    <StyledHeader>
      <LogoImage></LogoImage>
      <DynamicButton info={buttonInfo} />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const StyledLogoImage = styled.img`
  width: 80px;
  height: 40px;
  padding: 10px;
`;

export default Header;
