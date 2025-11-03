import Button from "./ui/Button";

import { ITodo } from "./../interfaces/index";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";
import TodoSkeleton from "./ui/TodoSkeleton";
import { faker } from "@faker-js/faker";

const TodoList = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [todoToDelete, setTodoToDelete] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [todoToAdd, setTodoToAdd] = useState({
    title: "",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const userData = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser") as string)
    : null;
  const { isLoading, data, refetch } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=*",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // delete   logic*********************************************
  const openDeleteModal = (todo: ITodo) => {
    try {
      setIsOpenDeleteModal((prev) => !prev);
      setTodoToDelete(todo);
    } catch (error) {
      console.log(error);
    }
  };
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleDeleteTodo = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/todos/${todoToDelete.documentId}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
      refetch();
    }
  };
  //**********************************************************************
  // edit   logic
  const onOpenEditModal = (todo: ITodo) => {
    setIsOpenEditModal((prev) => !prev);
    setTodoToEdit(todo);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
  };
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoToEdit((prev) => ({ ...prev, [name]: value }));
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axiosInstance.put(
        `/todos/${todoToEdit.documentId}`,
        {
          data: {
            // <-- This 'data' wrapper is ONLY for Strapi v4
            title: todoToEdit.title,
            description: todoToEdit.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
      closeEditModal();
      refetch();
    }
  };
  // Add todo logic
  const openAddModal = () => {
    setIsOpenAddModal((prev) => !prev);
  };
  const closeAddModal = () => {
    setIsOpenAddModal(false);
  };
  const handleSubmitAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      setIsCreating(true);
      await axiosInstance.post(
        `/todos`,
        {
          data: {
            title: todoToAdd.title,
            description: todoToAdd.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
      closeAddModal();
      refetch();
      setTodoToAdd({ title: "", description: "" });
    }
  };
  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoToAdd((prev) => ({ ...prev, [name]: value }));
  };
  const onGenerate = async () => {
    for (let i = 0; i < 100; i++) {
      try {
        await axiosInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraph(),
            },
          },
          {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <>
          {" "}
          <div className="flex items-center justify-center space-x-2 mb-5">
            <div className=" w-36 h-9 bg-gray-300 rounded-md dark:bg-gray-700  "></div>
            <div className=" w-36 h-9 bg-gray-300 rounded-md dark:bg-gray-700 "></div>
          </div>
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <TodoSkeleton key={index} />
            ))}
          </div>{" "}
        </>
      ) : (
        <div className="my-10 flex  justify-center space-x-3">
          <Button
            className="    bg-indigo-700 hover:bg-indigo-800"
            size={"sm"}
            onClick={openAddModal}
          >
            Post New Todo
          </Button>
          <Button
            onClick={onGenerate}
            className="   bg-transparent border border-indigo-400 text-black hover:text-white hover:bg-indigo-800"
            size={"sm"}
          >
            Generate Todo
          </Button>
        </div>
      )}

      {data?.data.todos.length ? (
        data?.data.todos.map((todo: ITodo, Index: number) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            key={todo.id}
          >
            <p className="w-full font-semibold">
              {Index + 1}-{todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button
                variant={"default"}
                size={"sm"}
                onClick={() => onOpenEditModal(todo)}
              >
                Edit
              </Button>
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => openDeleteModal(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos Found yet !</h3>
      )}
      {/* Edit Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="edit todo"
      >
        <form onSubmit={handleSubmitEditTodo}>
          <div className="space-y-3">
            <Input
              value={todoToEdit?.title}
              name={"title"}
              onChange={handleEditChange}
            />
            <Textarea
              value={todoToEdit?.description}
              name={"description"}
              onChange={handleEditChange}
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <Button
              isLoading={isUpdating}
              className="bg-indigo-700 hover:bg-indigo-800 flex-1"
              size={"sm"}
            >
              Update
            </Button>
            <Button
              variant={"danger"}
              size={"sm"}
              onClick={closeEditModal}
              className="flex-1"
              type="button"
            >
              cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Add  Modal */}
      <Modal
        isOpen={isOpenAddModal}
        closeModal={closeAddModal}
        title="Add Todo"
      >
        <form onSubmit={handleSubmitAddTodo}>
          <div className="space-y-3">
            <Input
              value={todoToAdd?.title}
              name={"title"}
              onChange={handleAddChange}
            />
            <Textarea
              value={todoToAdd?.description}
              name={"description"}
              onChange={handleAddChange}
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <Button
              isLoading={isCreating}
              className="bg-indigo-700 hover:bg-indigo-800 flex-1"
              size={"sm"}
            >
              Done
            </Button>
            <Button
              variant={"danger"}
              type="button"
              size={"sm"}
              onClick={closeAddModal}
              className="flex-1"
            >
              cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Delete Modal */}
      <Modal
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        title="Are You Sure To Remove This Todo  From Your Store?"
        description="Deleting This Todo Will Remove It From Your Store Permanently And You Will Not Be Able To Get It Back."
      >
        <div className="mt-4 flex space-x-2">
          <Button
            isLoading={isDeleting}
            className="bg-red-700 hover:bg-red-800 flex-1"
            size={"sm"}
            onClick={handleDeleteTodo}
          >
            Yes Delete
          </Button>
          <Button size={"sm"} onClick={closeDeleteModal} className="flex-1">
            cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default TodoList;
