import { useState } from "react";
import Paginator from "../components/ui/Paginator";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { ITodo } from "../interfaces";

const Todos = () => {
  const userData = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser") as string)
    : null;
  const [currentPage, setCurrentPage] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const [sortedBy, setSortedBy] = useState("DESC");
  const { isLoading, data, isFetching } = useAuthenticatedQuery({
    queryKey: [`todos-page-${currentPage}`, ` ${pageSize} `, sortedBy],
    url: `/todos?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort=createdAt:${sortedBy}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };
  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortedBy(e.target.value);
  };
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className=" flex  flex-col gap-3 items-start">
          <label className="mb-0"> Page Size</label>
          <select
            className="border-2 border-indigo-400 px-2 py-1 rounded-md outline-none"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className=" flex  flex-col gap-3 items-start">
          <label className="mb-0"> Sorted By </label>
          <select
            className="border-2 border-indigo-400 px-2 py-1 rounded-md outline-none"
            value={sortedBy}
            onChange={handleChangeSort}
          >
            <option disabled> Sort By </option>
            <option value="ASC"> Oldest to Newest</option>
            <option value="DESC"> Newest to Oldest</option>
          </select>
        </div>
      </div>
      {data?.data.data.length ? (
        data?.data.data.map((todo: ITodo) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            key={todo.id}
          >
            <p className="w-full font-semibold">
              {(todo.id - 822) / 2}-{todo.title}
            </p>
          </div>
        ))
      ) : (
        <h3>No Todos Found yet !</h3>
      )}
      <div className="mt-4">
        <Paginator
          page={currentPage}
          pageCount={data?.data.meta.pagination.pageCount}
          onClickPrev={() => {
            setCurrentPage((prev: number) => prev - 1);
          }}
          isLoading={isLoading || isFetching}
          onClickNext={() => {
            setCurrentPage((prev: number) => prev + 1);
          }}
          total={data?.data.meta.pagination.total}
        />
      </div>
    </>
  );
};
export default Todos;
