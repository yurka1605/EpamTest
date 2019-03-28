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
                const nodeElemName = event.target.localName;
                let fullName;
                if (nodeElemName === 'li') fullName = event.target.children[1].innerHTML;
                else if(nodeElemName === 'div') fullName = event.target.innerHTML;
                else if(nodeElemName === 'img') fullName = event.target.alt;
                Users.addInfoAboutUser(fullName.replace(/[\s .]/g, ''));
            });
            owerflow.addEventListener('click', closePopup);
            close.addEventListener('click', closePopup);
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

        //Обработка данных
        static parseJson(data) {
            sessionStorage.setItem('users', JSON.stringify(data));
            const sortArrUsers = sortFullName(data);
            this.renderData(sortArrUsers);
        }

        static addInfoAboutUser(fullName) {
            const sessionData = JSON.parse(sessionStorage.getItem('users')).results;
            sessionData.forEach(user => {
                let currentUserFullName = `${user.name.title}${user.name.first}${user.name.last}`;
                if(fullName === currentUserFullName) {
                    Users.renderInfoAboutUser(user);
                }
            });
        }

        // Рендер в html
        static renderData(users) {
            usersList.innerHTML = '';
            users.forEach((user) => {
                const newUser = document.createElement("li");
                newUser.classList.add('user');

                const imgUrl = user.picture.medium;
                const fullName =`${user.name.title}. ${user.name.fullName}`;

                newUser.innerHTML = `<img title="${fullName}" alt="${fullName}" src="${imgUrl}"><div class="userName">${fullName}</div>`;
                usersList.appendChild(newUser);
            });
            footer.innerHTML = `${new Date().toLocaleDateString().split('\.')[2]} &copy Copyright`;
        }

        static renderInfoAboutUser(infoAboutUser) {
            myAvatar.src = infoAboutUser.picture.large;
            myAvatar.alt = myAvatar.title = fullName.innerHTML = `${infoAboutUser.name.title}. ${infoAboutUser.name.first} ${infoAboutUser.name.last}`;
            infoAddress.innerHTML = `${infoAboutUser.location.street}, ${infoAboutUser.location.city}, ${infoAboutUser.location.state}`;
            emailInfo.innerHTML = infoAboutUser.email;
            numberInfo.innerHTML = infoAboutUser.phone;
            genderInfo.innerHTML = infoAboutUser.gender;
            popup.classList.add('open');
            wrapper.classList.add('filter');
            owerflow.style.display = 'block';
        }
    }
    new Users(URL).init();
};
