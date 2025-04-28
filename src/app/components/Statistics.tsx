import { Box, Heading, Text, Flex } from "@radix-ui/themes";
import React from "react";
import { Category } from "../dashboard/page";

interface StatisticsProps {
  category: Category;
  stats: {
    users: number;
    goods: number;
    employees: number;
  };
  currentCategoryCount: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  category,
  stats,
  currentCategoryCount,
}) => {
  const getCategoryTitle = () => {
    switch (category) {
      case "users":
        return "Users Statistics";
      case "goods":
        return "Goods Statistics";
      case "employees":
        return "Employees Statistics";
      default:
        return "Statistics";
    }
  };

  return (
    <Box className="bg-white p-6 rounded-xl shadow-sm h-full">
      <Heading as="h2" size="5" weight="bold" className="mb-5 text-gray-800">
        {getCategoryTitle()}
      </Heading>

      <Flex direction="column" gap="4">
        <Text className="text-gray-700 text-lg">
          <Text weight="bold" className="text-lg">
            Total {category}:
          </Text>{" "}
          {currentCategoryCount}
        </Text>

        <Box className="mt-2">
          <Text weight="bold" className="mb-3 text-gray-800 text-xl">
            System Statistics:
          </Text>
          <Flex direction="column" gap="3" className="pl-4">
            <Text className="text-gray-700 text-lg">
              Users in system: {stats.users}
            </Text>
            <Text className="text-gray-700 text-lg">
              Goods in system: {stats.goods}
            </Text>
            <Text className="text-gray-700 text-lg">
              Employees in system: {stats.employees}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Statistics;
