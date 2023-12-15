import DynamicButton from '../../components/DynamicButton';

const Test = () => (
  <div>
    <DynamicButton type="solid" size="xlarge" text="Click"></DynamicButton>
    <DynamicButton type="solid" size="large" text="Click"></DynamicButton>
    <DynamicButton
      type="solid"
      size="medium"
      text="Click"
      backgroundColor="var(--gray-color)"
    ></DynamicButton>
    <DynamicButton
      type="text"
      text="+식단추가"
      color="var(--secondary-orange-color)"
    ></DynamicButton>
    <DynamicButton type="outline" text="더보기"></DynamicButton>
  </div>
);

export default Test;
