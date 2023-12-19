import Header from '../../components/Header';
import styled from 'styled-components';

const Register = () => {
  return (
    <StyledRegister>
      <Header />
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  background-color: var(--white-background-color);
`;

export default Register;

// 로그인 전: 로그인버튼
// 로그인 후: 로그아웃버튼 + 프로필
// {조건문 && 로그인}
// {조건문 && 프로필} 이용
