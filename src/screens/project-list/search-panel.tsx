import { Button, Input, Select } from "antd";
import IdSelect from "src/components/id-select";
import { Row } from "src/components/lib";
import { useProjectModal } from "src/components/project-modal/utils";
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
  const { openProjectModal } = useProjectModal();

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h1>项目列表</h1>
        <Button onClick={openProjectModal}>创建项目</Button>
      </Row>

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
          style={{ width: "10rem" }}
          defaultOption={{ label: "负责人" }}
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
