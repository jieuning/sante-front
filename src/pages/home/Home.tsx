import Input from '../../components/Input';

const Home = () => {
  return (
    <>
      <div>Home oh my sweet Home</div>
      <Input
        type="text"
        placeholder={'문자를 입력하세요.'}
        width="300px"
        height="40px"
        textAlign="left"
      />
      <Input
        type="number"
        placeholder={'숫자를 입력하세요.'}
        width="150px"
        height="40px"
        textAlign="center"
      />
    </>
  );
};

export default Home;
