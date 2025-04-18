import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  handleClose: () => void;
};

const Modal = ({ children, handleClose }: Props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen justify-center items-center z-10">
      <div className="p-5 rounded-md shadow-md border border-gray-200 bg-white">
        {children}
      </div>
      <span
        className="absolute top-0 left-0 size-full bg-gray-900/3 -z-10"
        onClick={handleClose}
      />
    </div>
  );
};

export default Modal;
