document.addEventListener('DOMContentLoaded', fetchTasks);

function fetchTasks() {
    fetch('http://localhost:5000/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(task.text));

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.setAttribute('data-id', task.id);
                li.appendChild(checkbox);

                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.setAttribute('data-id', task.id);
                li.appendChild(deleteBtn);

                taskList.appendChild(li);
            });
        });
}

document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input').value;

    fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: taskInput }),
    })
        .then(response => response.json())
        .then(task => {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(task.text));

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('data-id', task.id);
            li.appendChild(checkbox);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.setAttribute('data-id', task.id);
            li.appendChild(deleteBtn);

            document.getElementById('task-list').appendChild(li);
        });

    document.getElementById('task-input').value = '';
});

document.getElementById('task-list').addEventListener('click', function (e) {
    const taskId = e.target.getAttribute('data-id');

    if (e.target.tagName === 'BUTTON') {
        fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                e.target.parentElement.remove();
            });
    } else if (e.target.tagName === 'INPUT') {
        const completed = e.target.checked;
        fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: completed }),
        })
            .then(response => response.json())
            .then(() => {
                e.target.parentElement.style.textDecoration = completed ? 'line-through' : 'none';
            });
    }
});
