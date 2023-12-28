import { SetStateAction, useEffect, useState } from 'react';
import ModalCard from '../../components/modals/ModalCard';
import Input from '../../components/Input';
import Remove from '../icons/Remove';
import { RadioButton, InputButtonInfo } from '../RadioButton';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'date-fns';
import { FoodList, Menu } from '../../types/user';
import { ModalMode } from '../../types/modalMode';
import { getEmail, getPassword } from '../../utils/WebStorageControl';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface FoodModalProps {
  modalButton: any;
  foodData?: FoodList | null;
  foodId?: string | null; // 날짜
  modalType: ModalMode;
  name?: string; // 음식이름
}

interface ModalFoodItem {
  id: number | string;
  name: string;
  calory: number | string;
  totalCalory?: number | string;
}

const FoodModal = ({ modalButton, foodData, foodId }: FoodModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState(''); // 카테고리저장을 위한
  const [foodItems, setFoodItems] = useState<ModalFoodItem[]>([]);
  console.log('fooddata', foodData);
  console.log('해당식단카테고리', foodData?.foodCategory);
  const selectedCategory = foodData?.foodCategory;
  console.log('selectedCategory', selectedCategory);
  // const [selectedFoodCategory, setSelectedFoodCategory] = useState('');  //카테고리표시를위한
  console.log('selectedCategory', selectedCategory);
  const [userCalory, setUserCalory] = useState();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 추가 생성
  const handleAddFoodItem = () => {
    const newFoodItem = {
      id: new Date().getTime(), // 고유한 id 생성
      name: '',
      calory: '',
      foodCategory: {
        value: selectedValue,
        category: selectedCategory,
      },
      totalCalory: '',
    };

    // foodItems 상태 업데이트
    setFoodItems([...foodItems, newFoodItem]);
  };

  // 삭제(단일 음식)
  const handleRemoveFoodItem = (index: number) => {
    const filteredItem = [...foodItems];
    filteredItem.splice(index, 1);
    setFoodItems(filteredItem);
  };

  // 각 음식 항목의 food 값 업데이트
  const handleFoodChange = (value: string, index: number) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index].name = value;
    setFoodItems(updatedFoodItems);
  };

  // 각 음식 항목의 calory 값 업데이트
  const handleCaloryChange = (value: string, index: number) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index].calory = Number(value);
    setFoodItems(updatedFoodItems);
  };

  useEffect(() => {
    axios
      .post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      })
      .then((response) => {
        const userData = response.data.user;
        console.log('userData', userData);
        const userCalory = userData.todayCalory;
        setUserCalory(userCalory);
        console.log('userCalory', userCalory);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    const newFoodItems: ModalFoodItem[] = [];

    // FIXME - 반복문 null처리
    if (foodData !== null) {
      foodData?.menu.forEach((item: Menu) => {
        return newFoodItems.push({
          id:
            foodId?.toString() +
            foodData.foodCategory +
            item.name +
            format(new Date(), 'yyyy-MM-dd-HH-mm-ss'),
          name: item.name,
          calory: item.calory,
        });
      });
    }

    setFoodItems(newFoodItems);
  }, []);

  // 식단 데이터 생성
  const handleSendDataToServer = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });
      let user = removeIdField(response.data.user);
      delete user.__v;

      const totalFoodCalory = foodItems.reduce(
        (total, foodItem) => total + Number(foodItem.calory),
        0
      );
      console.log('totalFoodCalory', totalFoodCalory);

      const newUserFoodList = user.userFoodList ? [...user.userFoodList] : [];

      const existingFoodIndex = newUserFoodList.findIndex(
        (item) =>
          item.foodList.length > 0 &&
          item.foodList[0].foodCategory === selectedValue
      );

      if (existingFoodIndex !== -1) {
        const existingFood = newUserFoodList[existingFoodIndex];
        const existingMenuItemIndex = existingFood.foodList[0].menu.findIndex(
          (item: { name: string }) => item.name === foodItems[0].name
        );

        if (existingMenuItemIndex !== -1) {
          existingFood.foodList[0].menu[existingMenuItemIndex].calory +=
            totalFoodCalory;
        } else {
          // 새로운 메뉴 항목 추가
          existingFood.foodList[0].menu.push(
            ...foodItems.map((foodItem) => ({
              name: foodItem.name,
              calory: foodItem.calory,
            }))
          );
          existingFood.foodList[0].totalCalory += totalFoodCalory;
        }
      } else {
        // 새로운 음식 항목 생성
        const newFoodList = foodItems.map((foodItem) => ({
          foodCategory: selectedValue,
          totalCalory: totalFoodCalory,
          menu: [
            {
              name: foodItem.name,
              calory: foodItem.calory,
            },
          ],
        }));

        // 새로운 음식 항목을 추가
        newUserFoodList.push({
          foodList: newFoodList,
          foodId: new Date().getTime(),
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        });
      }

      user.userFoodList = newUserFoodList;

      // 변경된 유저 그대로 업데이트
      console.log('user', user);

      await axios.put(`${URL}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      // 유저 데이터를 가져옵니다.
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });

      // 유저 데이터를 추출하고 불필요한 필드를 제거합니다.
      let user = removeIdField(response.data.user);
      delete user.__v;

      // 총 칼로리 계산
      const totalFoodCalory = foodItems.reduce(
        (total, foodItem) => total + Number(foodItem.calory),
        0
      );
      console.log('totalFoodCalory', totalFoodCalory);

      // 새로운 음식 항목을 생성합니다.
      const newFoodList = foodItems.map((foodItem) => ({
        foodCategory: selectedValue,
        totalCalory: totalFoodCalory,
        menu: [
          {
            name: foodItem.name,
            calory: foodItem.calory,
          },
        ],
      }));

      // 새로운 음식 항목을 추가합니다.
      const newUserFoodList = user.userFoodList.map(
        (foodEntry: { foodCategory: string; foodList: any[] }) => {
          // 만약 foodCategory가 "아침"이라면 해당 카테고리의 메뉴에 추가합니다.
          if (foodEntry.foodCategory === '아침') {
            foodEntry.foodList = [...foodEntry.foodList, ...newFoodList];
          }
          return foodEntry;
        }
      );

      // 아침 카테고리에 새로운 음식 항목을 추가한 유저 데이터를 콘솔에 출력합니다 (디버깅용)
      console.log('user', JSON.stringify(newUserFoodList));

      // 수정된 유저 데이터를 서버에 전송합니다.
      await axios.put(
        `${URL}`,
        JSON.stringify({ userFoodList: newUserFoodList }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Food Modal error', error);
    }
  };

  // 삭제
  const handleDeleteClick = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });
      let user = removeIdField(response.data.user);
      delete user.__v;

      // 삭제할 음식 항목 찾기
      const updatedUserFoodList = (user.userFoodList || []).map(
        (food: {
          foodId: string | null | undefined;
          foodList: { foodCategory: string | undefined; menu: any[] }[];
        }) => {
          if (food.foodId === foodId) {
            // 찾은 음식 항목의 foodList에서 특정 조건에 맞는 항목을 제외
            food.foodList = food.foodList.filter(
              (item: { foodCategory: string | undefined; menu: any[] }) => {
                return item.foodCategory !== foodData?.foodCategory;
              }
            );
          }
          return food;
        }
      );

      user.userFoodList = updatedUserFoodList;

      console.log('user', user);

      const putResponse = await axios.put(`${URL}`, JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (putResponse.status === 200) {
        console.log('PUT 요청이 성공적으로 완료되었습니다.');
      } else {
        console.error(
          'PUT 요청이 실패했습니다. HTTP 상태 코드:',
          putResponse.status
        );
      }

      closeModal();
      //TODO - 페이지 새로고침되야 보이는데 새로고침을 작성해줄지?
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  function removeIdField<T>(obj: T): T {
    if (Array.isArray(obj)) {
      return obj.map((item) => removeIdField(item)) as unknown as T;
    } else if (obj !== null && typeof obj === 'object') {
      // 객체인 경우
      const newObj: any = { ...obj };
      delete newObj._id; // _id 필드 제거

      Object.keys(newObj).forEach((key) => {
        newObj[key] = removeIdField(newObj[key]);
      });

      return newObj as T;
    }
    return obj;
  }

  // selectedValue
  // selectedCategory
  const radioButtonInfo: InputButtonInfo = {
    type: 'circleRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['아침', '점심', '저녁', '간식'],
    //category: selectedFoodCategory,
    // category: '아침',
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onChange: (selectedTime: SetStateAction<string>) => {
      console.log('선택된 값:', selectedTime);
      setSelectedValue(selectedTime);
      // setSelectedFoodCategory(selectedTime);
    },
  };

  const buttonInfo: DynamicButtonInfo = {
    type: 'text',
    size: 'small',
    text: '+식단추가',
    color: 'orange',
    fontWeight: 'bold',
    onClick: () => {
      handleAddFoodItem();
    },
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
              하루 권장 칼로리 {userCalory}Kcal
            </p>
          }
          modalButton={modalButton}
          onClick={() => {
            closeModal();
          }}
          onClickCreate={() => {
            handleSendDataToServer();
            closeModal();
          }}
          onClickRemove={() => {
            handleDeleteClick();
          }}
          onClickUpdate={() => {
            handleEditClick();
          }}
        >
          <div style={{ marginLeft: '10%' }}>
            <RadioButton info={radioButtonInfo} />
          </div>

          <ScrollBarDiv>
            {foodItems?.map((item, index) => (
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
                  placeholder={'음식 이름'}
                  width="50%"
                  height="35px"
                  value={item.name}
                  onChange={(value) => handleFoodChange(value, index)}
                  id={`food-${index}`}
                />
                <Input
                  type="number"
                  placeholder={'칼로리'}
                  width="30%"
                  height="35px"
                  value={item.calory}
                  onChange={(value) => handleCaloryChange(value, index)}
                  id={`calory-${index}`}
                />
                <p style={{ fontSize: '15px' }}>Kcal</p>
              </div>
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
