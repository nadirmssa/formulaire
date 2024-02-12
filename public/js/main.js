import { fetchJSON } from "./functions/api.js";

let endpoint = "http://localhost:8001/backend/back.php";

const personnes = await fetchJSON(endpoint, {method: "GET"});

for (const [key,value] of Object.entries(personnes)) {
    if( key != 'id'){
        addRow(value,key);
    }
}


document.querySelector('#btnAjouter').addEventListener('click', ()=> window.location.href= './form.html');

let btns = document.querySelectorAll('.btnModifier');
btns.forEach(btn => {
    btn.addEventListener('click',(evt)=> {
        let idValue = evt.target.parentNode.parentNode.children[0].textContent
        goForm(idValue);
    })
});

let btnDs = document.querySelectorAll('.btnDelete');
btnDs.forEach(btn => {
    btn.addEventListener('click',(evt)=> {
        let idValue = evt.target.parentNode.parentNode.children[0].textContent
        fetchJSON(endpoint + "?id=" + idValue, {
            method: 'DELETE',
        }).then(data => console.log(data))
        removeTr(evt)

    })
});

function removeTr(evt) {
    evt.target.parentNode.parentNode.remove();
}


function goForm(info) {
    window.location.href = `./form.html?id=${info}`;
}

/**
 *  recupere une personne pour l'afficher dans mon tableau
 * @param {{id: id, nom: nom, prenom: prenom, age: age}} obj
 * @return {HTMLElement} tr>td*4
 */
function addRow(obj, key) {
    const tab = document.getElementById('workspace');
    let trElt = document.createElement('tr');
    trElt.append(hiddenId('td',key),addCell('td',obj.nom), addCell('td',obj.prenom), addCell('td',obj.age), addBtnModifier(), addBtnDelete());
    tab.append(trElt);
}

function hiddenId(tagName, value){
    let tdElt = document.createElement(tagName);
    tdElt.textContent = value;
    tdElt.hidden = true;
    return tdElt;
}

function addCell(tagName, value) {
    let tdElt = document.createElement(tagName);
    tdElt.textContent = value;
    return tdElt;
}

function addBtnModifier(){
    let tdElt = document.createElement('td');
    let btn = document.createElement('button');
    btn.textContent = 'Modifier';
    btn.className = 'btnModifier';
    tdElt.appendChild(btn)
    return tdElt;
}

function addBtnDelete(){
    let tdElt = document.createElement('td');
    let btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.className = 'btnDelete';
    tdElt.appendChild(btn);
    return tdElt;
}