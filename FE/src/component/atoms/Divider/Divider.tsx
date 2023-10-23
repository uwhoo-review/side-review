import styled from "./style";

interface DividerProps {
  width?: string;
  color?: string;
}

const Divider = ({ width = "100%", color = "#42424A" }: DividerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="2"
      viewBox="0 0 690 2"
      fill="none"
    >
      <path d="M1 1L689 1.00006" stroke={color} strokeLinecap="round" />
    </svg>
  );
};

export default Divider;
