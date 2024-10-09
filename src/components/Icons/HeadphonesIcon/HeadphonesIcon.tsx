export const HeadphonesIcon = ({ className, isFilled = false }) => {
  return (
    <svg
      viewBox="0 0 24 23"
      xmlns="http://www.w3.org/2000/svg"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="miter"
      className={className}
    >
      <rect x="2" y="14" width="6" height="8" rx="0" />
      <rect x="16" y="14" width="6" height="8" rx="0" />
      <path d="M2,18V12A10,10,0,0,1,12,2h0A10,10,0,0,1,22,12v6" />
    </svg>
  );
};
