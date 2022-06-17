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
    listsSorted = sort(lists);
    test2.innerHTML = listsSorted[0].priorStr;
    newForm.reset();
    console.log(lists);
    console.log(listsSorted);
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
    test.innerHTML = lists[0].priorStr;

}

function sort(lists){
    
    const listsSorted = lists.slice().sort((a, b) => {
        return a.priority - b.priority;
    });
    return(listsSorted)
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

