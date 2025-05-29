import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"

// Во избежание ошибок импорт должен быть из `@reduxjs/toolkit/query/react`
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { baseApi } from "@/app/baseApi.ts"
import { instance } from "@/common/instance"

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const todolistsApi = baseApi.injectEndpoints({
  // tagTypes: ['Todolists'],
  // // `reducerPath` - имя `slice`, куда будут сохранены состояние и экшены для этого `API`
  // reducerPath: "todolistsApi",
  // // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_URL,
  //   prepareHeaders: (headers) => {
  //     headers.set("API-KEY", import.meta.env.VITE_API_KEY)
  //     headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
  //   }
  // }),
  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map(todolist => ({ ...todolist, filter: "all", entityStatus: "idle" })),
      providesTags: ['Todolist']
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title }
      }),
      invalidatesTags: ['Todolist']
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['Todolist']
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({id, title}) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: {title}
      }),
      invalidatesTags: ['Todolist']
    }),
  })
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation
} = todolistsApi


export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  }
}
