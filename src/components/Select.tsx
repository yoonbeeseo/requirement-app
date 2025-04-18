import { ComponentProps, Ref } from "react";

type Props = ComponentProps<"select"> & {
  ref?: Ref<HTMLSelectElement>; //! React v19
  id: string;
  label?: string;
};
const Select = ({ ref, id, label, ...props }: Props) => {
  return (
    <div className="wrap">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <select {...props} id={id} ref={ref} className="select">
        <option value="">선택</option>
        {props?.children}
      </select>
    </div>
  );
};

export default Select;
