import { homePage } from "./home";
import { showView } from "./util";
import { updateNav } from "./util";

const section = document.querySelector('#form-login');
const form = section.querySelector('#form');
form.addEventListener('submit',onSubmit )

export function loginPage(){
    showView(section);
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new formData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await login(email,password);
    form.reset();
    updateNav();
    homePage();
}

async function login(email,password){
    try {
        const res = await fetch('http://localhost:3030/user/login',{
            method: 'POST',
            header: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if(!res.ok){
            const error = await res.json();
            throw new Error(error.message);
        };

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));


    } catch (err) {
        alert(err.message);
        throw err;
    }
}
