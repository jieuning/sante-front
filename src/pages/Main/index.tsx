import { useEffect, useState } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, Food } from '../../types/user';
import styled from 'styled-components';
import useUserModel from '../../hooks/useUserModel';

const TODAY = '2023-12-08';

const Main = () => {
  const user = useUserModel(new Date(TODAY));
  console.log(user);
  return (
    <Container>
      <ContentsContainer>
        <CardContainer>
          <RoutineCard
            type="exercise"
            exerciseList={user?.userExerciseList}
            isPlusIconVisible={true}
            onClickMore={() => console.log('more click')}
            onClickAdd={() => console.log('add click')}
          ></RoutineCard>
          <Blank />
          <RoutineCard
            type="food"
            foodList={user?.userFoodList}
            isPlusIconVisible={true}
          ></RoutineCard>
          <RoutineCard
            type="exercise"
            exerciseList={user?.userExerciseList}
            date={new Date(TODAY)}
          ></RoutineCard>
        </CardContainer>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div``;

const Blank = styled.div`
  height: 2rem;
`;

const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  max-width: 620px;
  width: 480px;
`;

export default Main;
