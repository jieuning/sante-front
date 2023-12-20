import styled from 'styled-components';
import { Exercise, Food } from '../types/user';
import Tag from '../components/Tag';
import { DynamicButton, DynamicButtonInfo } from './DynamicButton';
import { GrEdit } from 'react-icons/gr';
import { IoAddCircle } from 'react-icons/io5';
import { MouseEventHandler } from 'react';

type RoutineType = 'exercise' | 'food';
interface RoutineCardProps {
  type: RoutineType;
  exerciseList?: Exercise[] | undefined;
  foodList?: Food[] | undefined;
}

const RoutineCard = ({ type, exerciseList, foodList }: RoutineCardProps) => {
  const buttonInfo: DynamicButtonInfo = {
    type: 'outline',
    text: '더보기',
    fontWeight: 'bold',
    onClick: () => console.log('Button clicked!'),
  };

  const handlePlusIconClick = (e: MouseEventHandler<HTMLDivElement>) => {
    console.log('icon click');
  };

  return (
    <Container>
      {type === 'exercise' && (
        <Title>
          <p>🏃 운동</p>
          <DynamicButton info={buttonInfo} />
        </Title>
      )}
      {type === 'food' && (
        <Title>
          <p>🍚 식단</p>
          <DynamicButton info={buttonInfo} />
        </Title>
      )}
      <Line />
      {type === 'exercise' &&
        exerciseList?.map((item) => {
          let text = '';
          if (type === 'exercise' && 'exerciseName' in item) {
            text = item.exerciseName ?? '기본 운동 이름';
          }

          return (
            <ContentsContainer key={(item as Exercise).exerciseId}>
              <ContentsName>
                <p>{text}</p>
                <GrEdit
                  type="button"
                  cursor="pointer"
                  color="var(--black-color)"
                />
              </ContentsName>
              <Tag
                text={item.repeatDate?.join(',') ?? ''}
                color={'white'}
                backgroundColor={'purple'}
              ></Tag>
              <Tag
                text={calculateDDay(item.exerciseEndDate ?? new Date())}
                color={'white'}
                backgroundColor={'purple'}
              ></Tag>
              <Tag
                text={getTimeFromMinutes(item.exerciseTime ?? 0)}
                color={'white'}
                backgroundColor={'purple'}
              ></Tag>
            </ContentsContainer>
          );
        })}

      {type === 'food' &&
        foodList?.map((item) => {
          let text = '';
          if (type === 'food' && 'foodCategory' in item) {
            text = item.foodCategory ?? '기본 식품 이름';
          }
          return (
            <ContentsContainer key={(item as Food).foodId}>
              <ContentsName>
                <p>
                  {text}
                  <span>
                    {item.foodList?.reduce(
                      (acc, curr) => acc + (curr.calory ?? 0),
                      0
                    )}
                    kcal
                  </span>
                </p>
                <GrEdit
                  type="button"
                  cursor="pointer"
                  color="var(--black-color)"
                />
              </ContentsName>
              {item.foodList?.map((foodItem) => {
                return (
                  <Tag
                    text={foodItem.name ?? ''}
                    color={'white'}
                    backgroundColor={'orange'}
                  ></Tag>
                );
              })}
            </ContentsContainer>
          );
        })}
      {type === 'exercise' && (
        <IconContainer onClick={handlePlusIconClick}>
          <IoAddCircle
            type="button"
            cursor="pointer"
            color="var(--secondary-purple-color)"
            size="3.8rem"
          />
        </IconContainer>
      )}
      {type === 'food' && (
        <IconContainer onClick={handlePlusIconClick}>
          <IoAddCircle
            type="button"
            cursor="pointer"
            color="var(--secondary-orange-color)"
            size="3.8rem"
          />
        </IconContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1.3rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const ContentsContainer = styled.div`
  margin: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Line = styled.div`
  margin: 2px 0 2px 0;
  border: solid 1px var(--gray-light);
  transform: scaleY(0.1);
`;

const Title = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--black-color);

  p {
    margin-right: 10px;
  }
`;

const ContentsName = styled.div`
  font-size: 14px;
  margin: 4px;
  display: flex;
  justify-content: space-between;
  color: var(--black-color);
  p > span {
    margin-left: 10px;
  }
`;

const calculateDDay = (targetDate: Date) => {
  // 현재 날짜 (오늘)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 대상 날짜
  const date = new Date(targetDate);
  date.setHours(0, 0, 0, 0);

  // 두 날짜의 차이를 밀리초 단위로 계산
  const difference = date.getTime() - today.getTime();

  // 밀리초를 일 단위로 변환
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return '마감';
  } else {
    return `D-${days}`;
  }
};

const getTimeFromMinutes = (minutes: number): string => {
  const hour = Math.floor(minutes / 60);
  const min = minutes % 60;

  if (hour === 0) {
    return `${min < 10 ? '0' + min : min}분`;
  } else if (min === 0) {
    return `${hour}시간`;
  } else {
    return `${hour}시간${min}분`;
  }
};
export default RoutineCard;
