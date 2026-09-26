// Select DOM Elements

const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// Try to load saved ToDos from local storage(if any)

const saved = localStorage.getItem('todos')
const todos = saved ? JSON.parse(saved) : [] ;

function saveToDos(){
    // Save Current TODO to local storage

    localStorage.setItem( 'todos' , JSON.stringify(todos) ) ;
}

// Create a DOM node for todo object and append it to the list
function createTodoNode (todo,index) {
    const li = document.createElement('li');

    // CheckBox to Toggle Completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox' ;
    checkbox.checked = !!todo.completed ;     // !! -> convert value explicity into Boolean ( true or false )

    checkbox.addEventListener( "change" , () => {
        todo.completed = checkbox.checked ;

        // Visual feedback : Strike-Through when completed
        textSpan.style.textDecoration = todo.completed ? 'line-thorugh' : "";
        saveToDos();
    })

    // Text of the ToDo 
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text ;
    textSpan.style.margin = '0 8px';

    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        // ADD Double Click event listener to EDIT TODO
        textSpan.addEventListener( "dblClick" , () => {
            const newText = prompt("Edit TODO" , todo.text);

            if ( newText !== NULL ){
                todo.text = newText.trim();
                textSpan.textContent = todo.text;

                saveToDos();
            }
        });

        // DELETE TODO Button 
        const delBtn = document.createElement('Button');
        delBtn.textContent = "Delete";

        delBtn.addEventListener("click" , () => {
            todos.splice(index, 1);
            render();
            saveToDos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li
    }

// Render the whole TODO list from TODOs array 
function render(){
    list.innerHTML = '';

    // Recreate each item 
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        list.appendChild(node)
    });
}

function addTodo(){
    const text = input.value.trim();

    if(!text){
        return
    }

    // Push a new TODO object 
    todos.push({text, completed: false});
    input.value = '' ;
    render();
    saveToDos();
}

addBtn.addEventListener("click" , addTodo);
render();