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

const ExerciseModal = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input className="custom-input" value={value} onClick={onClick} readOnly />
  ));
  return (
    <div>
      <ModalCard
        modalTitle="🏃 운동"
        inputElement={
          <>
            <InputStyledDiv>
              <Input
                width="80%"
                height="6rem"
                placeholder="운동 이름을 입력하세요"
              />
            </InputStyledDiv>
            <br />
          </>
        }
        modalButton={true}
      >
        <FlexStyleDiv>
          <CheckButton info={checkButtonInfo} />
          <div>
            <StyledLabel>기간</StyledLabel>
            <DatePicker
              locale={ko}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: SetStateAction<null[]>) => {
                setDateRange(update);
              }}
              isClearable={true}
              dateFormat="yy.MM.dd"
              customInput={<ExampleCustomInput />}
            />
          </div>
          <br />
          <SelectStyleDiv>
            <StyledLabel>시간</StyledLabel>
            <SelectBox
              options={[{ value: 'option1', label: 'option1' }]}
              placeholder="1시간"
              width="35%"
              height="5rem"
              onChange={(event) => console.log(event)}
            />
            <SelectBox
              options={[{ value: 'option1', label: 'option1' }]}
              placeholder="30분"
              width="35%"
              height="5rem"
              onChange={(event) => console.log(event)}
            />
          </SelectStyleDiv>
        </FlexStyleDiv>
      </ModalCard>
    </div>
  );
};
const StyledInput = styled.div`
  width: 80%;
  height: 6rem;
  border: 1px solid #bebebe;
  outline: none;
  border-radius: 10px;
  background: #fff;
  padding-left: 7px;

  &:focus {
    border: 1px solid #81d8d0;
  }
`;

const TitleStyledDiv = styled.span`
  margin-top: 1rem;
  margin-bottom: 3.5rem;
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
`;

export default ExerciseModal;
