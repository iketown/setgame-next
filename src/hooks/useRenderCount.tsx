/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { useRef } from "react";

export const useRenderCount = (componentName: string): void => {
  const renderCount = useRef(0);
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv !== "development") return null;
  renderCount.current++;
  if (renderCount.current > 100) {
    console.log(`rendering ${componentName}`, renderCount.current);
  }
};

export default useRenderCount;
