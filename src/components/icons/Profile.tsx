import { IoPersonCircleSharp } from 'react-icons/io5'; // 프로필아이콘
import styled from 'styled-components';
import { useState } from 'react';

const Profile = () => {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

  const handleProfileClick = () => {
    setIsUserInfoVisible(!isUserInfoVisible);
  };

  return (
    <>
      <IoPersonCircleSharp
        type="button"
        cursor="pointer"
        color="#81D8D0"
        size="33"
        onClick={handleProfileClick}
      />
      {isUserInfoVisible && <UserInfoBox />}
    </>
  );
};

const UserInfoBox = () => {
  return (
    <Container>
      <UserInfoHeader>회원정보</UserInfoHeader>
      <UserInfo />
      <Withdrawal />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  //위치 + 사이즈 조정!!
  left: 90%;
  top: 18%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 150px;
  background-color: #fff;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
`;

const UserInfoHeader = styled.div`
  width: 248px;
  height: 40px;
  background-color: var(--primary-color);
  border-radius: 8px 8px 0 0;
  color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = () => {
  const email = localStorage.getItem('email');
  const gender = localStorage.getItem('gender');
  return (
    <UserInfoContainer>
      <UserInfoRow>
        <UserInfoText>이메일</UserInfoText>
        <UserInfoData>{email}</UserInfoData>
      </UserInfoRow>
      <UserInfoRow>
        <UserInfoText>성별</UserInfoText>
        <UserInfoData>{gender}</UserInfoData>
      </UserInfoRow>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
`;

const UserInfoText = styled.h3`
  font-size: 13px;
  margin: 15px 0px 0px 15px;
  width: 60px;
`;

const UserInfoData = styled.div`
  font-size: 13px;
  margin: 15px 0px 0px 15px;
`;

const handleWithdrawal = async () => {
  try {
    const email = localStorage.getItem('email');
    const apiUrl = `http://kdt-sw-7-team04.elicecoding.com/api/user/${email}`;
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('회원탈퇴 성공');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('gender');
      // localStorage.removeItem('age');
      // localStorage.removeItem('recommendCalory');
    } else {
      console.error('회원탈퇴 실패');
    }
  } catch (error) {
    console.log('회원탈퇴 중 오류 발생', error);
  }
};

const Withdrawal = () => {
  return (
    <StyledWithdrawal onClick={handleWithdrawal}>회원탈퇴</StyledWithdrawal>
  );
};

const StyledWithdrawal = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  position: absolute;
  bottom: 10px;
  right: 8px;
  border: none;
  font-size: 11px;
  color: var(--gray-color);
  cursor: pointer;
`;

export default Profile;
