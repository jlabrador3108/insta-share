interface SpinProps {
  color?: string;
  size?: string | number;
}

export function LoadingSpin({ color = "black", size = 5 }: SpinProps) {
  return (
    <svg
      className={`animate-spin h-${size} w-${size} text-${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75 px-2"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function ExitIcon() {
  return (
    <svg
      width="40px"
      height="40px"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 15V19.5H5.5V5.5H16.5V10M10 12.5H22.5"
        stroke="#121923"
        strokeWidth="1.2"
      />
      <path d="M20 10L22.5 12.5L20 15" stroke="#121923" strokeWidth="1.2" />
    </svg>
  );
}
