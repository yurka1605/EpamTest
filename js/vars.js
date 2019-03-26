'use strict';
let usersNumber = 50; //Количество выводимых пользователей
const URL = `https://api.randomuser.me/1.0/?results=${usersNumber}&nat=gb,us&inc=gender,name,location,email,phone,picture`;
const selectSort = document.getElementsByClassName('sortUsers')[0];
const usersList = document.getElementsByClassName('listOfUsers')[0];
const infoAddress = document.getElementsByClassName('infoAddress')[0];
const emailInfo = document.getElementsByClassName('emailInfo')[0];
const numberInfo = document.getElementsByClassName('numberInfo')[0];
const genderInfo = document.getElementsByClassName('genderInfo')[0];
const myAvatar = document.getElementById('myAvatar');
const fullName = document.getElementById('fullName');

const popup = document.getElementsByClassName('popupUserFullInfo')[0];
const wrapper = document.getElementsByClassName('wrapper')[0];
const owerflow = document.getElementsByClassName('owerflow')[0];
const close = document.getElementsByClassName('close')[0];
