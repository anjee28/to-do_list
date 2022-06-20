//Push to send it to the gh-pages branch on GitHub.
//git subtree push --prefix dist origin gh-pages

//DOM GENERATION
import './domGenerate.js';
/*################################################################################################
#####################------------LOGIC CODES------------------###################################
###################################################################################################*/

//WINDOW ONLOAD EVENT
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    if (localStorage.getItem('projects') !== null) {
        projects = JSON.parse(localStorage.getItem('projects'));
        console.log(JSON.parse(localStorage.getItem('projects')));
        console.log(projects);
        renderProjects();
        
        for (let i = 0; i < projects.length; i++) {
            projectGenerateDOM(projects[i].id);
        }
        displayTasks();
    }
    else {
        //Generate Default Project----------------------------------------------------------------------
        projectGenerate('Default');
        document.getElementById('1').setAttribute('class','active');
        projects[0].active = 'active';
        console.log('Local storage not found')
    }
  });

//###################-------------Projects ------------------######################################

let projects = (() => {
    const A = [];
    return A;
})();

//###################----------Task Factory ------------------###########################################

function newTask (id,title, desc, due, dueInt, priority, priorityInt, done) {

    let task = {
        id,
        title,
        desc,
        due,
        dueInt,
        priority,
        priorityInt,
        done,
    }    

    return task;
}

//Project Factory ------------------------------------------------------------------------------------
function newProject (id, title, task, taskSorted, active) {
    
    const addToProjects = function() {
        projects.push(this);
    }
        
    let project = {
        id,
        title,
        task,
        taskSorted,
        active,
        addToProjects
    }

    return project;
}




//Generate id Function ---------------------------------------------------------------------------
function generateId(projOrList) {

    let lastId = 0;
    
    for(let i = 0; i < projOrList.length; i++) {        
        if(projOrList[i].id === undefined)
        {
            lastId = 0;
        }
        else {
            lastId = projOrList[i].id;
        }
    }

    return (lastId + 1);
}

//Project Generation -----------------------------------------------------------------------------------
function projectGenerate (title){
    const id = generateId(projects)
    newProject(id, title, [], [], 'inactive').addToProjects();
    localStorage.setItem('projects',JSON.stringify(projects));
    renderProjects();
    projectGenerateDOM(id);
}

//Task Generation -------------------------------------------------------------------------------------
function taskGenerate (project,title,desc,due,priority,done) {

    //index search method
    const index = projects.findIndex(object => {
        return object.title === project;
    });
    const id = generateId(projects[index].task);

    //Convert priority into integer to be used for sorting
    let priorityInt = 0;
    switch(priority){
        case 'High':
            priorityInt = 1;
            break;
        case 'Normal':
            priorityInt = 2;
            break;
        case 'Low':
            priorityInt = 3;
            break;
    }

    const task = newTask(id, title, desc, due, Date.parse(due), priority, priorityInt, done);
    (projects[index].task).push(task);


    sortTask(index);
    

    displayTasks();
    localStorage.setItem('projects',JSON.stringify(projects));
}

function sortTask(index) {

    projects[index].taskSorted = projects[index].task.slice().sort((a, b) => {
        return a.dueInt - b.dueInt;
    });

    projects[index].taskSorted = projects[index].taskSorted.slice().sort((a, b) => {
        return a.priorityInt - b.priorityInt;
    });
}

//Data retrieval for New task

const newTaskForm = document.getElementById('newTaskForm');
newTaskForm.addEventListener('submit', () =>{
    newTaskData();
})

function newTaskData(){
    const index = projects.findIndex(object => {
        return object.active === 'active';
    });
    const title = document.getElementById('newTitle');
    const desc = document.getElementById('newDesc');
    const due = document.getElementById('newDue');
    const priority = document.getElementById('priorityNew');

    taskGenerate(projects[index].title, title.value, desc.value, due.value, priority.value, 'false')
    desc.value = '';
    newTaskForm.reset();
}

//--------------------------------DOM RENDERING--------------------------------------------------------

//New Project input textbox
const newProjectInput = document.querySelector('#newProjectInput');
newProjectInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      projectGenerate(newProjectInput.value);
      newProjectInput.value = '';
    }
});

//Render Projects lists in sidebar
function renderProjects(){

    document.querySelectorAll(".projectList").forEach(el => el.remove());

    for(let i = 0; i < projects.length; i++) {
        const div = document.getElementById('sidebarList');
        const para = document.createElement('p');
        para.innerHTML = projects[i].title;
        para.classList.add('projectList')
        div.appendChild(para);
        
        //toggles div visibility for each project
        para.addEventListener('click', () => {
            for (let j = 0; j < projects.length; j++) {
                projects[j].active = 'inactive';
                let inactiveDiv = document.getElementById(projects[j].id);
                inactiveDiv.setAttribute('class',projects[j].active);        
            }
            
            const div = document.getElementById(projects[i].id)
            projects[i].active = 'active';
            div.setAttribute('class', projects[i].active);
        })
    }      
}

//Generate Div that contains list of tasks for each projects
function projectGenerateDOM(id){
    const main = document.getElementById('main')
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('projectTitle');
    
    const div = document.createElement('div');
    div.setAttribute('id',id);    
    const index = projects.findIndex(object => {
        return object.id === id;
    });

    div.classList.add(projects[index].active);
    main.appendChild(div);
    div.appendChild(projectTitle);
    projectTitle.innerHTML = projects[index].title.toUpperCase();
}

//Renders the tasks
function renderTasks(index, id, title, desc, due, priority, done){
    const projectDiv = document.getElementById(projects[index].id);
    const taskDiv = document.createElement('Div')
    taskDiv.classList.add('taskdiv');
    taskDiv.setAttribute('id',projects[index].title + '-' + id)
    projectDiv.appendChild(taskDiv);
    childGenerate(title,'title');
    childGenerate(desc,'desc');
    childGenerate(due,'due');
    childGenerate(priority, priority);
  
    function childGenerate(text,className){
        const par = document.createElement('p');
        par.classList.add(className);
        par.innerHTML = text;
        taskDiv.appendChild(par);

        //expands description when clicked
        if (className === 'desc') {
            par.addEventListener('click', () => {
                par.classList.toggle('expanded');
            })
        }
    }
    //Done Check Box

    const checkDiv = document.createElement('div');
    checkDiv.classList.add('done');
    checkDiv.innerHTML = "Done: "
    const check = document.createElement('input');
    check.classList.add('checkBox');
    check.setAttribute('type','checkbox');
    taskDiv.appendChild(checkDiv);
    checkDiv.appendChild(check);
    
    const index2 = projects[index].task.findIndex(object => {
        return object.id === id;
    });

    check.addEventListener('click', () => {

        if(check.checked === false) {
            projects[index].task[index2].done = false;
            
        } else if(check.checked === true) {
            projects[index].task[index2].done = true;
        }
        
    })
}

function displayTasks(){

    removeElementsByClass('taskdiv');
    for(let i = 0; i < projects.length; i++){
        for(let j = 0; j < projects[i].task.length; j++){
            //index = project index, id = task id
            renderTasks(i,
                projects[i].taskSorted[j].id,
                projects[i].taskSorted[j].title,
                projects[i].taskSorted[j].desc,
                projects[i].taskSorted[j].due,
                projects[i].taskSorted[j].priority,
                projects[i].taskSorted[j].done);

            if (j > 100){break;}
        }
        if (i > 100){break;}
    }
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}




