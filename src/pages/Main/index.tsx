import { useEffect, useState } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, FoodList } from '../../types/user';
import styled from 'styled-components';
import useUserModel from '../../hooks/useUserModel';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';
import {
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
import { MainContext } from './MainContext';
import { ModalMode } from '../../types/modalMode';
import { useStore } from '../../states/user';
interface BalckProps {
  height?: string;
}

const Main = () => {
  const today = new Date(); // 현재 날짜를 가져옵니다.

  //const [user, setUser] = useState<User>();
  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [isModalFoodOpen, setIsModalFoodOpen] = useState(false);
  const [isModalExerciseOpen, setIsModalExerciseOpen] = useState(false);

  const [startOfThisWeek, setStartOfThisWeek] = useState(startOfWeek(today));
  const [endOfThisWeek, setEndOfThisWeek] = useState(endOfWeek(today)); // 이번 주의 종료 날짜를 계산합니다.
  // const [weeklyUser, setWeeklyUser] = useState(
  //   useUserModel(startOfCurrentWeek, endOfCurrentWeek)
  // );
  const weeklyUser = useUserModel(startOfThisWeek, endOfThisWeek);

  const [exerciseData, setExerciseData] = useState<Exercise>();
  const [foodData, setFoodData] = useState<FoodList>();
  const [foodId, setFoodId] = useState('');
  const [foodModalType, setFoodModalType] = useState<ModalMode>('create');

  const [isCreateMode, setIsCreateMode] = useState(true);
  const [startOfCurrentMonth, setStartOfCurrentMonth] = useState(
    startOfMonth(currentDate)
  );
  const [endOfCurrentMonth, setEndOfCurrentMonth] = useState(
    endOfMonth(currentDate)
  );

  const handleDayOnClick = (day: Date) => {
    setCurrentDate(day);
    // if (!isSameWeek(day, startOfThisWeek)) {
    //   setStartOfThisWeek(startOfWeek(day));
    //   setEndOfThisWeek(endOfWeek(day));
    // }
    // if (!isSameMonth(day, startOfCurrentMonth)) {
    //   setStartOfCurrentMonth(startOfMonth(day));
    //   setEndOfCurrentMonth(endOfMonth(day));
    // }
  };

  const closeFoodModal = () => {
    setIsModalFoodOpen(false);
  };
  const closeExerciseModal = () => {
    setIsModalExerciseOpen(false);
  };

  const handleCreateClick = () => {
    setIsCreateMode(true);
    setIsModalFoodOpen(true);
    setFoodModalType('create');
    setFoodId(new Date().getTime().toString());
    setFoodData({
      foodCategory: '아침',
      totalCalory: 0,
      menu: [
        {
          name: '',
          calory: '',
        },
      ],
    });
  };

  const handleExerciseCreateClick = () => {
    setIsCreateMode(true);
    setIsModalExerciseOpen(true);
  };

  // "편집하기" 클릭을 처리하는 함수 내부에서
  const handleExerciseEditClick = () => {
    setIsCreateMode(false);
    setIsModalExerciseOpen(true);
  };

  // "편집하기" 클릭을 처리하는 함수 내부에서
  const handleEditClick = (value: [FoodList, string]) => {
    setFoodData(value[0]);
    setFoodId(value[1]);
    setFoodModalType('edit');
    setIsCreateMode(false);
    setIsModalFoodOpen(true);
  };
  //NOTE: mainStatistics는 이번주차 데이터를 불러와야합니다

  useEffect(() => {
    getUser();
  }, [currentDate]);

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
          {isModalExerciseOpen && (
            <ExerciseModal
              modalButton={isCreateMode}
              exerciseData={exerciseData}
            />
          )}
          {isModalFoodOpen && (
            <FoodModal
              modalButton={isCreateMode} // 모달Button 속성으로 상태 전달
              foodData={foodData}
              foodId={foodId}
              modalType={foodModalType}
              // ... 다른 속성들
            />
          )}
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
                onClickAdd={() => {
                  setExerciseData(undefined);
                  handleExerciseCreateClick();
                }}
                onClickEdit={(value) => {
                  setExerciseData(value);
                  handleExerciseEditClick();
                }}
                date={currentDate}
              ></RoutineCard>
              <Blank />
              <RoutineCard
                type="food"
                foodList={user?.userFoodList ?? []}
                isMain={true}
                date={currentDate}
                onClickMore={() => console.log('more click')}
                onClickAdd={() => {
                  handleCreateClick();
                  setIsModalFoodOpen(true);
                }}
                onClickEdit={(value) => {
                  console.log('main data', value[0]);
                  setFoodData(value[0]);
                  handleEditClick(value);
                  setIsModalFoodOpen(true);
                  console.log('이것은 받아온 value', value[0]);
                }}
              ></RoutineCard>
              <Blank />
            </CardContainer>

            <MainStatistic user={weeklyUser} todayDate={currentDate} />
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
