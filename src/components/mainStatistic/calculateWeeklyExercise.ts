import { useEffect, useState } from 'react';
import useUserModel, {
  filterExerciseListByDateRange,
} from '../../hooks/useUserModel'; // Path to your useUserModel hook
import { getWeekOfMonth, getToday } from '../../utils/Date'; // Import the utilities
import { isSameDay, startOfWeek, endOfWeek } from 'date-fns';
// import { User, Exercise } from '../../types/user';
import { calculateWeeklyExercise } from './calculateWeeklyExercise';

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

const calculateWeeklyExercise = (todayDate: Date, exerciseList: Exercise[]) => {
  // 이번 주의 시작 날짜와 끝 날짜 계산
  const today = new Date(todayDate); // 현재 날짜를 가져옵니다.
  const startOfThisWeek = startOfWeek(today); // 이번 주의 시작 날짜를 계산합니다.
  const endOfThisWeek = endOfWeek(today); // 이번 주의 종료 날짜를 계산합니다.
  // 이번 주의 모든 날짜를 가져옵니다.
  const exerciseWeekDates = filterExerciseListByDateRange(
    exerciseList,
    startOfThisWeek,
    endOfThisWeek
  );
  console.log('exerciseWeek--', exerciseWeekDates);
  const totalExercise = exerciseWeekDates.scheduledDate.length();
  const exercise = exerciseWeekDates.scheduledDate.filter(
    (item) => item.isDone === true
  ).length;
  console.log('exerciseWeek', exerciseWeekDates);

  return { totalWeekExercise: totalExercise, exericse: exercise };
};

// // scheduleDate에서 이번 주에 등록한 운동만 필터링
// export const scheduledDateList = exerciseList.flatMap((exercise) => {
//   return exercise.scheduledDate;
// }); //NOTE: flatMap안쓰면 이중배열 리턴

//TODO: 운동게이지에 넣기,scheduledDate에 date넣는 함수 추가하기(백?)

export default calculateWeeklyExercise;
