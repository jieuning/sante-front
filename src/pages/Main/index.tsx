import styled from 'styled-components';
import { useEffect, useState } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { FoodList } from '../../types/user';
import Header from '../../components/Header';
import MainStatistic from '../../components/mainStatistic/MainStatistic';
import { MonthCalendar } from '../../components/Calendar';
import { DateSelect } from '../../components/DateSelect';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
import { ModalMode } from '../../types/modalMode';
import { useStore, Store } from '../../states/user';

interface BalckProps {
  height?: string;
}

const Main = () => {
  const user = useStore((state: Store) => state.user);
  const getUser = useStore((state: Store) => state.getUser);
  const setExerciseData = useStore((state: Store) => state.setExerciseData);
  const modalState = useStore((state: Store) => state.modalState);
  const setModalState = useStore((state: Store) => state.setModalState);
  const setFoodData = useStore((state: Store) => state.setFoodData);
  const setFoodId = useStore((state: Store) => state.setFoodId);

  const today = new Date(); // 현재 날짜를 가져옵니다.
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [foodModalType, setFoodModalType] = useState<ModalMode>('create');
  const [isCreateMode, setIsCreateMode] = useState(true);

  const handleDayOnClick = (day: Date) => {
    setCurrentDate(day);
  };

  const handleCreateClick = () => {
    setIsCreateMode(true);
    setModalState('food', true);
    setFoodModalType('create');
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
            modalType={foodModalType}
            currentDate={currentDate}
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
              onClickAdd={() => {
                handleCreateClick();
                setModalState('food', true);
              }}
              onClickEdit={(value) => {
                setFoodData(value[0]);
                handleEditClick(value);
                setModalState('food', true);
              }}
            ></RoutineCard>
          </CardContainer>
          <MainStatistic user={user} todayDate={currentDate} />
        </ContentsContainer>
        <Blank height="3rem" />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
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
  padding: 0 2%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const CardContainer = styled.div``;

export default Main;
