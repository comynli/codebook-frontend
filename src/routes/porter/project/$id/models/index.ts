import { Project } from "~/generated";

export interface OutletContext {
    project?: Project;
    refresh: () => void;
}
