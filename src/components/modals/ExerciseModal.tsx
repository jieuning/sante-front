import ModalCard from './ModalCard';
import Input from '../Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SetStateAction, useState, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import SelectBox from '../SelectBox';
import ko from 'date-fns/locale/ko';

import {
  CheckButton,
  RadioButton,
  InputButtonInfo,
} from '../../components/RadioButton';
import { addMonths, subMonths, isAfter, isBefore, format } from 'date-fns';
import { Exercise } from '../../types/user';

interface ExerciseModalProps {
  // exercise?: Exercise;
}

const hours = [
  { value: '1시간', label: '1시간' },
  { value: '2시간', label: '2시간' },
  { value: '3시간', label: '3시간' },
  { value: '4시간', label: '4시간' },
  { value: '5시간', label: '5시간' },
  { value: '6시간', label: '6시간' },
  { value: '7시간', label: '7시간' },
  { value: '8시간', label: '8시간' },
  { value: '9시간', label: '9시간' },
  { value: '10시간', label: '10시간' },
  { value: '11시간', label: '11시간' },
  { value: '12시간', label: '12시간' },
];

const minutes = [
  { value: '0분', label: '0분' },
  { value: '10분', label: '10분' },
  { value: '20분', label: '20분' },
  { value: '30분', label: '30분' },
  { value: '40분', label: '40분' },
  { value: '50분', label: '50분' },
];

// const exercise: Exercise = {
//   exerciseName: '운동1',
//   exerciseId: 'abc1',
//   exerciseStartDate: new Date('2023-9-18'),
//   exerciseEndDate: new Date('2024-1-25'),
//   repeatDate: ['월', '수'],
//   scheduledDate: [
//     { date: new Date('2023-11-30'), isDone: false },
//     { date: new Date('2023-12-02'), isDone: true },
//     { date: new Date('2023-12-03'), isDone: false },
//   ],
// };

// const exerciseList: Exercise[] = [
//   {
//     exerciseName: '운동1',
//     exerciseId: 'abc1',
//     exerciseStartDate: new Date('2023-9-18'),
//     exerciseEndDate: new Date('2024-1-25'),
//     repeatDate: ['월', '수'],
//     scheduledDate: [
//       { date: new Date('2023-11-30'), isDone: false },
//       { date: new Date('2023-12-02'), isDone: true },
//       { date: new Date('2023-12-03'), isDone: false },
//     ],
//   },
//   {
//     exerciseName: '운동2',
//     exerciseId: 'abc13',
//     exerciseStartDate: new Date('2023-9-18'),
//     exerciseEndDate: new Date('2024-1-25'),
//     repeatDate: ['월', '수'],
//     scheduledDate: [
//       { date: new Date('2023-11-30'), isDone: true },
//       { date: new Date('2023-12-02'), isDone: true },
//       { date: new Date('2023-12-03'), isDone: false },
//     ],
//   },
//   // 다른 운동
// ];

const exercise = null;

// { exercise }: ExerciseModalProps

