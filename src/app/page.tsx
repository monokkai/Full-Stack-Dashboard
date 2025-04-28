import { Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <Heading as="h1">
      <Link href="/dashboard">Dashboard</Link>
    </Heading>
  );
};

export default Home;
