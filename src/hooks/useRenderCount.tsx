/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { useRef } from "react";

export const useRenderCount = (componentName: string): void => {
  const renderCount = useRef(0);
  renderCount.current++;
  if (renderCount.current > 50) {
    console.log(`rendering ${componentName}`, renderCount.current);
  }
};

export default useRenderCount;
