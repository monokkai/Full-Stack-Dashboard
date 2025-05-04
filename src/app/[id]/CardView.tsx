"use client";
import React, { ReactNode, useState } from "react";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { User } from "@/app/classes/User";
import { Good } from "@/app/classes/Good";
import { Employee } from "@/app/classes/Employee";
import EditProfile from "../components/ui/EditProfile";
import { UserRepository } from "../repositories/userRepository";
import { GoodRepository } from "../repositories/goodRepository";
import { EmployeeRepository } from "../repositories/employeeRepository";

interface CardViewProps {
  item: User | Good | Employee;
  category: "users" | "goods" | "employees";
  onBack: () => void;
  onUpdate?: (updatedItem: User | Good | Employee) => void;
}

const CardView: React.FC<CardViewProps> = ({
  item,
  category,
  onBack,
  onUpdate,
}: CardViewProps) => {
  const [currentItem, setCurrentItem] = useState<User | Good | Employee>(item);
  const userRepository = new UserRepository();
  const goodRepository = new GoodRepository();
  const employeeRepository = new EmployeeRepository();

  const handleSave = (updatedItem: User | Good | Employee) => {
    const id = currentItem.id;

    switch (category) {
      case "users":
        userRepository.update(id, updatedItem);
        break;
      case "goods":
        goodRepository.update(id, updatedItem);
        break;
      case "employees":
        employeeRepository.update(id, updatedItem);
        break;
    }

    setCurrentItem(updatedItem);

    if (onUpdate) {
      onUpdate(updatedItem);
    }
  };

  const renderItemDetails: () => ReactNode = () => {
    return (
      <Box>
        {Object.entries(currentItem).map(([key, value]) => {
          return (
            <Box key={key} className="mb-3">
              <strong className="text-gray-700">{key.toString()}:</strong>{" "}
              <span className="text-gray-800">{value.toString()}</span>
            </Box>
          );
        })}
      </Box>
    );
  };

  const getEditButtonText = () => {
    switch (category) {
      case "users":
        return "Edit User";
      case "goods":
        return "Edit Product";
      case "employees":
        return "Edit Employee";
      default:
        return "Edit";
    }
  };

  return (
    <Box className="bg-white p-6 rounded-xl shadow-sm w-full">
      <Flex direction="column" gap="5px">
        <Flex direction="row" gap="5px">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md w-24 cursor-pointer"
          >
            Back
          </button>
          <Box>
            <EditProfile
              item={currentItem}
              category={category}
              onSave={handleSave}
            >
              <Button className="bg-green-500 text-white hover:bg-green-600">
                {getEditButtonText()}
              </Button>
            </EditProfile>
          </Box>
        </Flex>

        <Heading size="5" className="text-gray-800 mb-4">
          Detailed Information
        </Heading>

        <Box className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          {renderItemDetails()}
        </Box>
      </Flex>
    </Box>
  );
};

export default CardView;
