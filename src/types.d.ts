//! interface = 객체 형태의 타입을 만드는 법
interface User {
  name: string;
  age: number;
}

//! type = 모든 타입을 만드는 방법
type User2 = {
  name: string;
  age: number;
};

//! 요구사항 타입 => Requirement Type
type RType = {
  id: number | string;
  page: string;
  title: string;
  descs: Array<string> | string[]; // [string] 배열이긴 하지만 하나의 문자열을 담는 배열 => Tuple
  manager: string;
  status: RStatus; // 진행중 진헁중
};

type RStatus = "진행중" | "계획중" | "완료";
