import styled from 'styled-components';
import { getWeekOfMonth, getToday } from '../../../utils/Date';
import { useEffect, useState } from 'react';

interface BarProps {
  height: number;
  thisWeek?: boolean;
}

interface CardProps {
  title: string;
  subTitle: string;
  data: number[];
}

const Card = ({ title, subTitle, data }: CardProps) => {
  const [thisWeek, setThisWeek] = useState(0);

  useEffect(() => {
    setThisWeek(getWeekOfMonth(getToday()));
  }, []);

  return (
    <Container>
      <Title>
        <p>{title}</p>
        <p>{subTitle}</p>
      </Title>
      <StyledCard>
        {data.map((item, index) => {
          if (index + 1 === thisWeek) {
            return (
              <div>
                <Bar key={index} height={item} thisWeek={true}></Bar>
                <p>{index + 1}주차</p>
              </div>
            );
          }
          return (
            <BarContainer>
              <Bar key={index} height={item}></Bar>
              <p>{index + 1}주차</p>
            </BarContainer>
          );
        })}
      </StyledCard>
    </Container>
  );
};

const Container = styled.div`
  min-width: 320px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledCard = styled.div`
  background-color: white;
  width: 100%;
  height: 300px;
  border-radius: 20px;
  display: flex;
  padding: 0 10%;
  justify-content: space-between;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bar = styled.div<BarProps>`
  width: 2rem;
  border-radius: 7px 7px 0 0;
  background-color: ${(props) =>
    props.thisWeek ? 'var(--primary-color)' : 'var(--gray-color)'};
  height: ${(props) => props.height}px;
`;

export default Card;
