import { Select } from "antd";
import React, { ComponentProps } from "react";

interface Option {
  label: string;
  id?: number;
}
type SelectProps = ComponentProps<typeof Select>;
interface IdSelectProps
  extends Omit<SelectProps, "options" | "onChange" | "defaultOption"> {
  options: Option[];
  onChange?: (value?: number) => void;
  defaultOption?: Option;
}

/**
 * 在 Antd Select 的外层包一层
 * 用于处理
 *  1. 服务器 id 为 number 但从事件中拿到的是 string 的问题
 *  2. 处理默认值 / undefined 问题
 * @param props
 * @returns
 */
function IdSelect({
  options,
  onChange,
  defaultOption,
  ...restProps
}: IdSelectProps) {
  return (
    <Select
      onChange={(value) => onChange?.(toNumber(value))}
      defaultValue={defaultOption?.id}
      placeholder={defaultOption?.label}
      {...restProps}
    >
      <Select.Option value={defaultOption?.id}>
        {defaultOption?.label}
      </Select.Option>
      {options.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
}

// 纯正的数字可以返回 number
// 字符串尝试去变成数字 "" 除外
const toNumber = (v: unknown) => {
  if (typeof v === "number") {
    return v;
  }
  if (typeof v === "string") {
    if (v === "") {
      return undefined;
    }
    const val = Number(v);
    return Number.isNaN(val) ? undefined : val;
  }
  return undefined;
};

export default IdSelect;
