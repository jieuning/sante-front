import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';

const Test = () => {
  const buttonInfo: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: 'Click Me',
    backgroundColor: 'primary',
    color: 'white',
    fontWeight: 'bold',
    onClick: () => console.log('Button clicked!'),
  };
  return (
    <div>
      <DynamicButton info={buttonInfo} />
    </div>
  );
};

export default Test;
