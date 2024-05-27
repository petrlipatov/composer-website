import { Dispatch } from "react";
import { ProjectData } from "../../_types";

export type ProjectProps = {
  index: number;
  data: ProjectData;
  isSelected: boolean;
  setSelectedProjectIndex: Dispatch<React.SetStateAction<number>>;
  styles?: any;
};
