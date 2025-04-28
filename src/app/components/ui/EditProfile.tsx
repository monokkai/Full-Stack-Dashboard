import React, { useState, useEffect } from "react";
import { Dialog, Text, TextField, Button, Flex } from "@radix-ui/themes";
import { User } from "@/app/classes/User";
import { Good } from "@/app/classes/Good";
import { Employee } from "@/app/classes/Employee";

interface EditProfileProps {
  item: User | Good | Employee;
  category: "users" | "goods" | "employees";
  onSave: (updatedItem: User | Good | Employee) => void;
  children: React.ReactNode;
}

type FormDataType = { [key: string]: string | number };

const EditProfile: React.FC<EditProfileProps> = ({
  item,
  category,
  onSave,
  children,
}: EditProfileProps) => {
  const [formData, setFormData] = useState<FormDataType>({});

  useEffect(() => {
    setFormData({ ...item } as FormDataType);
  }, [item]);

  const handleInputChange = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = () => {
    const updatedItem = {
      ...formData,
      id: item.id,
    } as User | Good | Employee;

    onSave(updatedItem);
  };

  const renderFormFields = () => {
    return Object.keys(item).map((key) => {
      // Тут не я написал, просто показано как при считывании всех свойств объекта, вот мы считываем все свойства, и он считал еще и id у сущности, а он не user их менять, поэтому я проверяю если ключ это id или массив, то не возвращаю его
      if (key === "id" || Array.isArray(item[key as keyof typeof item])) {
        return null;
      }

      return (
        <label key={key}>
          <Text as="div" size="2" mb="1" weight="bold">
            {key}
          </Text>
          <TextField.Root
            value={formData[key]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(key, e.target.value)
            }
            placeholder={`Enter ${key}`}
          />
        </label>
      );
    });
  };

  const getTitleByCategory = (): string => {
    switch (category) {
      case "users":
        return "Edit User";
      case "goods":
        return "Edit Product";
      case "employees":
        return "Edit Employee";
      default:
        return "Edit Item";
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{getTitleByCategory()}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to this item.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {renderFormFields()}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSave}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditProfile;
