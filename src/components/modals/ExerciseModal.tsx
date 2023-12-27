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
import useButtonHandler from '../../hooks/useButtonHandlerExercise';
import useModifyExercise from '../../hooks/useModifyExercise';
import useDeleteExercise from '../../hooks/useDeleteExercise';

interface ExerciseModalProps {
  exercise?: Exercise;
  isCreateMode: boolean;
}

const hours = [
  { value: 1, label: '1시간' },
  { value: 2, label: '2시간' },
  { value: 3, label: '3시간' },
  { value: 4, label: '4시간' },
  { value: 5, label: '5시간' },
  { value: 6, label: '6시간' },
  { value: 7, label: '7시간' },
  { value: 8, label: '8시간' },
  { value: 9, label: '9시간' },
  { value: 10, label: '10시간' },
  { value: 11, label: '11시간' },
  { value: 12, label: '12시간' },
];

const minutes = [
  { value: 0, label: '0분' },
  { value: 10, label: '10분' },
  { value: 20, label: '20분' },
  { value: 30, label: '30분' },
  { value: 40, label: '40분' },
  { value: 50, label: '50분' },
];

// const exercise: Exercise = {
//   exerciseName: '운동1',
//   exerciseId: 'exercise-20231201',
//   exerciseStartDate: new Date('2023-9-18'),
//   exerciseEndDate: new Date('2024-1-25'),
//   exerciseTime: 60,
//   repeatDate: ['월', '수'],
//   scheduledDate: [
//     { date: new Date('2023-11-30'), isDone: false },
//     { date: new Date('2023-12-02'), isDone: true },
//     { date: new Date('2023-12-03'), isDone: false },
//   ],
// };

// const exercise = null;

const ExerciseModal = ({ modalButton, exerciseData }: ExerciseModalProps) => {
  console.log('check mic test', exerciseData);
  const exercise = exerciseData;
  const [inputValue, setInputValue] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectHour, setSelectHour] = useState<number>(0);
  const [selectMinutes, setSelectMinutes] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState([]);

  const days: Record<number, string> = {
    0: '일',
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
  };

  const generateScheduledDates = (
    startDate: Date,
    endDate: Date,
    repeatDays: string[]
  ) => {
    const scheduledDates: ScheduledDate[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = days[currentDate.getDay()];
      const formattedDate = format(currentDate, 'yyyy-MM-dd');

      if (repeatDays.includes(dayOfWeek)) {
        scheduledDates.push({ date: new Date(formattedDate), isDone: false });
      }

      currentDate.setDate(currentDate.getDate() + 1);
      console.log('currr', formattedDate);
    }

    return scheduledDates;
  };
  const { handleModify } = useModifyExercise();
  const { handleDelete } = useDeleteExercise();
  const handleModifyButtonClick = async () => {
    const scheduleList: ScheduledDate[] = generateScheduledDates(
      startDate,
      endDate,
      selectedDays
    );

    const payload = {
      exerciseId: exercise?.exerciseId,
      exerciseName: inputValue,
      exerciseStartDate: new Date(startDate),
      exerciseEndDate: new Date(endDate),
      exerciseTime: timeToMinute({
        exerciseHour: selectHour,
        exerciseMinute: selectMinutes,
      }),
      repeatDate: selectedDays,
      scheduledDate: scheduleList,
    };
    console.log('sccccheduleList', scheduleList);
    console.log('paaayload', payload);

    await handleModify({ exercise: payload });
    console.log('created');
  };

  const handleCreateButtonClick = () => {
    const scheduleList: ScheduledDate[] = generateScheduledDates(
      startDate,
      endDate,
      selectedDays
    );

    const payload = {
      exerciseName: inputValue,
      exerciseStartDate: new Date(startDate),
      exerciseEndDate: new Date(endDate),
      exerciseTime: timeToMinute({
        exerciseHour: selectHour,
        exerciseMinute: selectMinutes,
      }),
      repeatDate: selectedDays,
      scheduledDate: scheduleList,
    };
    console.log('sccccheduleList', scheduleList);
    console.log('paaayload', payload);

    const { handleCreate } = useButtonHandler({ exercise: payload });
    handleCreate();
  };

  const handleDeleteButtonClick = () => {
    const exerciseId = exercise?.exerciseId;
    console.log('this is ma ID', exerciseId);
    handleDelete(exerciseId);
  };

  const HOUR_IN_MINUTES = 60;
  const divideMinutesAndHour = (exerciseTime: number) => {
    const hour = Math.floor(exerciseTime / HOUR_IN_MINUTES);
    const minutes = exerciseTime % HOUR_IN_MINUTES;
    setSelectHour(hour);
    setSelectMinutes(minutes);
  };

  type exerciseTimeProps = {
    exerciseHour: number;
    exerciseMinute: number;
  };

  const timeToMinute = ({
    exerciseHour,
    exerciseMinute,
  }: exerciseTimeProps) => {
    return exerciseHour * HOUR_IN_MINUTES + exerciseMinute;
  };

  useEffect(() => {
    if (exercise?.exerciseId) {
      exercise?.exerciseName && setInputValue(exercise.exerciseName);
      const newDateRange = [
        new Date(exercise.exerciseStartDate),
        new Date(exercise.exerciseEndDate),
      ];
      setDateRange(newDateRange);
      setSelectedDays(exercise.repeatDate);
      console.log(exercise.exerciseTime);
      divideMinutesAndHour(exercise.exerciseTime);
    } else {
      // 생성 모드에서는 빈 input으로 초기화
      setInputValue('');
      setDateRange([null, null]);
      // setSelectHour(0);
      // setSelectMinutes(0);
    }
  }, [exercise]);

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
      if (selectedDays.length === items.length) {
        setSelectedDays([]);
      } else {
        setSelectedDays([...items]);
      }
      console.log('매일 버튼이 클릭되었습니다.', selectedDays);
    },
    onChange: (day) => {
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
    },
  };
  // const todayString = format(today, 'yyyy.MM.dd부터~ 지정일까지');

  interface ScheduledDate {
    date: Date;
    isDone: boolean;
  }

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
        onClickCreate={() => {
          handleCreateButtonClick();
        }}
        onClickRemove={() => {
          handleDeleteButtonClick();
        }}
        onClickUpdate={() => {
          handleModifyButtonClick();
        }}
        modalButton={modalButton}
      >
        <FlexStyleDiv>
          <RadioStyleDiv>
            <StyledLabel>반복</StyledLabel>
            <CheckButton info={checkButtonInfo} />
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
                placeholder={`${selectHour}시간`}
                width="100%"
                height="4.5rem"
                onChange={(targetValue) => {
                  setSelectHour(Number(targetValue));
                  console.log('hours', selectHour);
                }}
                externalValue={selectHour}
              />
            </MarginSetDiv>
            <SelectBox
              ageOptions={minutes}
              placeholder={`${selectMinutes}분`}
              width="35%"
              height="4.5rem"
              onChange={(targetValue) => {
                setSelectMinutes(Number(targetValue));
                console.log('minutes', selectMinutes);
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
  }import useButtonHandler from './../../hooks/useButtonHandler';

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
