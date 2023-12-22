// import SelectBox, { Option } from '../../components/SelectBox';
// import Register from '../../pages/register';
import { DateSelect } from '../../components/DateSelect';

const Home = () => {
  return (
    <>
      {/* <Register></Register> */}
      <DateSelect />
    </>
  );
};

// const Home = () => {
//   const options: Option[] = [
//     { value: 'option1', label: '옵션 1' },
//     { value: 'option2', label: '옵션 2' },
//     { value: 'option3', label: '옵션 3' },
//   ];

//   const handleSelectChange = (selectedValue: string) => {
//     console.log('Selected value:', selectedValue);
//   };

//   return (
//     <SelectBox
//       width="400px"
//       height="40px"
//       placeholder="선택하세요"
//       options={options}
//       onChange={handleSelectChange}
//     />
//   );
// };

export default Home;
