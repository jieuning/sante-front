import { useEffect, useState } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { FoodList } from '../../types/user';
import styled from 'styled-components';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';
import { endOfMonth, startOfMonth } from 'date-fns';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
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
  const setExerciseData = useStore((state) => state.setExerciseData);
  const modalState = useStore((state) => state.modalState);
  const setModalState = useStore((state) => state.setModalState);

  const [currentDate, setCurrentDate] = useState<Date>(today);

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

  const handleCreateClick = () => {
    setIsCreateMode(true);
    setModalState('food', true);
    setFoodModalType('create');
    setFoodId(new Date().getTime().toString());
    setFoodData({
      foodCategory: '',
      totalCalory: Number(),
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
    setModalState('exercise', true);
  };

  // "편집하기" 클릭을 처리하는 함수 내부에서
  const handleExerciseEditClick = () => {
    setIsCreateMode(false);
    setModalState('exercise', true);
  };

  // "편집하기" 클릭을 처리하는 함수 내부에서
  const handleEditClick = (value: [FoodList, string]) => {
    setFoodData(value[0]);
    setFoodId(value[1]);
    setFoodModalType('edit');
    setIsCreateMode(false);
    setModalState('food', true);
  };
  //NOTE: mainStatistics는 이번주차 데이터를 불러와야합니다

  useEffect(() => {
    getUser();
    console.log(user);
  }, [currentDate]);

  return (
    <>
      <Header />
      <Blank height="6rem" />
      <Container>
        <DateSelect
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onClick={handleDayOnClick}
        />
        <Blank />
        {modalState.exercise && <ExerciseModal modalButton={isCreateMode} />}
        {modalState.food && (
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
                setModalState('food', true);
              }}
              onClickEdit={(value) => {
                console.log('main data', value[0]);
                setFoodData(value[0]);
                handleEditClick(value);
                setModalState('food', true);
                console.log('이것은 받아온 value', value[0]);
              }}
            ></RoutineCard>
          </CardContainer>
          <MainStatistic user={user} todayDate={currentDate} />
        </ContentsContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1160px;
`;

const Blank = styled.div<BalckProps>`
  height: ${(props) => props.height || '2rem'};
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2.5%;
  padding: 2%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const CardContainer = styled.div``;

export default Main;
