import ModalCard from './ModalCard';
import Input from '../Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SetStateAction, useState, forwardRef } from 'react';
import styled from 'styled-components';
import SelectBox from '../SelectBox';
import ko from 'date-fns/locale/ko';

import {
  CheckButton,
  RadioButton,
  InputButtonInfo,
} from '../../components/RadioButton';
import { addMonths, subMonths, isAfter, isBefore, format } from 'date-fns';

const checkButtonInfo: InputButtonInfo = {
  type: 'checkbox',
  size: 'circle',
  backgroundColor: 'gray',
  color: 'white',
  fontWeight: 'bold',
  value: [],
  items: ['월', '화', '수', '목', '금', '토', '일'],
  onClick: () => {
    // 버튼 클릭 처리
    console.log('버튼이 클릭되었습니다!');
  },
};

let hours = [];
for (let i = 1; i <= 12; i++) {
  hours.push({ value: `${i}시간`, label: `${i}시간` });
} //useMemo

const minutes = [
  { value: '0분', label: '0분' },
  { value: '10분', label: '10분' },
  { value: '20분', label: '20분' },
  { value: '30분', label: '30분' },
  { value: '40분', label: '40분' },
  { value: '50분', label: '50분' },
];
const ExerciseModal = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const today = new Date();
  const minDate = subMonths(today, 1);
  const maxDate = addMonths(today, 1);
  // const todayString = format(today, 'yyyy.MM.dd부터~ 지정일까지');

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <StyledButton
      value={value}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
    >
      {value ? value : '오늘부터 ~ 지정일까지'}
    </StyledButton>
  ));

  const CustomClearButton = ({ onClick }) => (
    <button type="button" onClick={onClick} className="custom-clear-button">
      Custom Clear
    </button>
  );

  return (
    <div>
      <ModalCard
        modalTitle="🏃 운동"
        inputElement={
          <>
            <InputStyledDiv>
              <Input
                width="80%"
                height="4.5rem"
                placeholder="운동 이름을 입력하세요"
              />
            </InputStyledDiv>
            <br />
          </>
        }
        modalButton={true}
      >
        <FlexStyleDiv>
          <SelectStyleDiv>
            <StyledLabel>반복</StyledLabel>
            <CheckButton info={checkButtonInfo} />
          </SelectStyleDiv>
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
                }}
                minDate={minDate}
                maxDate={maxDate}
                isClearable={true}
                dateFormat="yy.MM.dd"
                customInput={<ExampleCustomInput />}
              />
            </CustomDatePickerWrapper>
          </SelectStyleDiv>
          <br />
          <SelectStyleDiv>
            <StyledLabel>시간</StyledLabel>
            <MarginSetDiv>
              <SelectBox
                options={hours}
                placeholder="1시간"
                width="100%"
                height="4.5rem"
                onChange={(event) => console.log(event)}
              />
            </MarginSetDiv>
            <SelectBox
              options={minutes}
              placeholder="30분"
              width="35%"
              height="4.5rem"
              onChange={(event) => console.log(event)}
            />
          </SelectStyleDiv>
          <SpacingDiv></SpacingDiv>
        </FlexStyleDiv>
      </ModalCard>
    </div>
  );
};

const CustomDatePickerWrapper = styled.div`
  .react-datepicker {
    width: 30rem;
    height: auto;
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  width: 100%;
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
const SpacingDiv = styled.div``;

const MarginSetDiv = styled.span`
  width: 35%;
  margin-right: 2rem;
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
`;

const SelectStyleDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-bottom: 1rem;
`;

export default ExerciseModal;
