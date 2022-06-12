initComponents();

// Initialize on startup
function initComponents() {
    document
        .getElementById("enter-name")
        .addEventListener("click", submitCustomerName);
    document.getElementById("back-name").addEventListener("click", backToNameInput);
    // Load Consumable Types on windowLoad
    document.getElementById("consumable").addEventListener('change', getConsumable);
    document.getElementById("beverage").addEventListener('change', getConsumable);
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
    var consumableType = document.getElementById("consumable").value;
    var beverage = document.getElementById("beverage").value;
    var beverageDropdown = document.getElementById("beverage");
    // var beverageItems = document.getElementById("beverageItems").value;
    var beverageTeaDropdown = document.getElementById("TeaItems");
    var beverageCoffeeDropdown = document.getElementById("CoffeeItems");
    var beverageFrappeDropdown = document.getElementById("FrappeItems");
    var foodItemsDropdown = document.getElementById("foodItems");
    var foodDropdown = document.getElementById("food");
    var qtyField = document.getElementById("qty-field");

    if (consumableType == 'starter') {
        // Reset values to blank
        showDropdown('', foodDropdown);
        showDropdown('', beverageDropdown);
        
        qtyField.hidden = true;
        return;
    } 

    else if (consumableType == 'type-beverage') {
        
        // Enable beverage dropdown
        showDropdown(beverageDropdown, foodDropdown);

        //optional since images are to be showned as planned.
            if(beverage == 'starter'){
                showDropdown('', beverageTeaDropdown);
                showDropdown('', beverageCoffeeDropdown);
                showDropdown('', beverageFrappeDropdown);
            }
            else if(beverage == 'Tea'){
                showDropdown(beverageTeaDropdown, beverageCoffeeDropdown || beverageFrappeDropdown);
                
            }
            else if(beverage == 'Coffee'){
                // showDropdown('', beverageTeaDropdown);
                showDropdown(beverageCoffeeDropdown, beverageFrappeDropdown || beverageTeaDropdown);
                
            }
            else if(beverage == 'Frappe'){
                
                showDropdown(beverageFrappeDropdown, beverageTeaDropdown || beverageCoffeeDropdown);
                
            }
    }

    else if (consumableType == 'type-food') {
        // Enable food dropdown
        showDropdown(foodDropdown, beverageDropdown);
    }



    
    

    qtyField.hidden = false;

    // TODO: Axios request to SQL
}

function backToNameInput() {
    // Show order choices
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("customer-choice").hidden = true;
    document.getElementById("name-input").hidden = false;
    document.getElementById("name-field").innerHTML = '';
    // document.getElementById("customer-cart").hidden = true;
}

function showDropdown(enableDropdown, disableDropdown) {
    enableDropdown.hidden = false;
    enableDropdown.disabled = false;

    disableDropdown.hidden = true;
    disableDropdown.disabled = true;
}