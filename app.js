const form = document.querySelector('#add-list');
const input = document.querySelector('#user-input');
const toDoList = document.querySelector('#todo-list');
const clearButton = document.getElementById('clear-btn');

// retreiving from local storage and displayiing all lists:
const storedToDo = JSON.parse(localStorage.getItem('todos')) || [];
for (let toDo of storedToDo) {
    const savedToDo = document.createElement('li');
    savedToDo.innerText = toDo.task;
    savedToDo.isCompleted = toDo.isCompleted;
    if (savedToDo.isCompleted) {
        savedToDo.style.textDecoration = "line-through";
    } else {
        savedToDo.style.textDecoration = "none";
    }

    toDoList.appendChild(savedToDo);
}

// adding and removing line-through style over text in the list and updating local storage that already exists.
toDoList.addEventListener('click', function(e) {
    if (!e.target.isCompleted) {
        e.target.style.textDecoration = "line-through";
        e.target.isCompleted = true;
    } else {
        e.target.style.textDecoration = "none";
        e.target.isCompleted = false;
    }

    for (let toDo of storedToDo) {
        if (toDo.task === e.target.innerText) {
            toDo.isCompleted = e.target.isCompleted;
            localStorage.setItem("todos", JSON.stringify(storedToDo));
        }
    }
});

// adding lists and local storage in the first time.

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newToDo = document.createElement('li');
    newToDo.innerText = input.value;
    newToDo.isCompleted = false; // isCompleted class
    form.reset();

    const isStoreEmpty = storedToDo.length < 1; // chek if store is empty

    if ((newToDo.innerText.length >= 1) && (isStoreEmpty ||
            (localStorage.getItem("todos").indexOf(newToDo.innerText) === -1))) { // check if list already exists

        storedToDo.push({ task: newToDo.innerText, isCompleted: newToDo.isCompleted });
        localStorage.setItem("todos", JSON.stringify(storedToDo));
        toDoList.appendChild(newToDo);
    }
});

clearButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});