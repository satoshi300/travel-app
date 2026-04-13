class Render {
    constructor() {

        this.ulEl = document.querySelector('.excursions')
    }
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
                protoClone.querySelector('[name="imageUrl"]').innerText = excursion.imageUrl;

                this.ulEl.appendChild(protoClone)
                protoClone.classList.remove('excursions__item--prototype');
            })
        }
    };

    insertExcursionsClient(data) {
        const protoEl = document.querySelector('.excursions__item--prototype')
        if (protoEl) {
            this.ulEl.innerHTML = '';
            this.ulEl.appendChild(protoEl);

            data.forEach(item => {
                const protoClone = protoEl.cloneNode(true);
                protoClone.dataset.id = item.id;
                const figureEl = protoClone.querySelector('figure');
                if (figureEl) {
                    const img = document.createElement('img');
                    img.src = item.imageUrl;
                    figureEl.appendChild(img);
                }

                protoClone.querySelector('.excursions__title').innerText = item.title;
                protoClone.querySelector('.excursions__description').innerText = item.description;

                const adultsLabel = protoClone.querySelector('.adults');
                adultsLabel.firstChild.textContent = `Dorosły: ${item.adultsPrice} PLN x `;
                protoClone.querySelector('[name="adultsPrice"]').dataset.price = item.adultsPrice;

                const childrenLabel = protoClone.querySelector('.children');
                childrenLabel.firstChild.textContent = `Dziecko: ${item.childrenPrice} PLN x `;
                protoClone.querySelector('[name="childrenPrice"]')

                this.ulEl.appendChild(protoClone)
                protoClone.classList.remove('excursions__item--prototype');
            })
        }
    };
}

export default Render;