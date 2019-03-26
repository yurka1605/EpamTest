const sortFullName = (data, sortingMethod = '') => {
    let usersList = [];
    let userListName = [];
    for (const user of data.results) {
        user.name = {
            title: user.name.title,
            fullName: `${user.name.first} ${user.name.last}`,
        };
        usersList.push(user);
        userListName.push(user.name.fullName);
    }
    sortingMethod === '' ? userListName = userListName.sort() : userListName = userListName.sort().reverse();

    let sortArrUsers = [];
    userListName.forEach((fullName) => {
        usersList.forEach((user) => {
            if(fullName === user.name.fullName) sortArrUsers.push(user);
        });
    });
    return sortArrUsers;
};
