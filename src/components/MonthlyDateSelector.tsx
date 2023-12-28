import { format } from 'date-fns';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import styled from 'styled-components';

interface MonthlyDateSelectorProps {
  targetDate: Date;
  onLeftClick: (e?: any) => void;
  onRightClick: (e?: any) => void;
}

const MonthlyDateSelector = ({
  targetDate,
  onLeftClick,
  onRightClick,
}: MonthlyDateSelectorProps) => {
  return (
    <Title>
      <IoChevronBack onClick={onLeftClick} cursor="pointer" />
      {format(targetDate, 'yyyy.MM')}
      <IoChevronForward onClick={onRightClick} cursor="pointer" />
    </Title>
  );
};

const Title = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--black-color);
  margin-bottom: 18px;
  margin-top: 20px;
`;

export default MonthlyDateSelector;
