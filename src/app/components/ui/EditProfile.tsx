import React, { useState, useEffect } from "react";
import { Dialog, Text, TextField, Button, Flex, Box } from "@radix-ui/themes";
import { User } from "@/app/classes/User";
import { Good } from "@/app/classes/Good";
import { Employee } from "@/app/classes/Employee";
import { GoodRepository } from "@/app/repositories/goodRepository";

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
  const [selectedProducts, setSelectedProducts] = useState<Good[]>([]);

  useEffect(() => {
    setFormData({ ...item } as FormDataType);

    if (category === "users") {
      const user = item as User;
      setSelectedProducts(user.goods || []);
    }
  }, [item, category]);

  const handleInputChange = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = () => {
    const updatedItem = {
      ...formData,
      id: item.id,
    } as User | Good | Employee;

    if (category === "users") {
      (updatedItem as User).goods = selectedProducts;
    }

    onSave(updatedItem);
  };

  const renderFormFields = () => {
    return Object.keys(item).map((key) => {
      return (
        <label key={key}>
          <Text as="div" size="2" mb="1" weight="bold">
            {key}
          </Text>
          <TextField.Root
            value={formData[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={`Enter goods`}
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
          {category === "users" && (
            <Dialog.Root>
              <Dialog.Trigger>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Choose products
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Title>Choose products</Dialog.Title>
                <Box my="4">
                  <ProductSelectionList
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                </Box>
                <Flex justify="end" gap="3">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Close
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          )}
          <Dialog.Close>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

interface ProductSelectionListProps {
  selectedProducts: Good[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Good[]>>;
}

const ProductSelectionList: React.FC<ProductSelectionListProps> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  const [products, setProducts] = useState<Good[]>([]);

  useEffect(() => {
    const goodRepository = new GoodRepository();
    goodRepository.generateData(50);
    setProducts(goodRepository.getAll());
  }, []);

  const handleProductSelect = (product: Good) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);

      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <Box style={{ maxHeight: "300px", overflow: "auto" }}>
      {products.map((product, index) => (
        <Box
          key={product.id}
          className={`py-2 px-4 mb-2 rounded cursor-pointer ${
            selectedProducts.some((p) => p.id === product.id)
              ? "bg-green-100"
              : index % 2 === 0
                ? "bg-blue-50"
                : "bg-blue-100"
          }`}
          onClick={() => handleProductSelect(product)}
        >
          {product.title}
        </Box>
      ))}
    </Box>
  );
};

export default EditProfile;
