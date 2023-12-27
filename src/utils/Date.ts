import { User, Exercise, Food, FoodList } from '../types/user';
import {
  startOfMonth,
  getDay,
  addDays,
  lastDayOfMonth,
  endOfMonth,
  format,
  startOfDay,
  isWithinInterval,
} from 'date-fns';

interface StatisticType {
  week: number;
  max: number;
  curr: number;
}

type ExerciseType = 'rate' | 'cnt';

function getWeekOfMonth(date: Date): number {
  const startOfMonthDate = startOfMonth(date);
  const dayOfWeek = getDay(startOfMonthDate);
  const dateDayOfWeek = getDay(date);

  // 주차 계산: 시작 요일과 날짜의 요일 차이를 고려
  return Math.ceil((date.getDate() + dayOfWeek - dateDayOfWeek) / 7);
}

const getMonthlyExerciseRateStatistic = (
  userExerciseList: Exercise[] | undefined,
  targetDate: Date,
  exerciseType: ExerciseType
) => {
  if (userExerciseList === undefined) {
    return;
  }

  const statistic = new Array<StatisticType>();

  // 계산하고 그 주차는 max가 해당 주차에서 그 날까지만임 그걸 위한 '이번 주'를 저장
  //const thisWeek = getWeekOfMonth(date);
  const today = targetDate;

  //여기서 해당 날짜 isDone 체크되어있는지 확인
  //scheduled date 의 날짜와 존재하는 isDone을 키밸류로 저장
  const isDoneDate = packingScheduledDate(userExerciseList);
  if (exerciseType === 'cnt') console.log(isDoneDate);
  let max = 0;
  for (let i = 1; i <= endOfMonth(targetDate).getDate(); i++) {
    const thisDay = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      i
    );
    //console.log(format(thisDay, 'yyyy-MM-dd'));
    const currWeek = getWeekOfMonth(thisDay);
    //주차가 증가하면 새로운 주차 추가
    if (statistic.length < currWeek) {
      statistic.push({
        week: currWeek,
        max: 0,
        curr: 0,
      });
    }

    //여기서 오늘 날짜를 넘어가는지를 체크해서 이후에는 빈값만 추가하면 되는거지 위에 푸쉬되는거 그럼ok
    if (today >= thisDay) {
      const weekIndex = currWeek - 1;
      const dateKey = format(thisDay, 'yyyy-MM-dd');

      const doneAllCnt = isDoneDate?.get(dateKey)?.length ?? 0;

      const doneCnt =
        isDoneDate?.get(dateKey)?.reduce((acc, curr) => {
          if (curr) {
            return acc + 1;
          }
          return acc;
        }, 0) ?? 0;

      //rate는 해당 날짜의 done이 다 되었는지 아닌지만 체크한다.
      const maxCnt =
        exerciseType === 'rate' ? (doneCnt !== 0 ? 0 : 1) : doneAllCnt;
      const currCnt =
        exerciseType === 'rate'
          ? doneCnt === doneAllCnt && doneCnt !== 0
            ? 1
            : 0
          : doneCnt;

      if (statistic[weekIndex].curr + currCnt > max) {
        max = statistic[weekIndex].curr + currCnt;
      }

      statistic[weekIndex] = {
        week: currWeek,
        max: statistic[weekIndex].max + maxCnt,
        curr: statistic[weekIndex].curr + currCnt,
      };
    }
  }
  console.log(statistic);
  const list = statistic.reduce((acc, curr) => {
    if (exerciseType === 'rate') {
      const result = curr.max > 0 ? Math.ceil((curr.curr / curr.max) * 100) : 0;
      acc.push(result ?? 0);
    } else {
      acc.push(Math.ceil((curr.curr / max) * 100));
    }
    return acc;
  }, new Array<number>());
  return {
    list: list,
    result:
      exerciseType === 'rate'
        ? calculateDoneRate(isDoneDate)
        : getSum(statistic),
  };
};

