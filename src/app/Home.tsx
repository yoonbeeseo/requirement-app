import { useEffect, useState } from "react";
import Form from "../components/Form";
import Modal from "../components/Modal";
import ModalForm from "../components/ModalForm";
import RItem from "../components/RItem";

const Home = () => {
  const [isSettingPage, setIsSettingPage] = useState(false);
  const [isSettingManager, setIsSettingManager] = useState(false);

  const handlePage = () => setIsSettingPage((prev) => !prev);
  const handleManager = () => setIsSettingManager((prev) => !prev);

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

  const [pages, setPages] = useState<string[]>(fetchPages);
  const [managers, setManagers] = useState<string[]>(fetchManagers);

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));

    console.log("pages updated!");
  }, [pages]);
  useEffect(() => {
    localStorage.setItem("managers", JSON.stringify(managers));

    console.log("managers updated!");
  }, [managers]);

  const [rs, setRs] = useState<RType[]>(fetchRs);

  const onChangeRs = (r: RType) => {
    console.log(r);
    //! rs에 추가하는 로직
    setRs((prev) => [r, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem("rs", JSON.stringify(rs));

    console.log("rs updated!");
  }, [rs]);
  return (
    <>
      <header className="flex justify-center gap-x-2.5 py-2.5">
        <button className="bg-gray-50 py-2.5" onClick={handlePage}>
          페이지 설정
        </button>
        <button className="bg-gray-50 py-2.5" onClick={handleManager}>
          담당자 설정
        </button>

        {isSettingPage && (
          <Modal handleClose={handlePage}>
            <ModalForm payload={pages} onSubmit={setPages} />
          </Modal>
        )}
        {isSettingManager && (
          <Modal handleClose={handleManager}>
            <ModalForm payload={managers} onSubmit={setManagers} isManger />
          </Modal>
        )}
      </header>

      <main>
        {rs.length > 0 ? (
          <ul className="flex flex-col gap-y-2.5 p-5 max-w-100 mx-auto sm:max-w-160 w-full lg:max-w-256">
            {rs.map((r) => (
              <li key={r.id}>
                <RItem
                  {...r}
                  managers={managers}
                  pages={pages}
                  handleDelete={() =>
                    setRs((prev) => prev.filter((item) => item.id !== r.id))
                  }
                  handleUpdate={(updatedR) =>
                    setRs((prev) =>
                      prev.map((item) =>
                        item.id === updatedR.id ? updatedR : item
                      )
                    )
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-12.5 text-center">추가된 요구사항이 없습니다.</p>
        )}

        <Form onSubmit={onChangeRs} pages={pages} managers={managers} />
      </main>
    </>
  );
};

export default Home;
