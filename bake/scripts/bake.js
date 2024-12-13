import { fetchRecipes, displayRecipes, displayRecipeDetails, saveLastViewedRecipe, displayLastViewedRecipes } from './recipe-module.js';

document.addEventListener('DOMContentLoaded', async () => {
    const isIndexPage = window.location.pathname.includes('index.html');
    const isBrowsePage = window.location.pathname.includes('browse.html');
    const isRecipePage = window.location.pathname.includes('recipe.html');
    const isSearchResultsPage = window.location.pathname.includes('search-results.html');
    const isThanksPage = window.location.pathname.includes('thanks.html');
    const isRequestPage = window.location.pathname.includes('request.html');

    let recipes = [];

    // Fetch the recipes data
    recipes = await fetchRecipes();

    // Display recipes based on the current page
    if (isIndexPage) {
        displayRecipes(recipes, '', 'homepage-recipes', 4);

        //request button
        const requestButton = document.getElementById('request-button');
        if(requestButton) {
            requestButton.addEventListener('click', () => {
                window.location.href = 'request.html';
            });
        }
    }
    if (isBrowsePage) {

        displayLastViewedRecipes(recipes);
        //last viewed
        /*const recipeList = document.getElementById('recipe-list');
        if(recipeList) {
            const lastViewedContainer = document.createElement('div');
            lastViewedContainer.id = 'last-viewed-recipes';
            recipeList.parentNode.insertBefore(lastViewedContainer, recipeList);
            
            displayLastViewedRecipes(recipes);
        }*/
    
        //search
        document.getElementById('search-bar').addEventListener('input', () => {
            const searchQuery = document.getElementById('search-bar').value.toLowerCase();
            displayRecipes(recipes, searchQuery, 'recipe-list');
        });
        document.getElementById('search-button').addEventListener('click', () => {
            const searchQuery = document.getElementById('search-bar').value.toLowerCase();
            displayRecipes(recipes, searchQuery, 'recipe-list');
        });

        //display all
        displayRecipes(recipes, '', 'recipe-list');
    }
    if (isSearchResultsPage) {
        const searchQuery = new URLSearchParams(window.location.search).get('query').toLowerCase();
        displayRecipes(recipes, searchQuery, 'search-results');
    }
    if (isRecipePage) {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');
        const recipe = recipes.find(r => r.id == recipeId);

        if (recipe) {
            saveLastViewedRecipe(recipeId);
            displayRecipeDetails(recipe);

            document.querySelectorAll('#recipe-container img').forEach(img => { 
                img.addEventListener('click', () => openImageModal(recipe.image, recipe.description)); 
            });
        } else {
            document.body.innerHTML = '<p>Recipe not found.</p>';
        }

        // Function to open the image modal 
        function openImageModal(imageSrc, description) {
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-image');
            const modalDescription = document.getElementById('modal-description');
            modal.style.display = 'block';
            modalImg.src = imageSrc;
            modalDescription.textContent = description;
        }

        // Function to close the image modal 
        const closeModal = () => {
            const modal = document.getElementById('image-modal');
            modal.style.display = 'none';
        };

        // Add event listeners to close modal 
        const closeBtn = document.querySelector('.close');
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('image-modal');
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    function handleSearch() { 
        const searchQuery = document.getElementById('search-bar').value.toLowerCase(); 
        window.location.href = `search-results.html?query=${encodeURIComponent(searchQuery)}`; 
    } 
    
    // Add event listeners for search functionality 
    if (document.getElementById('search-bar') && document.getElementById('search-button')) { 
        document.getElementById('search-button').addEventListener('click', handleSearch); 
    } 

    // Toggle nav menu for smaller screens
    document.querySelector(".menu-button").addEventListener("click", () => {
        document.querySelector("nav").classList.toggle("active");
    });

    if (isRequestPage) { 
        const timestampInput = document.getElementById('timestamp'); 
        if (timestampInput) { 
            timestampInput.value = new Date().toISOString(); 
        } 
    } 
    
    // Display submitted information on thankyou.html page using innerHTML 
    if (isThanksPage) { 
        const urlParams = new URLSearchParams(window.location.search); 
        const firstName = urlParams.get('first_name'); 
        const lastName = urlParams.get('last_name'); 
        const requestedRecipe = urlParams.get('requested-recipe'); 
        const recipeDetails = urlParams.get('recipe-details'); 
        const email = urlParams.get('email'); 
        const emailSubscription = urlParams.get('email-subscription'); 
        const timestamp = urlParams.get('timestamp'); 
        
        document.getElementById('thanks-main').innerHTML = ` 
            <h1>Thank You for Your Request!</h1> 
            <h2>I will review it as soon as possible</h2>
            <p>Here are the details you submitted:</p> 
            <ul> 
                <li><strong>First Name:</strong> ${firstName}</li> 
                <li><strong>Last Name:</strong> ${lastName}</li> 
                <li><strong>Requested Recipe:</strong> ${requestedRecipe}</li> 
                <li><strong>Additional Details:</strong> ${recipeDetails}</li> 
                <li><strong>Email:</strong> ${email}</li> 
                <li><strong>Subscribed to Promotional Emails:</strong> ${emailSubscription}</li> 
                <li><strong>Timestamp:</strong> ${timestamp}</li> 
            </ul> 
        `; 
    }
});
