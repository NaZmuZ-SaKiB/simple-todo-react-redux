import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
export type TTodoPriority = "HIGH" | "MEDIUM" | "LOW";

export type TTodo = {
  id?: string;
  title: string;
  description: string;
  priority: TTodoPriority;
  isCompleted?: boolean;
};

export type TTodoFilter = TTodoPriority | "ALL";

type TInitialState = {
  todos: TTodo[];
  filter: TTodoFilter;
};

const initialState: TInitialState = {
  todos: [],
  filter: "ALL",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({
        ...action.payload,
        isCompleted: false,
      });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((todo) => todo.id === action.payload);
      task!.isCompleted = !task!.isCompleted;
    },
    setTodoFilter: (state, action: PayloadAction<TTodoPriority | "ALL">) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, setTodoFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
