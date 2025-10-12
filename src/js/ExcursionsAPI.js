// W katalogu ./src/js znajdziesz plik ExcursionsAPI.js, który zawiera klasę o tej samej nazwie.

// Został on stworzony, aby przechowywać w jednym miejscu całą komunikację z API.

// To tutaj powinny być zdefiniowane metody, które odpytują API, np. pozwalają pobrać wycieczki z bazy lub je do niej dodać.

// Ta klasa będzie używana zarówno po stronie client, jak i admin, dlatego też została już zaimportowana do obu plików JS odpowiedzialnych za każdą z części.

class ExcursionsAPI {
    constructor() {
        this.excursionsUrl = 'http://localhost:3000/excursions';
        this.ordersUrl = 'http://localhost:3000/orders';
        this.ulEl = document.querySelector('.excursions')
    }

    loadData() {
        fetch(this.excursionsUrl)
            .then(resp => {
                if (resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            })
            .then(data => {
                this.insertExcursionsAdmin(data);
            })

            .catch(err => console.error(err));
    }
//  insertExcursionsAdmin(excursionsList) {
//         const protoEl = document.querySelector('.excursions__item--prototype')
//         if (protoEl) {
//             this.ulEl.innerHTML = '';
//             this.ulEl.appendChild(protoEl);

//             excursionsList.forEach(excursion => {
//                 const protoClone = protoEl.cloneNode(true);
//                 protoClone.dataset.id = excursion.id;

//                 protoClone.querySelector('.excursions__title').innerText = excursion.title;
//                 protoClone.querySelector('.excursions__description').innerText = excursion.description;

//                 protoClone.querySelector('[name="adultsPrice"] strong').innerText = excursion.adultsPrice;
//                 protoClone.querySelector('[name="childrenPrice"] strong').innerText = excursion.childrenPrice;

//                 this.ulEl.appendChild(protoClone)
//                 protoClone.classList.remove('excursions__item--prototype');

//                 console.log(protoClone)
//             })
//         }
//     };

    insertExcursionsAdmin(excursionsList) {
        const protoEl = document.querySelector('.excursions__item--prototype')
        if (protoEl) {
            this.ulEl.innerHTML = '';
            this.ulEl.appendChild(protoEl);

            excursionsList.forEach(excursion => {
                const protoClone = protoEl.cloneNode(true);
                protoClone.dataset.id = excursion.id;

                protoClone.querySelector('.excursions__title').innerText = excursion.title;
                protoClone.querySelector('.excursions__description').innerText = excursion.description;

                protoClone.querySelector('[name="adultsPrice"] strong').innerText = excursion.adultsPrice;
                protoClone.querySelector('[name="childrenPrice"] strong').innerText = excursion.childrenPrice;

                this.ulEl.appendChild(protoClone)
                protoClone.classList.remove('excursions__item--prototype');

                console.log(protoClone)
            })
        }
    };

}

export default ExcursionsAPI;