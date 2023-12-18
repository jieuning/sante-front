const getWeekOfMonth = (dateStr: string): number => {
  const date = new Date(dateStr);
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const pastDaysOfMonth =
    (date.getTime() - firstDayOfMonth.getTime()) / 86400000; // 밀리초를 일 단위로 변환

  // 첫 번째 날의 요일과 경과한 일수를 더한 후 7로 나누어서 몇 주차인지 계산
  return Math.ceil((firstDayOfMonth.getDay() + pastDaysOfMonth + 1) / 7);
};

const getToday = (): string => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ('0' + (1 + date.getMonth())).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export { getWeekOfMonth, getToday };
