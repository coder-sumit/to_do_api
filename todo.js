(function () {
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    // using get request
    // function fetchTodos(){

    //     // fetching data using get method
    //     fetch('https://jsonplaceholder.typicode.com/todos')
    //     .then(function(responce){
    //         return responce.json();
    //     })
    //     .then(function(data){
    //         tasks = data.slice(0,15);

    //         renderList();
    //     })
    //     .catch(error => console.log('error', error))

    // }

    // using async await
    async function fetchTodos() {

        // fetching data using get method
        try {
            const responce = await fetch('https://jsonplaceholder.typicode.com/todos')
            const data = await responce.json();
            tasks = data.slice(0, 10);
            renderList();
        }
        catch (error) {
            console.log(error);
        }

    }


    function addToDom(task) {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" id="${task.id}" data-id="${task.id}" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
        <label for="${task.id}">${task.title}</label>
        <img src="bin.png" class="delete" data-id="${task.id}" />
        `;
        taskList.append(li);


    }



    function renderList() {
        taskList.innerHTML = '';
        tasks.map(task => {
            addToDom(task);
        });
        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId) {
        const task = tasks.filter(function (t) {
            return t.id == taskId;
        });
        if (task.length > 0) {
            const ctask = task[0];
            ctask.completed = !ctask.completed;
            renderList();
            showNotification("task toggled");
            return;
        }

        showNotification("something went wrong");

    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id != taskId;
        });
        tasks = newTasks;
        renderList();
        showNotification("Task deleted sucseccfully");
    }

    function addTask(task) {
        if (task) {
            tasks.push(task);
            renderList();
            showNotification('Task added sucseccfully');
            return;
        }

        showNotification("task can't be added");
    }

    function showNotification(text) { alert(text); }

    function handleInputKeypress(e) {
        if (e.key == 'Enter') {
            const text = e.target.value;

            if (!text) {
                showNotification('The input cant be empty');
            }

            const task = {
                title: text, // short hand
                id: Date.now(),
                completed: false
            }
            e.target.value = '';
            addTask(task);
        }


    }

    function handleClickListner(e) {
        const target = e.target;
        if (target.className == 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
        } else
            if (target.className == 'custom-checkbox') {
                const taskId = target.id;
                toggleTask(taskId);
            }
    }
    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        taskList.addEventListener('click', handleClickListner);
    }

    initializeApp();
})();


