$(document).ready(function () {
    function loadTableData() {
        $.getJSON("data.json", function (data) {
            let tableBody = $("#dataTable tbody");
            tableBody.empty();
            let sumTotal = 0;

            data.forEach((item, index) => {
                let totalValue = item.quantity * item.price;
                sumTotal += totalValue;

                let row = `<tr>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.datetime}</td>
                    <td>${totalValue.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                    </td>
                </tr>`;
                tableBody.append(row);
            });

            $("#sumTotalValue").text(sumTotal.toFixed(2));
        });
    }

    $("#productForm").submit(function (event) {
        event.preventDefault();
        let formData = {
            productName: $("#productName").val(),
            quantity: parseInt($("#quantity").val()),
            price: parseFloat($("#price").val()),
        };

        $.post("process.php", formData, function () {
            loadTableData();
            $("#productForm")[0].reset();
        });
    });

    $("#dataTable").on("click", ".edit-btn", function () {
        let index = $(this).data("index");

        $.getJSON("data.json", function (data) {
            let item = data[index];
            $("#productName").val(item.productName);
            $("#quantity").val(item.quantity);
            $("#price").val(item.price);

            $("#productForm").off("submit").on("submit", function (event) {
                event.preventDefault();
                let updatedData = {
                    productName: $("#productName").val(),
                    quantity: parseInt($("#quantity").val()),
                    price: parseFloat($("#price").val()),
                    index: index,
                };

                $.post("process.php", updatedData, function () {
                    loadTableData();
                    $("#productForm")[0].reset();
                    $("#productForm").off("submit").on("submit", function (event) {
                        event.preventDefault();
                        formData = {
                            productName: $("#productName").val(),
                            quantity: parseInt($("#quantity").val()),
                            price: parseFloat($("#price").val()),
                        };

                        $.post("process.php", formData, function () {
                            loadTableData();
                            $("#productForm")[0].reset();
                        });
                    });
                });
            });
        });
    });

    loadTableData();
});