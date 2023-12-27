import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getMonth,
  getDate,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from 'date-fns';
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
  userData: User;
  currentDate: Date;
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

  const tagsData = [
    { type: 'register', label: '운동 등록' },
    { type: 'complete', label: '운동 완료' },
    { type: 'normal', label: '칼로리 적정' },
    { type: 'excess', label: '칼로리 초과' },
  ];

  const currentMonth = getMonth(currentDate);
  const currentMonthName = months[currentMonth];
  const userCalory = userData?.todayCalory ?? 2000;
  // const date = getDate(currentDate);

  // 해당 월의 시작일과 종료일을 계산
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  // 해당 월의 모든 날짜
  const allDatesInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  }).map((allDate) => getDate(allDate));

  const renderCustomDayContents = (date: number) => {
    // 운동 컬러칩
    let exerciseColorChips: JSX.Element | undefined = undefined;
    let foodColorChips: JSX.Element | undefined = undefined;

    const tempDate = new Date(
      `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${date}`
    );
    const dateKey = format(tempDate, 'yyyy-MM-dd');

    if (exerciseList !== undefined) {
      const filteredExerciseList = filterExerciseListByDateRange(
        userData.userExerciseList ?? [],
        startOfCurrentMonth,
        endOfCurrentMonth
      );

      const packedExerciseList = packingScheduledDate(filteredExerciseList);

      const result = packedExerciseList.get(dateKey)?.reduce((acc, curr) => {
        return acc && curr;
      }, true);
      console.log('result', dateKey, result);
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

    if (foodList !== undefined) {
      const filteredFoodList = filterFoodListByDateRange(
        userData.userFoodList ?? [],
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
          />
        );
      }
    }

    return (
      <>
        <span>{date}</span>
        <ColorChipWrap>
          {exerciseColorChips}
          {foodColorChips}
        </ColorChipWrap>
      </>
    );
  };

  return (
    <MainCalendarContainer>
      <DatePicker
        onChange={(date) => console.log(date)}
        inline
        disabledKeyboardNavigation
        renderDayContents={renderCustomDayContents}
        renderCustomHeader={() => (
          <CustomHeader>{currentMonthName}월</CustomHeader>
        )}
      />
      <ColorChipTagWrap>
        {/* {tagsData.map((tag) => (
          <Tag key={tag.type} type={tag.type}>
            {tag.label}
          </Tag>
        ))} */}
      </ColorChipTagWrap>
    </MainCalendarContainer>
  );
};

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

const MainCalendarContainer = styled.div`
  display: inline-block;

  .react-datepicker {
    min-width: 280px;
    min-height: 280px;
    background-color: #fefff4;
    border: none;
    border-radius: 8px;
    padding: 20px;
  }

  .react-datepicker__month-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    gap: 10px;
    margin: 0;
    pointer-events: none;
  }

  .react-datepicker__day--outside-month {
    color: #ababab !important;
  }

  .react-datepicker__day-names {
    padding-bottom: 10px;
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

  .react-datepicker__navigation {
    display: none;
  }
`;

const ColorChipTagWrap = styled.div`
  display: flex;
`;

const Tag = styled.span`
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  margin-right: 8px;

  ${(props) =>
    props.type === 'register' &&
    css`
      background-color: #3498db;
      color: #fff;
    `}

  ${(props) =>
    props.type === 'complete' &&
    css`
      background-color: #2ecc71;
      color: #fff;
    `}

  ${(props) =>
    props.type === 'normal' &&
    css`
      background-color: #e67e22;
      color: #fff;
    `}

  ${(props) =>
    props.type === 'excess' &&
    css`
      background-color: #e74c3c;
      color: #fff;
    `}
`;
