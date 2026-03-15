![Travel App](./src/img/app.gif) 

# Travel App

Travel App is a simple web application that allows users to browse available excursions, add them to a cart and place an order.
The project also includes an admin panel where excursions can be created, edited or removed from the database.

The application communicates with a REST API created with JSON Server and uses Fetch API for asynchronous data operations.

---

## 🚀 Main Features

### Client panel

Users can:

- browse available excursions
- choose number of adults and children
- add excursions to the cart
- see total order price
- remove excursions from the cart
- submit an order with name and email
- validate form data before sending

### Admin panel

Administrator can:

- add new excursions
- edit existing excursions
- remove excursions from the database
- update prices and descriptions

All data is stored in a JSON Server database.

---

## 💡 Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)


## 🔗 See also

Are you interested in **JavaScript and Frontend Development**?  
See my other projects on my GitHub profile [here](https://github.com/satoshi300).

---

## 💿 Installation

The project uses **Node.js**, **npm** and **JSON Server**.

1. Clone or download the repository
2. Install dependencies:

```bash
npm install
```
3. Run webpack development server:

```bash
npm run start
```

4. Run JSON Server in a second terminal:

```bash
json-server --watch ./data/excursions.json
```

5. Open:

http://localhost:8080/index.html – client panel

http://localhost:8080/admin.html – admin panel

---

## 🤔 Solutions provided in the project

### 1. Fetch API communication

The application communicates with a local API created using JSON Server.

```javascript
fetch(this.excursionsUrl)
    .then(resp => resp.json())
```

This allows loading excursions dynamically from the database.

### 2. Class based architecture

The project separates responsibilities using classes.

| Class         | Responsibility                  |
| ------------- | ------------------------------- |
| Render        | rendering excursions to the DOM |
| ExcursionsAPI | communication with API          |
| Validator     | form validation                 |


```javascript
const excursions = new ExcursionsAPI();
excursions.loadData()
```

### 3. Prototype element cloning

Instead of creating DOM elements from scratch, the project uses hidden prototype HTML elements.

This approach allows:

- easier DOM manipulation
- cleaner JavaScript code
- faster rendering of elements

```javascript
const protoClone = protoEl.cloneNode(true);
```

### 4. Dynamic cart management

The cart system allows users to:

- add excursions
- remove excursions
- automatically calculate total price
- update cart icon counter

Example logic:

```javascript
const prices = document.querySelectorAll('.summary__item');
let sum = 0;
```

### 5. Issue | Solution

| Issue                         | Solution                   |
| ----------------------------- | -------------------------- |
| Rendering multiple excursions | cloning prototype elements |
| API communication             | Fetch API with JSON Server |
| Form validation               | custom Validator class     |
| Cart price calculation        | dynamic DOM queries        |

---

## 💭 Conclusions for future projects

During this project I learned how to:

- communicate with REST APIs
- work with Fetch API
- structure JavaScript projects using classes
- separate responsibilities in code
- dynamically manipulate the DOM
- implement basic form validation
- manage application state using the DOM

In the future I would like to improve:

- UI design
- implement a real backend instead of JSON Server
- store cart data in localStorage

---

## 🙋‍♂️ Feel free to contact me
If you like the project or have suggestions – feel free to reach out via [GitHub](https://github.com/satoshi300) or [LinkedIn](https://www.linkedin.com/in/michal-wasiak-457a5331/).

---

&nbsp;

## 👏 Thanks / Special thanks / Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.