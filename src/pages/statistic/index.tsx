import { useEffect, useState } from 'react';
import useUserModel from '../../hooks/useUserModel';
import {
  getMonthlyExerciseRateStatistic,
  getMonthlyCaloryTotalStatistic,
} from '../../utils/Date';
import '../../index.css';
import Card from './Card';
import styled from 'styled-components';
import { format } from 'date-fns';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Header from '../../components/Header';
//TODO - 여기서 백분율 계산해서 Card에 보내야함

type ObjectType = {
  list: number[];
  result: number;
};
const Statistic = () => {
  const user = useUserModel(new Date('2023-12-01'), new Date('2023-12-23'));
  const [exerciseRateList, setExerciseRateList] = useState<ObjectType>();
  const [exerciseCntList, setExerciseCntList] = useState<ObjectType>();
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [caloryList, setCaloryList] = useState<ObjectType>();
  const arr = [100, 60, 30, 10, 50];

  //여기서 비율 + 총 평균치 구해서 Card에 보내야함
  useEffect(() => {
    const rate = getMonthlyExerciseRateStatistic(
      user?.userExerciseList,
      new Date('2023-12-08'),
      'rate'
    );

    if (rate) {
      setExerciseRateList(rate);
    }

    const cnt = getMonthlyExerciseRateStatistic(
      user?.userExerciseList,
      new Date('2023-12-08'),
      'cnt'
    );
    console.log(cnt?.list);
    if (cnt) {
      setExerciseCntList(cnt);
    }

    const fst = getMonthlyCaloryTotalStatistic(
      user?.userFoodList,
      new Date('2023-12-08')
    );
    console.log(cnt);
    setCaloryList(fst);
  }, [user]);

  return (
    <>
      <Header />
      <Container>
        <Title>
          <IoChevronBack cursor="pointer" />
          {format(targetDate, 'yyyy.MM')}
          <IoChevronForward cursor="pointer" />
        </Title>
        <ContentsContainer>
          <Title>🏃 운동 통계</Title>
          <CardContainer>
            <Card
              title="운동 달성률"
              subTitle={`이번달 평균 ${exerciseRateList?.result ?? 0}%`}
              data={exerciseRateList?.list ?? [0, 0, 0, 0, 0]}
            />
            <Card
              title="운동 달성 횟수"
              subTitle={`이번달 총 운동 횟수 ${exerciseCntList?.result ?? 0}회`}
              data={exerciseCntList?.list ?? [0, 0, 0, 0, 0]}
            />
          </CardContainer>
          <Title>🍚 식단 통계</Title>
          <CardContainer>
            <Card
              title="식단 평균 칼로리"
              subTitle={`이번달 평균 칼로리 ${caloryList?.result}kcal`}
              data={caloryList?.list ?? [0, 0, 0, 0, 0]}
            />
          </CardContainer>
        </ContentsContainer>
      </Container>
    </>
  );
};

const getAvg = (arr: number[]): number => {
  return Math.ceil(arr.reduce((acc, curr) => acc + curr, 0) / arr.length);
};

const Container = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
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
