import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router";
import { twMerge } from "tailwind-merge";
import { usePayloadStore } from "../context/payload.store";

const Layout = () => {
  const navi = useNavigate();
  const { pathname } = useLocation();
  const { rid } = useParams<{ rid: string }>();
  const { setPayload } = usePayloadStore();
  return (
    <>
      <header className="fixed top-0 left-0 w-full">
        <div className="max-w-300 mx-auto bg-white border-b border-gray-200 flex-row justify-between">
          {/* 홈페이지로 돌아가는 로고 */}
          <Link to="/" className={twMerge(button, "text-2xl font-black")}>
            요구사항 명세서
          </Link>

          {/* add-edit */}
          <button
            onClick={() => {
              if (pathname === "/add-edit" || rid) {
                if (
                  confirm(
                    `요구사항 ${
                      rid ? "수정을" : "추가를"
                    } 취소하시겠습니까? 취소하시면 변경사항이 적용되지 않습니다.`
                  )
                ) {
                  navi(-1);
                  setPayload(null);
                }
                return;
              }
              navi("/add-edit");
              setPayload(null);
            }}
            className={twMerge(button, "")}
          >
            {rid || pathname === "/add-edit" ? "취소" : "요구사항 추가하기"}
          </button>
        </div>
      </header>

      <main className="pt-15 pb-20 border min-h-screen">
        <Outlet />
      </main>

      <footer className="fixed bottom-0 left-0 w-full">
        <div className="border m-2.5 rounded-full h-15 border-gray-200 hover:border-theme flex-row overflow-hidden gap-x-2.5 p-2.5 bg-white hover:shadow-md">
          {menus.map((menu) => (
            <Link
              to={menu.path}
              key={menu.name}
              className={twMerge(
                "flex-1 transition hover:text-theme hover:bg-theme/5 rounded-full",
                pathname === menu.path && "text-theme bg-theme/5"
              )}
              onClick={() => {
                if (menu.name === "추가") {
                  setPayload(null);
                }
              }}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Layout;

const button = "h-15 hover:text-theme";
const menus = [
  { name: "요구사항", path: "/requirements" },
  { name: "홈", path: "/" },
  { name: "추가", path: "/add-edit" },
];
