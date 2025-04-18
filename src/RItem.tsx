import React, { useState } from "react";
import Form from "./Form";
import { twMerge } from "tailwind-merge";

type Props = RType & {
  handleDelete: () => void;
  handleUpdate: (requirement: RType) => void;
  managers: string[];
  pages: string[];
};
const RItem = ({
  handleDelete,
  handleUpdate,
  managers,
  pages,
  ...r
}: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const updatingHandler = () => setIsUpdating((prev) => !prev);
  return isUpdating ? (
    <Form
      managers={managers}
      pages={pages}
      onSubmit={handleUpdate}
      payload={r}
      onCancel={updatingHandler}
    />
  ) : (
    <div className="p-5 rounded-md bg-gray-50 hover:shadow-md">
      <div className="flex-row justify-between border-b border-gray-200">
        <h3 className="font-semibold">
          {r.page} - {r.title}{" "}
          <span className="font-light text-gray-700">{r.manager}</span>
        </h3>
        <p
          className={twMerge(
            "",
            r.status === "완료" && "text-theme",
            r.status === "계획중" && "text-orange-400",
            r.status === "진행중" && "text-green-500"
          )}
        >
          {r.status}
        </p>
      </div>
      <ul className="flex flex-col gap-y-1 py-2.5">
        {r.descs.map((d, i) => (
          <React.Fragment key={d}>
            <li className="text-sm font-light">
              {i + 1}. {d}
            </li>
            {r.descs.length - 1 !== i && (
              <span className={twMerge("bg-gray-100 block w-full h-[1px]")} />
            )}
          </React.Fragment>
        ))}
      </ul>
      <div className="flex-row gap-x-2.5 justify-end">
        <button className="bg-theme text-white" onClick={updatingHandler}>
          수정
        </button>
        <button
          className="bg-warning text-white"
          onClick={() => {
            if (
              confirm(
                "해당 요구사항을 삭제하시겠습니까? 삭제하면 복구가 불가능합니다."
              )
            ) {
              handleDelete();
            }
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default RItem;
