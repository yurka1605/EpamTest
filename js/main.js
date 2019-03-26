'use strict';
window.onload = () => {
    class Users {
        constructor(url) {
            this.url = url;
        }
        init() {
            this.getUsersJson();
            selectSort.addEventListener('change', (event) => {
                let sortArr;
                const sessionData = JSON.parse(sessionStorage.getItem('users'));
                if(event.target.value === 'в обратном порядке') sortArr = sortFullName(sessionData, 'reverse');
                else sortArr = sortFullName(sessionData);
                Users.renderData(sortArr);
            });
            usersList.addEventListener('click', (event) => {
                console.log(event);
                const fullName = event.target.children[1].innerHTML.split(' ');
                Users.addInfoAboutUser( fullName[0],fullName[1], fullName[2]);
            });
        }

        getUsersJson() {
            const myHeaders = new Headers();
            const myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            };
            const request = new Request(this.url, myInit);

            fetch(request)
                .then( response => {
                    if (response.status === 200) return response.json();
                    else throw new Error('Response status not 200.');
                })
                .then( success => {
                    Users.parseJson(success);
                })
                .catch( error => {
                    console.log('Problem with request: ' + error.message);
                });
        }

        //Обрабатываем данные полученные с сервера
        static parseJson(data) {
            sessionStorage.setItem('users', JSON.stringify(data));
            const sortArrUsers = sortFullName(data);
            this.renderData(sortArrUsers);
        }

        static addInfoAboutUser(title, firstName, lastName) {
            const sessionData = JSON.parse(sessionStorage.getItem('users')).results;
            sessionData.forEach(user => {
               if(user.name.title === title && user.name.firstName === firstName && user.name.lastName === lastName) Users.renderInfoAboutUser(user);
            });
        }

        // Рендерим в html
        static renderData(users) {
            usersList.innerHTML = '';
            users.forEach((user) => {
                const newUser = document.createElement("li");
                newUser.classList.add('user');

                const imgUrl = user.picture.medium;
                const titleUser = `${user.name.title}. `;
                const fullName = user.name.fullName;

                newUser.innerHTML = `<img title="${fullName}" alt="${fullName}" src="${imgUrl}"><div>${titleUser}${fullName}</div>`;
                usersList.appendChild(newUser);
            });
        }

        static renderInfoAboutUser(infoAboutUser) {
            console.log(infoAboutUser);
        }
    }
    new Users(URL).init();
};
