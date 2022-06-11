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

    layout += `<table width="500"><tr>
    <td>Customer ID: 2019010822</td>
    <td>Customer Name: ` + customerName + `</td>
    </tr></table>
    `;

    document.getElementById("name-field").innerHTML = layout;
}

function getConsumable() {
    axios.get("dbquery.php", {
        params: {
            "consumables": true,
        },
    })
        .then((response) => showConsumables(response))
        .catch((error) => console.log(error));
}

function showConsumables(response) {
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
    var qtyField = document.getElementById("qty-field");

    if (consumableType == 'starter') {
        // Reset values to blank
        consumableTypeDropdown.hidden = true;
        consumableTypeDropdown.disabled = true;
        qtyField.hidden = true;
        return;
    }

    consumableTypeDropdown.hidden = false;
    consumableTypeDropdown.disabled = false;
    qtyField.hidden = false;

    axios.get("dbquery.php", {
        params: {
            "consumable-type": consumableType,
        },
    })
        .then((response) => showConsumableTypes(response, consumableType))
        .catch((error) => console.log(error));
}

function showConsumableTypes(response, consumableType) {
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
    
    if (itemType == 'starter') {
        document.getElementById("item-list").innerHTML = '';
        return;
    }

    axios.get("dbquery.php", {
        params: {
            "items": [itemType, consumableType],
        },
    })
        .then((response) => showItems(response))
        .catch((error) => console.log(error));
}

function showItems(response) {
    var result = response;
    var itemList = document.getElementById("item-list");
    var layout = '';

    console.log(result);

    for (i in result.data) {
        layout += result.data[i][3] + result.data[i].calories + "Calories" + "<img src=\"" + result.data[i].image + "\" width=\"50\" height=\"50\">" + "<br>";
    }

    itemList.innerHTML = layout;
}

function backToNameInput() {
    // Show order choices
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("customer-choice").hidden = true;
    document.getElementById("name-input").hidden = false;
    document.getElementById("name-field").innerHTML = '';
    // document.getElementById("customer-cart").hidden = true;
}