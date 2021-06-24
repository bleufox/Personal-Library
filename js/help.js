let events
// Declares variable events for use in the storedEvents and saveEvents functions
function savedEvents() {
    liveTime();
    // Calls liveTime function
    events = getFromStorage("storage");
    // events is declared as the function getFromStorage and provides a key for the saveToStorage function.
    if (events === null) {
        // if events is equal to null, create an empty object.
        events = {};
        saveToStorage("storage", events);
        // Calls saveToStorage function which uses the "storage" key and inserts the events as the value to save to local storage.
    }
    // All if statements below take the .hasOwnProperty function which creates a boolean by comparing the specified id against hard code (ex: "hour8"). If the boolean is true, then the user input is added to the events empty object for that hour.
    if (events.hasOwnProperty("hour8")) {
        document.getElementById("hour8").value = events.hour8;
    }
    if (events.hasOwnProperty("hour9")) {
        document.getElementById("hour9").value = events.hour9;
    }
    if (events.hasOwnProperty("hour10")) {
        document.getElementById("hour10").value = events.hour10;
    }
    if (events.hasOwnProperty("hour11")) {
        document.getElementById("hour11").value = events.hour11;
    }
    if (events.hasOwnProperty("hour12")) {
        document.getElementById("hour12").value = events.hour12;
    }
    if (events.hasOwnProperty("hour13")) {
        document.getElementById("hour13").value = events.hour13;
    }
    if (events.hasOwnProperty("hour14")) {
        document.getElementById("hour14").value = events.hour14;
    }
    if (events.hasOwnProperty("hour15")) {
        document.getElementById("hour15").value = events.hour15;
    }
    if (events.hasOwnProperty("hour16")) {
        document.getElementById("hour16").value = events.hour16;
    }
    if (events.hasOwnProperty("hour17")) {
        document.getElementById("hour17").value = events.hour17;
    }
}
function saveEvent(key, userEntry) {
    events[key] = userEntry;
    saveToStorage("storage", events);
}
// saveEvent function takes the key and userEntry parameters and redeclares events variable as the parameters as key = userEntry, then invokes the saveToStorage function which uses the hard code "storage" as the key and the newly declared events variable as the "value".
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function saveToStorage(key, userEntry) {
    localStorage.setItem(key, JSON.stringify(userEntry));
}