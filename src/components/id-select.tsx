import { Select } from "antd";
import React from "react";

interface IdSelectProps {
  options: { label: string; id: number }[];
  onChange?: (value?: number) => void;
}

function IdSelect(props: IdSelectProps) {
  return (
    <Select
      onChange={(value) => props.onChange?.(toNumber(value))}
      defaultValue=""
    >
      <Select.Option value="">负责人</Select.Option>
      {props.options.map((option) => (
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
