/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useState, useRef } from "react";

export const useAttrButtons = () => {
  const [attrCharIndex, setAttrCharIndex] = useState(0); // which attribute to automatically change next
  const [shape, setShape] = useState("d");
  const [num, setNum] = useState("1");
  const [color, setColor] = useState("r");
  const [fill, setFill] = useState("f");

  const intervalRef = useRef(0);

  const gridObjects = [
    {
      title: "shape",
      value: shape,
      setter: setShape,
      valueOptions: ["d", "r", "s"],
    },
    {
      title: "number",
      value: num,
      setter: setNum,
      valueOptions: ["1", "2", "3"],
    },
    {
      title: "color",
      value: color,
      setter: setColor,
      valueOptions: ["r", "g", "b"],
    },
    {
      title: "fill",
      value: fill,
      setter: setFill,
      valueOptions: ["f", "e", "s"],
    },
  ];

  const changeNextAttr = useCallback(() => {
    // change a different attribute each time
    setAttrCharIndex((old) => (old + 1) % 4);
    const { setter, value, valueOptions } = gridObjects[attrCharIndex];

    // randomly move it up 1 or down 1.
    const currentIndex = valueOptions.findIndex((letter) => letter === value);

    // moving it up 2 is the same as moving it down 1, because its % 3.
    const delta = Math.random() - 0.5 > 0 ? 1 : 2;
    const nextIndex = (currentIndex + delta) % 3;

    setter(valueOptions[nextIndex]);
  }, [attrCharIndex, setAttrCharIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      changeNextAttr();
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [changeNextAttr, intervalRef.current]);

  const cardId = `${color}${fill}${num}${shape}`;

  return { gridObjects, cardId };
};
