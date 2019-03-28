'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
    var Users = function () {
        function Users(url) {
            _classCallCheck(this, Users);

            this.url = url;
        }

        _createClass(Users, [{
            key: 'init',
            value: function init() {
                this.getUsersJson();

                wrapper.classList.add('filter');
                overlay.style.display = spinner.style.display = 'block';

                selectSort.addEventListener('change', function (event) {
                    var sortArr = void 0;
                    var sessionData = JSON.parse(sessionStorage.getItem('users'));
                    if (event.target.value === 'в обратном порядке') sortArr = sortFullName(sessionData, 'reverse');else sortArr = sortFullName(sessionData);
                    Users.renderData(sortArr);
                });
                usersList.addEventListener('click', function (event) {
                    var nodeElemName = event.target.localName;
                    var fullName = void 0;
                    if (nodeElemName === 'li') fullName = event.target.children[1].innerHTML;else if (nodeElemName === 'div') fullName = event.target.innerHTML;else if (nodeElemName === 'img') fullName = event.target.alt;
                    Users.addInfoAboutUser(fullName.replace(/[\s .]/g, ''));
                });
                close.addEventListener('click', closePopup);
            }
        }, {
            key: 'getUsersJson',
            value: function getUsersJson() {
                // const myHeaders = new Headers();
                var myInit = { method: 'GET',
                    // headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                };
                var request = new Request(this.url, myInit);

                fetch(request).then(function (response) {
                    if (response.status === 200) return response.json();else throw new Error('Response status not 200.');
                }).then(function (success) {
                    Users.parseJson(success);
                    setTimeout(closePopup, 200);
                }).catch(function (error) {
                    console.log('Problem with request: ' + error.message);
                });
            }

            //Обработка данных

        }], [{
            key: 'parseJson',
            value: function parseJson(data) {
                sessionStorage.setItem('users', JSON.stringify(data));
                var sortArrUsers = sortFullName(data);
                this.renderData(sortArrUsers);
            }
        }, {
            key: 'addInfoAboutUser',
            value: function addInfoAboutUser(fullName) {
                var sessionData = JSON.parse(sessionStorage.getItem('users')).results;
                sessionData.forEach(function (user) {
                    var currentUserFullName = '' + user.name.title + user.name.first + user.name.last;
                    if (fullName === currentUserFullName) {
                        Users.renderInfoAboutUser(user);
                    }
                });
            }

            // Рендер в html

        }, {
            key: 'renderData',
            value: function renderData(users) {
                usersList.innerHTML = '';
                users.forEach(function (user) {
                    var newUser = document.createElement("li");
                    newUser.classList.add('user');

                    var imgUrl = user.picture.medium;
                    var fullName = user.name.title + '. ' + user.name.fullName;

                    newUser.innerHTML = '<img title="' + fullName + '" alt="' + fullName + '" src="' + imgUrl + '"><div class="userName">' + fullName + '</div>';
                    usersList.appendChild(newUser);
                });
                footer.innerHTML = new Date().toLocaleDateString().split('\.')[2] + ' &copy Copyright';
            }
        }, {
            key: 'renderInfoAboutUser',
            value: function renderInfoAboutUser(infoAboutUser) {
                myAvatar.src = infoAboutUser.picture.large;
                myAvatar.alt = myAvatar.title = fullName.innerHTML = infoAboutUser.name.title + '. ' + infoAboutUser.name.first + ' ' + infoAboutUser.name.last;
                infoAddress.innerHTML = infoAboutUser.location.street + ', ' + infoAboutUser.location.city + ', ' + infoAboutUser.location.state;
                emailInfo.innerHTML = infoAboutUser.email;
                numberInfo.innerHTML = infoAboutUser.phone;
                genderInfo.innerHTML = infoAboutUser.gender;
                popup.classList.add('open');
                wrapper.classList.add('filter');
                overlay.style.display = 'block';
            }
        }]);

        return Users;
    }();

    new Users(URL).init();
};