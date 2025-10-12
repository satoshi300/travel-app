// To część związana z tym, co może zrobić użytkownik:


// - aktualizowaniem ceny za całość
// - potwierdzić zamówienie poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcie zamawiam. Wiąże się to z:
// - walidacją danych
// - wysłaniem zamówienia do bazy danych (u nas to będzie API uruchomione dzięki JSON Server)
// - wyczyszczeniem koszyka.
// Pliki powiązane:

// ./src/index.html
// ./src/js/client.js
// ./src/css/client.css
import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';
const excursions = new ExcursionsAPI();

const apiExcUrl = 'http://localhost:3000/excursions';


document.addEventListener('DOMContentLoaded', init);

const excursionsEl = document.querySelector('.excursions');
excursionsEl.addEventListener('submit', addExcursionsToOrder);

function init() {
    console.log('DOM');
    excursions.loadDataClient();
    // loadExcursions();
    // removeExcursions();
    // excursions.insertExcursions();
}
const basket = [];
function addExcursionsToOrder(e) {
    e.preventDefault();
    const parentEl = e.target.parentElement;
    const titleEl = parentEl.querySelector('.excursions__title').textContent.trim();
    const adultsNumber = Number(e.target.elements.adultsPrice.value.trim());
    const childrenNumber = Number(e.target.elements.childrenPrice.value.trim());
    const totalPrice = '';    // pobrac cene i pomnozyc razy adultsNumber i children number i przekazac do   <strong class="summary__total-price">199PLN</strong>


    if (adultsNumber || childrenNumber > 0) {
        const protoEl = document.querySelector('.summary__item--prototype');
        const ulEl = document.querySelector('.summary')
        const protoClone = protoEl.cloneNode(true);

        protoClone.classList.add('summary__item--new');
        const titleVal = protoClone.querySelector('.summary__name').innerText = titleEl;
        console.log(titleVal)
        console.log(ulEl)
        console.log(protoEl)
        ulEl.appendChild(protoClone)
        protoClone.classList.remove('summary__item--prototype');

    }
    console.log(childrenNumber)
    console.log(adultsNumber)

}





