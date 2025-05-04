import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { Category, Repositories } from "../dashboard/page";
import Statistics from "./Statistics";
import { User } from "../classes/User";
import { Good } from "../classes/Good";
import { Employee } from "../classes/Employee";

interface ListViewProps {
  data: Array<User | Good | Employee>;
  stats: { users: number; goods: number; employees: number };
  category: Category;
  repositories: Repositories;
  onItemClick: (item: User | Good | Employee) => void;
}

const fullItems = 5;

const ListView: React.FC<ListViewProps> = ({
  data,
  stats,
  category,
  repositories,
  onItemClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / fullItems);

  const startIndex = (currentPage - 1) * fullItems;
  const endIndex = startIndex + fullItems;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getCategorySpecificInfo = (item: User | Good | Employee) => {
    switch (category) {
      case "users":
        const user = item as User;
        return `Email: ${user.email} | Phone: ${user.phone}`;
      case "goods":
        const good = item as Good;
        return `Price: $${good.price} | Category: ${good.category}`;
      case "employees":
        const employee = item as Employee;
        return `Position: ${employee.position}`;
      default:
        return "";
    }
  };

  return (
    <Flex gap="6" direction="column" width="75%" className="p-5">
      <Box className="bg-white p-5 rounded-xl shadow-sm">
        <Heading as="h2" className="font-bold mb-6 text-gray-800 text-2xl">
          {category === "users" && "Users"}
          {category === "goods" && "Goods"}
          {category === "employees" && "Employees"}
        </Heading>

        <Box className="space-y-4">
          {currentItems.map((item) => (
            <Box
              key={item.id}
              onClick={() => onItemClick(item)}
              className={`
                p-4 rounded-xl transition-all cursor-pointer
                bg-blue-50 hover:bg-blue-100
                hover:shadow-md
                border border-blue-200
              `}
            >
              <Flex justify="between" align="center" className="text-gray-800">
                <Text weight="bold" className="text-gray-700 text-lg">
                  #{item.id}
                </Text>
                <Text size="5" weight="bold" className="text-gray-800">
                  {item.name || item.title}
                </Text>
                <Text className="text-gray-600 text-lg">
                  {getCategorySpecificInfo(item)}
                </Text>
              </Flex>
            </Box>
          ))}
        </Box>

        <Flex justify="between" align="center" className="mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`
              px-6 py-2 bg-blue-500 text-white rounded-xl
              border-2 border-blue-500 hover:bg-blue-600
              transition-all duration-200 font-medium text-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-sm hover:shadow-md
            `}
          >
            Previous
          </button>

          <Text className="text-gray-800 font-medium text-lg">
            Page {currentPage} of {totalPages}
          </Text>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`
              px-6 py-2 bg-blue-500 text-white rounded-xl
              border-2 border-blue-500 hover:bg-blue-600
              transition-all duration-200 font-medium text-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-sm hover:shadow-md
            `}
          >
            Next
          </button>
        </Flex>
      </Box>

      <Statistics
        category={category}
        repositories={repositories}
        stats={stats}
        currentCategoryCount={data.length}
      />
    </Flex>
  );
};

export default ListView;
