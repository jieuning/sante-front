import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import Arrow from '../../components/icons/Arrow';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';
import { useState } from 'react';
import useUserModel from '../../hooks/useUserModel';

const TODAY = '2023-12-08';

const List = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const today = new Date(TODAY); // 현재 날짜를 가져옵니다.
  const user = useUserModel(today);

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
      // 선택된 아점저간에 따른 로직 수행
      if (selectedCategory === '운동') {
        console.log('운동');
      } else {
        console.log('식단');
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
        <div>
          <Arrow type="left" size="35" cursor="pointer"></Arrow>
        </div>
        <DateBox>2023.12</DateBox>
        <div>
          <Arrow type="right" size="35" cursor="pointer"></Arrow>
        </div>
      </WeeklyContainer>

      <RoutineCardContainer>
        <RoutineCard
          type="exercise"
          exerciseList={user?.userExerciseList}
          date={new Date(TODAY)}
          onClickEdit={() => console.log('edit click')}
        ></RoutineCard>
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