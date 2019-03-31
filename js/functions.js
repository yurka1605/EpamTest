'use strict';

var sortFullName = function sortFullName(data) {
    var sortingMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var usersList = [];
    var userListName = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var user = _step.value;

            user.name = {
                title: user.name.title,
                fullName: user.name.first + ' ' + user.name.last,
                fullSortName: user.name.last + ' ' + user.name.first
            };
            usersList.push(user);
            userListName.push(user.name.fullSortName);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log(userListName);
    sortingMethod === '' ? userListName = userListName.sort() : userListName = userListName.sort().reverse();
    console.log(userListName);
    var sortArrUsers = [];
    userListName.forEach(function (fullName) {
        usersList.forEach(function (user) {
            if (fullName === user.name.fullSortName) sortArrUsers.push(user);
        });
    });
    return sortArrUsers;
};
var closePopup = function closePopup() {
    popup.classList.remove('open');
    wrapper.classList.remove('filter');
    overlay.style.display = 'none';
    spinner.style.display === 'block' ? spinner.style.display = 'none' : false;
};