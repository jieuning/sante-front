// import React from 'react';
import styled from 'styled-components';

// ${props}에는 바뀌는 스타일
// 활성화 시 컬러, 기본 컬러, 텍스트사이즈 등은 고정스타일
const StyledInputWrapper = styled.div<{
  width?: string;
  height?: string;
  textAlign?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: ${(props) => props.textAlign || 'left'};
  background: #fff;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #bebebe;
  outline: none;
  border-radius: 10px;

  &:focus {
    border: 1px solid #81d8d0;
  }
`;

// 한 컴포넌트에 타입을 props로 (바꿔줄 수 있는 값)
// 변수명은 bootstrap, MUI 참고
// props: type, placeholder, value, onChange, style(width, height, text-align)
// 디폴트값 필요한 데이터만 작성
// value, onChange : 필수값

interface StyledInputProps {
  type?: 'text' | 'number';
  placeholder: string;
  value?: 'string' | 'number';
  width: string;
  height: string;
  textAlign: string;
}

// props 타입지정
const Input = ({
  type = 'text',
  placeholder,
  value,
  width,
  height,
  textAlign,
}: StyledInputProps) => {
  return (
    <StyledInputWrapper width={width} height={height} textAlign={textAlign}>
      <StyledInput type={type} placeholder={placeholder} value={value} />
    </StyledInputWrapper>
  );
};

export default Input;
