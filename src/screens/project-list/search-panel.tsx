import { Input, Select } from "antd";
import IdSelect from "src/components/id-select";
import { Row } from "src/components/lib";
import { Optional } from "src/types";

export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: number;
  };
  setParam: (param: Optional<SearchPanelProps["param"], "personId">) => void;
}

function SearchPanel({ param, setParam, users }: SearchPanelProps) {
  return (
    <>
      <h1>项目列表</h1>

      <Row marginBottom gap>
        <Input
          placeholder={"项目名"}
          style={{ width: "20rem" }}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <IdSelect
          options={users.map(({ name, id }) => ({ label: name, id }))}
          onChange={(personId) =>
            setParam({
              ...param,
              personId,
            })
          }
        />
      </Row>
    </>
  );
}

export default SearchPanel;
