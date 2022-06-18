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
    generateDiv('main','main',body);


document.getElementById('sidebarTitle').innerHTML = "PROJECTS"

function generateDiv(id, className, parent){
    const div = document.createElement('div');
    div.classList.add(className);
    div.setAttribute('id',id);
    parent.appendChild(div);
}
