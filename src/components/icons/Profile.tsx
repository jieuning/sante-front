import { IoPersonCircleSharp } from 'react-icons/io5'; // 프로필아이콘
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

  const handleProfileClick = () => {
    setIsUserInfoVisible(!isUserInfoVisible);
  };

  const handleCloseUserInfo = () => {
    setIsUserInfoVisible(false);
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
      {isUserInfoVisible && <UserInfoBox onClose={handleCloseUserInfo} />}
    </>
  );
};

const UserInfoBox = ({ onClose }: { onClose: () => void }) => {
  return (
    <Container>
      <UserInfoHeader>
        <Text>회원정보</Text>
        <Close onClick={onClose}>x</Close>
      </UserInfoHeader>
      <UserInfo />
      <Withdrawal />
    </Container>
  );
};

const Close = styled.div`
  cursor: pointer;
  font-size: 16px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  position: absolute;
  right: -130px;
  top: 118px;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 150px;
  background-color: #fff;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  z-index: 11;
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
  justify-content: space-between;
  padding: 0 10px;
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

const Withdrawal = () => {
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    // confirm 창을 사용하여 사용자의 응답을 얻음
    const isConfirmed = window.confirm('정말 탈퇴하시겠습니까?');

    // 사용자가 "예"를 선택한 경우에만 회원 탈퇴 처리
    if (isConfirmed) {
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
          localStorage.removeItem('age');
          localStorage.removeItem('todayCalory');
          navigate('/');
        } else {
          console.error('회원탈퇴 실패');
        }
      } catch (error) {
        console.log('회원탈퇴 중 오류 발생', error);
      }
    } else {
      console.log('회원탈퇴 취소');
    }
  };

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
