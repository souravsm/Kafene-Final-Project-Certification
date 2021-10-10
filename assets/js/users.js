
const tableBody = document.querySelector('.table-body');
let allUsers = [];

const getUsers = () => {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
        .then((response) => response.json())
        .then((data) => {
            allUsers = data;
            displayUsers(data);
        })
        .catch((err) => console.log(err));
};

function displayUsers(data) {
    let output = '';
    for (let i = 0; i < data.length; i++) {

        output += `<tr>
                        <td>${i + 1}</td>
                        <td><img class="case" src="${data[i].profilePic}"> </td>
                        <td class="case">${data[i].fullName}</td>
                        <td>${data[i].dob}</td>
                        <td class="case">${data[i].gender}</td>
                        <td class="case">${data[i].currentCity}, ${data[i].currentCountry}</td>
                </tr>`;
    }
    tableBody.innerHTML = output;
}

getUsers();

const noResult = () => {
    let noResultText = `<p class="noResult text-danger fw-bold">No Result Found</p>`;
    $("#ordersBody").html(noResultText);
};

$(document).ready(function () {

    if (localStorage.getItem("login_status") != 1) {
        alert("Please login first");
        window.location = "login.html";

    }

    if (localStorage.getItem("login_status") == 1) {
        logout_button.style.display = 'block';
    } else {
        logout_button.style.display = 'none';
    }
    
    $(".search_submit").click(function (e) {
        e.preventDefault();
        let searchText = $(".user_search_filed").val().toLowerCase();
        if (searchText.length < 2) {
            alert("Please enter at least 2 characters");
            return;
        } else {
            const filterData = allUsers.filter((it) => {
                const name = it.fullName?.toLowerCase();
                if (name.search(searchText) !== -1) {
                    return it;
                }
            });
            if (filterData.length !== 0) displayUsers(filterData);
            else noResult();
        }
    });

    $(".search_reset").click(function (e) {
        e.preventDefault();
        $(".user_search_filed").val("");
        getUsers();
    });

    $(".user_search_filed").on("input", function () {
        if ($(this).val() === "") {
            displayUsers(allUsers);
        }
    });
});