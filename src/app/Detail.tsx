import Form from "../components/Form";
import { usePayloadStore } from "../context/payload.store";

const Detail = () => {
  const { payload } = usePayloadStore();
  return !payload ? <h1>존재하지 않는 페이지 입니다.</h1> : <Form />;
};

export default Detail;
