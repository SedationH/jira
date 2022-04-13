import { useEffect, useState } from "react";

// const isFalsy = (value: unknown) => (value === 0 ? false : !value);
const isMeaningless = (value: unknown) =>
  value === undefined || value === null || value === "";
// function 也是 object
// {...()=>{}} 是无意义的

// 改变传入对象是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const val = result[key];
    if (isMeaningless(val)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
