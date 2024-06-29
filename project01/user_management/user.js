
let userList = JSON.parse(localStorage.getItem("userList"));
let userLogin = JSON.parse(localStorage.getItem("userLogin"));

function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = "/login"
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
    <img src="https://rikkeisoft.com/wp-content/themes/main/assets/images/home/logo.svg" alt="rikkeisoft">
    <h3> Management Page</h3>
    <div class="user_box">
        <span>Hello, ${userLogin.userName} !</span>
        <button onclick="logout()" class="btn btn-danger">Log out</button>
    </div>
    `
}
renderHeader();

function renderData() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let templateStr = ``;
    for (let i = 0; i < userList.length; i++) {
        templateStr += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${userList[i].email}</td>
            <td>${userList[i].userName}</td>
            <td>${userList[i].status ? "Normal" : "Locked"}</td>
            <td>
                <button style="margin: 3px; " onclick="updateStatus(${userList[i].id})">Lock/Unlock</button>
                <button style="margin: 3px; " onclick="edit(${userList[i].id})">Edit</button>
            </td>
        </tr>
        `;
    }
    document.querySelector("tbody").innerHTML = templateStr;
}
renderData();


function updateStatus(id) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == id) {
            userList[i].status = !userList[i].status;
            break;
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList));
    renderData();
}




function addUser() {
    let newUser = {
        id: Date.now(),
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        userName: document.querySelector("#name").value,
        status: true,
    };
    let userList = JSON.parse(localStorage.getItem("userList"));

    let index = userList.findIndex((c) => c.id == newUser.id);
    if (index >= 0) {
        userList.splice(index, 1, newUser);
    } else {
        userList.push(newUser);
    }
    localStorage.setItem("userList", JSON.stringify(userList));
    renderData();
}
function edit(Id) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == Id) {
            document.querySelector("#email").value = userList[i].email;
            document.querySelector("#password").value = userList[i].password;
            document.querySelector("#name").value = userList[i].userName;
        }
    }
}



