//DOM GENERATION
import './domGenerate.js';

const test = document.getElementById('test');
const test2 = document.getElementById('test2');

const lists = (() => {
    const A = [];
    return A;
})();

let listsSorted;

function newTodo (id,title, desc, due, priority, priorStr, done) {
    const addToList = function() {
        lists.push(this);
    };

    let todo = {
        id,
        title,
        desc,
        due,
        priority,
        priorStr,
        done,
        addToList
    }    
    return todo;
}

function generateId() {
    let lastId = 0;
    
    for(let i = 0; i < lists.length; i++) {        
        if(lists[i].id === undefined)
        {
            lastId = 0;
        }
        else {
            lastId = lists[i].id;
        }
    }
    return (lastId + 1);
}

const newForm = document.getElementById('newForm');

newForm.addEventListener('submit', () => {

    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const due = document.getElementById('due').value;
    const prior = document.getElementById('priority').value;    
    addNew(generateId(),title,desc,due,prior);
    
    listsSorted = lists.slice().sort((a, b) => {
        return a.priority - b.priority;
        });
     
    newForm.reset();
    console.log(lists);
    console.log(listsSorted);

    const main = document.getElementById('main');
    const list = document.querySelectorAll(".listDiv").forEach(el => el.remove());

    for(let i = 0; i < listsSorted.length; i++){
        renderLists(lists[i].title, lists[i].desc, lists[i].due, lists[i].priorStr);
    }
})

function addNew(id,title,desc,due,prior){
    
    let priorStr

    switch(prior){
        case '1':
            priorStr = 'High';
            break;
        case '2':
            priorStr = 'Medium';
            break;
        case '3':
            priorStr = 'Low';
            break;
    }
    console.log(prior);
    const newList = newTodo(id,title,desc,due,prior,priorStr,'0');
    newList.addToList();

}

function renderLists(title,desc,due,priorStr){
    const div = document.createElement('div');
    const titleDom = document.createElement('h4');
    const descDom = document.createElement('p');
    const dueDom = document.createElement('p');
    const priorStrDom = document.createElement('p');

    main.appendChild(div);
    div.appendChild(titleDom, descDom, dueDom, priorStrDom);
    div.appendChild(descDom);
    div.appendChild(dueDom);
    div.appendChild(priorStrDom);

    div.classList.add('listDiv');
    titleDom.innerHTML = title;
    descDom.innerHTML = desc;
    dueDom.innerHTML = due;
    priorStrDom.innerHTML = priorStr;
}
/*
button.addEventListener('click', () => {
        
    const index = myLibrary.findIndex(object => {
        return object.id === id;
    });
    
    myLibrary.splice(index, 1);
    const element = document.getElementById(id);
    element.remove();
});
*/

