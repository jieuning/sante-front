import styled from 'styled-components';
import { ReactNode } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import Closed from '../icons/Closed';

export interface ModalCardProps {
  modalTitle: string;
  inputElement: ReactNode;
  children?: ReactNode;
  modalButton: boolean;
  onClick?: (e?: any) => void;
}

const ModalCard = ({
  modalTitle,
  children,
  modalButton,
  inputElement,
}: ModalCardProps) => {
  const buttonCreateInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '생성하기',
    backgroundColor: 'primary',
    color: 'white',
    fontWeight: 'bold',
    onClick: () => console.log('Button clicked!'),
  };
  const buttonDeleteInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '삭제하기',
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onClick: () => console.log('Button clicked!'),
  };

  return (
    <ModalCardContainer>
      <ModalTitle>
        {modalTitle}
        <div>
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
            <DynamicButton info={buttonCreateInfo} />
            <DynamicButton info={buttonDeleteInfo} />
          </>
        )}
      </ButtonContainer>
    </ModalCardContainer>
  );
};

export default ModalCard;

const ModalCardContainer = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  width: 37%;
  height: auto;
  border: 1px solid #ababab;
  border-radius: 6px;
  color: #0f0f0f;
`; //NOTE: width 추가.

const ModalTitle = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  padding: 20px 20px 40px 20px;
  display: flex;
  justify-content: space-between;
`;

//TODO: 수정

const ModalLine = styled.div`
  margin-bottom: 30px;
  border-top: 1px solid #ababab;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 40px;
  margin-bottom: 20px;
`;
