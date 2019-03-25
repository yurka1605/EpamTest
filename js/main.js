'use strict';
window.onload = () => {
    class Request {
        constructor(url) {
            this.url = url;
        }
        getUsersJson() {
            const urlRequest = this.url;
            console.log(this.url);
            const request = new Request( urlRequest, {
                method: 'GET',
                mode: 'cors',
                cache: 'default',
            });
            fetch(request)
                .then( response => {
                    if (response.status === 200) return response.json();
                    else throw new Error('Response status not 200.');
                })
                .then( success => {
                    console.log(success);
                })
                .catch( error => {
                    console.log('Problem with request: ' + error.message);
                });
        }
    }
    const usersNumber = 50;
    const URL = `https://api.randomuser.me/1.0/?results=${usersNumber}&nat=gb,us&inc=gender,name,location,email,phone,picture`;
    const init = new Request(URL);
    init.getUsersJson();
    // class User{
    //     constructor(name) {
    //         this.name = name;
    //     }
    // }
};