import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColorValue } from '../../types/colorType';

//NOTE: 퍼센테지에 따라 색상이 변경될 수 있게 state받기?

const FOOD_COLORS = {
  notEnough: getColorValue('orange'),
  enough: getColorValue('purple'),
  tooMuch: '#F39797',
};

const getGageTheme = (type: string, gageStatus: number) => {
  if (type === 'food') {
    if (gageStatus > 80) {
      return { color: FOOD_COLORS.tooMuch };
    } else if (gageStatus === 80) {
      return { color: FOOD_COLORS.enough };
    } else {
      return { color: FOOD_COLORS.notEnough };
    }
  } else if (type === 'exercise') {
    return { color: FOOD_COLORS.enough };
  } else {
    return { color: FOOD_COLORS.enough };
  }
};

interface GageProps {
  gage?: number;
  maxGage?: number;
  type?: string;
  handleGage?(currentGage: number): void;
}

type GageStatus = {
  gageStatus: number;
  type: string;
};

//NOTE 타입지정을 중복되지 않게 하는 방법?

const GageBar = ({
  gage = 0,
  maxGage = 100,
  type = 'exercise',
  handleGage,
}: GageProps) => {
  const [gageStatus, setGageStatus] = useState<number>(0);

  useEffect(() => {
    const calculateStatus: number = Math.floor((gage / maxGage) * 100);
    setGageStatus(calculateStatus);
    console.log('gageStatus', gageStatus);
    console.log('gage', gage);
    console.log('maxGage', maxGage);
    if (handleGage) {
      handleGage(calculateStatus);
    }
  }, [gage, maxGage]);

  return (
    <Progress>
      <GageStatus gageStatus={gageStatus} type={type} />
    </Progress>
  );
};

const Progress = styled.div`
  width: 16.3rem;
  height: 2.3rem;
  background-color: var(--white-background-color);
  border-radius: 2rem;
`;

const GageStatus = styled.div<GageStatus>`
  background-color: ${({ type, gageStatus }) =>
    getGageTheme(type, gageStatus).color};
  width: ${({ gageStatus }) => gageStatus + '%'};
  height: 100%;
  border-radius: 20px;
`;

export default GageBar;
