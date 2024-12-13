export async function fetchRecipes() {
    try {
        const response = await fetch('data/recipes.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

export function displayRecipes(recipes, searchQuery, containerId, limit = null) {
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery) ||
        recipe.description.toLowerCase().includes(searchQuery)
    );

    const displayedRecipes = limit ? filteredRecipes.slice(0, limit) : filteredRecipes;

    const container = document.getElementById(containerId);
    container.innerHTML = displayedRecipes.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
            <a class="recipe-link" href="recipe.html?id=${recipe.id}">${recipe.name}</a>
            <p>${recipe.description}</p>
        </div>
    `).join('');
}

export function displayRecipeDetails(recipe) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = `
        <div id="recipe">
            <h1 id="recipe-title">${recipe.name}</h1>
            <div id="recipe-img-box">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <h2>Ingredients</h2>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <h2>Instructions</h2>
            <ol>${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ol>
        </div>
    `;
}


   

// Save last viewed recipe to localStorage
export function saveLastViewedRecipe(recipeId) {
let lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
lastViewed = lastViewed.filter(id => id !== recipeId); // Remove duplicates
lastViewed.unshift(recipeId); // Add to the beginning
if (lastViewed.length > 5) lastViewed.pop(); // Keep only the last 5 viewed recipes
localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));
}

// Display last viewed recipes
export function displayLastViewedRecipes(recipes) {
    const lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
    const lastViewedRecipes = lastViewed.map(id => recipes.find(r => r.id == id)).filter(r => r);
    const container = document.getElementById('last-viewed');
    if (container) {
        container.innerHTML = `
            ${lastViewedRecipes.map(recipe => `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
                    <a class="recipe-link" href="recipe.html?id=${recipe.id}">${recipe.name}</a>
                    <p>${recipe.description}</p>
                </div>
            `).join('')}
        `;
    }  
} 


