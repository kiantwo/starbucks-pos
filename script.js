initComponents();

// Initialize on startup
function initComponents() {
    // Load consumable
    window.addEventListener("load", getConsumable);
    document.getElementById("enter-name").addEventListener("click", submitCustomerName);
    document.getElementById("back-name").addEventListener("click", backToNameInput);
    // Load Consumable Types on windowLoad
    document.getElementById("consumable").addEventListener('change', getConsumableTypes);
    document.getElementById("consumable-type").addEventListener('change', getItems);
    // Close modal onclick of X
    document.getElementsByClassName("close")[0].addEventListener('click',
        function () {
            var modal = document.getElementById("myModal")
            modal.style.display = "none";
        });

    var closeButtons = document.getElementsByClassName('close');

    closeButtons[0].addEventListener('click', function () {
        var modal = document.getElementById("myModal")
        modal.style.display = "none";
    })

    closeButtons[1].addEventListener('click', function () {
        var modal = document.getElementById('cart-modal');
        modal.style.display = "none";
    })

    closeButtons[2].addEventListener('click', function () {
        var modal = document.getElementById('receipt-modal');
        modal.style.display = "none";
    })

    // Close modal onclick of background window
    window.onclick = function (event) {
        var modal = document.getElementById("myModal");
        var cartModal = document.getElementById('cart-modal');
        var receiptModal = document.getElementById('receipt-modal');
        if (event.target == modal) {
            modal.style.display = "none";
        }

        else if (event.target == cartModal) {
            cartModal.style.display = "none";
        }

        else if (event.target == receiptModal) {
            receiptModal.style.display = "none";
        }
    }
    document.getElementById('float').addEventListener('click', showCartModal);
    document.getElementById('checkout').addEventListener('click', startCheckOut);
    document.getElementById('clear').addEventListener('click', clearCart);

}

function getUserSession() {
    // Check if user already has session
    axios.get("order.php", {
        params: {
            "session": true,
        },
    })
        .then(function (response) {
            if (response.data[0] > 0) {
                // Show elements if user has session
                var totalAmt = parseFloat(response.data[1]);
                document.getElementById('total-amt').innerHTML = totalAmt.toFixed(2);
                document.getElementById('float').hidden = false;
                document.getElementById('cart-count').innerHTML = response.data[0];
            }
        })
        .catch((error) => console.log(error));
}

