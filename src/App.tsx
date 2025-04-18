//! 페이지 라우팅 하는 곳

import { BrowserRouter, Routes, Route } from "react-router";
import Intro from "./app/Intro";
import Layout from "./components/Layout";
import Requirements from "./app/Requirements";
import RProvider from "./context/RProvider";
import Detail from "./app/Detail";
import Form from "./components/Form";

const App = () => {
  return (
    <RProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Intro} />
            <Route path="add-edit" Component={Form} />
            <Route path="requirements" Component={Requirements} />
            <Route path=":rid" Component={Detail} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RProvider>
  );
};

export default App;
