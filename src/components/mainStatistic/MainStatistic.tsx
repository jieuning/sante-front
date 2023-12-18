import styled from 'styled-components';
import GageBar from './GageBar';
import { useState, useEffect } from 'react';
import DynamicButton from '../DynamicButton';

const MainStatistic = () => {
  const caloryMoods = {
    notEnough: { emoji: '🥺', message: '끼니 거르고 계신거 아니죠?ㅜㅜ' },
    enough: { emoji: '😊', message: '잘 먹고 있어요!' },
    tooMuch: { emoji: '😵', message: '기준치를 초과했어요' },
  };
  const [caloryMood, setCaloryMood] = useState(caloryMoods.notEnough);
  const [gage, setGage] = useState(0);

  // const API_ENDPOINT = 'url주소';
  useEffect(() => {
    //NOTE 백엔드 API에서 데이터 가져오기
    // axios.get(API_ENDPOINT)
    //   .then((res) => {
    //     const responseData = res.data;
    //     const receivedGageValue = responseData.gage; // 실제 데이터 구조로 교체
    //     setGage(calculatedGage);
    //   })
    //   .catch((error) => {
    //     console.error('API에서 데이터를 가져오는 중 오류 발생:', error);
    //   });
    setGage(calculatedGage);
  }, []);

  //NOTE: 기준 80%

  const handleCaloryGage = (currentGage: number) => {
    let newCaloryMood = { ...caloryMood };
    if (currentGage === 80) {
      newCaloryMood = caloryMoods.enough;
    } else if (currentGage > 80) {
      newCaloryMood = caloryMoods.tooMuch;
    } else {
      newCaloryMood = caloryMoods.notEnough;
    }
    setCaloryMood(newCaloryMood);
  };

  return (
    <GageContainerDiv>
      <InformationAreaDiv>
        <FlexContainerDiv>
          <TextContainerDiv>주간 운동 달성률</TextContainerDiv>
          <br />
          <GageBar gage={50} type="exercise" />
        </FlexContainerDiv>
        <FlexContainerDiv>
          <TextContainerDiv>하루 섭취 칼로리</TextContainerDiv>
          <br />
          <GageBar gage={101} type="food" handleGage={handleCaloryGage} />
          <br />
          <div>
            <EmojiContainerSpan>{caloryMood.emoji}</EmojiContainerSpan>
            <StatusContainerSpan>{caloryMood.message}</StatusContainerSpan>
          </div>
        </FlexContainerDiv>
      </InformationAreaDiv>
      <ButtonAreaDiv>
        <DynamicButton type="outline" size="medium" text="통계 상세보기" />
      </ButtonAreaDiv>
    </GageContainerDiv>
  );
};
//NOTE: 미완성
const GageContainerDiv = styled.div`
  width: 27.4rem;
  height: 36.7rem;
  border-radius: 2rem;
  background-color: #FFFFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
//NOTE: globalstyles에 white 컬러 추가

const InformationAreaDiv = styled.div`
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonAreaDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2.4rem;
`;

const TextContainerDiv = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;
const FlexContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StatusContainerSpan = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const EmojiContainerSpan = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;
export default MainStatistic;
