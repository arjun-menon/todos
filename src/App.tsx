import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';

type Todo = {
  text: string;
  id: string;
}

const initialTodos: Array<Todo> = [
  { text: 'Welcome to this online todo list.', id: uuidv4() },
  { text: 'Use the plus button to add a row.', id: uuidv4() },
  { text: 'Feel free to drag these rows around.', id: uuidv4() },
]

function ListItemView(props: { text: string }) {
  return <>{props.text}</>
}

function TodoListView(props: any) {
  const [todos, updateTodos] = useState(initialTodos);
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (result.destination) {
      const reorderedTodos = Array.from(todos);
      const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
      reorderedTodos.splice(result.destination.index, 0, reorderedItem);
      updateTodos(reorderedTodos);
    }
  };

  return <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="todoListItems">
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {todos.map(
            (todo: Todo, index) =>
              <Draggable draggableId={todo.id} key={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div className='ListItemView'
                    ref={provided.innerRef} {...provided.draggableProps}>
                    <span className='DragHandle' {...provided.dragHandleProps}>☰</span>
                    <ListItemView text={todo.text} />
                  </div>
                )}
              </Draggable>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>;
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <span className='HeaderTitle'>Todo List</span>
        <span className='PlusSign'>➕</span>
      </header>
      <TodoListView />
    </div>
  );
}

export default App;
