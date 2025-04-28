"use client";
import React, { useState, useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import Sidebar from "../components/Sidebar";
import ListView from "../components/ListView";
import {
  userFaker,
  goodFaker,
  employeeFaker,
} from "../repositories/functions/faker";
import { User } from "@/app/classes/User";
import { Good } from "@/app/classes/Good";
import { Employee } from "@/app/classes/Employee";
import CardView from "../[id]/CardView";

export type Category = "users" | "goods" | "employees";

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("users");
  const [selectedItem, setSelectedItem] = useState<User | Good | Employee | null>(
    null
  );
  const [users, setUsers] = useState<User[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setUsers(userFaker(50));
    setGoods(goodFaker(50));
    setEmployees(employeeFaker(50));
  }, []);

  const getData = () => {
    switch (selectedCategory) {
      case "users":
        return users;
      case "goods":
        return goods;
      case "employees":
        return employees;
      default:
        return users;
    }
  };

  const getStats = () => {
    return {
      users: users.length,
      goods: goods.length,
      employees: employees.length,
    };
  };

  const handleItemClick = (item: User | Good | Employee) => {
    setSelectedItem(item);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleItemUpdate = (updatedItem: User | Good | Employee) => {
    setSelectedItem(updatedItem);
    
    if (selectedCategory === "users") {
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === updatedItem.id ? updatedItem as User : user)
      );
    } else if (selectedCategory === "goods") {
      setGoods(prevGoods => 
        prevGoods.map(good => good.id === updatedItem.id ? updatedItem as Good : good)
      );
    } else if (selectedCategory === "employees") {
      setEmployees(prevEmployees => 
        prevEmployees.map(employee => employee.id === updatedItem.id ? updatedItem as Employee : employee)
      );
    }
  };

  return (
    <Flex gap="8" p="5" className="min-h-screen bg-blue-50">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
      {selectedItem ? (
        <CardView
          item={selectedItem}
          category={selectedCategory}
          onBack={handleBack}
          onUpdate={handleItemUpdate}
        />
      ) : (
        <ListView
          data={getData()}
          stats={getStats()}
          category={selectedCategory}
          onItemClick={handleItemClick}
        />
      )}
    </Flex>
  );
};

export default Dashboard;
