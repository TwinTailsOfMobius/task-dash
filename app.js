document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get task input value
    const taskInput = document.getElementById('task-input').value;

    // Create a new list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput));

    // Add the list item to the task list
    document.getElementById('task-list').appendChild(li);

    // Clear the input
    document.getElementById('task-input').value = '';
});
// Adding delete and complete functionality
document.getElementById('task-list').addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove(); // Delete task
    } else if (e.target.tagName === 'INPUT') {
        e.target.parentElement.style.textDecoration = e.target.checked ? 'line-through' : 'none'; // Complete task
    }
});

// Adding the checkbox and delete button in the task creation
li.appendChild(document.createElement('input')).type = 'checkbox';
li.appendChild(document.createElement('button')).innerText = 'Delete';
