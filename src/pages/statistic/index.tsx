import useUserModel from '../../hooks/useUserModel';
import '../../index.css';
import Card from './Card';
import styled from 'styled-components';

//TODO - 여기서 백분율 계산해서 Card에 보내야함
const Statistic = () => {
  const user = useUserModel();
  console.log(user);
  const arr = [100, 60, 30, 10, 50];
  return (
    <Container>
      <ContentsContainer>
        <Title>🏃 운동 통계</Title>
        <CardContainer>
          <Card title="운동 달성률" subTitle="이번달 평균 60%" data={arr} />
          <Card
            title="운동 달성 횟수"
            subTitle="이번달 총 운동 횟수 30회"
            data={new Array(5).fill(60)}
          />
        </CardContainer>
        <Title>🍚 식단 통계</Title>
        <CardContainer>
          <Card
            title="식단 평균 칼로리"
            subTitle="이번달 평균 칼로리 1500kcal"
            data={arr}
          />
        </CardContainer>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center; /* 가로축 중앙 정렬 */

  height: 100vh; /* 전체 화면 높이 */
`;

const ContentsContainer = styled.div`
    width: 780px;
    display: flex:
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Line = styled.div`
  margin: 2px 0 2px 0;
  border: solid 1px var(--gray-light);
  transform: scaleY(0.1);
`;
const Title = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--black-color);
  margin-bottom: 18px;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  max-width: 800px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Statistic;
