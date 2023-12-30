import styled from 'styled-components';
import { ReactNode } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import Closed from '../icons/Closed';
import { FoodList, Menu } from '../../types/user';
import { useStore } from '../../states/user';

export interface ModalCardProps {
  modalTitle: string;
  inputElement: ReactNode;
  children?: ReactNode;
  modalButton: boolean;
  onClick?: () => void;
  onClickCreate?: () => void;
  onClickRemove: () => void;
  onClickUpdate: () => void;
}

export interface payloadProps {
  exerciseName?: string;
  exerciseId?: string;
  exerciseStartDate?: Date;
  exerciseEndDate?: Date;
  repeatDate?: string[];
  scheduledDate?: Menu[];
  foodId?: string;
  foodList?: FoodList[];
  createdAt?: Date;
}

const ModalCard = ({
  modalTitle,
  children,
  modalButton,
  inputElement,
  onClickCreate,
  onClickRemove,
  onClickUpdate,
}: ModalCardProps) => {
  const setModalState = useStore((state) => state.setModalState);
  const buttonCreateInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '생성하기',
    backgroundColor: 'primary',
    color: 'white',
    fontWeight: 'bold',
    onClick: onClickCreate,
  };
  const buttonDeleteInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '삭제하기',
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onClick: onClickRemove,
  };
  const buttonUpdateInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '수정하기',
    backgroundColor: 'primary',
    color: 'white',
    fontWeight: 'bold',
    onClick: onClickUpdate,
  };

  return (
    <Background>
      <ModalCardContainer>
        <ModalTitle>
          {modalTitle}
          <div
            onClick={() => {
              setModalState('exercise', false);
              setModalState('food', false);
            }}
          >
            <Closed />
          </div>
        </ModalTitle>
        {inputElement}
        <ModalLine />
        {children}
        <ModalLine />
        <ButtonContainer>
          {modalButton ? (
            <DynamicButton info={buttonCreateInfo} />
          ) : (
            <>
              <DynamicButton info={buttonUpdateInfo} />
              <DynamicButton info={buttonDeleteInfo} />
            </>
          )}
        </ButtonContainer>
      </ModalCardContainer>
    </Background>
  );
};

export default ModalCard;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  z-index: 100;
`;

const ModalCardContainer = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  min-width: 370px;
  height: auto;
  border: 1px solid #ababab;
  border-radius: 15px;
  color: #0f0f0f;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;

  @media only screen and (max-width: 700px) {
    & {
      width: 80%  
  
  }
`; //NOTE: width 추가.

const ModalTitle = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  padding: 30px 25px 0px 25px;
  display: flex;
  justify-content: space-between;
`;

//TODO: 수정

const ModalLine = styled.div`
  margin: 20px 15px 30px 15px;
  border-top: 1px solid #ababab;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 40px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;
