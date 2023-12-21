import { useState } from 'react';
import ModalCard from '../../components/modals/ModalCard';
import Input from '../../components/Input';
import Remove from '../icons/Remove';
import { RadioButton, InputButtonInfo } from '../RadioButton';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';

const FoodModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [foodItems, setFoodItems] = useState([
    { id: 1, name: '', calories: '' }, //TODO - 아점저간 추가
  ]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addFoodItem = (e: any) => {
    e.preventDefault();
    console.log('클릭');
    setFoodItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), name: '', calories: '' },
    ]);
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
    size: 'small',
    text: '+식단추가',
    color: 'orange',
    fontWeight: 'bold',
    onClick: addFoodItem,
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

          <div style={{ overflowY: 'auto', maxHeight: '130px' }}>
            {foodItems.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px',
                  margin: '10px 15px',
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
                  // value={item.name}
                  // onChange={(e) =>
                  //   handleInputChange(index, 'name', e.target.value)
                  // }
                />
                <Input
                  type="number"
                  placeholder="칼로리를 입력하세요."
                  width="40%"
                  height="30px"
                  // value={item.calories}
                  // onChange={(e) =>
                  //   handleInputChange(index, 'calories', e.target.value)
                  // }
                />
                <p style={{ fontSize: '15px' }}>Kcal</p>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '10px',
                margin: '10px 15px',
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
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '10px',
            }}
          >
            <DynamicButton info={buttonInfo} />
          </div>
        </ModalCard>
      )}
    </>
  );
};

export default FoodModal;
