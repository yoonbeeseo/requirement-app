import { Link } from "react-router";

const Intro = () => {
  return (
    <div className="min-h-full justify-center items-center gap-y-5 px-10 max-w-175 mx-auto">
      <h1>요구사항을 쓰게하는 강력한 문구</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere nemo,
        natus ex, iure quisquam eius voluptatem officiis eos neque pariatur
        eveniet necessitatibus illum labore dolorem quas rem doloribus nihil
        nobis.
      </p>
      <Link to="/add-edit" className="button rounded-full px-5">
        요구사항 작성하기
      </Link>
    </div>
  );
};

export default Intro;
