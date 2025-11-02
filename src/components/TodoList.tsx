import Button from "./ui/Button";

import { ITodo } from "./../interfaces/index";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const TodoList = () => {
  const userData = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser") as string)
    : null;
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {data?.data.data.length ? (
        data?.data.data.map((todo: ITodo, Index: number) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            key={todo.id}
          >
            <p className="w-full font-semibold">
              {Index + 1}-{todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button variant={"default"} size={"sm"}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos Found yet !</h3>
      )}
    </>
  );
};
export default TodoList;
