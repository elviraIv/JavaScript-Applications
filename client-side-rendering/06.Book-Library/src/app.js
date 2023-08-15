import {html, render} from '../node_modules/lit-html/lit-html.js'
import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';

//main module:
//init modules with dependencies 
// - rendering
// - communication

const root = document.body;

const ctx = {
    update
};

update();

function update(){
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx),
    ], root)
}








