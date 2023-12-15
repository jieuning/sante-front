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
  </div>
);

export default Test;
