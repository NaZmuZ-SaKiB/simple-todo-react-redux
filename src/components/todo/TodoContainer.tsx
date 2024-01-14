import AddTodoModal from "./AddTodoModal";
import TodoFilter from "./TodoFilter";
import TodoCard from "./TodoCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useGetTodosQuery } from "@/redux/api/baseApi";
import { TTodo, TTodoFilter } from "@/redux/features/todoSlice";
import { useState } from "react";
import { Button } from "../ui/button";

const TodoContainer = () => {
  const [parentRef] = useAutoAnimate();

  const [priority, setPriority] = useState<TTodoFilter>("ALL");

  //! for local redux state
  // const { todos, filter } = useAppSelector((state) => state.todos);

  //* for RTK Query
  const { data, isLoading } = useGetTodosQuery(priority);
  console.log(data);

  if (isLoading) return <p className="text-2xl font-semibold">Loading...</p>;

  const tasksPending = data.data.filter(
    (task: TTodo) => !task.isCompleted
  ).length;

  const tasksHighPriority = data.data.filter(
    (task: TTodo) => !task.isCompleted && task.priority === "HIGH"
  ).length;

  const filteredTodos = [...data.data]
    // .filter(
    //   (todo) =>
    //     (filter !== "ALL" && todo.priority === filter) || filter === "ALL"
    // )
    .sort((a, b) => {
      return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
    });

  return (
    <div>
      <div className="bg-primary-gradient rounded-xl p-[5px] mb-3">
        <div className="flex justify-between items-center bg-white rounded-lg p-3">
          <AddTodoModal todo={null}>
            <Button className="bg-primary-gradient text-xl font-semibold">
              Add Todo
            </Button>
          </AddTodoModal>
          <h2 className="font-semibold text-lg text-center px-2 inline-block bg-primary-gradient bg-clip-text text-transparent">
            You have currently {tasksPending} tasks pending and{" "}
            {tasksHighPriority ? tasksHighPriority : "none"} have high priority.
          </h2>
          <TodoFilter priority={priority} setPriority={setPriority} />
        </div>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div
          ref={parentRef}
          className="bg-white rounded-lg w-full h-full p-5 space-y-5"
        >
          {data?.data?.length > 0 ? (
            filteredTodos.map((todo) => <TodoCard key={todo._id} {...todo} />)
          ) : (
            <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center rounded-md">
              <p>There is no task pending</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
