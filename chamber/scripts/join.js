

document.addEventListener("DOMContentLoaded", () => {
   
    const dialogTriggers = document.querySelectorAll("[data-dialog]");
    dialogTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const dialogId = trigger.getAttribute("data-dialog");
            const dialog = document.getElementById(dialogId);
            if (dialog) dialog.showModal();
        });
    });

    
    const closeButtons = document.querySelectorAll("[data-close]");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");
            if (dialog) dialog.close();
        });
    });

    // Close dialog when clicking outside the modal content
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach(dialog => {
        dialog.addEventListener("click", event => {
            if (event.target === dialog) dialog.close();
        });
    });

    //Constants
    const lastModifiedElement = document.getElementById("last-modified");
    lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;

    document.querySelector(".menu-button").addEventListener("click", () => {
        document.querySelector("nav").classList.toggle("active");
    });

    const currentDate = new Date();

    // Format the date and time to a string (e.g., YYYY-MM-DDTHH:mm:ss)
    const timestamp = currentDate.toISOString();

    // Set the timestamp value in the hidden input
    document.getElementById("timestamp").value = timestamp;

});

// Extract the query string from the URL
const currentUrl = window.location.href;

// Split the URL to isolate query parameters
const everything = currentUrl.split('?');

// Safeguard against URLs with no query parameters
if (everything.length > 1) {
    let formData = everything[1].split('&');
    // Function to get the value for a specific key
    function show(key) {
        let result = '';
        formData.forEach((element) => {
            if (element.startsWith(key)) {
                result = decodeURIComponent(element.split('=')[1]).replace(/\+/g,' ');
            }
        });
        return result || 'N/A'; // Default to 'N/A' if the key is missing
    }


    // Insert extracted data into the DOM
    const showInfo = document.querySelector('#results');
    showInfo.innerHTML = `
    <div id="thank-you">
        <p id="thank-you-statement">Thank you ${show('first_name')} ${show('last_name')} for joining the Rexburg Chamber of Commerce!</p>
        <h3>Submission Details:</h3>
        <p><strong>Email:</strong> ${show('email')}</p>
        <p><strong>Mobile:</strong> ${show('mobile')}</p>
        <p><strong>Organization Name:</strong> ${show('organization_name')}</p>
        <p><strong>Submitted at</strong>: ${show('timestamp')}</p>
    </div>
    `;
} else {
    // Handle cases where there are no query parameters
    const showInfo = document.querySelector('#results');
    showInfo.innerHTML = `<p>No submission data found.</p>`;
};

