import styled from 'styled-components';

//NOTE: 퍼센테지에 따라 색상이 변경될 수 있게 state받기?

interface GageProps {
  gage?: number;
  maxGage?: number;
  type?: string;
}

type GageStatus = {
  gageStatus: number;
  type: string;
};

//NOTE 타입지정을 중복되지 않게 하는 방법?

const GageBar = ({ gage = 0, maxGage = 100, type = 'exercise' }: GageProps) => {
  console.log('type', type);
  const gageStatus: number = Math.floor((gage / maxGage) * 100);
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

export const getGageTheme = (what: string) => {
  console.log('what', what);

  switch (what) {
    case 'exercise':
      return {
        color: 'var(--secondary-purple-color)',
      };
    case 'food':
      return {
        color: 'var(--secondary-orange-color)',
      }; //NOTE return 이 있으니까 break문 없어도 됨
    default:
      return {
        color: 'red',
        //ANCHOR var(--secondary-purple-color)
      };
  }
};

const GageStatus = styled.div<GageStatus>`
  background-color: ${({ type }) => getGageTheme(type).color};
  width: ${({ gageStatus }) => gageStatus + '%'};
  height: 100%;
  border-radius: 20px;
`;

export default GageBar;
