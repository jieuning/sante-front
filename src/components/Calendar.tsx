import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth } from 'date-fns';
import ColorChip from './ColorChip';

export interface Diet {
  createdAt?: Date;
  todayCalory?: number;
}

export interface Exercise {
  createdAt?: Date;
  isDone?: boolean;
}

export const MonthCalendar = () => {
  // 운동 테스트 데이터
  const exerciseDummyData: Exercise[] = [
    { createdAt: new Date(), isDone: true },
    { createdAt: new Date(), isDone: false },
    { createdAt: new Date(), isDone: false },
    { createdAt: new Date(), isDone: true },
  ];

  // 식단 테스트 데이터
  const dietDummyData: Diet[] = [
    { createdAt: new Date(), todayCalory: 1500 },
    { createdAt: new Date(), todayCalory: 1800 },
    { createdAt: new Date(), todayCalory: 500 },
    { createdAt: new Date(), todayCalory: 2300 },
  ];

  // exerciseDummyData createdAt에 생성 날짜 + 1씩 증가
  exerciseDummyData.forEach((exercise, index) => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + index);
    exercise.createdAt = nextDay;
  });

  // dietDummyData createdAt에 생성 날짜 + 1씩 증가
  dietDummyData.forEach((diet, index) => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + index);
    diet.createdAt = nextDay;
  });

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

  const currentMonth = getMonth(new Date());
  const currentMonthName = months[currentMonth];

  const renderCustomDayContents = (dayOfMonth?: number) => {
    return (
      <>
        <span>{dayOfMonth}</span>
        <ColorChipWrap>
          {/* 운동 컬러칩 */}
          {exerciseDummyData?.map((exercise: Exercise) => {
            const currentDay = Number(
              exercise.createdAt?.toString().slice(8, 10)
            );
            return currentDay === dayOfMonth ? (
              <ColorChip
                color={exercise.isDone ? '#8699FF' : 'transparent'}
                borderColor="#8699FF"
              />
            ) : null;
          })}
          {/* 식단 컬러칩 */}
          {dietDummyData?.map((diet: Diet) => {
            const currentDay = Number(diet.createdAt?.toString().slice(8, 10));
            const todayCalory = diet.todayCalory;
            return currentDay === dayOfMonth ? (
              <ColorChip
                color={
                  todayCalory && todayCalory >= 1800 ? '#97F39A' : '#F39797'
                }
              />
            ) : null;
          })}
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
