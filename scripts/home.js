import { courses } from "./courses.js";

//Menu Button
document.querySelector(".menuButton").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("active");
});


// DOM elements
const certificateSection = document.querySelector('.certificateSection');
const currentYearElement = document.getElementById("currentYear");
const lastModifiedElement = document.getElementById("lastModified");
const courseDetails = document.querySelector("#course-details");
const divElem = document.querySelector(".title");
const htmlElem = document.querySelector(":root");


// Current year and last update
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;
lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;

//Courses

function displayCourses(filter = 'All') {
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = '';

    // Filter courses based on subject or show all
    const filteredCourses = courses.filter(course => filter === "All" || course.subject === filter);

    //Display each filtered course
    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'courseCard';

        // Mark completed courses
        if (course.completed) {
            courseElement.style.backgroundColor = "#BBBEDD";
            courseElement.style.color = "black";
        } else {
            courseElement.style.backgroundColor = "#f0f0f0";
            courseElement.style.color = "#333";
        }

        courseElement.innerHTML = `
            <h5>${course.subject} ${course.number}<h5>
        `;

        courseElement.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(courseElement);

        
        
    });

    

    // Calculate total credits for the displayed
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    const creditsElement = document.createElement('p');
    creditsElement.textContent = `Total Credits: ${totalCredits}`;
    courseContainer.appendChild(creditsElement);



}

// Event listeners
document.getElementById('showAll').addEventListener("click", () => displayCourses("All"));
document.getElementById('showCSE').addEventListener("click", () => displayCourses("CSE"));
document.getElementById('showWDD').addEventListener("click", () => displayCourses("WDD"));
htmlElem.addEventListener("click", showHide);
document.addEventListener("keydown", showHide);

function showHide() {
    if (divElem.classList[0] === "fade-in") {
        divElem.classList.remove("fade-in");
        divElem.classList.add("fade-out");
    } else {
        divElem.classList.remove("fade-out");
        divElem.classList.add("fade-in");
    }
}

// Initial display of all courses
displayCourses();


function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
    courseDetails.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
    });

}





