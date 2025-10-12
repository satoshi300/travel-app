// To część związana z tym, co może zrobić użytkownik:

// wybrać wycieczkę przez wprowadzenie ilości zamawianych biletów w odpowiednie pola formularza i kliknięcie dodaj do zamówienia. Wiąże się to z:
// - walidacją danych
// - dodawaniem zamówienia do panelu z prawej strony, tj. do koszyka
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


function init() {
    console.log('DOM');
    excursions.loadDataClient();
    // loadExcursions();
    // removeExcursions();
    // excursions.insertExcursions();
}





