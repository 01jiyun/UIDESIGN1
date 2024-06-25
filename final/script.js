


function getRandomHSL() {
            const hue = Math.floor(Math.random() * 255);
            const saturation = Math.floor(Math.random() * 255);
            const lightness = '75';
            return `hsl(${hue}, ${saturation}%, ${lightness}%, 0.8)`;

}


// Function to change the background gradient
function changeGradient() {
    const color1 = `rgba(255, 255, 255, 0.00)`; // Fixed color
    const color2 = getRandomHSL(); // Random HSL color
    const gradientDirection = '0'; // Random direction in degrees
    document.getElementById('sky').style.background = `linear-gradient(${gradientDirection}deg, ${color1}, ${color2})`;



}


 function getTodayDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
}

// Function to display today's date
function displayDate() {
    const dateElement = document.getElementById('date');
    dateElement.textContent = `${getTodayDate()}`;
}


window.onload = function() {
            displayDate();
            changeGradient();

        };

function toggleButtonState() {
    var input = document.getElementById("textInput");
    var category = document.getElementById("categorySelect").value;
    var addButton = document.querySelector(".addButton");
    addButton.disabled = input.value.trim() === ""|| category === "";
}


function saveInput() {
    const inputText = document.getElementById('textInput').value;
    const category = document.getElementById('categorySelect').value;

    if (inputText.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    if (!category) {
        alert("Please select a category.");
        return;
    }

    // Get existing saved inputs for the category from localStorage
    let savedInputs = JSON.parse(localStorage.getItem(category)) || [];

    // Add new input text to the array
    savedInputs.push(inputText);

    // Save the updated array back to localStorage under the category key
    localStorage.setItem(category, JSON.stringify(savedInputs));

    // Update the displayed list of saved inputs
    displaySavedInputs();
 


    // document.getElementById('responseMessage').innerText = "Data saved successfully!";
    

}

function loadInputs() {
    displaySavedInputs();
    //document.getElementById('responseMessage').innerText = "Data loaded successfully!";
}

function displaySavedInputs() {
    // Define categories
    const categories = ['category-1', 'category-2', 'category-3', 'category-4', 'category-5', 'category-6', 'category-7', 'category-8', 'category-9', 'category-10', 'category-11', 'category-12'];

    categories.forEach(category => {
        // Get saved inputs for the category from localStorage
        const savedInputs = JSON.parse(localStorage.getItem(category)) || [];

        // Get the list element for the category
        const savedInputsList = document.getElementById(category);

        // Clear the current list contents
        savedInputsList.innerHTML = "";

        // Add each saved input as a list item with a delete button
        savedInputs.forEach((input, index) => {
            const li = document.createElement('li');
            li.textContent = input;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "X";
            deleteButton.onclick = () => deleteInput(category, index);
            li.appendChild(deleteButton);
            savedInputsList.appendChild(li);
        });
    });


       updateTotalCount();  



        // Clear the input field
    document.getElementById('textInput').value = '';
    document.getElementById('categorySelect').selectedIndex = 0;   
    toggleButtonState();

}




function updateTotalCount() {
    var containers = document.querySelectorAll('.savedInputsList');
    var totalCount = 0;
    containers.forEach(container => {
        totalCount += container.children.length;
    });
    var totalItemsSpan = document.getElementById("goalsCount");
    totalItemsSpan.textContent = totalCount;
}


function deleteInput(category, index) {
    // Get existing saved inputs for the category from localStorage
    let savedInputs = JSON.parse(localStorage.getItem(category)) || [];

    // Remove the item at the given index
    savedInputs.splice(index, 1);

    // Save the updated array back to localStorage
    localStorage.setItem(category, JSON.stringify(savedInputs));

    // Update the displayed list of saved inputs
    displaySavedInputs();

    //document.getElementById('responseMessage').innerText = "Data deleted successfully!";
}

function showPopup() {

    document.querySelector(".popup").style.display = 'block';

    // 배경 딤 처리 추가
    var dimmed = document.createElement('div');
    dimmed.id = 'dimmed';
    dimmed.className = 'dimmed';
    document.body.appendChild(dimmed);
}


function closePopup() {
    document.querySelector(".popup").style.display = 'none';
    var dimmed = document.getElementById('dimmed');
    if (dimmed) {
        document.body.removeChild(dimmed);
    }
}


// Load inputs on page load
document.addEventListener('DOMContentLoaded', loadInputs);