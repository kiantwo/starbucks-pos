initComponents();

// Initialize on startup
function initComponents() {
    window.addEventListener("load", getConsumable);
    document
        .getElementById("enter-name")
        .addEventListener("click", submitCustomerName);
    document.getElementById("back-name").addEventListener("click", backToNameInput);
    // Load Consumable Types on windowLoad
    document.getElementById("consumable").addEventListener('change', getConsumableTypes);
    document.getElementById("consumable-type").addEventListener('change', getItems);
    document.getElementsByClassName("close")[0].addEventListener('click',
        function () {
            var modal = document.getElementById("myModal")
            modal.style.display = "none";
        });
    window.onclick = function (event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function submitCustomerName() {
    // Get value in customer-name textbox
    var customerName = document.getElementById("customer-name").value;
    var layout = '';

    // Prompt error message if empty
    if (customerName == "") {
        document.getElementById("error-message").innerHTML =
            "Please enter your name.";
        return;
    }

    // Show order choices
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("customer-choice").hidden = false;
    // document.getElementById("customer-cart").hidden = false;
    document.getElementById("name-input").hidden = true;

    layout += `<table id="name-table" width="500"><tr>
    <td>Customer ID: 2019010822</td>
    <td>Customer Name: ` + customerName + `</td>
    </tr></table>
    `;

    document.getElementById("name-field").innerHTML = layout;
}

function getConsumable() {
    // Get Consumable (Food / Beverage)
    axios.get("dbquery.php", {
        params: {
            "consumables": true,
        },
    })
        .then((response) => showConsumables(response))
        .catch((error) => console.log(error));
}

function showConsumables(response) {
    // Show Consumable (Food / Beverage)
    var result = response;
    for (i in result.data) {
        var option = document.createElement("option");
        option.value = result.data[i].consumableID;
        option.text = result.data[i].consumableName;
        var select = document.getElementById("consumable");
        select.appendChild(option);
    }
}

function getConsumableTypes() {
    var consumableType = document.getElementById("consumable").value;
    var consumableTypeDropdown = document.getElementById("consumable-type");

    document.getElementById("item-list").innerHTML = '';

    if (consumableType == 'starter') {
        // Reset values to blank
        consumableTypeDropdown.hidden = true;
        consumableTypeDropdown.disabled = true;
        return;
    }

    consumableTypeDropdown.hidden = false;
    consumableTypeDropdown.disabled = false;

    // Get Subtypes of Consumable
    axios.get("dbquery.php", {
        params: {
            "consumable-type": consumableType,
        },
    })
        .then((response) => showConsumableTypes(response, consumableType))
        .catch((error) => console.log(error));
}

function showConsumableTypes(response, consumableType) {
    // Show Consumable SubTypes
    var result = response;
    var type = consumableType == '100' ? 'beverage' : 'food';
    layout = `
    <option value="starter" selected>-- Select a ${type} --</option>
    `;
    for (i in result.data) {
        layout +=
            "<option value=" +
            result.data[i][0] +
            ">" +
            result.data[i][1] +
            "</option>";
    }

    document.getElementById("consumable-type").innerHTML = layout;
}

function getItems() {
    var consumableType = document.getElementById("consumable").value;
    var itemType = document.getElementById("consumable-type").value;

    console.log(consumableType);

    if (itemType == 'starter') {
        document.getElementById("item-list").innerHTML = '';
        return;
    }

    // Get Item List of Consumable
    axios.get("dbquery.php", {
        params: {
            "items": [itemType, consumableType],
        },
    })
        .then((response) => showItems(response))
        .catch((error) => console.log(error));
}

function showItems(response) {
    // Show Item List
    var result = response;
    var itemList = document.getElementById("item-list");
    var consumableTypeDropdown = document.getElementById("consumable-type");
    var consumableType = consumableTypeDropdown.options[consumableTypeDropdown.selectedIndex].text;

    itemList.innerHTML = `<tr>
    <td colspan="3"><h2>${consumableType} </h2></td>
    </tr>`

    for (var i in result.data) {
        var item = [result.data[i].image, result.data[i][3], result.data[i][4], result.data[i].calories];
        var calories = result.data[i].calories ? `${result.data[i].calories} Calories` : '';
        itemList.innerHTML += `<tr>
        <td width="40%"> <img src="${result.data[i].image}" width="150" height="150"> </td>  
        <td width="25%"> <h3> ${result.data[i][3]} </h3> ${calories} </td>
        <td> <button id="${result.data[i][0]}" name="${item}" onclick="showModal()">Add to Cart</button> </td>
        </tr>
        `
    }
}

function showModal() {
    // Open Order Modal
    var activeButton = this.document.activeElement;
    var activeButtonName = activeButton.name.split(',');
    var item = {
        'id': activeButton.id,
        'image': activeButtonName[0],
        'name': activeButtonName[1],
        'desc': activeButtonName[2],
        'calories': activeButtonName[3]
    };
    var consumableType = document.getElementById("consumable").value;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    axios.get("dbquery.php", {
        params: {
            "item-specific": [item['id'], consumableType],
        },
    })
        .then((response) => showItemDetails(response, item))
        .catch((error) => console.log(error));
}

function showItemDetails(response, item) {
    // Show Item Details in Modal
    var modalTable = document.getElementById('item-details');
    var consumableType = document.getElementById("consumable").value;
    var result = response;
    var calories = item.calories ? `${item.calories} Calories` : '';

    console.log(result);

    modalTable.innerHTML = `<tr>
    <td> <h3> Order </h3> </td>
    </tr>
    <tr>
    <td colspan="3"> <h2>${item.name}</h2> ${calories} </td>
    </tr>
    <td> <img src="${item.image}" width="200" height="200"> </td>
    `;

    if (consumableType == '100') {
        modalTable.innerHTML += `
        <td>
        ${item.desc}
        <h3>Choose beverage size: </h3>
        </td>
        `;
        for (var i in result.data) {
            var size = '';
            if (result.data[i].bevSizeID == '130') {
                size = 'Tall';
            }
            else if (result.data[i].bevSizeID == '131') {
                size = 'Grande';
            }
            else {
                size = 'Venti';
            }
            modalTable.innerHTML += `<td>
            <label for="${result.data[i].bevMenuID}">${size}: ₱${result.data[i].price}</label>
            <input type="radio" id="${result.data[i].bevMenuID}" name="size" value="${result.data[i].bevMenuID}">
            </td>
            `
        }
    }

    else {
        modalTable.innerHTML += `<td>${item.desc}</td>
        <tr>
        <td>Price: <b>₱${result.data[0].price}<b></td>
        </tr>
        `;
    }
    modalTable.innerHTML += `<tr>
    <td> <button id="confirm" onclick="confirmAddToCart()">Confirm</button> </td>
    </tr>
    `
}

function confirmAddToCart() {

}

function backToNameInput() {
    // Show order choices
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("customer-choice").hidden = true;
    document.getElementById("name-input").hidden = false;
    document.getElementById("name-field").innerHTML = '';
    document.getElementById("item-list").innerHTML = '';
    // document.getElementById("customer-cart").hidden = true;
}