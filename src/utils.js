import { useEffect, useState } from "react";

const isFalsy = (value) => (value === 0 ? false : !value);

// 改变传入对象是不好的
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const val = result[key];
    if (isFalsy(val)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb) => {
  useEffect(() => {
    cb?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = (value, delay) => {
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
