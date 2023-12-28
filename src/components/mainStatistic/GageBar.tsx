import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColorValue } from '../../types/colorType';

//NOTE: 퍼센테지에 따라 색상이 변경될 수 있게 state받기?

interface GageProps {
  gage?: number;
  maxGage?: number;
  type?: string;
  handleGage?(currentGage: number): void;
  color?: string;
}

type GageStatusProp = {
  color: string;
  gageStatus: number;
};

//NOTE 타입지정을 중복되지 않게 하는 방법?

const GageBar = ({
  gage = 0,
  maxGage = 100,
  // eslint-disable-next-line react/prop-types
  color = getColorValue('purple'),
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
      <GageStatus gageStatus={gageStatus} color={color} />
    </Progress>
  );
};

const Progress = styled.div`
  width: 16rem;
  height: 2.3rem;
  background-color: var(--white-background-color);
  border-radius: 2rem;
`;

const GageStatus = styled.div<GageStatusProp>`
  background-color: ${({ color }) => color};
  width: ${({ gageStatus }) => gageStatus + '%'};
  height: 100%;
  border-radius: 20px;
`;

export default GageBar;
