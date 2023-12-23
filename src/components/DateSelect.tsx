import {
  startOfWeek,
  format,
  addDays,
  getDay,
  subWeeks,
  addWeeks,
} from 'date-fns';
import { useState } from 'react';
import styled from 'styled-components';
import { SlArrowLeft } from 'react-icons/sl';

export const DateSelect = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const oneWeek: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const day = getDay(currentDate);
  const currentDayName = oneWeek[day];

  //해당 월의 주를 arr로 반환해줌
  //하지만 주를 전부 반환하는게 아니라 주의 첫번째 날짜(일요일)만 반환해줌..
  //해당 주의 날짜를 추가해 줘야함
  const currentWeek = startOfWeek(currentDate);

  //날짜 클릭 이벤트
  const handleDayOnClick = (day: Date) => {
    setCurrentDate(day);
  };

  const handlePrevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  // 날짜 클릭시 해당 날짜 배경색 변경
  const getDayStyle = (day: Date) => {
    const isClicked =
      currentDate &&
      format(currentDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    return {
      backgroundColor: isClicked
        ? 'var(--primary-color)'
        : 'var(--gray-light-01)',
    };
  };

  return (
    <DateSelectContainer>
      <DateTitle>
        {format(currentDate, `yyyy.MM.dd.${currentDayName}`)}
      </DateTitle>
      <DateSelectWrap>
        {/* 네비게이션 버튼 */}
        <Button arrowRight onClick={handlePrevWeek} />
        <Button arrowLeft rotation={180} onClick={handleNextWeek} />
        <DayOfMonthWrap>
          <WeekOfMonth>
            {oneWeek.map((week, index) => {
              // 주에 dayIndex 만큼 날짜를 추가해 줌
              // dayOfWeek가 일주일(7일)이기 때문에 7번 추가
              const addDate = addDays(currentWeek, index);
              return (
                <Day
                  key={addDate.getTime()}
                  style={getDayStyle(addDate)}
                  onClick={() => handleDayOnClick(addDate)}
                >
                  {/* 날짜만 렌더링 */}
                  {format(addDate, 'd')}
                </Day>
              );
            })}
          </WeekOfMonth>
        </DayOfMonthWrap>
      </DateSelectWrap>
      <OneWeek>
        {oneWeek.map((dayOfWeek, index) => (
          <li key={index}>{dayOfWeek}</li>
        ))}
      </OneWeek>
    </DateSelectContainer>
  );
};

const DateSelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  padding-bottom: 30px;
`;

const DateSelectWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 438px;
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
  gap: 20px;
  width: 358px;
  overflow: hidden;
`;

const WeekOfMonth = styled.ul`
  display: flex;
  font-size: 16px;
  gap: 20px;
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
  gap: 43px;
  width: 358px;
  font-size: 12px;
  margin-top: 10px;
`;