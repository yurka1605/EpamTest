'use strict';
let usersNumber = 50; //Количество выводимых пользователей
const URL = `https://api.randomuser.me/1.0/?results=${usersNumber}&nat=gb,us&inc=gender,name,location,email,phone,picture`;
const selectSort = document.getElementsByClassName('sortUsers')[0];
const usersList = document.getElementsByClassName('listOfUsers')[0];
