import { Button } from "@radix-ui/themes";
import React from "react";

interface ICustomButtonProps {
  title: string;
}

const EditButton = ({ title }: ICustomButtonProps) => {
  return <button className="bg-red-400">{title}</button>;
};

export default EditButton;
