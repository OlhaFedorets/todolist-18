import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {

  const {data: todolists} = useGetTodolistsQuery()

  // запрос по клику кнопки
  // const [skip, setSkip] = useState<boolean>(true)
  // const {data: todolists} = useGetTodolistsQuery(undefined, {skip})
  // const fetchTodolists = () => {
  //   setSkip(false)
  // }

// запрос по клику кнопки с помощью useLazyGetTodolistsQuery()
//   const [trigger, { data: todolists }] = useLazyGetTodolistsQuery()
//   const fetchTodolists = () => {
//     trigger()
//   }

  return (
    <>
      {/*<div>*/}
      {/*  <button onClick={fetchTodolists}>Fetch todolists</button>*/}
      {/*</div>*/}

      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

//  без использования rtk query
// const todolists = useAppSelector(selectTodolists)
//
// const dispatch = useAppDispatch()
//
// useEffect(() => {
//   dispatch(fetchTodolistsTC())
// }, [])