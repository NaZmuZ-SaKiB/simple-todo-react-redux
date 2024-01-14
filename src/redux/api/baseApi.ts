import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTodo, TTodoFilter } from "../features/todoSlice";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5050",
  }),

  tagTypes: ["tasks"],

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority: TTodoFilter) => {
        const params = new URLSearchParams();
        if (priority !== "ALL") params.append("priority", priority);

        return {
          url: "/tasks",
          method: "GET",
          params,
        };
      },
      providesTags: ["tasks"],
    }),

    addTodo: builder.mutation({
      query: (todo: TTodo) => {
        return {
          url: "/tasks",
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: ["tasks"],
    }),

    updateTodo: builder.mutation({
      query: (options: { _id: string; todo: TTodo }) => {
        return {
          url: `/tasks/${options._id}`,
          method: "PUT",
          body: options.todo,
        };
      },
      invalidatesTags: ["tasks"],
    }),

    deleteTodo: builder.mutation({
      query: (id: string) => {
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
