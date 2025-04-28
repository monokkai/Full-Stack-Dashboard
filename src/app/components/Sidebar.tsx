import { Box, Grid } from "@radix-ui/themes";
import { Category } from "../dashboard/page";

interface SidebarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <Box width="25%" className="p-5">
      <Grid gap="1" columns="1">
        <Box
          onClick={() => onSelectCategory("users")}
          className={`
            py-4 w-full text-xl font-normal text-center
            cursor-pointer transition-all rounded-xl
            bg-blue-300 text-white
            ${
              selectedCategory === "users" ? "bg-blue-500" : "hover:bg-blue-400"
            }
          `}
        >
          Users
        </Box>
        <Box
          onClick={() => onSelectCategory("goods")}
          className={`
            py-4 mt-3 w-full text-xl font-normal text-center
            cursor-pointer transition-all rounded-xl
            bg-blue-300 text-white
            ${
              selectedCategory === "goods" ? "bg-blue-500" : "hover:bg-blue-400"
            }
          `}
        >
          Goods
        </Box>
        <Box
          onClick={() => onSelectCategory("employees")}
          className={`
            py-4 mt-3 w-full text-xl font-normal text-center
            cursor-pointer transition-all rounded-xl
            bg-blue-300 text-white
            ${
              selectedCategory === "employees"
                ? "bg-blue-500"
                : "hover:bg-blue-400"
            }
          `}
        >
          Employees
        </Box>
      </Grid>
    </Box>
  );
};

export default Sidebar;
