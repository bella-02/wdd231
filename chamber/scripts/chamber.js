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
