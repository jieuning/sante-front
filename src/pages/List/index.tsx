import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import useUserModel from '../../hooks/useUserModel'; // 수정된 부분
import MonthlyDateSelector from '../../components/MonthlyDateSelector';
import useMonthlyDateHandler from '../../hooks/useMonthlyDateHandler';
import { useStore } from '../../states/user';
import { FoodList } from '../../types/user';
import { ModalMode } from '../../types/modalMode';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';


const List = () => {
  const { targetDate, onLeftClick, onRightClick } = useMonthlyDateHandler(
    new Date()
  );

  const user = useUserModel(
    new Date(targetDate.getFullYear(), targetDate.getMonth(), 1),
    new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)
  );
  const today = new Date(); 

  const dateArray: Date[] = [];
  for (
    let date = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    date <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    date.setDate(date.getDate() + 1)
  ) {
    dateArray.push(new Date(date)); // 각 날짜에 대해 새로운 Date 객체 생성
  }

  const setModalState = useStore((state) => state.setModalState);
  const setFoodData = useStore((state) => state.setFoodData);
  const [foodModalType, setFoodModalType] = useState<ModalMode>('create');
  const [isCreateMode, setIsCreateMode] = useState(true);
  const setExerciseData = useStore((state) => state.setExerciseData);
  const modalState = useStore((state) => state.modalState);
  const [currentDate, setCurrentDate] = useState<Date>(today);


  const [selectedValue, setSelectedValue] = useState('운동');
  const [loadedDates, setLoadedDates] = useState<Date[]>([]); // 로드된 날짜들을 저장
  const loader = useRef(null);
  const [loadIndex, setLoadIndex] = useState(0);
  const LOAD_SIZE = 10;

  const radioCategoryButtonInfo: InputButtonInfo = {
    type: 'shortOvalRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['운동', '식단'],
    backgroundColor: 'white',
    border: 'primary',
    color: 'black',
    fontWeight: 'bold',
    onChange: (selectedCategory) => {
      console.log('선택된 값:', selectedCategory);
      setLoadIndex(0);
      setLoadedDates([]);
      setSelectedValue(selectedCategory);
    },
  };

  const loadMoreItems = () => {
    const nextLoadIndex = loadIndex + LOAD_SIZE;
    const newLoadedDates = dateArray.slice(loadIndex, nextLoadIndex);
    setLoadedDates((prevLoadedDates) => [
      ...prevLoadedDates,
      ...newLoadedDates,
    ]);
    setLoadIndex(nextLoadIndex);
  };
  
    // "편집하기" 클릭을 처리하는 함수 내부에서
    const handleExerciseEditClick = () => {
      setIsCreateMode(false);
      setModalState('exercise', true);
    };
  
    // "편집하기" 클릭을 처리하는 함수 내부에서
    const handleEditClick = (value: FoodList) => {
      setFoodData(value);
      setFoodModalType('edit');
      setIsCreateMode(false);
      setModalState('food', true);
    };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadIndex]);

  return (
    <>
      <Header></Header>

      <RadioBtnContainer>
        <RadioButton info={radioCategoryButtonInfo}></RadioButton>
      </RadioBtnContainer>
      {modalState.exercise && <ExerciseModal modalButton={isCreateMode} />}
        {modalState.food && (
          <FoodModal
            modalButton={isCreateMode} // 모달Button 속성으로 상태 전달
            modalType={foodModalType}
            currentDate={currentDate}
            // ... 다른 속성들
          />
        )}
      <WeeklyContainer>
        <MonthlyDateSelector
          targetDate={targetDate}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />
      </WeeklyContainer>

      <AllRoutineCardContainer>
        {selectedValue === '운동' && (
          <>
            {loadedDates.map((date, index) => (
              <RoutineCardContainer key={`exercise-${index}`}>
                <RoutineCard
                  key={`exercise-${index}`}
                  type="exercise"
                  exerciseList={user?.userExerciseList}
                  date={date}
                  onClickEdit={(value) => {
                    setExerciseData(value);
                    handleExerciseEditClick();
                  }}
                ></RoutineCard>
              </RoutineCardContainer>
            ))}
          </>
        )}
        {selectedValue === '식단' && (
          <>
            {loadedDates.map((date, index) => (
              <RoutineCardContainer key={`food-${index}`}>
                <RoutineCard
                  key={`food-${index}`}
                  type="food"
                  foodList={user?.userFoodList}
                  date={date}
                  onClickEdit={(value) => {
                    console.log('main data', value[0]);
                    setFoodData(value[0]);
                    handleEditClick(value);
                    setModalState('food', true);
                  }}
                ></RoutineCard>
              </RoutineCardContainer>
            ))}
          </>
        )}
      </AllRoutineCardContainer>
      <div ref={loader} />
    </>
  );
};

const RadioBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const WeeklyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const RoutineCardContainer = styled.div`
  margin: 10px auto;
  max-width: 620px;
  min-width: 300px;
  padding: 0 10px;
`;

const AllRoutineCardContainer = styled.div`
  margin: auto;
`;

export default List;
