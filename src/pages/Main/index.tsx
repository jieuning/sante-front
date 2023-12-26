import { useEffect, useRef, useState, useContext } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, Food } from '../../types/user';
import styled from 'styled-components';
import useUserModel from '../../hooks/useUserModel';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
const TODAY = '2023-12-08';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';
import { endOfWeek, startOfWeek } from 'date-fns';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
import { MainContext } from './MainContext';

interface BalckProps {
  height?: string;
}

const Main = () => {
  const today = new Date(TODAY); // 현재 날짜를 가져옵니다.
  const user = useUserModel(today);
  const startOfThisWeek = startOfWeek(today); // 이번 주의 시작 날짜를 계산합니다.
  const endOfThisWeek = endOfWeek(today); // 이번 주의 종료 날짜를 계산합니다.
  const weeklyUser = useUserModel(startOfThisWeek, endOfThisWeek);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isModalFoodOpen, setIsModalFoodOpen] = useState(false);
  const [isModalExerciseOpen, setIsModalExerciseOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  // const modalBackground = useRef();
  //DateSelect 날짜 클릭 이벤트
  const handleDayOnClick = (day: Date) => {
    setCurrentDate(day);
  };
  const closeFoodModal = () => {
    setIsModalFoodOpen(false);
  };
  const closeExerciseModal = () => {
    setIsModalExerciseOpen(false);
  };
  //NOTE: mainStatistics는 이번주차 데이터를 불러와야합니다
  console.log(user);
  return (
    <>
      <MainContext.Provider
        value={{
          closeFoodModal,
          closeExerciseModal,
        }}
      >
        <Header />
        <Blank height="6rem" />
        <Container>
          <DateSelect
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onClick={handleDayOnClick}
          />
          <Blank />
          {isModalExerciseOpen && <ExerciseModal />}
          {isModalFoodOpen && <FoodModal />}
          <ContentsContainer>
            <MonthCalendar
              exerciseList={user?.userExerciseList}
              foodList={user?.userFoodList}
            />
            <CardContainer>
              <RoutineCard
                type="exercise"
                exerciseList={user?.userExerciseList}
                isMain={true}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => {
                  setExerciseData(null);
                  setIsModalExerciseOpen(true);
                }}
                onClickEdit={(value) => {
                  setExerciseData(value);
                  setIsModalExerciseOpen(true);
                  console.log('이것은 받아온 운동', value);
                }}
                date={new Date(today)}
              ></RoutineCard>
              <Blank />
              <RoutineCard
                type="food"
                foodList={user?.userFoodList}
                isMain={true}
                date={new Date(TODAY)}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => setIsModalFoodOpen(true)}
                onClickEdit={(value) => {
                  setIsModalFoodOpen(true);
                  console.log('이것은 받아온 value', value);
                }}
              ></RoutineCard>
              <Blank />
              <RoutineCard
                type="exercise"
                exerciseList={user?.userExerciseList}
                date={today}
              ></RoutineCard>
            </CardContainer>

            <MainStatistic user={weeklyUser} todayDate={today} />
          </ContentsContainer>
        </Container>
      </MainContext.Provider>
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
