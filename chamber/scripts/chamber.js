//Directory Page, including headers and footers
document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members');
    const gridViewButton = document.getElementById('grid-view-button');
    const listViewButton = document.getElementById('list-view-button');
    const lastModifiedElement = document.getElementById("last-modified");

    async function fetchMembers() {

        const response = await fetch('./data/members.json');
        const members = await response.json();
        displayMembers(members, 'grid');
        spotlightSection(members);

    }

    function displayMembers(members, viewType) {
        membersContainer.innerHTML = '';
        membersContainer.className = viewType;

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <p>${member.name}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            `;

            membersContainer.appendChild(memberCard);
        });
    }



    gridViewButton.addEventListener("click", () => {
        membersContainer.classList.remove('list');
        membersContainer.classList.add('grid');
    });


    listViewButton.addEventListener("click", () => {
        membersContainer.classList.remove('grid');
        membersContainer.classList.add('list');
    });

    fetchMembers();

    lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;
});

document.querySelector(".menu-button").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("active");
});

// Function to calculate the time difference in days
function calculateDaysDifference(lastVisit, currentVisit) {
    const msInADay = 1000 * 60 * 60 * 24;
    return Math.floor((currentVisit - lastVisit) / msInADay);
}


const currentDate = Date.now();


const lastVisit = localStorage.getItem('lastVisit');
const sidebar = document.getElementById('last-visited');

if (!lastVisit) {
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = parseInt(lastVisit, 10);
    const daysDifference = calculateDaysDifference(lastVisitDate, currentDate);

    if (daysDifference === 0) {
        sidebar.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        sidebar.textContent = "You last visited 1 day ago.";
    } else {
        sidebar.textContent = `You last visited ${daysDifference} days ago.`;
    }
}


localStorage.setItem('lastVisit', currentDate.toString());

