import { Rate } from "antd";
import { ComponentProps } from "react";

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Pin({ checked, onCheckedChange, ...restProps }: PinProps) {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
    />
  );
}

export default Pin;
