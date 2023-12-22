import Header from '../../components/Header';
import { RadioButton, InputButtonInfo } from '../../components/RadioButton';
import Arrow from '../../components/icons/Arrow';
import RoutineCard from '../../components/RoutineCard';
import styled from 'styled-components';

const List = () => {
  const radioCategoryButtonInfo: InputButtonInfo = {
    type: 'shortOvalRadio',
    size: 'short-oval',
    value: ['운동'],
    items: ['운동', '식단'],
    backgroundColor: 'white',
    border: 'primary',
    color: 'black',
    fontWeight: 'bold',
    onClick: () => {
      // 버튼 클릭 처리
      console.log('버튼이 클릭되었습니다!');
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

      <RoutineCard
        type="exercise"
        // exerciseList={user?.userExerciseList}
        date={new Date()}
        onClickEdit={() => console.log('edit click')}
      ></RoutineCard>
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
export default List;
