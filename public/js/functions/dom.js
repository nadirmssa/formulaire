/**
 *
 * @param {object} obj
 * @returns {HTMLDataElement}
 */
export function addValueToinput(obj, id){
    const nomElt = document.querySelector('#nom')
    const prenomElt = document.querySelector('#prenom')
    const ageElt = document.querySelector('#age')
    const idElt = document.querySelector('#idS')
    nomElt.value = obj.nom;
    prenomElt.value = obj.prenom;
    ageElt.value = obj.age;
    idElt.value = id;
}