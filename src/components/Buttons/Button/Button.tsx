import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  className: string;
};

export function Button({ className, onClick, children }: Props) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
