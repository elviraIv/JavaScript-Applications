function attachEvents() {
    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', loadMessages);
    
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onSubmit);

    loadMessages();
}

//global parameters
const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');
const textAreaElement = document.getElementById('messages');

attachEvents();


// add single message to list
async function onSubmit(){
    const author = authorInput.value;
    const content = contentInput.value;

 await createMessage({ author, content });

 contentInput.value = '';
 textAreaElement.value += '\n' + `${author} : ${content}`;


}

// load mesages
 async function loadMessages(){
    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data);

   
    textAreaElement.value = messages.map(m => `${m.author} : ${m.content}`).join('\n');
}
// post massages
async function createMessage(message){
    const url = 'http://localhost:3030/jsonstore/messenger';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    const res = await fetch(url,options);
    const data = res.json();

    return data;

}




