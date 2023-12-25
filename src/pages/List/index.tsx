리스트페이지
import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import Arrow from '../../components/icons/Arrow';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useState } from 'react';
import useUserModel from '../../hooks/useUserModel';
import { getMonth, getYear } from 'date-fns';

const List = () => {
  const today = new Date(); // 현재 날짜
  const thisYear = getYear(today); // 현재 연도
  const thisMonth = getMonth(today); // 현재 월
  const user = useUserModel(today);

  const [selectedValue, setSelectedValue] = useState('');

  const [year, setYear] = useState(thisYear); // 현재 년도를 초기값으로
  const [month, setMonth] = useState(thisMonth); // 현재 월을 초기값으로

  //TODO - 운동/식단 리스트 받아오기
  // 이전 달로 이동
  const leftArrowHandler = () => {
    if (month === 0) {
      // 0은 1월로 1월에서 왼쪽 화살표를 누르면
      setYear(year - 1); // 현재 년도에서 -1
      setMonth(11); // 월도 12월로 설정
    } else {
      setMonth(month - 1);
    }
  };

  // 다음 달로 이동
  const rightArrowHandler = () => {
    if (month === 11) {
      // 11은 12월로 12월에서 오른쪽 화살표를 누르면
      setYear(year + 1); // 현재 년도에서 +1
      setMonth(0); // 월도 1월로
    } else {
      setMonth(month + 1);
    }
  };
  const filteredExerciseList = user?.userExerciseList.filter((exercise) => {
    const exerciseDate = new Date(exercise.date);
    return (
      exerciseDate.getFullYear() === year && exerciseDate.getMonth() === month
    );
  });

  const filteredFoodList = user?.userFoodList.filter((food) => {
    const foodDate = new Date(food.date);
    return foodDate.getFullYear() === year && foodDate.getMonth() === month;
  });
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
      //TODO - 선택된 운동/식단에 따른 로직 작성
      if (selectedCategory === '운동') {
        console.log('운동');
        console.log(filteredExerciseList);
      } else {
        console.log('식단');
        console.log(filteredFoodList);
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
        <div onClick={leftArrowHandler}>
          <Arrow type="left" size="35" cursor="pointer"></Arrow>
        </div>
        <DateBox>{`${year}.${month + 1}`}</DateBox>
        <div onClick={rightArrowHandler}>
          <Arrow type="right" size="35" cursor="pointer"></Arrow>
        </div>
      </WeeklyContainer>

      <RoutineCardContainer>
        {selectedValue === '운동' && (
          <>
            {filteredExerciseList.map((exercise, index) => (
              <RoutineCard
                key={index}
                type="exercise"
                exerciseList={[exercise]}
                date={new Date(exercise.date)}
                onClickEdit={() => console.log('edit click')}
              ></RoutineCard>
            ))}
          </>
        )}
        {selectedValue === '식단' && (
          <>
            {filteredFoodList.map((food, index) => (
              <RoutineCard
                key={index}
                type="food"
                foodList={[food]}
                date={new Date(food.date)}
                onClickEdit={() => console.log('edit click')}
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
const DateBox = styled.p`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin: 0 10px;
`;
const RoutineCardContainer = styled.div`
  width: 50%;
  margin: auto;
`;
export default List;