function submitCustomerName() {
    // Get value in customer-name textbox
    var customerName = document.getElementById("customer-name").value;
    var layout = '';

    // Prompt error message if empty
    if (!customerName || /^\s*$/.test(customerName)) {
        document.getElementById("error-message").innerHTML =
            "Please enter your name.";
        return;
    }

    // Check if user has session
    getUserSession();

    // Show order choices
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("customer-choice").hidden = false;
    document.getElementById("name-input").hidden = true;
    document.getElementById('no-cart-error').innerHTML = '';
    document.getElementById('checkout').disabled = false;
    document.getElementById('clear').disabled = false;

    layout += `<table id="name-table" width="500"><tr>
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

    // Header
    itemList.innerHTML = `<tr>
    <td colspan="3"><h2>${consumableType} </h2></td>
    </tr>`

    for (var i in result.data) {
        // Item rows, columns, and data
        var item = [result.data[i][2], result.data[i].image, result.data[i][3], result.data[i][4], result.data[i].calories];
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
    var consumableType = document.getElementById("consumable").value;
    var modal = document.getElementById("myModal");
    // Store activeElement data to pass
    var item = {
        'id': activeButton.id,
        'type': activeButtonName[0],
        'image': activeButtonName[1],
        'name': activeButtonName[2],
        'desc': activeButtonName[3],
        'calories': activeButtonName[4]
    };

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
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var button = document.createElement('button');

    modalTable.innerHTML = `<tr>
    <td> <h3> Order </h3> </td>
    </tr>
    <tr>
    <td colspan="3"> <h2>${item.name}</h2> ${calories} </td>
    </tr>
    <td> <img src="${item.image}" width="200" height="200"> </td>
    `;

    if (consumableType == '100') {
        // Details if Consumable is Beverage
        modalTable.innerHTML += `
        <td width="650px">
        ${item.desc}
        <h3>Choose beverage size: </h3>
        <div id="confirm-error"></div>
        </td>
        `;
        for (var i in result.data) {
            var size = getSize(result.data[i].bevSizeID);
            modalTable.innerHTML += `<td>
            <label for="${result.data[i].bevMenuID}">${size}: ₱${result.data[i].price}</label>
            <input type="radio" id="${result.data[i].bevMenuID}" name="size" value="${result.data[i].bevMenuID}">
            </td>
            `
        }
    }

    else {
        // Details if Consumable is Food
        modalTable.innerHTML += `<td width="650px">${item.desc}</td>
        <tr>
        <td>Price: <b>₱${result.data[0].price}<b></td>
        </tr>
        `;
    }

    button.id = 'confirm';
    button.innerHTML = 'Confirm';
    button.addEventListener('click', function () {
        // Confirm order
        var radio = document.querySelector('input[name="size"]:checked');
        var id = radio != null ? radio.value : 0;   // Check if radio button exists
        var index = radio != null ? result.data.map(e => e[0]).indexOf(id) : id  // Get index of chosen item
        var modal = document.getElementById("myModal");

        if (radio != null || consumableType == '101') {
            // Close modal and add chosen item to cart
            modal.style.display = "none";
            addToCart(item, result.data[index]);
        }

        else {
            // No radio button picked
            document.getElementById('confirm-error').innerHTML = 'Please choose a beverage size.';
        }
    });

    // Append to itemDetails table
    td.appendChild(button);
    tr.appendChild(td);
    modalTable.appendChild(tr);
}

function addToCart(item, itemMenu) {
    var float = document.getElementById('float');
    var consumableType = document.getElementById("consumable").value;
    float.hidden = float.hidden == true ? false : false;
    document.getElementById('no-cart-error').innerHTML = '';

    // Store item details and itemMenu ID
    var itemDetails = {
        'id': itemMenu[0],
        'type': item.type,
        'name': item.name,
        'image': item.image,
        'price': itemMenu.price,
        'qty': 1
    }

    if (consumableType == '100') {
        // Assign size if consumable type beverage
        itemDetails.size = itemMenu.bevSizeID;
    }

    // Add Item to Session Cart
    axios.post("order.php", {
        "add": true,
        "item": itemDetails,
    })
        .then(function (response) {
            document.getElementById('cart-count').innerHTML = response.data[0];   // Number of items in cart
            document.getElementById('total-amt').innerHTML = response.data[1].toFixed(2);   // Sum of all item prices
        })
        .catch((error) => console.log(error));
}

function showCartModal() {
    // Open Cart Modal
    var modal = document.getElementById("cart-modal");
    modal.style.display = "block";

    // Get Session Cart data
    axios.get("order.php", {
        params: {
            "cart": true,
        },
    })
        .then((response) => showCartItems(response))
        .catch((error) => console.log(error));
}

function showCartItems(response) {
    // Display Session Cart data
    var result = response;
    var modalTable = document.getElementById('cart-details')
    var subTotal = 0;

    // Modal header
    modalTable.innerHTML = `<tr>
    <td colspan="4"> <h3> Cart </h3> </td>
    </tr>
    `;

    for (var i in result.data) {
        // Item rows, columns, and data
        var size = result.data[i].hasOwnProperty('size') ? getSize(result.data[i].size) : '';
        // Compute for Sub Total
        subTotal += parseFloat(result.data[i].price);
        modalTable.innerHTML += `
        <tr id="cart-item">

        <td>
        <button id="minus" onClick="addMinusQuanitity()" name="${i}">-</button> 
            <label for="qty">${result.data[i].qty}</label>
            <button id="plus" onClick="addMinusQuanitity()" name="${i}">+</button> 
            
    
        </td>
        <td width="20%"> <img src="${result.data[i].image}" width="100" height="100"> </td>
        <td> <h3> ${result.data[i].name} </h3> <p> ${size} </p> Price: ₱${result.data[i].price.toFixed(2)} </td>
        <td> <a href="javascript:void(0)" id="delete-item" name="${i}" onclick="removeFromCart()"> Remove from cart </a>
        </tr>
        `
    }

    // Modal footer
    modalTable.innerHTML += `<tr>
    <td colspan="4"> <hr> </td>
    </tr>
    <tr>
    <td colspan="4"><b>Sub Total: </b> ₱${subTotal.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="4"><button id="checkout" onclick="startCheckOut()">Check Out</button> <button id="clear" onclick="clearCart()">Clear Cart</button></td>
    </tr>
    `
}

function addMinusQuanitity() {
    // Remove item from Session Cart
    var index = this.document.activeElement.name;
    var method = this.document.activeElement.id;

    // Get index of item in Session Cart
    axios.all([
        axios.post("order.php", { "method": method, "index": index }),
        axios.get("order.php", { params: { "cart": true } })
    ]).then(function (response) {
        // Result of Post Request
        console.log(response);
        console.log('testing');
    }).catch((error) => console.log(error));
}

function removeFromCart() {
    // Remove item from Session Cart
    var index = this.document.activeElement.name;   // Get index of item in Session Cart

    // Simultaneous post (to delete) and get request (get updated Session cart data)
    axios.all([
        axios.post("order.php", { "remove": true, "index": index }),
        axios.get("order.php", { params: { "cart": true } })
    ]).then(function (response) {
        var removeResult = response[0];     // Result of Post Request
        var getResult = response[1];        // Result of Get Request

        if (removeResult.data[0] == 0) {
            // Reset to defaults and elements if cart is empty
            document.getElementById('float').hidden = true;
            document.getElementById('cart-modal').style.display = "none";
        }
        // Update count of items in Session Cart
        document.getElementById('cart-count').innerHTML = removeResult.data[0];
        // Display new Total Amount
        document.getElementById('total-amt').innerHTML = removeResult.data[1].toFixed(2);
        showCartItems(getResult);
    }).catch((error) => console.log(error));
}

function startCheckOut() {
    // Store to orderheader table
    var customerName = document.getElementById('customer-name').value;
    var todayDate = new Date().toISOString().slice(0, 10);
    var cartLength = parseInt(document.getElementById('cart-count').innerHTML);

    if (cartLength > 0) {
        // Start checkout if user has items in cart
        document.getElementById('no-cart-error').innerHTML = '';
        axios.post("dbquery.php", {
            "start-checkout": true,
            "name": customerName,
            "date": todayDate,
        }).then((response) => checkOut(response))   // Response returns orderID primary key
            .catch((error) => console.log(error));
    }

    else {
        // Display error if user has no items in cart
        document.getElementById('no-cart-error').innerHTML = 'Please pick items to order.';
    }
}

function checkOut(response) {
    var result = response;
    // Store orderID and user name in order-header table
    axios.post("dbquery.php", {
        "checkout": true,
        "id": result.data
    }).then(function (response) {
        getReceipt(result.data);
        clearCart();
    })
        .catch((error) => console.log(error));
}

function clearCart() {
    // Clear all items in Session Cart
    var float = document.getElementById('float');
    var cartModal = document.getElementById('cart-modal');
    var totalAmt = document.getElementById('total-amt');
    var cartLength = document.getElementById('cart-count');

    // Reset elements to default
    totalAmt.innerHTML = parseFloat(0).toFixed(2);
    float.hidden = float.hidden == false ? true : true;
    cartModal.style.display = "none";
    cartLength.innerHTML = null;

    axios.post("order.php", {
        "clear": true,
    })
        .then(console.log('Cleared cart'))
        .catch((error) => console.log(error));
}

function getReceipt(orderID) {
    var id = orderID;
    // Get order of user from order-detail table
    axios.get("dbquery.php", {
        params: {
            "order": true,
            "id": id
        }
    }).then((response) => showReceipt(response))
        .catch((error) => console.log(error));
}

function showReceipt(response) {
    // Show Receipt Modal
    var result = response;
    var receiptModal = document.getElementById('receipt-modal');
    var customerName = document.getElementById("name-field").innerHTML;
    var modalTable = document.getElementById('customer-cart');
    var totalAmt = 0;

    // Modal Header
    receiptModal.style.display = "block";
    modalTable.innerHTML = `<tr>
    <td colspan="3"><h3>Receipt</h3></td>
    </tr>
    <tr>
    <td colspan="3"><h3>Thank you for your purchase!</h3></td>
    </tr>
    <tr>
    <td colspan="3"><hr></td>
    </tr>
    <tr>
    <td>${customerName}</td>
    </tr>
    <tr>
    <td><b>Qty</b></td>
    <td><b>Item</b></td>
    <td><b>Amount</b></td>
    </tr>
    `;

    for (var i in result.data) {
        // Item rows, columns, and data
        var size = result.data[i].hasOwnProperty('size') ? getSize(result.data[i].size) : '';
        // Compute for Total
        totalAmt += parseFloat(result.data[i].price);
        modalTable.innerHTML += `<tr id="order-item">
        <td>${result.data[i].qty}</td>
        <td>${result.data[i].name} ${size} </td>
        <td>₱${result.data[i].price}</td>
        </tr>
        `
    }

    // Modal footer
    modalTable.innerHTML += `<tr>
    <td colspan="3"> <hr> </td>
    </tr>
    <tr>
    <td colspan="3"><b>Total Paid: </b> ₱${totalAmt.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="3"><button id="end" onclick="completeOrder()">Continue</button></td>
    </tr>
    `
}

function completeOrder() {
    // Complete order
    var receiptModal = document.getElementById('receipt-modal');
    // Close receipt modal
    receiptModal.style.display = "none";
    document.getElementById("customer-name").value = '';
    // Reset values
    backToNameInput();
}

function getSize(sizeID) {
    // Return equivalent sizeName of beverageSizeID
    switch (sizeID) {
        case '130': return 'Tall';
        case '131': return 'Grande';
        case '132': return 'Venti';
    }
    return null;
}

function backToNameInput() {
    // Show order choices
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("customer-choice").hidden = true;
    document.getElementById("name-input").hidden = false;
    document.getElementById("name-field").innerHTML = '';
    document.getElementById("item-list").innerHTML = '';
    document.getElementById('float').hidden = true;
    document.getElementById('consumable').value = 'starter';
    document.getElementById('consumable-type').value = 'starter';
    document.getElementById('consumable-type').hidden = true;
    document.getElementById('checkout').disabled = true;
    document.getElementById('clear').disabled = true;
    document.getElementById('total-amt').innerHTML = parseFloat(0).toFixed(2);
}