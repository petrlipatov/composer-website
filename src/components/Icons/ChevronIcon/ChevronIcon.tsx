interface Props {
  isFilled?: boolean;
  className?: string;
}

const ChevronIcon = ({ className, isFilled = false }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      strokeWidth="2.088"
      strokeLinecap="round"
      strokeLinejoin="miter"
      className={className}
    >
      <polyline points="17 14 12 9 7 14" />
    </svg>
  );
};

export default ChevronIcon;
