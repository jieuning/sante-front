import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useState } from 'react';
import useUserModelAll from '../../hooks/useUserModelAll';  // 수정된 부분
import MonthlyDateSelector from '../../components/MonthlyDateSelector';
import useMonthlyDateHandler from '../../hooks/useMonthlyDateHandler';

const List = () => {
  // 날짜 구하기
  const today = new Date();
  let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // 날짜로 유저정보 받아오기, 해당 유저의 운동과 식단 가져오기
  const user = useUserModelAll(firstDay, lastDay);  // 수정된 부분
  
  const exerciseList = user?.userExerciseList;
  const foodList = user?.userFoodList;

  // 스케줄드데이트의 배열
  const exScheduledDate = exerciseList?.map((item) => item.scheduledDate);
  const foodDate = foodList?.map((item) => item.foodId);

  const [selectedValue, setSelectedValue] = useState('');
  const { targetDate, onLeftClick, onRightClick } = useMonthlyDateHandler(
    new Date()
  );

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
      setSelectedValue(selectedCategory);
      // TODO - 선택된 운동/식단에 따른 로직 작성
      if (selectedCategory === '운동') {
        console.log('운동');
        console.log('해당월의운동리스트', exerciseList);
        console.log('운동리스트의스케줄된날짜리스트', exScheduledDate);
      } else {
        console.log('식단');
        console.log('해당월의식단리스트', foodList);
        console.log('식단날짜리스트', foodDate);
      }
    },
  };

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

      <RoutineCardContainer>
        {selectedValue === '운동' && (
          <>
            <h2>운동 목록</h2>
            {exerciseList?.map((exercise, index) => (
              <RoutineCard
                key={`exercise-${index}`}
                type="exercise"
                isMain={!true}
                exerciseList={[exercise]}
                date={targetDate} // 수정된 부분
              ></RoutineCard>
            ))}
          </>
        )}
        {selectedValue === '식단' && (
          <>
            <h2>식단 목록</h2>
            {foodList?.map((food, index) => (
              <RoutineCard
                key={`food-${index}`}
                type="food"
                isMain={!true}
                foodList={[food]}
                date={targetDate} // 수정된 부분
              ></RoutineCard>
            ))}
          </>
        )}
      </RoutineCardContainer>
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
  width: 50%;
  margin: auto;
`;

export default List;
