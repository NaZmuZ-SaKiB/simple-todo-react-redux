import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TTodo, TTodoPriority } from "@/redux/features/todoSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAddTodoMutation, useUpdateTodoMutation } from "@/redux/api/baseApi";

type TAddTodoModalProps = {
  todo: (TTodo & { _id: string }) | null;
  children: ReactNode;
};

const AddTodoModal = ({ todo, children }: TAddTodoModalProps) => {
  const [task, setTask] = useState(todo === null ? "" : todo?.title);
  const [description, setDescription] = useState(
    todo === null ? "" : todo?.description
  );
  const [priority, setPriority] = useState<TTodoPriority>(
    todo === null ? "HIGH" : todo?.priority
  );

  // const dispatch = useAppDispatch();

  // * for RTK Query
  const [addTodo, { isLoading: isAddLoading }] = useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!task || !description) return;

    // ! for local redux state
    // const randomId = Math.random().toString(36).substring(2, 9);

    // const todo: TTodo = {
    //   id: randomId,
    //   title: task,
    //   priority,
    //   description,
    // };

    // dispatch(addTodo(todo));

    // * for RTK Query
    if (todo === null) {
      addTodo({
        title: task,
        priority,
        description,
        isCompleted: false,
      });
    } else {
      updateTodo({
        _id: todo._id,
        todo: {
          title: task,
          description,
          priority,
          isCompleted: todo.isCompleted,
        },
      });
    }

    setTask("");
    setDescription("");
    setPriority("HIGH");
  };

  return (
    <Dialog>
      {!isAddLoading && !isUpdateLoading ? (
        <DialogTrigger asChild>{children}</DialogTrigger>
      ) : (
        <Button disabled className="bg-primary-gradient text-xl font-semibold">
          {todo === null ? "Adding Todo..." : "Updating..."}
        </Button>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add your task that you want to finish.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                defaultValue={task}
                onBlur={(e) => setTask(e.target.value)}
                id="task"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                defaultValue={description}
                onBlur={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select
                defaultValue={priority}
                onValueChange={(value) => setPriority(value as TTodoPriority)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Set Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">
                {todo ? "Save changes" : "Add Todo"}
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
