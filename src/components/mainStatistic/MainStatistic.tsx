import styled from 'styled-components';
import GageBar from './GageBar';
import { useState, useEffect } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import { User, Exercise, Food, FoodList, Menu } from '../../types/user';
import calculateWeeklyExercise from './calculateWeeklyExercise';
import { getColorValue } from '../../types/colorType';
import { isSameDay } from 'date-fns';
import useUserModel, {
  filterExerciseListByDateRange,
} from '../../hooks/useUserModel';

const FOOD_COLORS = {
  notEnough: getColorValue('orange'),
  enough: getColorValue('purple'),
  tooMuch: '#F39797',
};

interface DateProps {
  todayDate: Date;
}

// eslint-disable-next-line react/prop-types
const MainStatistic = ({ todayDate = new Date() }: DateProps) => {
  const caloryMoods = {
    notEnough: {
      emoji: '🥺',
      message: '끼니 거르고 계신거 아니죠?ㅜㅜ',
      color: FOOD_COLORS.notEnough,
    },
    enough: {
      emoji: '😊',
      message: '잘 먹고 있어요!',
      color: FOOD_COLORS.enough,
    },
    tooMuch: {
      emoji: '😵',
      message: '기준치를 초과했어요',
      color: FOOD_COLORS.tooMuch,
    },
  };
  const [today, setToday] = useState(todayDate);
  const [caloryMood, setCaloryMood] = useState(caloryMoods.notEnough);
  const [exerciseGage, setExerciseGage] = useState(50);
  const [exerciseMaxGage, setExerciseMaxGage] = useState(100);
  const [foodGage, setFoodGage] = useState(0);
  const [userCalory, setUserCalory] = useState(0);

  console.log('foodgage', foodGage);
  console.log('usercalory', userCalory);

  const exerciseList: Exercise[] = [
    {
      exerciseName: '운동1',
      exerciseId: 'abc1',
      exerciseStartDate: new Date('2023-9-18'),
      exerciseEndDate: new Date('2024-1-25'),
      repeatDate: ['월', '수'],
      scheduledDate: [
        { date: new Date('2023-11-30'), isDone: false },
        { date: new Date('2023-12-02'), isDone: true },
        { date: new Date('2023-12-03'), isDone: false },
      ],
    },
    {
      exerciseName: '운동2',
      exerciseId: 'abc13',
      exerciseStartDate: new Date('2023-9-18'),
      exerciseEndDate: new Date('2024-1-25'),
      repeatDate: ['월', '수'],
      scheduledDate: [
        { date: new Date('2023-11-30'), isDone: true },
        { date: new Date('2023-12-02'), isDone: true },
        { date: new Date('2023-12-03'), isDone: false },
      ],
    },
    // 다른 운동
  ];

  const user = {
    email: 'example@example.com',
    password: 'password123',
    gender: 'Male',
    age: '30',
    userFoodList: [
      {
        foodList: [
          {
            foodCategory: '아침',
            totalCalory: 350,
            menu: [
              {
                name: '오트밀',
                calory: 200,
                _id: {
                  $oid: '65827407bf551e51ed5f77f3',
                },
              },
              {
                name: '바나나',
                calory: 150,
                _id: {
                  $oid: '65827407bf551e51ed5f77f4',
                },
              },
            ],
            _id: {
              $oid: '65827407bf551e51ed5f77f2',
            },
          },
        ],
        foodId: 'food-20231201',
        createdAt: {
          $date: '2023-12-01T00:00:00.000Z',
        },
        lastUpdated: null,
        _id: {
          $oid: '65827407bf551e51ed5f77f1',
        },
      },
    ],
    userExerciseList: exerciseList, // exerciseList를 기반으로 데이터 추가
    todayCalory: 2500,
  };

  // const user: User | undefined = useUserModel();

  useEffect(() => {
    // console.log('exercises', scheduledDateList);
    // console.log('exercisesThisWeek', thisWeekDateList);
    if (user) {
      setUserCalory(user.todayCalory);
      const userFoodData = user.userFoodList;
      const userExerciseData = user.userExerciseList;

      const handleCalory = (date: Date) => {
        // console.log('--today', today);
        // console.log('user', user);
        const todayFoods = userFoodData.find((food: Food) => {
          // console.log('thisFood', food);
          // console.log('---today2', new Date('2023-12-01'));
          // console.log('---todayFoods', food.createdAt.$date);
          return isSameDay(date, new Date(food.createdAt.$date));
        });
        console.log('todayFoods', todayFoods);

        if (todayFoods) {
          const calculatedCalory = todayFoods.foodList.reduce(
            (acc: number, item: FoodList) => {
              console.log('item', item);
              return acc + item.totalCalory;
            },
            0
          );
          console.log('calculatedCalory', calculatedCalory);
          setFoodGage(calculatedCalory);
        }
      };

      const weeklyExercise = calculateWeeklyExercise(
        todayDate,
        userExerciseData
      );
      const handleExercise = (todayDate: Date) => {
        setExerciseMaxGage(weeklyExercise.totalWeekExercise);
        setExerciseGage(weeklyExercise.exercise);
      };

      handleCalory(today); //TODO: 클릭했던 날짜 값 받아오기
      handleExercise(today);
    }
    console.log('--userCalory', userCalory);
    console.log('--food', foodGage);
    console.log('--exercise', exerciseGage / exerciseMaxGage);
  }, [user]); //TODO: 나중에 userFoodData랑 userExerciseData 메모이제이션 따로 분리

  //NOTE: 기준 80%

  const buttonInfo: DynamicButtonInfo = {
    type: 'outline',
    text: '통계 상세보기',
    onClick: () => console.log('Button clicked!'),
  };

  const handleCaloryGage = (currentGage: number) => {
    let newCaloryMood = { ...caloryMood };
    if (currentGage >= 80 && currentGage <= 100) {
      newCaloryMood = caloryMoods.enough;
    } else if (currentGage > 100) {
      newCaloryMood = caloryMoods.tooMuch;
    } else if (currentGage < 100) {
      newCaloryMood = caloryMoods.notEnough;
    } else {
      newCaloryMood = { ...newCaloryMood, color: 'red' };
    }
    setCaloryMood(newCaloryMood);
  };

  return (
    <GageContainerDiv>
      {user ? (
        <>
          <InformationAreaDiv>
            <FlexContainerDiv>
              <TextContainerDiv>주간 운동 달성률</TextContainerDiv>
              <br />
              <GageBar gage={exerciseGage} maxGage={exerciseMaxGage} />
            </FlexContainerDiv>
            <FlexContainerDiv>
              <TextContainerDiv>하루 섭취 칼로리</TextContainerDiv>
              <br />
              <GageBar
                gage={foodGage}
                maxGage={userCalory}
                handleGage={handleCaloryGage}
                color={caloryMood.color}
              />
              <br />
              <div>
                <EmojiContainerSpan>{caloryMood.emoji}</EmojiContainerSpan>
                <StatusContainerSpan>{caloryMood.message}</StatusContainerSpan>
              </div>
            </FlexContainerDiv>
          </InformationAreaDiv>
          <ButtonAreaDiv>
            <DynamicButton info={buttonInfo} />
          </ButtonAreaDiv>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </GageContainerDiv>
  );
};
//NOTE: 미완성
const GageContainerDiv = styled.div`
  width: 27.4rem;
  height: 36.7rem;
  border-radius: 2rem;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
//NOTE: globalstyles에 white 컬러 추가

const InformationAreaDiv = styled.div`
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonAreaDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2.4rem;
`;

const TextContainerDiv = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;
const FlexContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StatusContainerSpan = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const EmojiContainerSpan = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;
export default MainStatistic;
