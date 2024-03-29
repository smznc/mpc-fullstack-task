const {useState, useEffect} = React
import TodoAdd from './TodoAdd'
import TodoList from './TodoList'

let initValue = typeof mpc_ft.todo_items === 'object' ? mpc_ft.todo_items.map((el, id) => ({...el, id})) : []

function Todo() {
    const [todo, setTodo] = useState(initValue)

    useEffect(() => {
        let data = new FormData()
        let items = [...todo]

        items = items.map(({text, checkbox}) => ({text, checkbox}))

        data.append( 'action', 'mpc_ft_save_todo_items' )
        data.append( 'nonce', mpc_ft.nonce )
        data.append( 'items', JSON.stringify( items ) )
        data.append( 'post_id', mpc_ft.post_id )

        fetch( mpc_ft.ajax_url, {
            method: 'POST',
            body: data
        } )
    }, [todo])

    return (
        <>
            <TodoAdd todo={todo} setTodo={setTodo} />
            <TodoList todo={todo} setTodo={setTodo} />
        </>
    );
}

export default Todo