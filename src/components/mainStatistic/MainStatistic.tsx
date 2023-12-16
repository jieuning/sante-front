import styled from 'styled-components';
import GageBar from './GageBar';

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

// const calculateCaloryStatus = (calory) => {};

const MainStatistic = () => {
  // const caloryStatus = [
  //   '🥺 끼니 거르고 계신거 아니죠?ㅜㅜ',
  //   '😊 잘 먹고 있어요!',
  //   '😵 기준치를 초과했어요',
  // ];

  //NOTE: 기준 80%

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
          <GageBar gage={50} type="food" />
          <br />
          <div>
            <EmojiContainerSpan>🥺</EmojiContainerSpan>
            <StatusContainerSpan>
              끼니 거르고 계신거 아니죠?ㅜㅜ
            </StatusContainerSpan>
          </div>
        </FlexContainerDiv>
      </InformationAreaDiv>
      <ButtonAreaDiv>
        <button className="temporaryButton">통계 상세보기</button>
      </ButtonAreaDiv>
    </GageContainerDiv>
  );
};

export default MainStatistic;
