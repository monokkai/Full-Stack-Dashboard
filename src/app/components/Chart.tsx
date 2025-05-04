import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { User } from "../classes/User";

interface IChartProps {
  data: User[];
  dataKey: "city" | "birthYear" | "purchasedProducts";
}

interface ChartDataItem {
  name: string;
  count: number;
}

interface BarConfigItem {
  dataKey: string;
  name: string;
  fill: string;
}

type BarConfigType = {
  [key in "city" | "birthYear" | "purchasedProducts"]: BarConfigItem;
};

const Chart: React.FC<IChartProps> = ({ data, dataKey }: IChartProps) => {
  const chartData: ChartDataItem[] = [];

  if (dataKey === "purchasedProducts") {
    const allProducts: string[] = [];

    for (const user of data) {
      if (user.goods && user.goods.length > 0) {
        for (const product of user.goods) {
          allProducts.push(product.title);
        }
      }
    }

    const productCounts: Record<string, number> = {};
    for (const productName of allProducts) {
      if (!productCounts[productName]) {
        productCounts[productName] = 0;
      }
      productCounts[productName] += 1;
    }

    for (const productName in productCounts) {
      chartData.push({
        name: productName,
        count: productCounts[productName],
      });
    }

    chartData.sort((a, b) => b.count - a.count);
  } else if (dataKey === "city") {
    const cityCounts: Record<string, number> = {};

    for (const user of data) {
      if (!cityCounts[user.city]) {
        cityCounts[user.city] = 0;
      }
      cityCounts[user.city] += 1;
    }

    for (const cityName in cityCounts) {
      chartData.push({
        name: cityName,
        count: cityCounts[cityName],
      });
    }

    chartData.sort((a, b) => b.count - a.count);
  } else {
    const ageGroupCounts: Record<string, number> = {};

    for (const user of data) {
      const birthYear = new Date(user.birthYear).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      const decade = Math.floor(age / 10) * 10;
      const ageGroup = `${decade}-${decade + 9}`;

      if (!ageGroupCounts[ageGroup]) {
        ageGroupCounts[ageGroup] = 0;
      }
      ageGroupCounts[ageGroup] += 1;
    }

    for (const groupName in ageGroupCounts) {
      chartData.push({
        name: groupName,
        count: ageGroupCounts[groupName],
      });
    }

    chartData.sort((a, b) => {
      const ageA = parseInt(a.name.split("-")[0]);
      const ageB = parseInt(b.name.split("-")[0]);
      return ageA - ageB;
    });
  }

  const barConfig: BarConfigType = {
    purchasedProducts: {
      dataKey: "count",
      name: "Purchases",
      fill: "#82ca9d",
    },
    city: {
      dataKey: "count",
      name: "Cities",
      fill: "#8884d8",
    },
    birthYear: {
      dataKey: "count",
      name: "BirthDates",
      fill: "#ffc658",
    },
  };
  const defaultBarConfig = {
    dataKey: "count",
    name: "Количество",
    fill: "#82ca9d",
  };

  const currentBarConfig = barConfig[dataKey] || defaultBarConfig;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={currentBarConfig.dataKey}
          name={currentBarConfig.name}
          fill={currentBarConfig.fill}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
