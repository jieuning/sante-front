import { eachWeekOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import styled from 'styled-components';
import { SlArrowLeft } from 'react-icons/sl';

// interface DateSelectProps {
//   currentDate: Date;
//   setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
//   onClick: (e?: any) => void;
// }

export const DateSelect = () => {
  // const oneWeek: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const eachWeek = eachWeekOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  console.log(eachWeek);

  // const day = getDay(currentDate);
  // const currentDayName = oneWeek[day];
  // // 해당 월의 시작일 계산
  // const currentWeek = startOfWeek(currentDate);

  // const handlePrevWeek = () => {
  //   setCurrentDate(subWeeks(currentDate, 1));
  // };

  // const handleNextWeek = () => {
  //   setCurrentDate(addWeeks(currentDate, 1));
  // };

  // // 날짜 클릭시 해당 날짜 배경색 변경
  // const getDayStyle = (day: Date) => {
  //   const isClicked =
  //     currentDate &&
  //     format(currentDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
  //   return {
  //     backgroundColor: isClicked
  //       ? 'var(--primary-color)'
  //       : 'var(--gray-light-01)',
  //   };
  // };

  return (
    <DateSelectContainer>
      <DateTitle>2023.12.18.월</DateTitle>
      <DateSelectWrap>
        {/* prev, next 버튼 */}
        <Button arrowRight />
        <Button arrowLeft rotation={180} />
        <DayOfMonthWrap>
          <WeekOfMonth>
            <Day>1</Day>
            <Day>2</Day>
            <Day>3</Day>
            <Day>4</Day>
            <Day>5</Day>
            <Day>6</Day>
            <Day>7</Day>
          </WeekOfMonth>
        </DayOfMonthWrap>
      </DateSelectWrap>
      <OneWeek></OneWeek>
    </DateSelectContainer>
  );
};

const DateSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  z-index: 2;
  padding: 10px 0;
  position: sticky;
  top: 50px;
  backdrop-filter: blur(20px);
`;

const DateTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  padding-bottom: 30px;
`;

const DateSelectWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 452px;
  position: relative;
`;

const Button = styled(SlArrowLeft)`
  position: absolute;
  left: ${(props) => props.arrowLeft || 0};
  right: ${(props) => props.arrowRight || 0};
  transform: rotate(${(props) => props.rotation || 0}deg);
  width: 20px;
  height: 30px;
  cursor: pointer;
`;

const DayOfMonthWrap = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 30px;
  overflow: hidden;
`;

const WeekOfMonth = styled.ul`
  display: flex;
  font-size: 16px;
  gap: 20px;

  @media (max-width: 412px) {
    gap: 12px;
    algin-items: center;
  }
`;

const Day = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: var(--primary-color) !important;
  }
`;

const OneWeek = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 12px;
  margin-top: 10px;

  li {
    display: flex;
    justify-content: center;
    width: 34px;
  }

  @media (max-width: 412px) {
    gap: 12px;
  }
`;
