//-----SKELETAL DOM GENERATION-------

const parentContainer = document.createElement('div');
parentContainer.classList.add('parentContainer')
parentContainer.setAttribute('id','parentContainer');
document.body.appendChild(parentContainer);

generateDiv('head','head',parentContainer);
generateDiv('body','body',parentContainer);
    generateDiv('sidebar','sidebar',body);
        generateDiv('sidebarTitle','sidebarTitle',sidebar)
        generateDiv('sidebarCenter','sidebarCenter',sidebar)
            generateDiv('sidebarList','sidebarList',sidebarCenter)
            generateDiv('sidebarNew','sidebarNew',sidebarCenter)
                const newProject = document.createElement('input');
                newProject.setAttribute('type','text');
                newProject.setAttribute('id','newProjectInput');
                newProject.setAttribute('placeholder','New Project');
                sidebarNew.appendChild(newProject);

            generateDiv('sidebarBottom','sidebarBottom',sidebar)
                const newTask = document.createElement('form')
                newTask.setAttribute('id','newTaskForm')
                newTask.setAttribute('onsubmit','return false')
                sidebarBottom.appendChild(newTask);
                
                generateInput('text','title','newTitle','New Task',newTask);

                const descNew = document.createElement('textarea')
                descNew.setAttribute('id','newDesc')
                descNew.setAttribute('name','descNew')
                descNew.setAttribute('form','newTask')
                descNew.setAttribute('placeholder','Enter Description')
                newTask.appendChild(descNew);

                generateInput('datetime-local','due','newDue','',newTask);

                const priorityNew = document.createElement('select');
                priorityNew.setAttribute('name','priority');
                priorityNew.setAttribute('id','priorityNew');
                newTask.appendChild(priorityNew);
                    generateOption('High','High', priorityNew);
                    generateOption('Normal','Normal', priorityNew);
                    generateOption('Low','Low', priorityNew);

                generateInput('submit','submit','submitNew', '', newTask)
                    

    generateDiv('main','main',body);


document.getElementById('sidebarTitle').innerHTML = "PROJECTS"

function generateDiv(id, className, parent){
    const div = document.createElement('div');
    div.classList.add(className);
    div.setAttribute('id',id);
    parent.appendChild(div);
}

function generateInput(type, name, id, placeholder, parent){
    const input = document.createElement('input')
    input.setAttribute('type', type)
    input.setAttribute('name', name)
    input.setAttribute('id', id)
    input.setAttribute('required','')
    input.setAttribute('placeholder', placeholder)
    parent.appendChild(input)
}

function generateOption(value,inner,parent){
    const option = document.createElement('option');
    option.setAttribute('value',value);
    option.innerHTML = inner;
    parent.appendChild(option);

}