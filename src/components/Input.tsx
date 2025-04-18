import { ComponentProps, Ref } from "react";

type Props = {
  ref?: Ref<HTMLInputElement>; //! React v19
  id: string;
  label?: string;
} & ComponentProps<"input">;

const Input = ({ ref, id, label, ...props }: Props) => {
  return (
    <div className="wrap">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <input {...props} ref={ref} id={id} className="input" />
    </div>
  );
};

export default Input;
