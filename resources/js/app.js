"use strict"


function fetchGithubApi(url) {
    console.log("fetch from: " + url)
    fetch(url)
        .then(response => response.json())
        .then(response => {
            // check if list -> display different then
            Object.keys(response).forEach(key => {
                if (response[key]) {
                    let value = response[key]
                    if (value.length > 0) {
                        if (isValidUrl(value)) addButtonToTable(key, value);
                        else addRowToTable(key, value);
                    }
                }
            });

        })
}

function addEventToInput() {
    let inputUsername = document.getElementById("input-username");
    inputUsername.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            let username = document.getElementById("input-username").value;
            let url = "https://api.github.com/users/" + username
            fetchGithubApi(url)
        }
    });
}

function addRowToTable(name, content) {
    let row = document.getElementById("user-table-body").insertRow()
    row.insertCell().innerHTML = name
    row.insertCell().innerHTML = content
}

function addButtonToTable(name, content) {
    let row = document.getElementById("user-table-body").insertRow()
    row.insertCell().innerHTML = name

    let btn = document.createElement("BUTTON");
    btn.classList.add("gt-link-button")
    btn.innerHTML = "check";
    btn.value = content
    addButtonListener(btn)
    row.insertCell().appendChild(btn);
}

document.addEventListener("DOMContentLoaded", () => {
    addEventToInput()

});

function addButtonListener(button) {
    button.addEventListener('click', () => {
        console.log(button.value)
        if (button.value.includes("https://api.github.com/")) {
            // clear table
            let old_tbody = document.getElementById("user-table-body")
            let new_tbody = document.createElement('tbody');
            new_tbody.id = "user-table-body"
            old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
            // fetch
            fetchGithubApi(button.value)
        }
    });
}


function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true;
}
