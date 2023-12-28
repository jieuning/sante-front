import { useState } from 'react';

const CaloryRecommend = () => {
  const [recommendCalory, setRecommendCalory] = useState<number>(0);
  const selectedGender = localStorage.getItem('gender');
  const selectedAge = localStorage.getItem('age');

  let calory: number = 0;
  switch (selectedGender) {
    case '남성':
      switch (selectedAge) {
        case '1':
          calory = 2500;
          break;
        case '2':
          calory = 3000;
          break;
        case '3':
          calory = 3000;
          break;
        case '4':
          calory = 2500;
          break;
        case '5':
          calory = 2300;
          break;
        case '6':
          calory = 2000;
          break;
      }
      break;
    case '여성':
      switch (selectedAge) {
        case '1':
          calory = 2200;
          break;
        case '2':
          calory = 2300;
          break;
        case '3':
          calory = 2200;
          break;
        case '4':
          calory = 2000;
          break;
        case '5':
          calory = 1800;
          break;
        case '6':
          calory = 1500;
          break;
      }
      break;
  }
  console.log(calory);
  setRecommendCalory(calory);
  console.log(recommendCalory);
};

export default CaloryRecommend;
