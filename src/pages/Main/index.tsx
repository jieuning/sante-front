import { useEffect, useState } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, Food } from '../../types/user';
import styled from 'styled-components';
import useUserModel from '../../hooks/useUserModel';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
const TODAY = '2023-12-08';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';

interface BalckProps {
  height?: string;
}

const Main = () => {
  const user = useUserModel(new Date(TODAY));
  console.log(user);
  return (
    <>
      <Header />
      <Blank height="6rem" />
      <Container>
        <DateSelect />
        <Blank />
        <ContentsContainer>
          <MonthCalendar
            exerciseList={user?.userExerciseList}
            foodList={user?.userFoodList}
          />
          <CardContainer>
            <RoutineCard
              type="exercise"
              exerciseList={user?.userExerciseList}
              isPlusIconVisible={true}
              onClickMore={() => console.log('more click')}
              onClickAdd={() => console.log('add click')}
            ></RoutineCard>
            <Blank />
            <RoutineCard
              type="food"
              foodList={user?.userFoodList}
              isPlusIconVisible={true}
            ></RoutineCard>
            <Blank />
            <RoutineCard
              type="exercise"
              exerciseList={user?.userExerciseList}
              date={new Date(TODAY)}
            ></RoutineCard>
          </CardContainer>

          <MainStatistic todayDate={new Date(TODAY)} />
        </ContentsContainer>
      </Container>
    </>
  );
};

const Container = styled.div``;

const Blank = styled.div<BalckProps>`
  height: ${(props) => props.height || '2rem'};
`;

const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
`;

const CardContainer = styled.div`
  max-width: 620px;
  width: 480px;
`;

export default Main;
