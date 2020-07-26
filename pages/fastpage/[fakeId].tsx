import React from "react";
import { useRouter } from "next/router";

const FastPage = () => {
  const router = useRouter();
  console.log({ router });
  return <div>this should load real fast</div>;
};

export default FastPage;
