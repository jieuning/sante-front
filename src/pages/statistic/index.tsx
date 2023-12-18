import useUserModel from '../../hooks/useUserModel';
import '../../index.css';
import Card from './Card';

//TODO - 여기서 백분율 계산해서 Card에 보내야함
const Statistic = () => {
  const user = useUserModel();
  console.log(user);

  return (
    <>
      <Card
        title="운동 달성률"
        subTitle="이번달 평균 60%"
        data={new Array(5).fill(60)}
      />
    </>
  );
};

export default Statistic;
