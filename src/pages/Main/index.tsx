import { useEffect, useState } from 'react';
import RoutineCard from '../../components/RoutineCard';
import { Exercise, Food } from '../../types/user';
import styled from 'styled-components';

const Main = () => {
  const [dummy, setDummy] = useState<Exercise[]>();
  const [food, setFood] = useState<Food[]>();
  useEffect(() => {
    //날짜별로 정제해서 줘야함
    //푸드 카테고리는 넣을때 정렬해서 넣는게 좋을듯 아니면 계속 정렬해야하니
    setDummy(createDummyData());
    setFood(createFoodDummyData());
  }, []);
  return (
    <Container>
      <ContentsContainer>
        <CardContainer>
          <RoutineCard type="exercise" exerciseList={dummy}></RoutineCard>
          <Blank />
          <RoutineCard type="food" foodList={food}></RoutineCard>
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

const createDummyData = (): Exercise[] => {
  const generateUUID = () => {
    // 간단한 UUID 생성 함수 - 실제 프로덕션에서는 보다 견고한 방식 사용 필요
    return 'xxxx-xxxx-4xxx-yxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const exerciseDummyData = [
    {
      exerciseName: 'Running',
      exerciseId: generateUUID(),
      exerciseStartDate: new Date('2023-01-01'),
      exerciseEndDate: new Date('2024-01-15'),
      exerciseTime: 180,
      repeatDate: ['월', '수', '금'],
      createdAt: new Date(),
      lastUpdated: new Date(),
      isDone: false,
    },
    {
      exerciseName: 'Swimming',
      exerciseId: generateUUID(),
      exerciseStartDate: new Date('2023-02-01'),
      exerciseEndDate: new Date('2023-02-15'),
      exerciseTime: 30,
      repeatDate: ['화', '목'],
      createdAt: new Date(),
      lastUpdated: null,
      isDone: true,
    },
    {
      exerciseName: 'Cycling',
      exerciseId: generateUUID(),
      exerciseStartDate: new Date('2023-03-01'),
      exerciseEndDate: new Date('2023-03-15'),
      exerciseTime: 250,
      repeatDate: ['토', '일'],
      createdAt: new Date(),
      lastUpdated: null,
      isDone: true,
    },
  ];

  return exerciseDummyData;
};

const createFoodDummyData = (): Food[] => {
  return [
    {
      foodList: [
        { name: 'Apple', calory: 95 },
        { name: 'Banana', calory: 105 },
      ],
      foodId: 'food1',
      foodCategory: '아침',
      createdAt: new Date('2023-01-01'),
      lastUpdated: new Date('2023-01-05'),
    },
    {
      foodList: [
        { name: 'Chicken', calory: 215 },
        { name: 'Rice', calory: 130 },
      ],
      foodId: 'food2',
      foodCategory: '점심',
      createdAt: new Date('2023-02-01'),
      lastUpdated: new Date('2023-02-05'),
    },
    {
      foodList: [
        { name: 'Salad', calory: 70 },
        { name: 'Bread', calory: 80 },
      ],
      foodId: 'food3',
      foodCategory: '저녁',
      createdAt: new Date('2023-03-01'),
      lastUpdated: new Date('2023-03-05'),
    },
  ];
};

export default Main;
