import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Row } from "src/components/lib";
import EpicScreen from "../epic";
import KanbanScreen from "../kanban";

export const ProjectScreen = () => {
  return (
    <>
      <Row>
        <Link to={"kanban"}>看板</Link>
        <Link to={"epic"}>任务组</Link>
      </Row>
      <Routes>
        <Route index element={<KanbanScreen />} />
        {/*projects/:projectId/kanban*/}
        <Route path={"kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"epic"} element={<EpicScreen />} />
      </Routes>
    </>
  );
};
export default ProjectScreen;
