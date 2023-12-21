import styled from 'styled-components';
import { Exercise, Food } from '../types/user';
import Tag from '../components/Tag';
import { DynamicButton, DynamicButtonInfo } from './DynamicButton';
import { GrEdit } from 'react-icons/gr';
import { IoAddCircle, IoTerminalOutline } from 'react-icons/io5';
import { MouseEventHandler, useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import { format } from 'date-fns';

type RoutineType = 'exercise' | 'food';
interface RoutineCardProps {
  type: RoutineType;
  isPlusIconVisible?: boolean;
  exerciseList?: Exercise[] | undefined;
  foodList?: Food[] | undefined;
  date?: Date;
  onClickMore?: (e?: any) => void; //더보기 버튼용
  onClickAdd?: (e?: any) => void; // + 버튼용
}

const RoutineCard = ({
  type,
  exerciseList,
  foodList,
  isPlusIconVisible,
  date,
  onClickMore,
  onClickAdd,
}: RoutineCardProps) => {
  const buttonInfo: DynamicButtonInfo = {
    type: 'outline',
    text: '더보기',
    fontWeight: 'bold',
    onClick: onClickMore,
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checkboxKey: string, isChecked: boolean) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxKey]: isChecked,
    }));
  };

  const initialCheckboxState: { [key: string]: boolean } = {};
  useEffect(() => {
    const initialCheckboxState: { [key: string]: boolean } = {};
    if (type === 'exercise' && exerciseList) {
      exerciseList.forEach((item) => {
        item.scheduledDate?.forEach((scheduled) => {
          const dateKey = format(scheduled.date, 'yyyy-MM-dd');
          const checkboxKey = `${item.exerciseId}-${dateKey}`;
          initialCheckboxState[checkboxKey] = scheduled.isDone ? true : false;
        });
      });
    }
  }, []);

  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>(initialCheckboxState);

  return (
    <Container>
      {type === 'exercise' && (
        <Title>
          <p>🏃 운동</p>
          {isPlusIconVisible && <DynamicButton info={buttonInfo} />}
          {date && <p>{`(${date.getMonth() + 1}.${date.getDate()})`}</p>}
        </Title>
      )}
      {type === 'food' && (
        <Title>
          <p>🍚 식단</p>
          {isPlusIconVisible && <DynamicButton info={buttonInfo} />}
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
            <ContentsContainer key={item.exerciseId}>
              <ContentsName>
                <p>
                  {item.scheduledDate?.map((scheduled) => {
                    const dateKey = format(scheduled.date, 'yyyy-MM-dd');
                    const checkboxKey = `${item.exerciseId}-${dateKey}`;
                    return (
                      <CheckBox
                        key={checkboxKey}
                        checked={checkboxStates[checkboxKey]}
                        onChange={(e) =>
                          handleCheckboxChange(checkboxKey, e.target.checked)
                        }
                      />
                    );
                  })}
                  <span>{text}</span>
                </p>
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
        foodList?.map((item) => (
          <ContentsContainer key={item.foodId}>
            {item.foodList.map((foodItem, index) => (
              <div key={foodItem.foodCategory}>
                <ContentsName>
                  <p>
                    {foodItem.foodCategory}
                    <span>{foodItem.totalCalory} kcal</span>
                  </p>
                  <GrEdit
                    type="button"
                    cursor="pointer"
                    color="var(--black-color)"
                  />
                </ContentsName>
                {foodItem.menu.map((menuItem, index) => (
                  <Tag
                    key={index} // 'id'는 menuItem의 고유 식별자를 가정함
                    text={menuItem.name ?? ''}
                    color="white"
                    backgroundColor="orange"
                  />
                ))}
              </div>
            ))}
          </ContentsContainer>
        ))}
      {type === 'exercise' && isPlusIconVisible && (
        <IconContainer onClick={onClickAdd}>
          <IoAddCircle
            type="button"
            cursor="pointer"
            color="var(--secondary-purple-color)"
            size="3.8rem"
          />
        </IconContainer>
      )}
      {type === 'food' && isPlusIconVisible && (
        <IconContainer onClick={onClickAdd}>
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
    margin-left: 25px;
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
