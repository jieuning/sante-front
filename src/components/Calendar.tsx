import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth } from 'date-fns';

export const MonthCalendar = () => {
  const months = [
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

  return (
    <MainCalendarContainer>
      <DatePicker
        onChange={(date) => console.log(date)}
        inline
        disabledKeyboardNavigation
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
    gap: 15px;
    margin: 0;
    pointer-events: none;
  }

  .react-datepicker__day--outside-month {
    color: #ababab !important;
  }

  .react-datepicker__day-names {
    padding-bottom: 10px;
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
  }

  .react-datepicker__navigation {
    display: none;
  }
`;
