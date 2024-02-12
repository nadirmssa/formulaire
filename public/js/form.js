import { fetchJSON } from "./functions/api.js";
import { addValueToinput } from "./functions/dom.js";

let param = new URLSearchParams(window.location.search);

let id = param.get('id');

let endpoint = "http://localhost:8001/backend/back.php";



const nomElt = document.querySelector('#nom');
const prenomElt = document.querySelector('#prenom');
const ageElt = document.querySelector('#age');
const idElt = document.querySelector('#idS');
const btnValider = document.querySelector('#btn-valider');
if(id) {
    const perso = await fetchJSON(endpoint+ "?id=" + id, {
        method: "GET",
    })

    addValueToinput(perso, id)

    btnValider.addEventListener('click', () =>{

        let modifPerso = {
            nom: nomElt.value,
            prenom: prenomElt.value,
            age: ageElt.value
        }
        const putPerso = fetchJSON(endpoint+ "?id=" + idElt.value, {
            method: 'PUT',
            body: JSON.stringify(modifPerso),
        })
        window.location.href = './index.html';
    })
}
else {
    const title = document.querySelector('.form__title');
    title.textContent = 'Ajouter une personne';
    let newPerso;
    if(nomElt.value != " " && prenomElt.value != ' ' && ageElt.value != ' ') {
        btnValider.addEventListener('click', () =>{
            newPerso = {
                nom: nomElt.value,
                prenom: prenomElt.value,
                age: ageElt.value
            }
            const perso = fetchJSON(endpoint, {
                method: 'POST',
                body: JSON.stringify(newPerso)
            })
            window.location.href = './index.html';
        })
    }
}