const ExerciseModal = () => {
  const [inputValue, setInputValue] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectHour, setSelectHour] = useState<string>('0시간');
  const [selectMinutes, setSelectMinutes] = useState<string>('0분');
  const [selectedDays, setSelectedDays] = useState([]);

  const filterExercisesByName = (exercises: Exercise[], name: string) => {
    return exercises.filter((exercise) => exercise.exerciseName === name);
  };

  // useEffect(() => {
  // if (user) {
  //   const userExerciseData = user.userExerciseList;
  //   filterExercisesByName(userExerciseData);
  // }

  // props로 전달된 data가 있을 경우, 해당 데이터를 input에 설정
  //   if (exercise?.exerciseId) {
  //     exercise?.exerciseName && setInputValue(exercise.exerciseName);
  //     const newDateRange = [
  //       exercise.exerciseStartDate,
  //       exercise.exerciseEndDate,
  //     ];
  //     setDateRange(newDateRange);
  //     setSelectedDays(exercise.repeatDate); //시간이 없는데?
  //   } else {
  //     // 생성 모드에서는 빈 input으로 초기화
  //     setInputValue('');
  //   }
  // }, []);

  const today = new Date();
  const minDate = subMonths(today, 1);
  const maxDate = addMonths(today, 1);

  const items = ['월', '화', '수', '목', '금', '토', '일'];
  const checkButtonInfo: InputButtonInfo = {
    type: 'checkbox',
    size: 'circle',
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    value: selectedDays,
    items: items,
    onClick: () => {
      // 매일 버튼 클릭 처리 로직
      // if (selectedDays.length === items.length) {
      //   setSelectedDays([]);
      // } else {
      //   setSelectedDays([...items]);
      // }
      // console.log('매일 버튼이 클릭되었습니다.', selectedDays);
    },
    onChange: (day) => {
      console.log('whatday', day);

      if (selectedDays.includes(day)) {
        setSelectedDays(
          selectedDays.filter((selectedDay) => selectedDay !== day)
        );
      } else {
        if (items.includes(day)) {
          console.log(`${day} 들어갔다`);
          setSelectedDays([...selectedDays, day]);
        }
      }

      console.log('=====selected====', selectedDays);
    },
  };
  // const todayString = format(today, 'yyyy.MM.dd부터~ 지정일까지');

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <StyledButton
      value={value}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
    >
      {value ? value : <GrayStyledSpan>오늘부터 ~ 지정일까지</GrayStyledSpan>}
    </StyledButton>
  ));

  console.log('dateRange2', dateRange, 'start', startDate, 'end', endDate);
  return (
    <div>
      <ModalCard
        modalTitle="🏃 운동"
        inputElement={
          <>
            <InputStyledDiv>
              <Input
                name="exerciseName"
                width="80%"
                height="4.5rem"
                placeholder="운동 이름을 입력하세요"
                value={inputValue}
                onChange={(value) => {
                  setInputValue(value);
                  console.log(inputValue);
                }}
              />
            </InputStyledDiv>
            <br />
          </>
        }
        modalButton={(exercise && true) || false}
      >
        <FlexStyleDiv>
          <RadioStyleDiv>
            <StyledLabel>반복</StyledLabel>
            <CheckButton
              info={checkButtonInfo}
              style={{ backgroundColor: 'blue' }}
            />
          </RadioStyleDiv>
          <SelectStyleDiv>
            <StyledLabel>기간</StyledLabel>
            <CustomDatePickerWrapper>
              <DatePicker
                locale={ko}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update: SetStateAction<null[]>) => {
                  setDateRange(update);
                  console.log('dateRange', dateRange);
                }}
                minDate={minDate}
                maxDate={maxDate}
                isClearable={true}
                dateFormat="yy.MM.dd"
                customInput={<ExampleCustomInput />}
              />
            </CustomDatePickerWrapper>
          </SelectStyleDiv>
          <SelectStyleDiv>
            <StyledLabel>시간</StyledLabel>
            <MarginSetDiv>
              <SelectBox
                ageOptions={hours}
                placeholder="1시간"
                width="100%"
                height="4.5rem"
                onChange={(targetValue) => {
                  setSelectHour(targetValue);
                  console.log(selectHour);
                }}
                externalValue={selectHour}
              />
            </MarginSetDiv>
            <SelectBox
              ageOptions={minutes}
              placeholder="30분"
              width="35%"
              height="4.5rem"
              onChange={(targetValue) => {
                setSelectMinutes(targetValue);
                console.log(selectMinutes);
              }}
              externalValue={selectMinutes}
            />
          </SelectStyleDiv>
        </FlexStyleDiv>
      </ModalCard>
    </div>
  );
};

const GrayStyledSpan = styled.span`
  color: var(--gray-color);
`;

const CustomDatePickerWrapper = styled.div`
  position: relative;
  .react-datepicker {
    transform: scale(1.4);
    transform-origin: top left; 
    position: absolute;
    top: 100%; // 적절한 값으로 조정
    left: 0; // 적절한 값으로 조정

   
  }

  .react-datepicker__triangle,
  .react-datepicker__triangle::before,
  .react-datepicker__triangle::after {
    display: none;
  }

  .react-datepicker input {
    position: static;
    transform: scale(0.833);
    transform-origin: left center;
  }

  .react-datepicker__navigation {
    transform: scale(0.5);
  }

  .react-datepicker__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 100%;
    background-color: transparent;
    border: none;
  }

  .react-datepicker__day:hover {
    background-color: var(--secondary-purple-color);
  }

  .react-datepicker__current-month {
    position: relative;
    top: 0.3rem;
  }

  .react-datepicker__close-icon:: after{
    background-color: var(--primary-color)
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--in-range {
    background-color: var(--primary-color);
  }

  .react-datepicker__day--outside-month {
    color: #ababab !important;
  }
  .react-datepicker__day--keyboard-selected {
   color: white;
  }


  }
`;

const StyledButton = styled.button`
  width: 22vw;
  height: 4.5rem;
  border: 1px solid #bebebe;
  outline: none;
  border-radius: 10px;
  background: #fff;
  padding: 1rem;
  padding-right: ${({ value }) => value && '3rem'};

  &:focus {
    border: 1px solid #81d8d0;
  }
`;

const MarginSetDiv = styled.span`
  width: 35%;
  margin-right: 1rem;
`;

const InputStyledDiv = styled.div`
  margin-right: 2.5rem;
  margin-left: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: 0.5px;
  margin-right: 1rem;
`;

const FlexStyleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;
const RadioStyleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectStyleDiv = styled.div`
  display: flex;
  align-items: center;
  width: 83%;
  justify-content: center;
`;

export default ExerciseModal;
