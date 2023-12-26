import { useState } from 'react';
import ModalCard from '../../components/modals/ModalCard';
import Input from '../../components/Input';
import Remove from '../icons/Remove';
import { RadioButton, InputButtonInfo } from '../RadioButton';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import styled from 'styled-components';

const FoodModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [foodItems, setFoodItems] = useState([
    { id: 1, food: '', calorie: '' },
  ]);

  // 입력창
  const [food, setFood] = useState('');
  const [calorie, setCalorie] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 추가
  const handleAddFoodItem = () => {
    // 새로운 음식 항목 생성
    const newFoodItem = {
      id: foodItems.length + 1,
      food: food,
      calorie: calorie,
    };

    // foodItems 상태 업데이트
    setFoodItems([...foodItems, newFoodItem]);

    // 입력창 초기화
    setFood('');
    setCalorie('');
  };

  // 삭제
  const handleRemoveFoodItem = (index: number) => {
    const filterdItem = [...foodItems];
    filterdItem.splice(index, 1);
    setFoodItems(filterdItem);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const list = [...foodItems] as any;
    list[index][e.target.id] = e.target.value;
    setFoodItems(list);
  };

  const handleFoodChange = (value: string | number) => {
    setFood(value);
  };
  const handleCalorieChange = (value: string | number) => {
    setCalorie(value);
  };

  const radioButtonInfo: InputButtonInfo = {
    type: 'circleRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['아침', '점심', '저녁', '간식'],
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onChange: (selectedTime) => {
      console.log('선택된 값:', selectedTime);
      setSelectedValue(selectedTime);
      // 선택된 아점저간에 따른 로직 수행
      if (selectedTime === '아침') {
        console.log('아침');
      } else if (selectedTime === '점심') {
        console.log('점심');
      } else if (selectedTime === '저녁') {
        console.log('저녁');
      } else {
        console.log('간식');
      }
    },
  };

  const buttonInfo: DynamicButtonInfo = {
    type: 'text',
    size: 'small',
    text: '+식단추가',
    color: 'orange',
    fontWeight: 'bold',
    onClick: handleAddFoodItem,
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
          <div style={{ marginLeft: '10%' }}>
            <RadioButton info={radioButtonInfo} />
          </div>

          <ScrollBarDiv>
            {foodItems.map((item, index) => (
              <>
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '5px',
                    margin: '0px 10px',
                  }}
                >
                  <div onClick={() => handleRemoveFoodItem(index)}>
                    <Remove />
                  </div>
                  <Input
                    type="text"
                    placeholder="음식 이름을 입력하세요."
                    width="50%"
                    height="35px"
                    value={food}
                    onChange={handleFoodChange}
                    id="food"
                  />
                  <Input
                    type="number"
                    placeholder="칼로리를 입력하세요."
                    width="30%"
                    height="35px"
                    value={calorie}
                    onChange={handleCalorieChange}
                    id="calorie"
                  />
                  <p style={{ fontSize: '15px' }}>Kcal</p>
                </div>
              </>
            ))}
          </ScrollBarDiv>
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

const ScrollBarDiv = styled.div`
  margin-bottom: 10px;
  margin-right: 5px;
  overflow-y: auto;
  max-height: 160px;
  &::-webkit-scrollbar {
    width: 10px; // Chrome 및 Safari에서 스크롤 너비 조절
  }
  &::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 10px;
    background-color: var(--primary-color);
  }
  &::-webkit-scrollbar-track {
    border: 1px solid var(--gray-light);
    border-radius: 10px;
    background-color: none;
  }
`;

export default FoodModal;
