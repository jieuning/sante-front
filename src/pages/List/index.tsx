import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import MonthlyDateSelector from '../../components/MonthlyDateSelector';
import useMonthlyDateHandler from '../../hooks/useMonthlyDateHandler';
import { useStore, Store } from '../../states/user';
import { FoodList } from '../../types/user';
import { ModalMode } from '../../types/modalMode';
import ExerciseModal from '../../components/modals/ExerciseModal';
import FoodModal from '../../components/modals/FoodMadal';
import { useNavigate } from 'react-router-dom';
import { TiHome } from 'react-icons/ti';

const List = () => {
  const queryString = window.location.search; // 현재 페이지의 URL에서 쿼리 문자열
  const urlParams = new URLSearchParams(queryString);
  const selectCategory = urlParams.get('category'); //운동이면 운동,식단이면 식단

  const user = useStore((state: Store) => state.user);
  const getUser = useStore((state: Store) => state.getUser);
  const setExerciseData = useStore((state: Store) => state.setExerciseData);
  const modalState = useStore((state: Store) => state.modalState);
  const { targetDate, onLeftClick, onRightClick } = useMonthlyDateHandler(
    new Date()
  );

  let dateArray: Date[] = [];
  for (
    let date = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    date <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    date.setDate(date.getDate() + 1)
  ) {
    dateArray.push(new Date(date)); // 각 날짜에 대해 새로운 Date 객체 생성
  }

  const setModalState = useStore((state: Store) => state.setModalState);
  const setFoodData = useStore((state: Store) => state.setFoodData);
  const setFoodId = useStore((state: Store) => state.setFoodId);

  const [foodModalType, setFoodModalType] = useState<ModalMode>('create');
  const [isCreateMode, setIsCreateMode] = useState(true);

  const [selectedValue, setSelectedValue] = useState(selectCategory);

  const [loadedDates, setLoadedDates] = useState<Date[]>([]); // 로드된 날짜들을 저장
  const loader = useRef(null);
  const [loadIndex, setLoadIndex] = useState(0);
  const LOAD_SIZE = 10;

  const radioCategoryButtonInfo: InputButtonInfo = {
    type: 'shortOvalRadio',
    size: 'short-oval',
    value: selectedValue || '',
    items: ['운동', '식단'],
    backgroundColor: 'white',
    border: 'primary',
    color: 'black',
    fontWeight: 'bold',
    onChange: (selectedCategory) => {
      setLoadIndex(0);
      setLoadedDates([]);
      setSelectedValue(selectedCategory);
    },
  };

  useEffect(() => {
    getUser();
    setLoadIndex(0);
    setLoadedDates([]);
    dateArray = [];
    for (
      let date = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
      date <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
      date.setDate(date.getDate() + 1)
    ) {
      dateArray.push(new Date(date)); // 각 날짜에 대해 새로운 Date 객체 생성
    }
  }, [targetDate]);

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
  const handleEditClick = (value: [FoodList, number]) => {
    setFoodData(value[0]);
    setFoodId(value[1].toString());
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
      <ToMainPage />
      <RadioBtnContainer>
        <RadioButton info={radioCategoryButtonInfo}></RadioButton>
      </RadioBtnContainer>
      {modalState.exercise && <ExerciseModal modalButton={isCreateMode} />}
      {modalState.food && (
        <FoodModal
          modalButton={isCreateMode} // 모달Button 속성으로 상태 전달
          modalType={foodModalType}
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
              <RoutineCardContainer
                key={`exercise-${index + date.toDateString()}`}
              >
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
              <RoutineCardContainer key={`food-${index + date.toDateString()}`}>
                <RoutineCard
                  key={`food-${index}`}
                  type="food"
                  foodList={user?.userFoodList}
                  date={date}
                  onClickEdit={(value) => {
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
  margin: 30px 0 10px 0;
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

const ToMainPage = () => {
  const navigate = useNavigate();
  const handleMainClick = () => {
    navigate('/main');
  };

  return (
    <StyledMainText onClick={handleMainClick}>
      메인이동
      <TiHome />
    </StyledMainText>
  );
};

const StyledMainText = styled.div`
  cursor: pointer;
  font-size: 13px;
  display: flex;
  justify-content: center;
  color: var(--gray-color);
  margin-top: 30px;
`;

export default List;
