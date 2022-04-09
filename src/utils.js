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
