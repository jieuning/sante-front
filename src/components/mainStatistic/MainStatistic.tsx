import styled from 'styled-components';
import GageBar from './GageBar';
import { useState, useEffect } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import { User, Exercise, Food, FoodList, Menu } from '../../types/user';
import { getColorValue } from '../../types/colorType';
import { isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import useUserModel from '../../hooks/useUserModel';

const FOOD_COLORS = {
  notEnough: getColorValue('orange'),
  enough: getColorValue('purple'),
  tooMuch: '#F39797',
};

interface DateProps {
  todayDate: Date;
}

interface sizeProps {
  width: string;
  height: string;
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
  const [today, setToday] = useState(todayDate); // 현재 날짜를 가져옵니다.
  const [caloryMood, setCaloryMood] = useState(caloryMoods.notEnough);
  const [exerciseGage, setExerciseGage] = useState(0);
  const [exerciseMaxGage, setExerciseMaxGage] = useState(0);
  const [foodGage, setFoodGage] = useState(0);
  const [userCalory, setUserCalory] = useState<number>(0);

  console.log('foodgage', foodGage);
  console.log('usercalory', userCalory);

  const startOfThisWeek = startOfWeek(today); // 이번 주의 시작 날짜를 계산합니다.
  const endOfThisWeek = endOfWeek(today); // 이번 주의 종료 날짜를 계산합니다.

  const user: User | undefined = useUserModel(startOfThisWeek, endOfThisWeek);

  useEffect(() => {
    if (user) {
      console.log('-------thisIsUser------', user);
      user.todayCalory && setUserCalory(user.todayCalory);
      const userFoodData = user.userFoodList;
      const userExerciseData = user.userExerciseList;

      const handleCalory = () => {
        const todayFoods = userFoodData.find((food: Food) => {
          return isSameDay(today, new Date(food.createdAt));
        });
        if (todayFoods) {
          const calculatedCalory = todayFoods.foodList.reduce(
            (acc: number, item: FoodList) => {
              console.log('item', item);
              return acc + item.totalCalory;
            },
            0
          );
          setFoodGage(calculatedCalory);
        }
      };

      const handleExercise = () => {
        const scheduledDateOnlyArray = userExerciseData?.map((exercise) => {
          return exercise.scheduledDate;
        });
        let totalExercise = 0;
        let doneExercise = 0;

        if (scheduledDateOnlyArray?.length) {
          scheduledDateOnlyArray.forEach((exercise) => {
            totalExercise += exercise?.length || 0;
            const doneExerciseFiltered = exercise?.filter((data) => {
              return data.isDone === true;
            });
            doneExercise = doneExerciseFiltered?.length || 0;
          });
        }
        setExerciseMaxGage(totalExercise);
        setExerciseGage(doneExercise);
      };

      handleCalory(); //TODO: 클릭했던 날짜 값 받아오기
      handleExercise();
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
const GageContainerDiv = styled.div<sizeProps>`
  width: ${({ width }) => (width ? width : '23rem')};
  height: ${({ height }) => (height ? height : '30rem')};
  border-radius: 2rem;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
//NOTE: globalstyles에 white 컬러 추가

const InformationAreaDiv = styled.div`
  width: 100%;
  height: 87%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonAreaDiv = styled.div`
  height: auto;
  display: flex;
  justify-content: flex-end;
  margin-right: 2.4rem;
`;

const TextContainerDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const FlexContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StatusContainerSpan = styled.span`
  font-size: 1.3rem;
`;

const EmojiContainerSpan = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;
export default MainStatistic;
