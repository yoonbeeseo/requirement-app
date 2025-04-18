import { useRef, useState } from "react";
import Input from "./Input";

type Props = {
  payload: string[];
  onSubmit: (props: string[]) => void;
  isManger?: boolean;
};

const ModalForm = ({ onSubmit, payload, isManger }: Props) => {
  const title = isManger ? "매니저" : "페이지";
  const [page, setPage] = useState("");

  const ref = useRef<HTMLInputElement>(null);
  const focus = () => setTimeout(() => ref.current?.focus(), 100);

  const handlePage = () => {
    if (page.length === 0) {
      alert(title + " 이름을 입력해주세요.");
      return focus();
    }

    const found = payload.find((item) => item === page);
    if (found) {
      alert(`중복된 ${title} 이름입니다.`);
      return focus();
    }

    onSubmit([...payload, page]);
    setPage("");
    focus();
  };
  return (
    <div>
      {payload.length > 0 && (
        <div className="mb-2.5">
          <h2 className="font-semibold mb-1">{title} 목록</h2>
          <ul className="flex flex-col gap-y-1 max-h-25 overflow-y-auto">
            {payload.map((p, i) => (
              <li key={p} className="flex items-center gap-x-2.5">
                {i + 1}. {p}{" "}
                <button
                  className="bg-gray-50 py-1.5"
                  onClick={() => {
                    onSubmit(payload.filter((page) => page !== p));
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePage();
        }}
      >
        <Input
          type="text"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          placeholder={`${!isManger ? "홈페이지" : "박보검"}`}
          id="page"
          label={`${isManger ? "매니저" : "페이지"}` + " 이름"}
        />
        <button className="button w-full mt-5">추가</button>
      </form>
    </div>
  );
};

export default ModalForm;
