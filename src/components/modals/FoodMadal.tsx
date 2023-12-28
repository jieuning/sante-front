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
import { Food, FoodList, Menu } from '../../types/user';
import { ModalMode } from '../../types/modalMode';
import { getEmail, getPassword } from '../../utils/WebStorageControl';

import { useStore } from '../../states/user';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface FoodModalProps {
  modalButton: any;
  modalType: ModalMode;
  name?: string; // 음식이름
  currentDate?: Date;
}

interface ModalFoodItem {
  id: number | string;
  name: string;
  calory: number | string;
  totalCalory?: number | string;
}

const FoodModal = ({ modalButton, currentDate }: FoodModalProps) => {
  const foodData = useStore((state) => state.foodData);
  const foodId = useStore((state) => state.foodId);

  const user = useStore((state) => state.user);
  const getUser = useStore((state) => state.getUser);
  const setUser = useStore((state) => state.setUser);
  const status = useStore((state) => state.status);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState(''); // 카테고리저장을 위한
  const [foodItems, setFoodItems] = useState<ModalFoodItem[]>([]);
  const selectedCategory = foodData?.foodCategory;
  const [userCalory, setUserCalory] = useState();
  console.log('selectedCategory', selectedCategory);
  const [isRadioDisabled, setIsRadioDisabled] = useState(false); // 추가된 부분

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
        const userCalory = userData.todayCalory;
        setUserCalory(userCalory);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    const newFoodItems: ModalFoodItem[] = [];

    // FIXME - 반복문 null처리
    if (foodData?.menu !== null) {
      foodData?.menu?.forEach((item: Menu) => {
        setSelectedValue(foodData?.foodCategory || '');
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

  // 🔴데이터 생성🔴
  const handleSendDataToServer = async () => {
    try {
      getUser();

      let filteredUser = removeIdField(user);

      if (!filteredUser) return;

      delete filteredUser?.__v;

      // 총 칼로리 계산
      const totalFoodCalory = foodItems.reduce(
        (total, foodItem) => total + Number(foodItem.calory),
        0
      );

      const newUserFoodList = filteredUser.userFoodList
        ? [...filteredUser.userFoodList]
        : [];

      let isExistCategory = false;

      const selectedFoodId = newUserFoodList.find(
        (item) => item.foodId === foodId
      );

      console.log('newUserFoodList', newUserFoodList);
      console.log('foodId', foodId);

      //create인 경우
      if (selectedFoodId === undefined) {
        console.log('새로 생성');
        isExistCategory = false;
      }

      // if (selectedFoodId.foodList.length > 0) {
      //   isExistCategory = true;
      // }

      const existingFoodIndex = newUserFoodList.findIndex((item) => {
        return (
          item.foodList.length > 0 &&
          item.foodList[0].foodCategory === selectedValue
        );
      });

      // 존재하는 foodCategory 찾은 경우
      if (selectedFoodId) {
        //여기서 카테고리 있는경우 없는경우 나눠야함
        const category = selectedFoodId?.foodList.find(
          (food) => food.foodCategory === foodData?.foodCategory
        );

        if (category) {
          //카테고리 있으면 메뉴만 추가
          // 기존 객체 복사
          const existingFood = { ...newUserFoodList[existingFoodIndex] };
          const existingMenu = [...existingFood.foodList[0].menu]; // 메뉴 배열 복사
          // 메뉴에 foodItem이 이미 존재하는지 확인
          const existingMenuItemIndex = existingMenu.findIndex(
            (menu) => menu.name === foodItems[0].name
          );
          // 기존 메뉴 항목 업데이트 또는 새로운 메뉴 항목 추가
          if (existingMenuItemIndex !== -1) {
            existingMenu[existingMenuItemIndex] = {
              ...existingMenu[existingMenuItemIndex],
              calory:
                +existingMenu[existingMenuItemIndex].calory + totalFoodCalory,
            };
          } else {
            existingMenu.push(...foodItems);
            existingFood.foodList[0].totalCalory += totalFoodCalory;
          }
          existingFood.foodList[0].menu = existingMenu;
          newUserFoodList[existingFoodIndex] = existingFood;
          filteredUser.userFoodList = newUserFoodList;
        } else {
          //카테고리 없으면 Food.foodList에 새 카테고리 push해줘야
          if (foodData) {
            console.log('foodData', foodData);
            selectedFoodId.foodList.push({
              foodCategory: selectedValue,
              totalCalory: foodItems.reduce(
                (acc, curr) => acc + Number(curr.calory),
                0
              ),
              menu: foodItems.map((foodItem) => ({
                name: foodItem.name,
                calory: foodItem.calory,
              })),
            });
            filteredUser.userFoodList?.forEach((item) => {
              if (item.foodId === foodId) {
                item.foodList = selectedFoodId.foodList;
              }
            });
          }
        }
      } else {
        // 새로운 음식 항목 생성 및 추가
        //FIXME - 확인(조건에안됨)
        console.log('modal date', currentDate);
        newUserFoodList.push({
          foodList: [
            {
              foodCategory: selectedValue,
              totalCalory: totalFoodCalory,
              menu: foodItems.map((foodItem) => ({
                name: foodItem.name,
                calory: foodItem.calory,
              })),
            },
          ],
          foodId: foodId || '',
          createdAt: currentDate || new Date(),
          lastUpdated: new Date(),
        });
        filteredUser.userFoodList = newUserFoodList;
      }

      // 변경된 유저 그대로 업데이트
      console.log('user', user);

      setUser(filteredUser);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  // 데이터 수정
  const handleEditClick = async () => {
    try {
      getUser();

      let filteredUser = removeIdField(user);
      if (!filteredUser) return;

      delete filteredUser?.__v;

      const newMenu: Menu[] | undefined = foodItems
        ?.map((item): Menu | undefined => {
          if (item.name !== null) {
            return {
              name: item.name,
              calory: item.calory,
            };
          }
        })
        .filter((item): item is Menu => item !== undefined);

      filteredUser.userFoodList?.forEach((food: Food) => {
        if (food.foodId === foodId) {
          food.foodList.forEach(
            (item: { foodCategory: string | undefined; menu: Menu[] }) => {
              if (item.foodCategory === foodData?.foodCategory) {
                item.menu = newMenu ?? [];
              }
            }
          );
        }
      });

      console.log('user', JSON.stringify(user));

      setUser(filteredUser);
      closeModal();
    } catch (error) {
      console.error('Food Modal error', error);
    }
  };

  // 데이터 삭제
  const handleDeleteClick = async () => {
    try {
      getUser();

      let filteredUser = removeIdField(user);
      if (!filteredUser) return;

      delete filteredUser?.__v;

      // 삭제할 음식 항목 찾기
      const updatedUserFoodList = (filteredUser.userFoodList || []).map(
        (food: Food) => {
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
      if (filteredUser.userFoodList !== undefined) {
        filteredUser.userFoodList = updatedUserFoodList;
      }

      console.log('user', user);

      setUser(filteredUser);

      if (status === 200) {
        console.log('PUT 요청이 성공적으로 완료되었습니다.');
      } else {
        console.error('PUT 요청이 실패했습니다. HTTP 상태 코드:', status);
      }

      closeModal(); // 삭제하고 모달 닫기
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

  useEffect(() => {
    // 선택한 foodCategory에 따라 라디오 버튼의 활성화 여부 결정
    setIsRadioDisabled(
      selectedValue === '아침' ||
        selectedValue === '점심' ||
        selectedValue === '저녁' ||
        selectedValue === '간식'
    );
  }, [selectedValue]);

  const radioButtonInfo: InputButtonInfo = {
    type: 'circleRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['아침', '점심', '저녁', '간식'],
    backgroundColor: isRadioDisabled ? 'lightGray02' : 'gray',
    color: 'white',
    fontWeight: '900',
    disabled: isRadioDisabled,
    onChange: (selectedTime: SetStateAction<string>) => {
      console.log('선택된 foodCategory:', selectedTime);
      setSelectedValue(selectedTime);
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
            {selectedCategory !== '' && <P>❗카테고리 수정이 불가능합니다❗</P>}
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
const P = styled.p`
  margin-bottom: 10px;
  font-size: 13px;
  color: gray;
`;

export default FoodModal;
