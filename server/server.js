const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define a list of common ingredients (to be ignored during matching)
const commonIngredients = [
  "water", "salt", "pepper", "oil", "butter", "sugar", "flour", "milk", "egg", "garlic", "onion"
];

// Helper function to extract ingredient name (ignoring quantity/unit)
const extractIngredientName = (ingredient) => {
  // Remove quantity and units (basic approach: remove numbers and common measurement units)
  return ingredient.replace(/\d+(\.\d+)?\s*(c|tbsp|tsp|oz|cup|g|kg|ml|liter|cup|lb|tbsp|fl\.oz|\/)?[\s\w]+/g, '').trim().toLowerCase();
};

// Helper function to filter out common ingredients from a list of ingredients
const filterCommonIngredients = (ingredients) => {
  return ingredients.filter(ingredient => !commonIngredients.includes(extractIngredientName(ingredient)));
};

// API to get filtered recipes based on ingredients
app.post('/api/recipes', (req, res) => {
  const selectedIngredients = req.body.ingredients.map((ingredient) => ingredient.toLowerCase());

  // Filter out common ingredients from selected ingredients
  const filteredSelectedIngredients = filterCommonIngredients(selectedIngredients);

  let filteredRecipes = [];

  // Read and process CSV data on the fly to filter recipes based on selected ingredients
  fs.createReadStream('./recipes.csv')
    .pipe(csv())
    .on('data', (row) => {
      // Parse the ingredients from the CSV row
      const recipeIngredients = JSON.parse(row.ingredients).map(extractIngredientName); // Extract ingredient names

      // Filter out common ingredients from recipe ingredients
      const filteredRecipeIngredients = filterCommonIngredients(recipeIngredients);

      // Check if selected ingredients exactly match the recipe's ingredients
      const isExactMatch = filteredSelectedIngredients.every((ingredient) =>
        filteredRecipeIngredients.includes(ingredient) // Check for exact match (ignoring quantities and units)
      );

      // If the recipe is an exact match, add it to the filteredRecipes array
      if (isExactMatch && filteredSelectedIngredients.length === filteredRecipeIngredients.length) {
        filteredRecipes.push({
          title: row.title,
          ingredients: filteredRecipeIngredients,
          directions: JSON.parse(row.directions), // Convert directions string to an array
          link: row.link,
          source: row.source,
          NER: JSON.parse(row.NER), // Convert NER string to an array
          site: row.site,
        });
      }
    })
    .on('end', () => {
      // Send the filtered recipes back to the client
      res.json(filteredRecipes);
    })
    .on('error', (err) => {
      console.error('Error processing CSV file:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
