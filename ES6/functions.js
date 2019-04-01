const sortFullName = (data, sortingMethod = '') => {
    let usersList = [];
    let userListName = [];
    for (const user of data.results) {
        user.name = {
            title: user.name.title,
            fullName: `${user.name.first} ${user.name.last}`,
            fullSortName: `${user.name.last} ${user.name.first}`,
        };
        usersList.push(user);
        userListName.push(user.name.fullSortName);
    }
    sortingMethod === '' ? userListName = userListName.sort() : userListName = userListName.sort().reverse();
    let sortArrUsers = [];
    userListName.forEach((fullName) => {
        usersList.forEach((user) => {
            if(fullName === user.name.fullSortName) sortArrUsers.push(user);
        });
    });
    return sortArrUsers;
};
const closePopup = () => {
    popup.classList.remove('open');
    wrapper.classList.remove('filter');
    overlay.style.display = 'none';
    spinner.style.display === 'block' ? spinner.style.display = 'none': false;
};
