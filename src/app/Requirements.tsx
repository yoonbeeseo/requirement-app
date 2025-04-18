import { use } from "react";
import RContext from "../context/RContext";
import RItem from "../components/RItem";

const Requirements = () => {
  const { onChangeRs, rs } = use(RContext);
  return (
    <div>
      {rs.length > 0 ? (
        <ul className="flex flex-col gap-y-2.5 p-5 max-w-100 mx-auto sm:max-w-160 w-full lg:max-w-256">
          {rs.map((r) => (
            <li key={r.id}>
              <RItem
                {...r}
                handleDelete={() =>
                  onChangeRs(rs.filter((item) => item.id !== r.id))
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12.5 text-center">추가된 요구사항이 없습니다.</p>
      )}
    </div>
  );
};

export default Requirements;
