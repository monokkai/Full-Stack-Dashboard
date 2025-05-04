import { Box, Heading, Text, Flex, Select } from "@radix-ui/themes";
import React, { useState } from "react";
import { Category, Repositories } from "../dashboard/page";
import Chart from "./Chart";
import { UserRepository } from "../repositories/userRepository";
import { GoodRepository } from "../repositories/goodRepository";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { User } from "../classes/User";

interface StatisticsProps {
  category: Category;
  stats: {
    users: number;
    goods: number;
    employees: number;
  };
  currentCategoryCount: number;
  repositories: Repositories;
}

const Statistics: React.FC<StatisticsProps> = ({
  category,
  stats,
  currentCategoryCount,
  repositories,
}: StatisticsProps) => {
  const [criteria, setCriteria] = useState<
    "city" | "birthYear" | "purchasedProducts"
  >("purchasedProducts");

  const getCategoryTitle = () => {
    switch (category) {
      case "users":
        return "Users stat";
      case "goods":
        return "Goods stat";
      case "employees":
        return "Employees stat";
      default:
        return "Stat";
    }
  };

  const getCurrentData = () => {
    switch (category) {
      case "users":
        const users = repositories.users.getAll();
        return users;
      case "goods":
        const goods = repositories.goods.getAll();
        return goods;
      case "employees":
        const employee = repositories.employees.getAll();
        return employee;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();

  const handleCriteriaChange = (value: string) => {
    setCriteria(value as "city" | "birthYear" | "purchasedProducts");
  };

  return (
    <Box className="bg-white p-6 rounded-xl shadow-sm h-full">
      <Heading as="h2" size="5" weight="bold" className="mb-5 text-gray-800">
        {getCategoryTitle()}
      </Heading>

      <Flex direction="column" gap="4">
        <Flex justify="between">
          <Text className="text-gray-700 text-lg">
            <Text weight="bold">
              Текущие{" "}
              {category === "users"
                ? "users"
                : category === "goods"
                  ? "goods"
                  : "employees"}
              :
            </Text>{" "}
            {currentCategoryCount}
          </Text>
          <Text className="text-gray-700 text-lg">
            <Text weight="bold">Total registrated:</Text> {stats[category]}
          </Text>
        </Flex>

        {category === "users" && (
          <Box className="mt-2">
            <Select.Root value={criteria} onValueChange={handleCriteriaChange}>
              <Select.Trigger className="w-full" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Categories</Select.Label>
                  <Select.Item value="purchasedProducts">
                    Popular goods
                  </Select.Item>
                  <Select.Item value="city">Cities</Select.Item>
                  <Select.Item value="birthYear">Ages</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Box className="mt-4">
              <Chart data={currentData as User[]} dataKey={criteria} />
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Statistics;
