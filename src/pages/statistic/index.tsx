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
      <div>
        <CardContainer>
          <Card title="운동 달성률" subTitle="이번달 평균 60%" data={arr} />
          <Card
            title="운동 달성 횟수"
            subTitle="이번달 총 운동 횟수 30회"
            data={new Array(5).fill(60)}
          />
        </CardContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
    display: flex:
    justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  max-width: 800px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Statistic;
