import { createContext } from "react";

interface RContextProps {
  rs: RType[];
  pages: string[];
  managers: string[];

  onChangeRs: (rs: RType[]) => void;
  onChangePs: (pages: string[]) => void;
  onChangeMs: (managers: string[]) => void;
}

const initialState: RContextProps = {
  managers: [],
  pages: [],
  rs: [],
  onChangeMs: () => {},
  onChangePs: () => {},
  onChangeRs: () => {},
};

const RContext = createContext(initialState);

export default RContext;
