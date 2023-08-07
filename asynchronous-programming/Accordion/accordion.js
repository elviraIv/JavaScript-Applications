async function solution() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list ';
    try {
        const res = await fetch(url);
        const data = await res.json();

        const mainElement= document.getElementById('main');

        data.forEach(c => {
            const divAccordion = document.createElement('div');
            divAccordion.setAttribute('class', 'accordion')
           
            const span = document.createElement('span');
            span.textContent = c.title;
            
            const divElement = document.createElement('div');
            divElement.setAttribute('class', 'head');

            const btnElement = document.createElement('button');
            btnElement.setAttribute('class', 'button');
            const id = c._id;
            btnElement.setAttribute('id',id );
            btnElement.textContent = 'More';
            btnElement.addEventListener('click', toggle);
            

            mainElement.appendChild(divAccordion);
            divAccordion.appendChild(divElement);
            divElement.appendChild(span);
            divElement.appendChild(btnElement);



        });

        async function toggle(ev){
            const id = ev.target.id;
            
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

            try {
                const res = await fetch(url);
                const data = res.json();


                

                const divElement = document.createElement('div');
                divElement.setAttribute('class', 'extra');

                const pElement = document.createElement('p');
                const button = ev.currentTarget;
                const extra = button.parentNode.nextSibling;
                const p = extra.querySelector('p');
                
                pElement.textContent = data.content;
                divElement.appendChild(p);

            } catch (error) {
                console.log(error);
            }
        }
        
    } catch (error) {
        throw new Error(error);
    }

}
solution();