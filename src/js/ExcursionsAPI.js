class ExcursionsAPI {
    constructor() {
        this.excursionsUrl = 'http://localhost:3000/excursions';
        this.ordersUrl = 'http://localhost:3000/orders';
        this.ulEl = document.querySelector('.excursions')
    }
    loadData() {
        return fetch(this.excursionsUrl)
            .then(resp => {
                if (resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            })
    }

    addExcursion(e) {
        const { title, description, adultsPrice, childrenPrice, imageUrl } = e.target.elements;

        const data = {
            title: title.value, description: description.value, adultsPrice: Number(adultsPrice.value), childrenPrice: Number(childrenPrice.value), imageUrl: imageUrl.value
        };
        console.log(data)

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(this.excursionsUrl, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally(() => this.loadData());
    }

    sendOrder(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }

        return fetch(this.ordersUrl, options)

    }
}

export default ExcursionsAPI;