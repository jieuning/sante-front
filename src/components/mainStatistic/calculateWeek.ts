import { useEffect, useState } from 'react';
import useUserModel from '../../hooks/useUserModel'; // Path to your useUserModel hook
import { getWeekOfMonth, getToday } from '../../utils/Date'; // Import the utilities
// import { User, Exercise } from '../../types/user';

//TODO: 주석지우기(내가 보기 편하려고 남겨둠), consoleLog지우기
//NOTE: getWeekOfMonth: 주어진 날짜 문자열의 해당 월에서 몇 번째 주인지 계산하는 함수.
//NOTE: getToday: 현재 날짜를 'yyyy-mm-dd' 형식의 문자열로 반환하는 함수.

// NOTE 예를들어, swim의 startDate와 endDate가 12/18~12/31일이고, repeatDate가 ['월','화','수','목']
// walk의 startDate가 12/18~12/31일이고repeatDate가 ['월'] 이면  총 등록된 횟수는 6(반복일)*2(주)+ 1*2 =12+3=15  인데,
// 오늘이 12/18일이면, 이번주의 총 운동횟수는 7+1=8 로 이걸 maxGage로 사용하고,
// 운동완료로 체크된 횟수를 boolean으로 받아서
// 이번주 true로 되어있는 애를 gage로 넘겨

interface Exercise {
  exerciseName?: string;
  exerciseId?: string;
  exerciseStartDate?: Date;
  exerciseEndDate?: Date;
  exerciseTime?: Date;
  repeatDate?: string[];
  createdAt?: Date;
  lastUpdated?: Date;
  scheduledDate?: Schedule[]; // scheduledDate 속성을 추가함
}

interface Schedule {
  date: Date;
  isDone: boolean;
}

//임시데이터
const exerciseList: Exercise[] = [
  {
    exerciseName: '운동1',
    exerciseId: 'abc1',
    exerciseStartDate: new Date('2023-9-18'),
    exerciseEndDate: new Date('2024-1-25'),
    repeatDate: ['월', '수'],
    scheduledDate: [
      { date: new Date('2023-9-18'), isDone: false },
      { date: new Date('2023-9-20'), isDone: false },
      { date: new Date('2023-9-25'), isDone: false },
      { date: new Date('2023-9-27'), isDone: false },
      { date: new Date('2023-10-2'), isDone: false },
      { date: new Date('2023-10-4'), isDone: false },
      { date: new Date('2023-10-9'), isDone: false },
      { date: new Date('2023-10-11'), isDone: false },
      { date: new Date('2023-10-16'), isDone: false },
      { date: new Date('2023-10-18'), isDone: false },
      { date: new Date('2023-10-23'), isDone: false },
      { date: new Date('2023-10-25'), isDone: false },
      { date: new Date('2023-10-30'), isDone: false },
      { date: new Date('2023-11-1'), isDone: false },
      { date: new Date('2023-11-6'), isDone: false },
      { date: new Date('2023-11-8'), isDone: false },
      { date: new Date('2023-11-13'), isDone: false },
      { date: new Date('2023-11-15'), isDone: false },
      { date: new Date('2023-11-20'), isDone: false },
      { date: new Date('2023-11-22'), isDone: false },
      { date: new Date('2023-11-27'), isDone: false },
      { date: new Date('2023-11-29'), isDone: false },
      { date: new Date('2023-12-4'), isDone: false },
      { date: new Date('2023-12-6'), isDone: false },
      { date: new Date('2023-12-11'), isDone: false },
      { date: new Date('2023-12-13'), isDone: false },
      { date: new Date('2023-12-18'), isDone: false },
      { date: new Date('2023-12-20'), isDone: false },
      { date: new Date('2023-12-25'), isDone: false },
      { date: new Date('2023-12-27'), isDone: false },
      { date: new Date('2023-12-29'), isDone: false },
      { date: new Date('2024-1-3'), isDone: false },
      { date: new Date('2024-1-8'), isDone: false },
      { date: new Date('2024-1-10'), isDone: false },
      { date: new Date('2024-1-15'), isDone: false },
      { date: new Date('2024-1-17'), isDone: false },
      { date: new Date('2024-1-22'), isDone: false },
      { date: new Date('2024-1-24'), isDone: false },
    ],
  },
  // 다른 운동
];

// 이번 주의 시작 날짜와 끝 날짜 계산
const today = new Date();

const startDateOfWeek: Date = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - today.getDay()
);

const thisWeekDatesinTime: number[] = [];

for (let i = 0; i < 7; i++) {
  const newDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    startDateOfWeek.getDate() + i
  );
  const newDateCopy = new Date(newDate);
  newDateCopy.setHours(0, 0, 0, 0);
  const newDateInTime = newDateCopy.getTime();
  thisWeekDatesinTime.push(newDateInTime);
}

// scheduleDate에서 이번 주에 등록한 운동만 필터링
export const scheduledDateList = exerciseList.flatMap((exercise) => {
  return exercise.scheduledDate;
}); //NOTE: flatMap안쓰면 이중배열 리턴

export const thisWeekDateList = scheduledDateList.filter(
  (schedule: Schedule) => {
    const scheduledDate = schedule.date;
    scheduledDate.setHours(0, 0, 0, 0);
    // console.log(
    //   'dateArr',
    //   thisWeekDatesinTime,
    //   'scheduledDate',
    //   scheduledDate,
    //   'inTime--',
    //   scheduledDate.getTime(),
    //   'include',
    //   thisWeekDatesinTime.includes(scheduledDate.getTime())
    // );
    return thisWeekDatesinTime.includes(scheduledDate.getTime());
  }
);

//TODO: 운동게이지에 넣기,scheduledDate에 date넣는 함수 추가하기
