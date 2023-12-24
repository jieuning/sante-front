import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
const useMonthlyDateHandler = (date: Date) => {
  const [targetDate, setTargetDate] = useState(date);

  const handleLeftClick = () => {
    setTargetDate(subMonths(targetDate, 1));
  };

  const handleRightClick = () => {
    setTargetDate(addMonths(targetDate, 1));
  };

  return {
    targetDate,
    onLeftClick: handleLeftClick,
    onRightClick: handleRightClick,
  };
};

export default useMonthlyDateHandler;
