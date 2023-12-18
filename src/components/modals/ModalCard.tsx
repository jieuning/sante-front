import styled from 'styled-components';
import { ReactNode } from 'react';
import DynamicButton from '../DynamicButton';

export interface ModalCardProps {
  modalTitle: string;
  children?: ReactNode;
  modalButton: boolean;
}

const ModalCard = ({ modalTitle, children, modalButton }: ModalCardProps) => {
  return (
    <ModalCardContainer>
      <ModalTitle>{modalTitle}</ModalTitle>
      <ModalLine />
      {children}
      <ModalLine />
      <ButtonContainer>
        {modalButton ? (
          <DynamicButton
            type="solid"
            size="medium"
            text="생성하기"
            backgroundColor="#81D8D0"
            color="white"
            fontWeight="bold"
          />
        ) : (
          <>
            <DynamicButton
              type="solid"
              size="medium"
              text="생성하기"
              backgroundColor="#81D8D0"
              color="white"
              fontWeight="bold"
            />
            <DynamicButton
              type="solid"
              size="medium"
              text="삭제하기"
              backgroundColor="#ABABAB"
              color="white"
              fontWeight="bold"
            />
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
  height: auto;
  border: 1px solid #ababab;
  border-radius: 6px;
  font-color: #0f0f0f;
`;

const ModalTitle = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  padding: 20px 20px 40px 20px;
`;

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
