import Paginator from "../components/ui/Paginator";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { ITodo } from "../interfaces";

const Todos = () => {
  const userData = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser") as string)
    : null;
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/todos?populate=*",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  console.log(data);
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
      {" "}
      {data?.data.data.length ? (
        data?.data.data.map((todo: ITodo, Index: number) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            key={todo.id}
          >
            <p className="w-full font-semibold">
              {Index + 1}-{todo.title}
            </p>
          </div>
        ))
      ) : (
        <h3>No Todos Found yet !</h3>
      )}
      <Paginator
        page={data?.data.meta.pagination.page}
        pageCount={data?.data.meta.pagination.pageCount}
        onClickPrev={() => {}}
        isLoading={isLoading}
        onClickNext={() => {}}
        total={data?.data.meta.pagination.total}
      />
    </>
  );
};
export default Todos;
