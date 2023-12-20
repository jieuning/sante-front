import styled from 'styled-components';
import GageBar from './GageBar';
import { useState, useEffect } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import useUserModel from '../../hooks/useUserModel';
import { User, Exercise, Food, FoodItem } from '../../types/user';
// import { getColorValue } from '../../types/colorType';
import { scheduledDateList, thisWeekDateList } from './calculateWeek';

const MainStatistic = () => {
  const caloryMoods = {
    notEnough: { emoji: '🥺', message: '끼니 거르고 계신거 아니죠?ㅜㅜ' },
    enough: { emoji: '😊', message: '잘 먹고 있어요!' },
    tooMuch: { emoji: '😵', message: '기준치를 초과했어요' },
  };
  const [caloryMood, setCaloryMood] = useState(caloryMoods.notEnough);
  const [exerciseGage, setExerciseGage] = useState(0);
  const [foodGage, setFoodGage] = useState(0);
  const [userCalory, setUserCalory] = useState(1500);

  const user: User | undefined = useUserModel();

  // useEffect(() => {
  //   console.log('exercises', scheduledDateList);
  //   console.log('exercisesThisWeek', thisWeekDateList);
  //   if (user) {
  //     const userData = user.user;
  //     setUserCalory(userData.todayCalory);
  //     const userFoodData = userData.userFoodList;
  //     const userExerciseData = userData.userExerciseList;

  //     const handleCalory = () => {
  //       console.log('user', userData);
  //       userFoodData.forEach((food: Food) => {
  //         console.log('food', food);
  //         const calculatedCalory = food.foodList.reduce(
  //           (acc: number, item: FoodItem) => {
  //             return acc + item.calory;
  //           },
  //           0
  //         );
  //         setFoodGage(calculatedCalory);
  //       });
  //     };

  //     handleCalory();
  //     //NOTE 백엔드 API에서 데이터 가져오기
  //     console.log('userCalory', userCalory);
  //   }
  // }, [user]);

  // const user1 = {
  //   email: 'example@example.com',
  //   password: 'password123',
  //   gender: 'Male',
  //   age: '30',
  //   userFoodList: [
  //     {
  //       foodList: [
  //         {
  //           name: 'Pizza',
  //           calory: 285,
  //         },
  //         {
  //           name: 'Salad',
  //           calory: 150,
  //         },
  //       ],
  //       foodCategory: 'Fast Food',
  //     },
  //   ],
  //   userExerciseList: [], // exerciseList를 기반으로 데이터 추가
  //   todayCalory: null,
  // };

  //NOTE: 기준 80%

  const buttonInfo: DynamicButtonInfo = {
    type: 'outline',
    text: '통계 상세보기',
    onClick: () => console.log('Button clicked!'),
  };

  const handleCaloryGage = (currentGage: number) => {
    let newCaloryMood = { ...caloryMood };
    if (currentGage === 80) {
      newCaloryMood = caloryMoods.enough;
    } else if (currentGage > 80) {
      newCaloryMood = caloryMoods.tooMuch;
    } else {
      newCaloryMood = caloryMoods.notEnough;
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
              {/* <GageBar gage={exerciseGage} type="exercise" /> */}
            </FlexContainerDiv>
            <FlexContainerDiv>
              <TextContainerDiv>하루 섭취 칼로리</TextContainerDiv>
              <br />
              <GageBar
                gage={foodGage}
                maxGage={userCalory}
                type="food"
                handleGage={handleCaloryGage}
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
  background-color: #FFFFF;
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
