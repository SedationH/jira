import { Input } from "antd";
import { Row } from "src/components/lib";

export interface User {
  id: string;
  name: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
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
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
        <select name="pets" id="pet-select">
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </Row>
    </>
  );
}

export default SearchPanel;
