"use strict"

function showResponse(response) {
    let theDiv = document.getElementById("gt-response-text");
    let content = document.createTextNode(response);
    theDiv.appendChild(content);
}

function getInputValue() {
    return document.getElementById("input-username").value;
};

function fetchGithubApi(username) {
    let url = "https://api.github.com/users/" + username
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // showResponse(response);
        })
}

function addEventToInput() {
    let inputUsername = document.getElementById("input-username");
    inputUsername.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            let username = getInputValue()
            fetchGithubApi(username)
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    addEventToInput()
});

