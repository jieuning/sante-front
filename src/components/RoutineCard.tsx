import styled from 'styled-components';
import { Exercise, Food } from '../types/user';

type RoutineType = 'exercise' | 'food';

interface RoutineCardProps {
  type: RoutineType;
  list: Exercise[] | Food[];
}

const RoutineCard = ({ type, list }: RoutineCardProps) => {
  return (
    <Container>
      {type === 'exercise' && <Title>🏃운동</Title>}
      {type === 'food' && <Title>🍚식단</Title>}
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.div``;

export default RoutineCard;
