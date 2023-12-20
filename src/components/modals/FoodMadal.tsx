import { useState } from 'react';
import ModalCard from '../../components/modals/ModalCard';
// import { Remove } from '../icons/Remove';
import Input from '../../components/Input';
import Remove from '../icons/Remove';
import { RadioButton, InputButtonInfo } from '../RadioButton';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';

const FoodMadal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const radioButtonInfo: InputButtonInfo = {
    type: 'circleRadio',
    size: 'short-oval',
    value: [],
    items: ['아침', '점심', '저녁', '간식'],
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onClick: () => {
      // 버튼 클릭 처리
      console.log('버튼이 클릭되었습니다!');
    },
  };

  const inputStyle = {
    WebkitAppearance: 'none', // 화살표 숨기기
    margin: 0,
  };

  const buttonInfo: DynamicButtonInfo = {
    type: 'text',
    size: 'medium',
    text: '+식단추가',
    // backgroundColor: 'primary',
    color: 'orange',
    fontWeight: 'bold',
    onClick: () => console.log('Button clicked!'),
  };

  return (
    <>
      {isModalOpen && (
        <ModalCard
          modalTitle="🍚식단"
          inputElement={
            <Input
              type="number"
              placeholder="칼로리를 입력하세요."
              width="80%"
              height="50px"
              style={inputStyle}
            />
          }
          onClick={closeModal}
        >
          <RadioButton info={radioButtonInfo} style={{ margin: '10px' }} />
          <div style={{ display: 'flex' }}>
            <div>
              <Remove />
            </div>
            <Input
              type="text"
              placeholder="음식이름"
              width="40%"
              height="30px"
            />
            <Input
              type="number"
              placeholder="음식칼로리"
              width="40%"
              height="30px"
              style={{ ...inputStyle }}
            />
            <p>kcal</p>
          </div>
          <DynamicButton info={buttonInfo} />
        </ModalCard>
      )}
    </>
  );
};

export default FoodMadal;
