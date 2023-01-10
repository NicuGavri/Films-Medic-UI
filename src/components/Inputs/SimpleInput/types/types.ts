export type SimpleInputProps = {
  label: string;
  type: string;
  name: string;
  required? : boolean;
  value? : string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
};
