//DOM GENERATION
import './domGenerate.js';
//Projects ----------------------------------------------------------------------------------------
const projects = (() => {
    const A = [];
    return A;
})();

//Task Factory ---------------------------------------------------------------------------------------
function newTask (id,title, desc, due, priority, done) {

    let task = {
        id,
        title,
        desc,
        due,
        priority,
        done,
    }    

    return task;
}

//Project Factory ------------------------------------------------------------------------------------
function newProject (id, title, task, taskSorted) {
    
    const addToProjects = function() {
        projects.push(this);
    }
        
    let project = {
        id,
        title,
        task,
        taskSorted,
        addToProjects
    }

    return project;
}

//Generate Default Project----------------------------------------------------------------------
projectGenerate('Default');

taskGenerate('Default', 'Run', 'Run 15KM for One Day', 'today', 'Normal', false);
taskGenerate('Default', 'Write Code!', 'Code Code Code!', 'today', 'Normal', false);

projectGenerate('To-Do List');

taskGenerate('To-Do List', 'Projects Feature', 'Users should be able to create new projects and choose which project their todos go into.', 'tommorow', 'High', true)
taskGenerate('To-Do List', 'Sorting Feature', 'Users should be able to sort their projects and its corresponding tasks', 'tommorow', 'Normal', false)

console.log(projects);

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
    newProject(generateId(projects), title, []).addToProjects();
}

//Task Generation -------------------------------------------------------------------------------------
function taskGenerate (project,title,desc,due,priority,done) {

    //index serach method
    const index = projects.findIndex(object => {
        return object.title === project;
    });
    
    const task = newTask(generateId(projects[index].task), title, desc, due, priority, done);

    (projects[index].task).push(task); 
}
