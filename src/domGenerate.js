const parentContainer = document.createElement('div');
parentContainer.classList.add('parentContainer');

const head = document.createElement('div');
head.classList.add('head');

    const body = document.createElement('div');
    body.classList.add('body');

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

        const newForm = document.createElement('form');
        newForm.setAttribute('onsubmit', 'return false');
        newForm.setAttribute('id', 'newForm');

            newInput('text','title','title','Title', '', true, newForm);
            newInput('text','desc','desc','Description', '', true, newForm);
            newInput('datetime-local','due','due','due', '', true, newForm);
            
            const select = document.createElement('select');
            select.setAttribute('name', 'priority');
            select.setAttribute('id', 'priority');
            select.setAttribute('required', '');
            newForm.appendChild(select);

                const placeholder = document.createElement('option');
                placeholder.setAttribute('disabled','');
                placeholder.setAttribute('selected','');
                placeholder.innerHTML = 'Priority';
                select.appendChild(placeholder);
                newOption('high','High');
                newOption('medium','medium'); 
                newOption('low','Low');

                function newOption (value, text) {
                    const option = document.createElement('option')
                    option.setAttribute('value',value);
                    option.innerHTML = text;
                    select.appendChild(option);
                }                

            newInput('submit','submit','','', 'Submit', false, newForm);

    const main = document.createElement('div');
    main.classList.add('main');
    main.setAttribute('id','main');

document.body.appendChild(parentContainer);
parentContainer.appendChild(head);
parentContainer.appendChild(body);
body.appendChild(main);
body.appendChild(sidebar);
sidebar.appendChild(newForm);


function newInput(type, name, id, placeholder, value, isRequired, parent) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('value', value);
    if(isRequired){ 
        input.setAttribute('required','')
    }
    parent.appendChild(input);
}


