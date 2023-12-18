type ColorType =
  | 'primary'
  | 'orange'
  | 'purple'
  | 'gray'
  | 'black'
  | 'white'
  | 'lightGray';

const getColorValue = (color: ColorType) => {
  switch (color) {
    case 'primary':
      return 'var(--primary-color)';
    case 'orange':
      return 'var(--secondary-orange-color)';
    case 'purple':
      return 'var(--secondary-purple-color)';
    case 'black':
      return 'var(--black-color)';
    case 'gray':
      return 'var(--gray-color)';
    case 'white':
      return '#FFFFFF';
    case 'lightGray':
      return 'var(--gray-light-01)';
  }
};

export { getColorValue };
export type { ColorType };
