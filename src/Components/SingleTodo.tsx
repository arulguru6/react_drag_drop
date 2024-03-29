import React, { useEffect, useRef, useState } from 'react'
import { Todo } from './model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number

}

function SingleTodo({ index, todo, todos, setTodos }: Props) {

    const [isEdit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [isEdit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='todos__single'
                        onSubmit={(e) => handleEdit(e, todo.id)}>
                        {
                            isEdit ? (<input className='todos__single--text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />) :
                                (todo.isDone ? (<s className='todos__single--text'>
                                    {todo.todo}
                                </s>) : (<span className='todos__single--text'>
                                    {todo.todo}
                                </span>))
                        }
                        <div>
                            <span className='icon' onClick={() => {
                                if (!isEdit && !todo.isDone) {
                                    setEdit(!isEdit)
                                }
                            }
                            }><AiFillEdit /></span>
                            <span className='icon' onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                            <span className='icon' onClick={() => handleDone(todo.id)}><MdDone /></span>
                        </div>
                    </form >
                )
            }
        </Draggable>

    )
}

export default SingleTodo