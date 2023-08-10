import { homePage } from "./home";
import { showView } from "./util";


const section = document.querySelector('#add-movie');
const form = section.querySelector('#form');
form.addEventListener('submit',onSumbit )

export function createPage(){
    showView(section);
};

async function onSumbit(event){
    event.preventDefault();
    const formData = new formData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    await createMovie(title,description,img);
    form.reset();
    homePage();

}

async function createMovie(title,description,img){
    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/movies',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-Authorization' : user.accessToken
        },
        body: JSON.stringify({ title,description,img })
    });
}


