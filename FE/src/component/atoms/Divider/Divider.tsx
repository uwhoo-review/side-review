import styled from "./style";

interface DividerProps {
  className?: string;
  length?: string;
  color?: string;
  direction?: "h" | "v";
}

const Divider = ({
  className,
  length = "100%",
  color = "#42424A",
  direction = "h",
}: DividerProps) => {
  return (
    <>
      {direction === "h" && (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width={length}
          height="2"
          viewBox="0 0 690 2"
          fill="none"
        >
          <path d="M1 1L689 1.00006" stroke={color} strokeLinecap="round" />
        </svg>
      )}
      {direction === "v" && (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="2"
          height={length}
          viewBox="0 0 2 16"
          fill="none"
        >
          <path d="M1 1L0.999999 15" stroke={color} strokeLinecap="round" />
        </svg>
      )}
    </>
  );
};

export default Divider;
