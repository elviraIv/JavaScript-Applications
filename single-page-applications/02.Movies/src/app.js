
import { homePage } from './home';
import { loginPage } from './login';
import { registerPage } from './register';
import { createPage } from './create';
import { updateNav } from './util';


const routes = {
    '/': homePage,
    '/login' : loginPage,
    '/logout' : logout,
    '/register' : registerPage,
    '/create' : createPage,
    '/register' : registerPage,
} 



document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

function onNavigate(event){
    if(event.target.tagName == 'A' && event.target.href){
        event.preventDefault();
        const url = new URL(event.target.href);

        const view = routes[url.pathname]
        if(typeof view == 'function'){
            view();
        }
    }
}

function logout(){
    localStorage.removeItem('user');
    updateNav();
    alert('Logged out')
}

//start app in catalog view
updateNav();
homePage();





