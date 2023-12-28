import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import useUserModel from '../../hooks/useUserModel'; // 수정된 부분
import MonthlyDateSelector from '../../components/MonthlyDateSelector';
import useMonthlyDateHandler from '../../hooks/useMonthlyDateHandler';

const List = () => {
  const { targetDate, onLeftClick, onRightClick } = useMonthlyDateHandler(
    new Date()
  );

  const user = useUserModel(
    new Date(targetDate.getFullYear(), targetDate.getMonth(), 1),
    new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)
  );

  const dateArray: Date[] = [];
  for (
    let date = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    date <= new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    date.setDate(date.getDate() + 1)
  ) {
    dateArray.push(new Date(date)); // 각 날짜에 대해 새로운 Date 객체 생성
  }

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
