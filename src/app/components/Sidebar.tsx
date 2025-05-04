import { Box, Grid } from "@radix-ui/themes";
import { Category } from "../dashboard/page";

export interface SidebarProps {
  title: Category;
  onSelectCategory: () => void;
}

const Sidebar: React.FC<{
  payload: SidebarProps[];
}> = ({ payload }) => {
  return (
    <Box width="25%" className="p-5">
      <Grid gap="1" columns="1">
        {payload.map((item) => (
          <Box
            key={item.title}
            onClick={item.onSelectCategory}
            className={`
              py-4 w-full text-xl font-normal text-center
              cursor-pointer transition-all rounded-xl
              bg-blue-300 text-white
              
            `}
          >
            {item.title}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Sidebar;


// <Box width="25%" className="p-5">
//       <Grid gap="1" columns="1">
//         {payload.map((item) => (
//           <Box
//             key={item.title}
//             onClick={item.onSelectCategory}
//             className={`
//               py-4 w-full text-xl font-normal text-center
//               cursor-pointer transition-all rounded-xl
//               bg-blue-300 text-white
//               ${
//                 selectedCategory === item.title
//                   ? "bg-blue-500"
//                   : "hover:bg-blue-400"
//               }
//             `}
//           >
//             {item.title}
//           </Box>
//         ))}
//       </Grid>
//     </Box>