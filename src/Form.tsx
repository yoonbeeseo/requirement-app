import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Input from "./Input";
import Select from "./Select";

type Props = {
  payload?: RType; //! 수정 / 추가 구분
  onSubmit: (requirement: RType) => void;
};

const initialState: RType = {
  descs: [],
  page: "",
  id: "",
  manager: "",
  status: "계획중",
  title: "",
};

const Form = ({ payload, onSubmit }: Props) => {
  const [r, setR] = useState<RType>(payload ?? initialState);
  const [desc, setDesc] = useState("");
  const [isWorkingonDesc, setIsWorkingonDesc] = useState(false);

  //! Generic
  const onChangeR = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, id } = e.target;
    setR((prev) => ({ ...prev, [id]: value }));
  };

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const pageRef = useRef<HTMLSelectElement>(null);
  const managerRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const focus = (target: keyof RType | "desc") => {
    setTimeout(() => {
      switch (target) {
        case "title":
          return titleRef.current?.focus();
        case "desc":
          return descRef.current?.focus();
        case "page":
          return pageRef.current?.showPicker(); //! select창 옵션 보기
        case "manager":
          return managerRef.current?.showPicker(); //! select창 옵션 보기
        case "status":
          return statusRef.current?.showPicker(); //! select창 옵션 보기
      }
    }, 100);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isWorkingonDesc) {
      if (desc.length === 0) {
        alert("상세내역을 입력해주세요.");
        return focus("desc");
      }

      const found = r.descs.find((d) => d === desc);
      if (found) {
        alert("중복된 상세내역입니다.");
        // setDesc('')
        return focus("desc");
      }
      setR((prev) => ({ ...prev, descs: [...prev.descs, desc] }));
      setDesc("");
      focus("desc");
      return;
    }

    if (r.page.length === 0) {
      alert("페이지를 선택해주세요.");
      return focus("page");
    }
    if (r.manager.length === 0) {
      alert("담당자를 선택해주세요.");
      return focus("manager");
    }
    if (r.status.length === 0) {
      alert("진행상태를  선택해주세요.");
      return focus("status");
    }
    if (r.title.length === 0) {
      alert("기능을 입력해주세요.");
      return focus("title");
    }

    if (r.descs.length === 0) {
      alert("최소 1개 이상의 상세내역을 입력해주세요.");
      return focus("desc");
    }

    console.log(r);
    return;
    onSubmit(r);
    setR(initialState);
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2.5 p-5 max-w-100 mx-auto sm:max-w-160 w-full lg:max-w-256"
      >
        <div className="gap-2.5 sm:flex-row">
          <div className="flex-row gap-x-2.5">
            <Select
              id="page"
              onChange={(e) => {
                onChangeR(e);
                focus("manager");
              }}
              label="페이지"
              ref={pageRef}
            >
              {pages.map((page, index) => {
                return (
                  <option key={page} value={page}>
                    {index + 1}. {page}
                  </option>
                );
              })}
            </Select>
            <Select
              id="manager"
              onChange={(e) => {
                onChangeR(e);
                focus("status");
              }}
              label="담당자"
              ref={managerRef}
            >
              {pages.map((page, index) => {
                return (
                  <option key={page} value={page}>
                    {index + 1}. {page}
                  </option>
                );
              })}
            </Select>
            <Select
              id="status"
              onChange={(e) => {
                onChangeR(e);
                focus("title");
              }}
              label="진행상태"
              ref={statusRef}
            >
              {pages.map((page, index) => {
                return (
                  <option key={page} value={page}>
                    {index + 1}. {page}
                  </option>
                );
              })}
            </Select>
          </div>

          <div className="flex-1">
            <Input
              label="기능"
              type="text"
              value={r.title}
              onChange={onChangeR}
              id="title"
              placeholder="로그인 버튼"
              ref={titleRef}
            />
          </div>
        </div>

        <div className="gap-y-5 lg:flex-row lg:items-end gap-x-2.5">
          <div className="lg:flex-1">
            {r.descs.length > 0 && (
              <div className="wrap">
                <label htmlFor="desc" className="label">
                  요구사항 상세내역
                </label>
                <ul className="flex flex-col mb-2.5 gap-y-1">
                  {r.descs.map((d, i) => {
                    const onDelete = () => {
                      setR((prev) => ({
                        ...prev,
                        descs: prev.descs.filter((desc) => desc !== d),
                      }));
                      if (r.descs.length === 1) {
                        focus("desc");
                      }
                    };
                    return (
                      <li key={d} className="flex">
                        <p className="line-clamp-[8] flex-1 font-light">
                          {i + 1}. {d}
                        </p>
                        <div className="justify-end">
                          <button
                            type="button"
                            onClick={onDelete}
                            className="bg-gray-50 text-xs p-1.5"
                          >
                            삭제
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <Input
              ref={descRef}
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              placeholder="알림창에서 로그인 하시겠습니까? 확인 누르면 로그인으로 이동..."
              onFocus={() => setIsWorkingonDesc(true)}
              onBlur={() => setIsWorkingonDesc(false)}
              onKeyDown={(e) => {
                const { key, nativeEvent } = e;
                if (key === "Tab" && !nativeEvent.isComposing) {
                  console.log("하고싶은거 하세요~", desc);
                }
              }}
            />
          </div>
          <button className="button lg:min-w-50">
            {!payload ? "추가" : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

const pages: string[] = [
  "홈",
  "상품",
  "로그인",
  "회원가입",
  "나의상품",
  "정보수정",
];
