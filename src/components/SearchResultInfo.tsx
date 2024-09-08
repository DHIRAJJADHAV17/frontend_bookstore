import { Link } from "react-router-dom";

type Props = {
  total: number;
  title: string;
};

const SearchResultInfo = ({ total, title }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Book found in {title}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Title
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
