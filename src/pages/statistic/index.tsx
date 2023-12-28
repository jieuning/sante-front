import { useEffect, useState } from 'react';
import {
  getMonthlyExerciseRateStatistic,
  getMonthlyCaloryTotalStatistic,
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
  calculateWeeklyAndMonthlyDoneRate,
  calculateWeeklyDoneCountAndRate,
} from '../../utils/Date';
import '../../index.css';
import Card from './Card';
import styled from 'styled-components';
import { endOfMonth, startOfMonth } from 'date-fns';
import Header from '../../components/Header';
import MonthlyDateSelector from '../../components/MonthlyDateSelector';
import useMonthlyDateHandler from '../../hooks/useMonthlyDateHandler';
import useUserModelAll from '../../hooks/useUserModelAll';
//TODO - 여기서 백분율 계산해서 Card에 보내야함

type ObjectType = {
  list: number[];
  result: number;
};
const Statistic = () => {
  const user = useUserModelAll();
  const [exerciseRateList, setExerciseRateList] = useState<ObjectType>();
  const [exerciseCntList, setExerciseCntList] = useState<ObjectType>();
  const { targetDate, onLeftClick, onRightClick } = useMonthlyDateHandler(
    new Date()
  );
  const [caloryList, setCaloryList] = useState<ObjectType>();

  //여기서 비율 + 총 평균치 구해서 Card에 보내야함
  useEffect(() => {
    const startDate = startOfMonth(targetDate);
    const endDate = endOfMonth(targetDate);

    if (user?.userExerciseList === undefined) return;
    const filtered = filterExerciseListByDateRange(
      user?.userExerciseList,
      startDate,
      endDate
    );
    const rate = calculateWeeklyAndMonthlyDoneRate(filtered);

    if (rate) {
      setExerciseRateList(rate);
      console.log(rate);
    }

    const cnt = calculateWeeklyDoneCountAndRate(filtered);

    if (cnt) {
      setExerciseCntList(cnt);
    }

    if (user?.userFoodList === undefined) return;
    const fst = getMonthlyCaloryTotalStatistic(
      filterFoodListByDateRange(user?.userFoodList, startDate, endDate),
      targetDate,
      25
    );
    setCaloryList(fst);
  }, [user, targetDate]);

  return (
    <>
      <Header />
      <Container>
        <MonthlyDateSelector
          targetDate={targetDate}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />
        <ContentsContainer>
          <Title>🏃 운동 통계</Title>
          <CardContainer>
            <Card
              title="운동 달성률"
              subTitle={`이번달 평균 ${Math.ceil(
                exerciseRateList?.result ?? 0
              )}%`}
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

const Container = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  padding: 0 20px;
`;

const ContentsContainer = styled.div`
    max-width: 800px;
    display: flex:
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
