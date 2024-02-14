let taskId = 1;

function addTask()
{
    const taskText = document.getElementById('newTask').value;

    if (taskText.trim() !== '')
    {
        const tasksContainer = document.getElementById('tasks');
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.id = 'task_' + taskId;

        // Добавляем индекс даты в виде верхнего индекса
        const dateIndex = document.createElement('sup');
        dateIndex.innerHTML = getCurrentDateFormatted();
        taskElement.appendChild(dateIndex);

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'delete-icon';
        deleteIcon.innerHTML = '❌';
        deleteIcon.onclick = function(event)
	{
            event.stopPropagation();
            deleteTask(this.parentNode.id);
        };

        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.innerHTML = taskText;

        taskElement.appendChild(deleteIcon);
        taskElement.appendChild(taskTextElement);

        taskElement.onclick = function()
	{
            toggleTask(this.id);
        };

        tasksContainer.appendChild(taskElement);

        taskId++;
        document.getElementById('newTask').value = '';

        updateTaskColors();
    }
}

function getCurrentDateFormatted()
{
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed
    const year = currentDate.getFullYear();

    return `${day}.${month}.${year}`;
}

function clearAllTasks()
{
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = ''; // Очищаем все задачи
    taskId = 1; // Сбрасываем счетчик задач
    updateTaskColors();
}


function toggleTask(taskId)
{
    // Получаем элемент задачи по его идентификатору
    const taskElement = document.getElementById(taskId);

    // Переключаем класс 'completed', чтобы изменить стиль задачи
    taskElement.classList.toggle('completed');

    // Обновляем цвета задач
    updateTaskColors();
}

function deleteTask(taskId)
{
    // Получаем элемент задачи по его идентификатору
    const taskElement = document.getElementById(taskId);

    // Удаляем элемент задачи из его родительского элемента
    taskElement.parentNode.removeChild(taskElement);

    // Обновляем цвета задач
    updateTaskColors();
}

function updateTaskColors()
{
    // Получаем все элементы с классом 'task'
    const tasks = document.getElementsByClassName('task');

    // Проходим по каждому элементу и устанавливаем цвет фона
    for (let i = 0; i < tasks.length; i++)
    {
        if (i % 2 === 0) tasks[i].style.backgroundColor = '#f9f9f9';
        else tasks[i].style.backgroundColor = '#e0e0e0';
    }
}