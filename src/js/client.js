import './../css/reset.css'
import './../css/client.css'

import Validator from './Validator.js';
const validator = new Validator();

import Render from './Render';
const render = new Render();

import ExcursionsAPI from './ExcursionsAPI';
const excursions = new ExcursionsAPI();

const apiOrdersUrl = 'http://localhost:3000/orders';

function init() {
    console.log('DOM');
    excursions.loadData()
        .then(data => {
            render.insertExcursionsClient(data);
            updateCartIcon();
        })
}

document.addEventListener('DOMContentLoaded', init);

const excursionsEl = document.querySelector('.excursions');
excursionsEl.addEventListener('submit', addExcursionsToOrder);
excursionsEl.addEventListener('submit', totalPriceExcursions);

// usuniecie danych z "panel__order" "order__total-price" przy wczytaniu strony
const orderTotalPriceEl = document.querySelector('.order__total-price-value');
orderTotalPriceEl.textContent = '';

// aktualizacja koszyka
function updateCartIcon() {
    const items = document.querySelectorAll('.summary__item:not(.summary__item--prototype)');
    const countEl = document.querySelector('.cart-count');
    if (!countEl) return;
    countEl.textContent = items.length;
}

// walidacja formularza
const formValidate = document.querySelector('.order');
formValidate.addEventListener('submit', (e) => {
    e.preventDefault();
    const totalPrice = document.querySelector('.order__total-price-value').textContent;
    const name = e.target.elements.name.value.trim();
    const email = e.target.elements.email.value.trim();
    const summaryEl = document.querySelector('.summary__item--new');
    const errors = validator.run({
        name: name,
        email: email
    });
    if (!summaryEl) {
        alert('Dodaj wycieczkę do koszyka');
    } else if (errors.length > 0) {
        const sectionPanel = document.querySelector('.panel__form');
        const panelOrderEl = sectionPanel.querySelector('form:first-child')
        console.log(panelOrderEl)

        e.preventDefault();

        const newDiv = document.querySelector('.errors');
        newDiv.classList.add('mobile', 'desktop')

        newDiv.innerHTML = '';
        const newUl = document.createElement('ul');
        const newH1 = document.createElement('h1');

        errors.forEach(function (err) {
            newH1.innerText = 'Popraw błędy w formularzu';
            newH1.style.fontSize = '32px';
            newH1.style.color = 'red';

            if (newUl) {

                const newLi = document.createElement('li');
                newLi.style.marginTop = '2px';

                newLi.innerText = err;
                newUl.appendChild(newLi);
            }
        });
        sectionPanel.insertBefore(newDiv, panelOrderEl);
        newDiv.appendChild(newUl);
        newUl.prepend(newH1);
    } else {
        const { name, email } = e.target.elements;

        const summaryItems = document.querySelectorAll('.summary__item:not(.summary__item--prototype)');
        const excursionsData = Array.from(summaryItems).map(item => ({
            name: item.querySelector('.summary__name').innerText,
            totalPrice: item.querySelector('.summary__total-price').innerText,
            details: item.querySelector('.summary__prices').innerText

        }));
        const data = {
            clientName: name.value,
            email: email.value,
            excursionsData
        };
        excursions.sendOrder(data)
            .then(() => {
                alert('Dziękujemy za złożenie zamówienia o wartości ' + totalPrice + ' . Szczegóły zamówienia zostały wysłane na adres e-mail: ' + email.value);
                location.reload();
            })

    }
})

function totalPriceExcursions(e) {
    const prices = document.querySelectorAll('.summary__item:not(.summary__item--prototype)');
    let sum = 0;
    prices.forEach(function (item) {
        const singlePriceEl = item.querySelector('.summary__total-price');
        const singlePriceNumber = parseInt(singlePriceEl.textContent);
        sum += singlePriceNumber;
        const priceTotal = document.querySelector('.order__total-price-value');
        priceTotal.textContent = sum + ' PLN';
        priceTotal.style.fontWeight = 'bold';
    })
}

function addExcursionsToOrder(e) {
    e.preventDefault();
    const parentEl = e.target.parentElement;
    const titleEl = parentEl.querySelector('.excursions__title').textContent.trim();
    const adultsNumber = Number(e.target.elements.adultsPrice.value.trim());
    const childrenNumber = Number(e.target.elements.childrenPrice.value.trim());

    const adultsPrice = parentEl.querySelector('.adults').textContent;
    const adultsPriceNumber = adultsPrice.match(/\d+(\.\d+)?/g)
    const childrenPrice = parentEl.querySelector('.children').textContent;
    const childrenPriceNumber = childrenPrice.match(/\d+(\.\d+)?/g)
    const totalPrice = adultsNumber * adultsPriceNumber + childrenNumber * childrenPriceNumber;

    if (adultsNumber > 0 || childrenNumber > 0) {
        const protoEl = document.querySelector('.summary__item--prototype');
        const ulEl = document.querySelector('.summary')
        const protoClone = protoEl.cloneNode(true);

        protoClone.classList.add('summary__item--new');
        const titleVal = protoClone.querySelector('.summary__name').innerText = titleEl;
        protoClone.querySelector('.summary__total-price').innerText = totalPrice + ' PLN';
        protoClone.querySelector('.summary__prices').innerText = 'Dorośli: ' + adultsNumber + ' x ' + adultsPriceNumber + 'PLN' + ' dzieci: ' + childrenNumber + ' x ' + childrenPriceNumber + 'PLN';
        orderTotalPriceEl.textContent = totalPrice + ' PLN';
        protoClone.classList.add('mobile', 'desktop')


        const removeExcursion = protoClone.querySelector('.summary__btn-remove');
        removeExcursion.addEventListener('click', deleteExcursion);
        function deleteExcursion(e) {
            e.preventDefault();
            protoClone.remove();
            orderTotalPriceEl.textContent = '';
            totalPriceExcursions();
            updateCartIcon();

        }
        ulEl.appendChild(protoClone)
        protoClone.classList.remove('summary__item--prototype');

        updateCartIcon();

    } else {
        alert('Podaj liczbe uczestników')
    }
}





