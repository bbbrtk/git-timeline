"use strict"


function fetchGithubApi() {
    let username = document.getElementById("input-username").value;
    let url = "https://api.github.com/users/" + username
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            addToTable(response.login);
        })
        // .then(response => {
        //     addToTable(response.login)
        // })
}

function addEventToInput() {
    let inputUsername = document.getElementById("input-username");
    inputUsername.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            fetchGithubApi()
        }
    });
}

function addToTable(content){
    let table = document.getElementById("user-table")
    let row = table.insertRow()
    let cell = row.insertCell(0)
    cell.innerHTML = content
    row.insertCell(0)
    console.log(row)
}

document.addEventListener("DOMContentLoaded", function () {
    addEventToInput()
});

