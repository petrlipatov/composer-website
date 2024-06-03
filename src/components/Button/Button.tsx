import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  className: string;
};

function Button({ className, onClick, children }: Props) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
