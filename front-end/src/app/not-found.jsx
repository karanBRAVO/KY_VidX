import Link from "next/link";

const NotFound = () => {
  return (
    <div className="m-2 mt-[130px] p-2 text-white flex items-start sm:items-center flex-col justify-start">
      <h2 className="text-5xl text-white leading-tight tracking-tighter capitalize m-2">
        {`[`}
        <span className="text-8xl text-red-500 mx-2">404</span>
        {`] `}Not Found
      </h2>
      <p className="text-slate-400 p-1 m-2">
        Could not find requested resource
      </p>
      <Link href="/">
        <span className="bg-blue-500 border-2 border-solid border-blue-500 text-white px-2 py-3 m-2 mt-3">
          Return Home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
