'use strict';

var usersNumber = 50; //Количество выводимых пользователей
var URL = 'https://api.randomuser.me/1.0/?results=' + usersNumber + '&nat=gb,us&inc=gender,name,location,email,phone,picture';
var footer = document.getElementsByTagName('footer')[0];
var selectSort = document.getElementsByClassName('sortUsers')[0];
var usersList = document.getElementsByClassName('listOfUsers')[0];
var infoAddress = document.getElementsByClassName('infoAddress')[0];
var emailInfo = document.getElementsByClassName('emailInfo')[0];
var numberInfo = document.getElementsByClassName('numberInfo')[0];
var genderInfo = document.getElementsByClassName('genderInfo')[0];
var myAvatar = document.getElementById('myAvatar');
var fullName = document.getElementById('fullName');

var popup = document.getElementsByClassName('popupUserFullInfo')[0];
var wrapper = document.getElementsByClassName('wrapper')[0];
var owerflow = document.getElementsByClassName('owerflow')[0];
var close = document.getElementsByClassName('close')[0];