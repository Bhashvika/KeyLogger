// Get references to HTML elements
const logDiv = document.getElementById("log");
const stateDiv = document.getElementById("state");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

// Initialize a string to store all keys pressed
let allKeys = "";

// Add event listener to start logging key presses when the Start button is clicked
startBtn.addEventListener("click", () => {
    document.addEventListener("keydown", handleDown);
    document.addEventListener("keyup", handleUp);
});

// Add event listener to stop logging key presses when the Stop button is clicked
stopBtn.addEventListener("click", () => {
    document.removeEventListener("keydown", handleDown);
    document.removeEventListener("keyup", handleUp);
    logDiv.textContent = ""; // Clear the log display
    stateDiv.textContent = ""; // Clear the state display

    // Log the keys to the server if any keys were pressed
    if (allKeys) {
        logKeys(allKeys);
    }

    allKeys = ""; // Reset the keys string
});

// Function to handle key down events
function handleDown(e) {
    logDiv.textContent = `Key ${e.key} pressed down`; // Display key press in log
    stateDiv.textContent = "Key is down"; // Update state
    allKeys += e.key; // Append the pressed key to the keys string
}

// Function to handle key up events
function handleUp(e) {
    logDiv.textContent = `Key ${e.key} is up`; // Display key release in log
    stateDiv.textContent = "Key is up"; // Update state
}

// Function to log keys to the server
async function logKeys(keys) {
    const response = await fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyLog: keys }) // Send keys as JSON
    });
    
    if (response.ok) {
        console.log('Keys logged successfully'); // Log success message
    } else {
        console.error('Failed to log keys'); // Log error message
    }
}
