// Panel zarządzania wycieczkami zapisanymi w bazie danych. Jego funkcjonalności to:

// dodawanie wycieczek
// usuwanie wycieczek
// modyfikowanie wycieczek.
// Pliki powiązane:

// ./src/admin.html
// ./src/js/admin.js
// ./src/css/admin.css

import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';
const excursions = new ExcursionsAPI();

const apiExcUrl = 'http://localhost:3000/excursions';


document.addEventListener('DOMContentLoaded', init);

console.log('admin');


const form = document.querySelector('.form');
form.addEventListener('submit', addExcursion)

function init() {
    console.log('DOM');
    excursions.loadDataAdmin();
    removeExcursions();
    // excursions.insertExcursions();
}

function addExcursion(e) {
    e.preventDefault();
    const { title, description, adultsPrice, childrenPrice } = e.target.elements;

    const data = {
        title: title.value, description: description.value, adultsPrice: Number(adultsPrice.value), childrenPrice: Number(childrenPrice.value)
    };
    console.log(data)

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(apiExcUrl, options)
        .then(resp => console.log(resp))
        .catch(err => console.error(err))
        .finally(() => excursions.loadData());
}

function removeExcursions() {
    const ulEl = document.querySelector('.excursions');
    // console.log(ulEl)
    ulEl.addEventListener('click', e => {
        e.preventDefault();
        const targetEl = e.target;
        const parentEl = targetEl.parentElement;
        const parentDivEl = parentEl.parentElement;
        const parentLiEl = parentDivEl.parentElement;
        const id = parentLiEl.dataset.id;

        if (e.target.className.includes('remove')) {
            console.log('klikam w przycisk remove')

            console.log(id)
            const options = { method: 'DELETE' };
            fetch(`${apiExcUrl}/${id}`, options)
                .then(resp => console.log(resp))
                .catch(err => console.error(err))
                .finally(() => excursions.loadData());

        } else if (e.target.className.includes('update')) {
            const title = parentLiEl.querySelector('h2');
            const description = parentLiEl.querySelector('p');
            const adultsPrice = parentLiEl.querySelector('[name="adultsPrice"] strong');
            const childrenPrice = parentLiEl.querySelector('[name="childrenPrice"] strong');

            const editableEls = [title, description, adultsPrice, childrenPrice]
            const allEditable = editableEls.every(el => el.isContentEditable);

            if (allEditable) {

                const data = {
                    title: title.textContent, description: description.textContent, adultsPrice: Number(adultsPrice.textContent), childrenPrice: Number(childrenPrice.textContent)
                };
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }

                };
                fetch(`${apiExcUrl}/${id}`, options)
                    .then(resp => console.log(resp))
                    .catch(err => console.log(err))
                    .finally(() => {
                        e.target.innerText = 'edytuj';
                        editableEls.forEach(el => el.contentEditable = false);
                    });
            } else {

                e.target.value = 'zapisz';
                console.log('zmiana textu')
                editableEls.forEach(
                    el => el.contentEditable = true
                );
            }
            console.log(title);
            console.log(description);
            console.log(adultsPrice);
            console.log(childrenPrice);
            console.log(id)
            console.log('click update')
            // console.log('click', e.target)

        }
    })
}

