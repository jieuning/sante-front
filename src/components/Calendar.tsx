import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, startOfMonth, endOfMonth, format } from 'date-fns';
import ColorChip from './ColorChip';
import { Exercise, Food, User } from '../types/user';
import {
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
  packingFoodList,
  packingScheduledDate,
} from '../utils/Date';

interface MonthCalendarProps {
  exerciseList?: Exercise[] | undefined;
  foodList?: Food[] | undefined;
  userData: User | undefined;
  currentDate: Date;
}

interface Tag {
  type: string;
  label: string;
  background: string;
}

export const MonthCalendar = ({
  exerciseList,
  foodList,
  userData,
  currentDate,
}: MonthCalendarProps) => {
  const months: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  const tagsData: Tag[] = [
    { type: 'register', label: '운동등록', background: '#8699FF' },
    { type: 'complete', label: '운동완료', background: '#8699FF' },
    { type: 'normal', label: '칼로리적정', background: '#97F39A' },
    { type: 'excess', label: '칼로리초과', background: '#F39797' },
  ];

  const currentMonth: number = getMonth(currentDate);
  const currentMonthName: string = months[currentMonth];
  const userCalory: number | null = Number(localStorage.getItem('todayCalory'));

  // 해당 월의 시작일과 종료일을 계산
  const startOfCurrentMonth: Date = startOfMonth(currentDate);
  const endOfCurrentMonth: Date = endOfMonth(currentDate);

  const renderCustomDayContents = (date: number) => {
    let exerciseColorChips: JSX.Element | undefined = undefined;
    let foodColorChips: JSX.Element | undefined = undefined;

    // currentDate의 년도와 월을 기준으로 날짜 생성
    const tempDate: Date = new Date(
      `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${date}`
    );

    const dateKey: string = format(tempDate, 'yyyy-MM-dd');

    // 운동 컬러칩
    if (exerciseList !== undefined) {
      const filteredExerciseList = filterExerciseListByDateRange(
        userData?.userExerciseList ?? [],
        startOfCurrentMonth,
        endOfCurrentMonth
      );

      const packedExerciseList = packingScheduledDate(filteredExerciseList);
      // dateKey 배열의 value가 모두 true인지 확인
      const result = packedExerciseList.get(dateKey)?.reduce((acc, curr) => {
        return acc && curr;
      }, true);

      if (result === undefined) {
        exerciseColorChips = undefined;
      } else {
        exerciseColorChips = (
          <ColorChip
            color={result ? '#8699FF' : 'transparent'}
            borderColor="#8699FF"
          />
        );
      }
    }

    // 식단 컬러칩
    if (foodList !== undefined) {
      const filteredFoodList = filterFoodListByDateRange(
        userData?.userFoodList ?? [],
        startOfCurrentMonth,
        endOfCurrentMonth
      );

      const packedFoodList = packingFoodList(filteredFoodList);
      const calory = packedFoodList.get(dateKey);

      if (calory === undefined) {
        foodColorChips = undefined;
      } else {
        foodColorChips = (
          <ColorChip
            color={calory && calory <= userCalory ? '#97F39A' : '#F39797'}
            display={calory !== 0 ? 'flex' : 'none'}
          />
        );
      }
    }

    // 컬러칩 렌더링
    return (
      <>
        <span>{date}</span>
        <ColorChipWrap>
          {exerciseColorChips === undefined && foodColorChips === undefined ? (
            <NoColorChip />
          ) : (
            <>
              {exerciseColorChips}
              {foodColorChips}
            </>
          )}
        </ColorChipWrap>
      </>
    );
  };

  // 데이트픽커 렌더링
  return (
    <MainCalendarContainer>
      <DatePicker
        dateFormat="MM-dd-yyyy"
        onChange={(date) => date}
        inline
        selected={currentDate}
        disabledKeyboardNavigation
        renderDayContents={renderCustomDayContents}
        renderCustomHeader={() => (
          <CustomHeader>{currentMonthName}월</CustomHeader>
        )}
      />
      <ColorChipTagWrap>
        {tagsData.map((tag, index) => (
          <Tag key={tag.type}>
            <ColorChip
              color={
                tagsData[index].type !== 'register'
                  ? tagsData[index].background
                  : 'transparent'
              }
              borderColor={tagsData[index].background}
            />
            <p>{tagsData[index].label}</p>
          </Tag>
        ))}
      </ColorChipTagWrap>
    </MainCalendarContainer>
  );
};

const MainCalendarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .react-datepicker {
    position: sticky;
    top: 200px;
    height: 265px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fefff4;
    border: none;
    border-radius: 15px;
    padding: 20px;
  }

  .react-datepicker__month-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #0f0f0f;
  }

  .react-datepicker__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 0;
  }

  .react-datepicker__current-month {
    font-size: 20px;
  }

  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
    pointer-events: none;
  }

  .react-datepicker__day--outside-month {
    color: #ababab !important;
  }

  .react-datepicker__day-names {
    padding-bottom: 5px;
    margin-bottom: 0;
  }

  .react-datepicker__day-names,
  .react-datepicker__month .react-datepicker__week {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-name:first-child,
  .react-datepicker__week .react-datepicker__day:first-child {
    color: #ff5c00;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: #0f0f0f;
    margin: 0;
    width: 100%;
  }

  .react-datepicker__day--today {
    font-weight: 400;
  }

  .react-datepicker__day--selected {
    background-color: transparent;
    font-weight: 600;
  }

  .react-datepicker__navigation {
    display: none;
  }

  .react-datepicker__day--outside-month div {
    display: none !important;
  }
`;

const CustomHeader = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const ColorChipWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  width: 100%;
`;

const ColorChipTagWrap = styled.div`
  position: sticky;
  top: 474px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;

  @media (max-width: 1024px) {
    gap: 10px;
  }
`;

const NoColorChip = styled.div`
  height: 6px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background-color: var(--gray-light-01);
  border-radius: 30px;
  padding: 6px 0;
`;
