const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        // Create the 'x' button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // This code creates the 'x' symbol
        li.appendChild(span);
    }
    inputBox.value = ""; // Clear the input box after adding
}

// Event listener for clicking on list items
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);

// Optional: Allow pressing "Enter" key to add a task
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});