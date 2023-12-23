import styled from 'styled-components';

const StyledInputWrapper = styled.div<{
  width?: string;
  height?: string;
  textAlign?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: ${(props) => props.textAlign || 'left'};

  display: block; /* 블록 레벨 요소로 설정 */
  margin: 22px auto; /* 가운데 정렬을 위한 스타일 */
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-light);
  outline: none;
  border-radius: 10px;
  background: #fff;
  padding-left: 7px;

  &:focus {
    border: 1px solid #81d8d0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  padding: 5px 0;
`;

interface StyledInputProps {
  type: 'text' | 'number' | 'password';
  name: string;
  placeholder: string;
  value?: string | number;
  width: string;
  height: string;
  textAlign?: string;
  onChange: (v: string | number) => void;
  errorMessage?: string;
}

const Input = ({
  type = 'text',
  name,
  placeholder,
  value,
  width,
  height,
  textAlign,
  onChange,
  errorMessage,
}: StyledInputProps) => {
  return (
    <StyledInputWrapper width={width} height={height} textAlign={textAlign}>
      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <ErrorMessage>{errorMessage && <div>{errorMessage}</div>}</ErrorMessage>
    </StyledInputWrapper>
  );
};

export default Input;
