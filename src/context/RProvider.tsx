import { useState, useEffect, PropsWithChildren } from "react";
import RContext from "./RContext";

const RProvider = ({ children }: PropsWithChildren) => {
  const [rs, setRs] = useState<RType[]>(fetchRs);
  const [pages, setPages] = useState<string[]>(fetchPages);
  const [managers, setManagers] = useState<string[]>(fetchManagers);

  const onChangeRs = () => {
    console.log("change rs");
  };
  const onChangePs = () => {};
  const onChangeMs = () => {};

  return (
    <RContext.Provider
      value={{
        managers,
        onChangeMs,
        onChangePs,
        onChangeRs,
        pages,
        rs,
      }}
    >
      {children}
    </RContext.Provider>
  );
};

export default RProvider;

const fetchPages = () => {
  const snap = localStorage.getItem("pages");
  if (!snap) {
    return [];
  }
  const data = JSON.parse(snap) as string[];
  return data ?? [];
};
const fetchManagers = () => {
  const snap = localStorage.getItem("managers");
  if (!snap) {
    return [];
  }
  const data = JSON.parse(snap) as string[];
  return data ?? [];
};
const fetchRs = () => {
  const snap = localStorage.getItem("rs");
  if (!snap) {
    return [];
  }
  const data = JSON.parse(snap) as RType[];
  return data ?? [];
};
