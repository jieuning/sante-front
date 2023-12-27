import { useEffect, useRef, useState, useContext } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, Food, User } from '../../types/user';
import styled from 'styled-components';
import useUserModel from '../../hooks/useUserModel';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
const TODAY = '2023-12-08';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';
import {
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
import { MainContext } from './MainContext';
import axios from 'axios';
import {
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
} from '../../utils/Date';
const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';
interface BalckProps {
  height?: string;
}

const Main = () => {
  const today = new Date(TODAY); // 현재 날짜를 가져옵니다.

  const [user, setUser] = useState<User>();
  const startOfThisWeek = startOfWeek(today); // 이번 주의 시작 날짜를 계산합니다.
  const endOfThisWeek = endOfWeek(today); // 이번 주의 종료 날짜를 계산합니다.
  const weeklyUser = useUserModel(startOfThisWeek, endOfThisWeek);
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [isModalFoodOpen, setIsModalFoodOpen] = useState(false);
  const [isModalExerciseOpen, setIsModalExerciseOpen] = useState(false);

  const [startOfCurrentMonth, setStartOfCurrentMonth] = useState(
    startOfMonth(currentDate)
  );
  const [endOfCurrentMonth, setEndOfCurrentMonth] = useState(
    endOfMonth(currentDate)
  );
  const firstUser = useUserModel(
    startOfMonth(currentDate),
    endOfMonth(currentDate)
  );
  // const [monthlyUser, setMonthlyUser] = useState<User | undefined>();
  // const monthlyUserData = useUserModel(startOfCurrentMonth, endOfCurrentMonth);

  // useEffect(() => {
  //   setMonthlyUser(monthlyUserData);
  //   console.log(monthlyUser);
  // }, [monthlyUser]);

  // const modalBackground = useRef();
  //DateSelect 날짜 클릭 이벤트

  const handleDayOnClick = (day: Date) => {
    setCurrentDate(day);
    if (!isSameMonth(day, startOfCurrentMonth)) {
      setStartOfCurrentMonth(startOfMonth(day));
      setEndOfCurrentMonth(endOfMonth(day));
    }
  };

  const closeFoodModal = () => {
    setIsModalFoodOpen(false);
  };
  const closeExerciseModal = () => {
    setIsModalExerciseOpen(false);
  };
  //NOTE: mainStatistics는 이번주차 데이터를 불러와야합니다

  useEffect(() => {
    axios
      .post(`${URL}/check`, {
        email: 'email@email.com',
        password: 'sdfdsf',
      })
      .then((response) => {
        const userData = response.data.user;
        console.log(userData);

        setUser({
          ...userData,
        });
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [startOfCurrentMonth, endOfCurrentMonth]);

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
          {isModalExerciseOpen && <ExerciseModal></ExerciseModal>}
          {isModalFoodOpen && <FoodModal></FoodModal>}
          <ContentsContainer>
            <MonthCalendar
              exerciseList={user?.userExerciseList}
              foodList={user?.userFoodList}
              userData={user}
              currentDate={currentDate}
            />
            <CardContainer>
              <RoutineCard
                type="exercise"
                exerciseList={user?.userExerciseList}
                isMain={true}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => setIsModalExerciseOpen(true)}
                date={currentDate}
              ></RoutineCard>
              <Blank />
              <RoutineCard
                type="food"
                foodList={user?.userFoodList}
                isMain={true}
                date={new Date(TODAY)}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => setIsModalFoodOpen(true)}
              ></RoutineCard>
              <Blank />
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
