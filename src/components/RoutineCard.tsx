import styled from 'styled-components';
import { Exercise, Food } from '../types/user';
import Tag from '../components/Tag';
import { DynamicButton, DynamicButtonInfo } from './DynamicButton';
import { GrEdit } from 'react-icons/gr';
import { IoAddCircle } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import { format } from 'date-fns';
import {
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
} from '../utils/Date';
import useCheckboxHandler from '../hooks/useCheckboxHandler';
import { useNavigate } from 'react-router-dom';
import { useStore, Store } from '../states/user';

type RoutineType = 'exercise' | 'food';
interface RoutineCardProps {
  type: RoutineType;
  isMain?: boolean;
  exerciseList?: Exercise[];
  foodList?: Food[] | undefined;
  date: Date;
  onClickMore?: (e?: any) => void; //더보기 버튼용
  onClickAdd?: (e?: any) => void; // + 버튼용
  onClickEdit?: (e?: any) => void; // 수정 버튼용
}
const initialCheckboxState: { [key: string]: boolean } = {};
const RoutineCard = ({
  type,
  exerciseList,
  foodList,
  date,
  isMain,
  onClickAdd,
  onClickEdit,
}: RoutineCardProps) => {
  const navigate = useNavigate();
  const exerciseButtonInfo: DynamicButtonInfo = {
    type: 'outline',
    text: '더보기',
    fontWeight: 'bold',
    onClick: () => {
      const newUrl = '/list?category=운동';
      navigate(newUrl);
    },
  };
  const foodButtonInfo: DynamicButtonInfo = {
    type: 'outline',
    text: '더보기',
    fontWeight: 'bold',
    onClick: () => {
      const newUrl = '/list?category=식단';
      navigate(newUrl);
    },
  };

  if (type === 'exercise' && exerciseList) {
    exerciseList.forEach((item) => {
      item.scheduledDate?.forEach((scheduled) => {
        const dateKey = format(scheduled.date, 'yyyy-MM-dd');
        const checkboxKey = `${item.exerciseId}-${dateKey}`;
        initialCheckboxState[checkboxKey] = scheduled.isDone ? true : false;
      });
    });
  }

  const setFoodId = useStore((state: Store) => state.setFoodId);

  const [isExist, setIsExist] = useState(false);
  const [checkboxStates, handleCheckboxChange] =
    useCheckboxHandler(initialCheckboxState);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

  const handleCheckboxChangeEvent = async (
    checkboxKey: string,
    isChecked: boolean
  ) => {
    //여기서 put 작업을 해야하는데... get and put 하면 되려나
    handleCheckboxChange(checkboxKey, isChecked);
  };
  useEffect(() => {
    if (type === 'food' && foodList) {
      const filtered = filterFoodListByDateRange(foodList, date, date);
      const checkList = filtered.length > 0 && filtered[0].foodList.length > 0; //메뉴 데이터 있음
      setIsExist(checkList);
      if (checkList) {
        setFoodId(filtered[0].foodId);
      } else {
        setFoodId(new Date().getTime().toString());
      }
      setFilteredFoods(filtered);
    } else {
      setFoodId(new Date().getTime().toString());
    }
    if (type === 'exercise' && exerciseList) {
      const filtered = filterExerciseListByDateRange(exerciseList, date, date);
      setIsExist(filtered.length > 0);
      setFilteredExercises(filtered);
    }
  }, [exerciseList, foodList, date]);

  if (!isExist && !isMain) return null;

  return (
    <Container>
      {type === 'exercise' && (
        <Title>
          <p>🏃 운동</p>
          {isMain && <DynamicButton info={exerciseButtonInfo} />}
          {!isMain && <p>{`(${date.getMonth() + 1}.${date.getDate()})`}</p>}
        </Title>
      )}
      {type === 'food' && (
        <Title>
          <p>🍚 식단</p>
          {isMain && <DynamicButton info={foodButtonInfo} />}
          {!isMain && <p>{`(${date.getMonth() + 1}.${date.getDate()})`}</p>}
        </Title>
      )}
      <Line />
      {type === 'exercise' &&
        filteredExercises?.map((item) => {
          let text = '';
          if (type === 'exercise' && 'exerciseName' in item) {
            text = item.exerciseName ?? '기본 운동 이름';
          }
          const dateKey = format(date ?? new Date(), 'yyyy-MM-dd');
          const checkboxKey = `${item.exerciseId}-${dateKey}`;

          return (
            <ContentsContainer key={item.exerciseId}>
              <ContentsName>
                <p>
                  {
                    <CheckBox
                      key={checkboxKey}
                      checked={checkboxStates[checkboxKey]}
                      onChange={(e) =>
                        handleCheckboxChangeEvent(checkboxKey, e.target.checked)
                      }
                    />
                  }

                  <span>{text}</span>
                </p>
                <GrEdit
                  type="button"
                  cursor="pointer"
                  color="var(--black-color)"
                  onClick={() => onClickEdit && onClickEdit(item)}
                />
              </ContentsName>
              <TagContainer>
                {item.repeatDate !== undefined && (
                  <Tag
                    text={getRepeatDayString(item.repeatDate)}
                    color={'white'}
                    backgroundColor={'purple'}
                  ></Tag>
                )}
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
              </TagContainer>
            </ContentsContainer>
          );
        })}

      {type === 'food' &&
        filteredFoods?.map((item) => (
          <ContentsContainer key={item.foodId}>
            {item.foodList.map((foodItem) => (
              <div key={foodItem.foodCategory}>
                <ContentsName>
                  <p>
                    <span>{foodItem.foodCategory}</span>
                    <span>{foodItem.totalCalory} kcal</span>
                  </p>
                  <GrEdit
                    type="button"
                    cursor="pointer"
                    color="var(--black-color)"
                    onClick={() =>
                      onClickEdit && onClickEdit([foodItem, item.foodId])
                    }
                  />
                </ContentsName>
                <TagContainer>
                  {foodItem.menu.map((menuItem, index) => (
                    <Tag
                      key={index} // 'id'는 menuItem의 고유 식별자를 가정함
                      text={menuItem.name ?? ''}
                      color="white"
                      backgroundColor="orange"
                    />
                  ))}
                </TagContainer>
              </div>
            ))}
          </ContentsContainer>
        ))}
      {type === 'exercise' && isMain && (
        <IconContainer onClick={onClickAdd}>
          <IoAddCircle
            type="button"
            cursor="pointer"
            color="var(--secondary-purple-color)"
            size="3.8rem"
          />
        </IconContainer>
      )}
      {type === 'food' && isMain && (
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

const TagContainer = styled.div`
  margin-top: 5px;
  margin-left: 25px;
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

const getRepeatDayString = (repeatDay: string[]): string => {
  if (repeatDay.length === 7) {
    return '매일';
  } else if (
    repeatDay.length === 5 &&
    !repeatDay.includes('토') &&
    !repeatDay.includes('일')
  ) {
    return '주중';
  } else if (repeatDay.includes('토') && repeatDay.includes('일')) {
    return '주말';
  }
  return repeatDay.join(',');
};

export default RoutineCard;
