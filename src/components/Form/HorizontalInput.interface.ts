export enum INPUT_TYPE {
  INPUT = 'input',
  TEXTAREA = 'textarea',
}

export interface HorizontalInputProps {
  label: string;
  value: string;
  type?: INPUT_TYPE;
  errorMsg?: string;
  rows?: number;
  onChange: (val: string) => void;
}
