export type ButtonType = 'solid' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge' | 'default';

export type DynamicButtonInfo = {
  type: ButtonType;
  size?: ButtonSize;
  text: string;
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  onClick?: () => void;
};
