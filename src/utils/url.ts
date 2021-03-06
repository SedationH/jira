import { useCallback, useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from ".";

/**
 * 返回页面url中，指定键的参数值
 * 比如http://localhost:3000/projects?name=jack&id=1,获取对象{name:'jack',id:'1'}
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  //useSearchParams:查询url中的参数
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      //useMemo:监听searchParams的值,改变时,在执行函数,(js是对象比较是地址比较,比如相同的对象,地址不同使用useState会执行函数,useMemo是比较值,值相同时,不执行函数)
      () => subset(Object.fromEntries(searchParams), stateKeys),
      [searchParams, stateKeys]
    ),
    useCallback(
      (params: Partial<{ [key in K]: unknown }>) => {
        //Partial:联合类型
        // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
        return setSearchParams(params);
      },
      [setSearchParams]
    ),
  ] as const; // as const加不加都行,加了是对在ts推断不准确时能判断出类型(const:readonly,类型更好判断)
};

//设置url参数
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return useCallback(
    (params: { [key in string]: unknown }) => {
      return setSearchParam(
        cleanObject({
          ...Object.fromEntries(searchParams), //fromEntries,将数组里的键值对转换为对象,比如[['name','jack'],['id','1']]转换为{name:'jack',id:'1'}
          ...params,
        }) as URLSearchParamsInit
      ); //将参数添加到url里
    },
    [searchParams, setSearchParam]
  );
};