const getMonthlyCaloryTotalStatistic = (
  userFoodList: Food[] | undefined,
  targetDate: Date,
  targetDayCount: number
) => {
  if (userFoodList === undefined) {
    return;
  }

  const statistic = new Array<StatisticType>();

  const packedFoodList = packingFoodList(userFoodList);
  const today = new Date();
  const lastDay = endOfMonth(targetDate).getDate();
  let maxMonthlyCaloryTotal = 0;
  let dayCount = 0;
  let max = 0;
  let allCalory = 0;
  for (let i = 1; i <= lastDay; i++) {
    const thisDay = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      i
    );
    const currWeek = getWeekOfMonth(thisDay);
    //주차가 증가하면 새로운 주차 추가
    if (statistic.length < currWeek) {
      maxMonthlyCaloryTotal = 0;
      dayCount = 0;
      statistic.push({
        week: currWeek,
        max: 0,
        curr: 0,
      });
    }
    if (today >= thisDay) {
      const weekIndex = currWeek - 1;
      dayCount += 1;
      maxMonthlyCaloryTotal +=
        packedFoodList.get(format(thisDay, 'yyyy-MM-dd')) ?? 0;
      if (Math.ceil(maxMonthlyCaloryTotal / dayCount) > max) {
        max = Math.ceil(maxMonthlyCaloryTotal / dayCount);
      }
      allCalory += packedFoodList.get(format(thisDay, 'yyyy-MM-dd')) ?? 0;

      statistic[weekIndex] = {
        week: currWeek,
        max: maxMonthlyCaloryTotal,
        curr: Math.ceil(maxMonthlyCaloryTotal / dayCount),
      };
    }
  }

  const list = statistic.reduce((acc, curr) => {
    const result = curr.max > 0 ? Math.ceil((curr.curr / max) * 100) : 0;
    acc.push(result ?? 0);

    return acc;
  }, new Array<number>());

  return {
    list: list,
    result: Math.ceil(allCalory / targetDayCount),
  };
};

const calculateDoneRate = (scheduledData: Map<string, Boolean[]>) => {
  let total = 0;
  let doneCount = 0;

  scheduledData.forEach((doneArray) => {
    doneArray.forEach((isDone) => {
      if (isDone) {
        doneCount++;
      }
      total++;
    });
  });

  return total > 0 ? Math.ceil((doneCount / total) * 100) : 0;
};

const packingScheduledDate = (userExerciseList: Exercise[]) => {
  return userExerciseList.reduce((acc, exercises) => {
    exercises.scheduledDate?.forEach(({ date, isDone }) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const existingEntries = acc.get(formattedDate) || [];
      acc.set(formattedDate, [...existingEntries, isDone]);
    });
    return acc;
  }, new Map<string, Boolean[]>());
};

const packingFoodList = (userFoodList: Food[]) => {
  return userFoodList.reduce((acc, curr) => {
    const formattedDate = format(curr.createdAt, 'yyyy-MM-dd');
    const sum = curr.foodList.reduce((listAcc, listCurr) => {
      return listAcc + listCurr.totalCalory;
    }, 0);
    return acc.set(formattedDate, sum);
  }, new Map<string, number>());
};
const getAvg = (arr: number[]): number => {
  return Math.ceil(arr.reduce((acc, curr) => acc + curr, 0) / arr.length);
};

const getSum = (arr: StatisticType[]): number => {
  return arr.reduce((acc, curr) => acc + curr.curr, 0);
};

function filterFoodListByDateRange(
  foodList: Food[],
  startDate: Date,
  endDate: Date
) {
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);

  return foodList.filter((food) => {
    const foodDate = startOfDay(new Date(food.createdAt));
    return isWithinInterval(foodDate, { start, end });
  });
}

function filterExerciseListByDateRange(
  exerciseList: Exercise[],
  startDate: Date,
  endDate: Date
): Exercise[] {
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);

  return exerciseList
    .map((exercise) => {
      // 날짜 범위에 맞는 scheduledDate만 필터링
      const filteredScheduledDates = exercise.scheduledDate?.filter(
        (scheduledItem) => {
          const scheduledDate = startOfDay(new Date(scheduledItem.date));
          return isWithinInterval(scheduledDate, { start, end });
        }
      );

      return {
        ...exercise,
        scheduledDate: filteredScheduledDates,
      };
    })
    .filter(
      (exercise) => exercise.scheduledDate && exercise.scheduledDate.length > 0
    );
}

export {
  getWeekOfMonth,
  getMonthlyExerciseRateStatistic,
  getMonthlyCaloryTotalStatistic,
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
  packingScheduledDate,
  packingFoodList,
};

export type { ExerciseType };
