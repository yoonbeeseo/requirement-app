import { useState } from "react";
import Form from "./Form";

const App = () => {
  const [rs, setRs] = useState<RType[]>([]);

  const onChangeRs = (r: RType) => {
    console.log(r);
    //! rs에 추가하는 로직
    setRs((prev) => [r, ...prev]);
  };
  return (
    <div>
      <h1>App</h1>
      <Form onSubmit={onChangeRs} />
    </div>
  );
};

export default App;
