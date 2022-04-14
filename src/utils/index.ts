import { useEffect, useRef, useState } from "react";

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

/**
 * 改变页面标题
 * keepOnUnmount:页面卸载时,是否保持该标题
 * */
export const useTitle = (title: string, keepOnUnmount = true) => {
  // 保存原来的
  const oldTitle = useRef(document.title);

  // 加载后：新title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      //页面卸载时
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle.current;
      }
    };
  }, [keepOnUnmount]);
};
