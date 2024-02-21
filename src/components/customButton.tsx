import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "default",
  disabled = false,
  className = "",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ant-btn ${className}`}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
