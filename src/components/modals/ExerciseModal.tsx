import ModalCard from './ModalCard';
import Input from '../Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { SelectBox } from '../SelectBox';
import ko from 'date-fns/locale/ko';

import { CheckButton, InputButtonInfo } from '../../components/RadioButton';
import { addMonths, subMonths, format } from 'date-fns';
import { Exercise } from '../../types/user';
import { useStore } from '../../states/user';
import useCreateExercise from '../../hooks/useCreateExercise';
import useModifyExercise from '../../hooks/useModifyExercise';
import useDeleteExercise from '../../hooks/useDeleteExercise';
type Option = {
  value: string;
  label: string;
};
const hours: Option[] = [
  { value: '1', label: '1시간' },
  { value: '2', label: '2시간' },
  { value: '3', label: '3시간' },
  { value: '4', label: '4시간' },
  { value: '5', label: '5시간' },
  { value: '6', label: '6시간' },
  { value: '7', label: '7시간' },
  { value: '8', label: '8시간' },
  { value: '9', label: '9시간' },
  { value: '10', label: '10시간' },
  { value: '11', label: '11시간' },
  { value: '12', label: '12시간' },
];

const minutes = [
  { value: '0', label: '0분' },
  { value: '10', label: '10분' },
  { value: '20', label: '20분' },
  { value: '30', label: '30분' },
  { value: '40', label: '40분' },
  { value: '50', label: '50분' },
];

interface ExerciseModalProps {
  modalButton: boolean;
}

const ExerciseModal = ({ modalButton }: ExerciseModalProps) => {
  const exerciseData = useStore((state) => state.exerciseData);
  const setModalState = useStore((state) => state.setModalState);
  console.log('check mic test', exerciseData?.exerciseId);
  const [inputValue, setInputValue] = useState<string>('');
  const [dateRange, setDateRange] = useState<(Date | null)[]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectHour, setSelectHour] = useState<number>(0);
  const [selectMinutes, setSelectMinutes] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isNameError, setIsNameError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);

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

  const validate = () => {
    if (inputValue?.trim().length === 0) {
      setIsNameError(true);
    }
    if (!startDate) {
      setIsDateError(true);
    } else {
      setIsDateError(false);
    }
  };
  const { handleModify } = useModifyExercise();
  const { handleCreate } = useCreateExercise();
  const { handleDelete } = useDeleteExercise();
  const handleModifyButtonClick = async () => {
    if (startDate !== null && endDate !== null && selectedDays !== null) {
      const scheduleList: ScheduledDate[] = generateScheduledDates(
        startDate,
        endDate,
        selectedDays
      );

      const payload: Exercise = {
        exerciseId: exerciseData?.exerciseId,
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
      await handleModify({ exercise: payload });
      setModalState('exercise', false);
    }
  };

  const handleCreateButtonClick = async () => {
    validate();
    if (startDate !== null && endDate !== null && selectedDays !== null) {
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

      console.log('inputValue length', inputValue.length);

      await handleCreate({ exercise: payload });
      setModalState('exercise', false);
    }
  };

  const handleDeleteButtonClick = () => {
    const exerciseId = exerciseData?.exerciseId;
    console.log('this is ma ID', exerciseId);
    exerciseId && handleDelete(exerciseId);
    setModalState('exercise', false);
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
    if (exerciseData) {
      exerciseData?.exerciseName && setInputValue(exerciseData.exerciseName);
      if (
        exerciseData.exerciseStartDate &&
        exerciseData.repeatDate &&
        exerciseData.exerciseEndDate &&
        exerciseData.exerciseTime
      ) {
        const newDateRange = [
          new Date(exerciseData.exerciseStartDate),
          new Date(exerciseData.exerciseEndDate),
        ];
        setDateRange(newDateRange);
        setSelectedDays(exerciseData.repeatDate);
        console.log(exerciseData.exerciseTime);
        divideMinutesAndHour(exerciseData.exerciseTime);
      }
    } else {
      // 생성 모드에서는 빈 input으로 초기화
      setInputValue('');
      setDateRange([null, null]);
      // setSelectHour(0);
      // setSelectMinutes(0);
    }
  }, [exerciseData]);

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
    onClickAll: () => {
      if (selectedDays.length === items.length) {
        setSelectedDays([]);
      } else {
        setSelectedDays([...items]);
      }
      console.log('매일 버튼이 클릭되었습니다.', selectedDays);
    },
    onClick: (day) => {
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

  interface ExampleCustomInputProps {
    value?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }

  // eslint-disable-next-line react/display-name, react/prop-types
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick }, ref) => (
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
                width="78%"
                type="text"
                height="4.5rem"
                placeholder="운동 이름을 입력하세요"
                value={inputValue}
                onChange={(value) => {
                  setInputValue(value.toString());
                  console.log(inputValue);
                }}
                errorMessage={
                  isNameError && inputValue?.trim().length === 0
                    ? '운동 이름을 입력해주세요'
                    : undefined
                }
              />
            </InputStyledDiv>
          </>
        }
        onClickCreate={() => handleCreateButtonClick()}
        onClickRemove={() => handleDeleteButtonClick()}
        onClickUpdate={() => handleModifyButtonClick()}
        modalButton={modalButton}
      >
        <GridStyleDiv>
          <div>
            <StyledLabelMargin>반복</StyledLabelMargin>
          </div>
          <div>
            <CheckButton info={checkButtonInfo} />
          </div>
          <div>
            <StyledLabel>기간</StyledLabel>
          </div>
          <FlexStyleDiv>
            <CustomDatePickerWrapper>
              <DatePicker
                locale={ko}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                  console.log('dateRange', dateRange);
                }}
                minDate={minDate}
                maxDate={maxDate}
                isClearable={true}
                dateFormat="yy.MM.dd"
                customInput={<ExampleCustomInput />}
              />
              {isDateError && !startDate && (
                <ErrorMessageSpan>기간을 입력해주세요</ErrorMessageSpan>
              )}
            </CustomDatePickerWrapper>
          </FlexStyleDiv>
          <div>
            <SelectMargin>
              <StyledLabel>시간</StyledLabel>
            </SelectMargin>
          </div>
          <FlexStyleDiv>
            <SelectBetweenMargin>
              <SelectBox
                ageOptions={hours}
                placeholder={`${selectHour}시간`}
                width="14.2vw"
                height="4.5rem"
                onChange={(targetValue) => {
                  setSelectHour(Number(targetValue));
                  console.log('hours', selectHour);
                }}
                externalValue={selectHour}
              />
            </SelectBetweenMargin>
            <SelectBox
              ageOptions={minutes}
              placeholder={`${selectMinutes}분`}
              width="14.2vw"
              height="4.5rem"
              onChange={(targetValue) => {
                setSelectMinutes(Number(targetValue));
                console.log('minutes', selectMinutes);
              }}
              externalValue={selectMinutes}
            />
          </FlexStyleDiv>
        </GridStyleDiv>
      </ModalCard>
    </div>
  );
};

const ErrorMessageSpan = styled.span`
  margin-top: 0.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: start;
`;

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
  width: 29.4vw;
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
  margin-right: 2rem;
`;

const StyledLabelMargin = styled.label`
  font-weight: 600;
  font-size: 1.6rem;
  margin-right: 1.2rem;
`;

const SelectMargin = styled.label`
  margin-top: 12px;
`;

const SelectBetweenMargin = styled.label`
  margin-right: 1vw;
`;

const GridStyleDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-templeate-rows: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FlexStyleDiv = styled.div`
  display: static
  justify-content: cetner;
  align-contents: center;
`;

export default ExerciseModal;
