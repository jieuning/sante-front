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
            <p
              style={{
                fontSize: '15px',
                marginLeft: '40px',
                fontWeight: 'bold',
              }}
            >
              하루 권장 칼로리 1800Kcal
            </p>
          }
          onClick={closeModal}
        >
          <div style={{ margin: '0px 20px 20px 25px' }}>
            <RadioButton info={radioButtonInfo} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              margin: '15px',
            }}
          >
            <div>
              <Remove />
            </div>
            <Input
              type="text"
              placeholder="음식 이름을 입력하세요."
              width="40%"
              height="30px"
            />
            <Input
              type="number"
              placeholder="칼로리를 입력하세요."
              width="40%"
              height="30px"
            />
            <p style={{ fontSize: '15px' }}>Kcal</p>
          </div>


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              margin: '15px',
            }}
          >
            <div>
              <Remove />
            </div>
            <Input
              type="text"
              placeholder="음식 이름을 입력하세요."
              width="40%"
              height="30px"
            />
            <Input
              type="number"
              placeholder="칼로리를 입력하세요."
              width="40%"
              height="30px"
            />
            <p style={{ fontSize: '15px' }}>Kcal</p>
          </div>
          <DynamicButton info={buttonInfo} />
        </ModalCard>
      )}
    </>
  );
};

export default FoodMadal;
