import React from "react";
import CardTest from "./CardTest";
import { allTests } from "./testInfo";

interface TestContainerP {
  testName: "shapes" | "shapes_numbers" | "shapes_numbers_colors" | "all_attrs";
  advance: () => void;
}
const TestContainer: React.FC<TestContainerP> = ({ testName, advance }) => {
  const onTestIsDone = () => {
    setTimeout(advance, 1000);
  };
  const tests = allTests[testName];
  if (!tests) return <div>no tests</div>;
  return (
    <div>
      <CardTest tests={allTests[testName]} onTestIsDone={onTestIsDone} />
    </div>
  );
};

export default TestContainer;
