import { Button } from "@radix-ui/themes";
import React from "react";

interface ICustomButtonProps {
  title: string;
}

const CustomButton = ({ title }: ICustomButtonProps) => {
  return <Button>{title}</Button>;
};

export default CustomButton;
