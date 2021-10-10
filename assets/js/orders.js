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

    const tableBody = document.querySelector('.table-body');

    let orderList = [];

    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
        .then((response) => response.json())
        .then((data) => {
            orderList = data;
            productDisplay(orderList);
        })
        .catch((err) => console.log(err));

    const productDisplay = (data) => {
        let ordersDetails = "";
        for (let i = 0; i < data.length; i++) {
            ordersDetails += `<tr>
                <td class="grey_text">${data[i].id}</td>
                <td class="dark_text">${data[i].customerName}</td>
                <td class="dark_text">${data[i].orderDate}<br>
                <span class="grey_text">${data[i].orderTime}</span>
                </td>
                <td class="grey_text">$${data[i].amount}</td>
                <td class="dark_text">${data[i].orderStatus}</td>
            </tr>`;
        }

        tableBody.innerHTML = ordersDetails;

        // $("#ordersBody").html(ordersDetails);
    };

    $(".filter_check").click(function () {
        let filterArr = $(".filter_check:checked")
            .map(function () {
                return this.value;
            })
            .get();
        getClickedArr(filterArr);
    });

    const getClickedArr = (data) => {
        let newOderList = [];
        if (orderList.length > 0) {
            for (let i = 0; i < data.length; i++) {
                orderList.filter((item) => {
                    if (item.orderStatus == data[i]) {
                        newOderList.push(item);
                    }
                });
            }
        }

        $(".ordersCount").html(newOderList.length);
        productDisplay(newOderList);
    };

    $("#logout").click(function () {
        localStorage.setItem("loginStatus", false);
        window.location = "./index.html";
    });
});
