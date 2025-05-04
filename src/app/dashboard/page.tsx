"use client";
import React, { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import ListView from "../components/ListView";
import CardView from "../[id]/CardView";
import { UserRepository } from "../repositories/userRepository";
import { GoodRepository } from "../repositories/goodRepository";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { User } from "@/app/classes/User";
import { Good } from "@/app/classes/Good";
import { Employee } from "@/app/classes/Employee";
import Chart from "../components/Chart";

export type Category = "users" | "goods" | "employees";
export type Repositories = {
  users: UserRepository;
  goods: GoodRepository;
  employees: EmployeeRepository;
};

const Dashboard: React.FC = () => {
  const userRepository: UserRepository = new UserRepository();
  const goodRepository: GoodRepository = new GoodRepository();
  const employeeRepository: EmployeeRepository = new EmployeeRepository();

  userRepository.generateData(50);
  goodRepository.generateData(50);
  employeeRepository.generateData(50);

  const users: User[] = userRepository.getAll();
  const goods: Good[] = goodRepository.getAll();
  const employees: Employee[] = employeeRepository.getAll();

  const [selectedCategory, setSelectedCategory] = useState<Category>("users");
  const [selectedItem, setSelectedItem] = useState<
    User | Good | Employee | null
  >(null);

  const [entitiesList, setEntitiesList] = useState<(User | Good | Employee)[]>(
    []
  );

  const repositories: Repositories = {
    users: userRepository,
    goods: goodRepository,
    employees: employeeRepository,
  };

  const handleBack: () => void = () => setSelectedItem(null);
  const handleItemUpdate: (updatedItem: User | Good | Employee) => void = (
    updatedItem: User | Good | Employee
  ) => {
    repositories[selectedCategory].update(updatedItem.id, updatedItem);
    setSelectedItem(updatedItem);

    setEntitiesList((prevInfo) =>
      prevInfo.map((item) => (item.id == updatedItem.id ? updatedItem : item))
    );
  };

  const sidebarItems: SidebarProps[] = [
    {
      title: "users",
      onSelectCategory: () => {
        setEntitiesList(users);
      },
    },
    {
      title: "goods",
      onSelectCategory: () => {
        setEntitiesList(goods);
      },
    },
    {
      title: "employees",
      onSelectCategory: () => {
        setEntitiesList(employees);
      },
    },
  ];

  return (
    <Flex gap="8" p="5" className=" bg-blue-50">
      <Sidebar payload={sidebarItems} />
      {selectedItem ? (
        <CardView
          item={selectedItem}
          category={selectedCategory}
          onBack={handleBack}
          onUpdate={handleItemUpdate}
        />
      ) : (
        <ListView
          data={entitiesList}
          repositories={repositories}
          stats={{
            users: users.length,
            goods: goods.length,
            employees: employees.length,
          }}
          category={selectedCategory}
          onItemClick={(item: User | Good | Employee) => {
            setSelectedItem(item);
          }}
        />
      )}
      <Box>
        <Chart data={users} dataKey="city" />
        <Chart data={users} dataKey="birthDate" />
      </Box>
    </Flex>
  );
};

export default Dashboard;
