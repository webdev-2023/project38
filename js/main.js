/* Requirement Statement: add eventListerns to various elements.
*/

// initial array
const itemArr = ["Sugar", "Corn Flakes", "Milk", "Strawberry"]

// list elements in the <ul> tag 
const groceryList = document.querySelector('#itemList')

//change the CSS styling of the list items to indicate that they have been bought and vice versa
// Add a click event listener to the html element with the ID of itemList.
// If the event’s tag name is a list tag, toggle a checked class on the event element.

groceryList.addEventListener("click", function (e) {
    console.log("e", e);

    if (e.target.tagName == 'LI') {
        if (e.target.className == 'checked') {
            e.target.className = ''
        }
        else {
            e.target.className = 'checked'
        }
    }
})

// Add a key up event listener to the HTML element with an input ID.
// If the event key code is equal to ‘13’ (the key code for the ‘Enter’ key), trigger a click() function on the element with an addButton ID.
const newItem = document.getElementById('input')
newItem.addEventListener("keyup", function (e) {
    if (e.key == 'Enter') {                                     //keyCode is depricated
        document.getElementById('addBtn').click = updateList()
    }
})

// Each created list element should contain a span element with a class named close. 
// Each span element should have a value of ‘\u00D7’, which represents the character ‘x’ in unicode.

const addItem = (item) => {
    let listItem = document.createElement('li')
    listItem.textContent = item
    let spanLi = document.createElement('span')
    spanLi.className = 'close'
    spanLi.innerHTML = '\u00D7'
    listItem.appendChild(spanLi)
    groceryList.appendChild(listItem)
}
// function to display each item in the array as list elements in the <ul> tag. 
// As the last line of this function, call a function to delete an item from the shopping list.

const displayItems = (initArr) => {
    // check if there are existing items in the groceryList
    grList = []
    Array.from(groceryList.children).forEach(grItem => {
        grList.push(grItem.firstChild.data)
    })
    // add only those items that are not already there in the groceryList
    for (item of initArr) {
        if (!(grList.includes(item))) {
            addItem(item)
        }
    }
    deleteItem()
}

// Create a function which will update the grocery items array by getting the value of the text in the <input> tag and adding it to the array.
// If the input text field is empty, display an alert to the user indicating that they should insert an item. Else, add the input text to the array.
// Once the item has been added to the array or the alert displayed, reset the input text’s value to an empty string.
// As the last line of this function, call the function created in the previous task to display the updated array items.

const updateList = () => {
    inputItem = document.getElementById('input').value
    if (inputItem == "") {
        alert("Please enter an item.")
    }
    else {
        Array.from(groceryList.children).forEach(grItem => {
            if (grItem.firstChild.data == inputItem) {                  // user is trying to add previouly deleted item
                grItem.style.display = 'list-item'                      // making the item and its children visible again
                Array.from(grItem.children).forEach(spn => {
                    spn.style.display = 'inline-block'
                })
            }
        })
        itemArr.push(inputItem)                                         // adding the input item to the array
    }
    document.getElementById('input').value = ''                         //empty the input field
    displayItems(itemArr)
}

// Create a function to delete items from both the array and the Shopping List display.
// Add a click event listener to each <span> element with a close class.
// when the event is triggered, delete the item from the array and set the display style to none for the specific list parent element.

const deleteItem = () => {
    let spanList = document.querySelectorAll("span");

    Array.from(spanList).forEach(grItem => {
        if (grItem.className == 'close') {
            grItem.addEventListener("click", function () {                      // Add a click event listener to each <span> element with a close class.
                item = grItem.parentElement.firstChild.data
                // delete from the itemArr array
                let idx = itemArr.indexOf(item)
                itemArr.splice(idx, 1)
                // set the display style to none for the specific list parent element
                grItem.parentElement.style.display = 'none'
            })
        }
    })
}
displayItems(itemArr)

