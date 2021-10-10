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

    let productList = [];

    const productTable = (data) => {
        return `<tr>
      <td class="id">${data?.id}</td>
      <td class="name">${data?.medicineName}</td>
      <td class="brand">${data?.medicineBrand}
      </td>
      <td class="eDate">${data?.expiryDate}</td>
      <td class="price">$${data?.unitPrice}</td>
      <td class="price">${data?.stock}</td>
      </tr>`;
    };

    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
        .then((response) => response.json())
        .then((data) => {
            productList = data;
            productDisplay(productList);
        })
        .catch((err) => console.log(err));

    const productDisplay = (data) => {
        let productDetails = "";
        for (let i = 0; i < data.length; i++) {
            productDetails += productTable(data[i]);
        }

        tableBody.innerHTML = productDetails;
    };

    function filterData() {
        let count = 0;
        let productDetails = "";
        const presentDate = new Date();
        if (productList.length > 0) {
            for (let i = 0; i < productList.length; i++) {
                if (
                    !$("#expiredCheck").is(":checked") &&
                    new Date(productList[i].expiryDate) < presentDate
                ) {
                    continue;
                } else if (
                    !$("#lstockCheck").is(":checked") &&
                    productList[i].stock < 100
                ) {
                    continue;
                } else {
                    count++;
                    productDetails += productTable(productList[i]);
                }
            }
        }
        $(".ordersCount").html(count);
        // $("#productBody").html(productDetails);
        tableBody.innerHTML = productDetails;

    }

    $(".filer_checkbox").on("change", function () {
        filterData();
    });

});
