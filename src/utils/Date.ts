import { Exercise, Food } from '../types/user';
import {
  startOfMonth,
  getDay,
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
        exerciseType === 'rate' ? (doneCnt !== 0 ? 1 : 0) : doneAllCnt;
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
  if (exerciseType === 'rate') {
    console.log(statistic);
  }
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
  console.log(userFoodList);
  const statistic = new Array<StatisticType>();

  const packedFoodList = packingFoodList(userFoodList);
  console.log(packedFoodList);
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

    if (targetDate.getMonth() === thisDay.getMonth()) {
      const weekIndex = currWeek - 1;
      dayCount += 1;
      maxMonthlyCaloryTotal +=
        packedFoodList.get(format(thisDay, 'yyyy-MM-dd')) ?? 0;
      if (Math.ceil(maxMonthlyCaloryTotal / dayCount) > max) {
        max = Math.ceil(maxMonthlyCaloryTotal / dayCount);
      }
      allCalory += packedFoodList.get(format(thisDay, 'yyyy-MM-dd')) ?? 0;
      console.log(format(thisDay, 'yyyy-MM-dd'));
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
  console.log(list);
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
      const formattedDate = convertUtcToKstString(date);
      const existingEntries = acc.get(formattedDate) || [];
      acc.set(formattedDate, [...existingEntries, isDone]);
    });
    return acc;
  }, new Map<string, Boolean[]>());
};

function convertUtcToKstString(utcDate: Date) {
  const date = new Date(utcDate);
  const kstDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours() + 9,
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  if (kstDate.getUTCHours() >= 24) {
    kstDate.setUTCDate(kstDate.getUTCDate() + 1);
    kstDate.setUTCHours(kstDate.getUTCHours() - 24);
  }

  return kstDate.toISOString().split('T')[0];
}

const packingFoodList = (userFoodList: Food[]) => {
  return userFoodList.reduce((acc, curr) => {
    const formattedDate = convertUtcToKstString(curr.createdAt);
    const sum = curr.foodList.reduce((listAcc, listCurr) => {
      return listAcc + listCurr.totalCalory;
    }, 0);
    return acc.set(formattedDate, sum);
  }, new Map<string, number>());
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

  if (startDate === endDate) {
    const dateKey = convertUtcToKstString(startDate);
    return foodList.filter((food) => {
      const foodDateKey = convertUtcToKstString(food.createdAt);
      //console.log(addHours(startDate, 9), food.createdAt);
      if (dateKey === foodDateKey) {
        //console.log(dateKey, foodDateKey);
        return true;
      }
      return false;
    });
  }

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
interface WeeklyData {
  done: number;
  total: number;
}

const getWeeksInMonth = (date: Date): number => {
  const lastDayOfMonth = endOfMonth(date);
  return getWeekOfMonth(lastDayOfMonth);
};
const calculateWeeklyAndMonthlyDoneRate = (userExerciseList: Exercise[]) => {
  const scheduledData = packingScheduledDate(userExerciseList);
  const totalWeeks = getWeeksInMonth(new Date());
  const weeklyRates: WeeklyData[] = Array.from({ length: totalWeeks }, () => ({
    done: 0,
    total: 0,
  }));
  let monthlyDoneCount = 0;
  let monthlyTotalCount = 0;

  scheduledData.forEach((doneList, date) => {
    const weekNumber = getWeekOfMonth(new Date(date)) - 1; // 주차를 0부터 시작하도록 조정
    const doneCount = doneList.filter((isDone) => isDone).length;
    monthlyDoneCount += doneCount;
    monthlyTotalCount += doneList.length;

    weeklyRates[weekNumber].done += doneCount;
    weeklyRates[weekNumber].total += doneList.length;
  });

  const weeklyDoneRates = weeklyRates.map((week) =>
    week.total > 0 ? (week.done / week.total) * 100 : 0
  );
  const monthlyDoneRate =
    monthlyTotalCount > 0 ? (monthlyDoneCount / monthlyTotalCount) * 100 : 0;

  return { list: weeklyDoneRates, result: monthlyDoneRate };
};

const calculateWeeklyDoneCountAndRate = (userExerciseList: Exercise[]) => {
  const scheduledData = packingScheduledDate(userExerciseList);
  const totalWeeks = getWeeksInMonth(new Date());
  const weeklyCounts: number[] = Array.from({ length: totalWeeks }, () => 0);
  let monthlyDoneCount = 0;
  let maxWeeklyCount = 0;

  scheduledData.forEach((doneList, date) => {
    const weekNumber = getWeekOfMonth(new Date(date)) - 1; // 주차를 0부터 시작하도록 조정
    const doneCount = doneList.filter((isDone) => isDone).length;
    monthlyDoneCount += doneCount;

    weeklyCounts[weekNumber] += doneCount;
    maxWeeklyCount = Math.max(maxWeeklyCount, weeklyCounts[weekNumber]);
  });

  const weeklyDoneRates = weeklyCounts.map((count) =>
    maxWeeklyCount > 0 ? (count / maxWeeklyCount) * 100 : 0
  );

  return { list: weeklyDoneRates, result: monthlyDoneCount };
};

export {
  calculateWeeklyAndMonthlyDoneRate,
  calculateWeeklyDoneCountAndRate,
  getWeekOfMonth,
  getMonthlyExerciseRateStatistic,
  getMonthlyCaloryTotalStatistic,
  filterExerciseListByDateRange,
  filterFoodListByDateRange,
  packingScheduledDate,
  packingFoodList,
};

export type { ExerciseType };
