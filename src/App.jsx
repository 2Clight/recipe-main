import { useState, useEffect } from "react";
import IngredientSection from "./components/IngredientSection";

function App() {
  const ingredientsData = [
    { name: "Milk", category: "Dairy" },
    { name: "Cheese", category: "Dairy" },
    { name: "Butter", category: "Dairy" },
    { name: "Yogurt", category: "Dairy" },
    { name: "Cream", category: "Dairy" },
    { name: "Cottage Cheese", category: "Dairy" },
    { name: "Mozzarella", category: "Dairy" },
    { name: "Parmesan", category: "Dairy" },
    { name: "Ricotta", category: "Dairy" },
    { name: "Sour Cream", category: "Dairy" },

    { name: "Chicken", category: "Poultry" },
    { name: "Egg", category: "Poultry" },
    { name: "Turkey", category: "Poultry" },
    { name: "Duck", category: "Poultry" },
    { name: "Goose", category: "Poultry" },
    { name: "Chicken Breast", category: "Poultry" },
    { name: "Chicken Thighs", category: "Poultry" },
    { name: "Chicken Wings", category: "Poultry" },
    { name: "Turkey Breast", category: "Poultry" },
    { name: "Turkey Legs", category: "Poultry" },

    { name: "Carrot", category: "Vegetables" },
    { name: "Spinach", category: "Vegetables" },
    { name: "Lettuce", category: "Vegetables" },
    { name: "Broccoli", category: "Vegetables" },
    { name: "Cauliflower", category: "Vegetables" },
    { name: "Cucumber", category: "Vegetables" },
    { name: "Tomato", category: "Vegetables" },
    { name: "Zucchini", category: "Vegetables" },
    { name: "Bell Pepper", category: "Vegetables" },
    { name: "Onion", category: "Vegetables" },

    { name: "Apple", category: "Fruits" },
    { name: "Banana", category: "Fruits" },
    { name: "Orange", category: "Fruits" },
    { name: "Strawberry", category: "Fruits" },
    { name: "Blueberry", category: "Fruits" },
    { name: "Pineapple", category: "Fruits" },
    { name: "Grapes", category: "Fruits" },
    { name: "Peach", category: "Fruits" },
    { name: "Pear", category: "Fruits" },
    { name: "Mango", category: "Fruits" },

    { name: "Rice", category: "Grains" },
    { name: "Quinoa", category: "Grains" },
    { name: "Oats", category: "Grains" },
    { name: "Barley", category: "Grains" },
    { name: "Wheat", category: "Grains" },
    { name: "Couscous", category: "Grains" },
    { name: "Polenta", category: "Grains" },
    { name: "Bulgur", category: "Grains" },
    { name: "Buckwheat", category: "Grains" },
    { name: "Cornmeal", category: "Grains" },

    { name: "Cinnamon", category: "Spices" },
    { name: "Nutmeg", category: "Spices" },
    { name: "Cumin", category: "Spices" },
    { name: "Paprika", category: "Spices" },
    { name: "Turmeric", category: "Spices" },
    { name: "Ginger", category: "Spices" },
    { name: "Garlic Powder", category: "Spices" },
    { name: "Onion Powder", category: "Spices" },
    { name: "Chili Powder", category: "Spices" },
    { name: "Cardamom", category: "Spices" },

    { name: "Almonds", category: "Nuts" },
    { name: "Cashews", category: "Nuts" },
    { name: "Walnuts", category: "Nuts" },
    { name: "Pecans", category: "Nuts" },
    { name: "Pistachios", category: "Nuts" },
    { name: "Hazelnuts", category: "Nuts" },
    { name: "Macadamia Nuts", category: "Nuts" },
    { name: "Brazil Nuts", category: "Nuts" },
    { name: "Pine Nuts", category: "Nuts" },
    { name: "Chestnuts", category: "Nuts" },

    { name: "Salmon", category: "Seafood" },
    { name: "Shrimp", category: "Seafood" },
    { name: "Tuna", category: "Seafood" },
    { name: "Cod", category: "Seafood" },
    { name: "Mackerel", category: "Seafood" },
    { name: "Sardines", category: "Seafood" },
    { name: "Halibut", category: "Seafood" },
    { name: "Clams", category: "Seafood" },
    { name: "Lobster", category: "Seafood" },
    { name: "Crab", category: "Seafood" },
  ];
  const categories = [...new Set(ingredientsData.map((item) => item.category))];

  const groupedIngredients = categories.map((category) => ({
    category,
    ingredients: ingredientsData.filter((ingredient) => ingredient.category === category),
  }));

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleSelect = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient.name)
        ? prevSelected.filter((name) => name !== ingredient.name)
        : [...prevSelected, ingredient.name]
    );
  };

  const fetchRecipes = async () => {
    console.log("Selected Ingredients: ", selectedIngredients); // Log to check the value
    const response = await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: selectedIngredients }),
    });
    const data = await response.json();
    setRecipes(data);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Ingredients List
        </h1>
        <div className="space-y-4">
          {groupedIngredients.map((group, index) => (
            <IngredientSection
              key={index}
              category={group.category}
              ingredients={group.ingredients}
              onSelect={handleSelect}
              selectedIngredients={selectedIngredients}
            />
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Selected Ingredients:</h2>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={fetchRecipes}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Find Recipes
        </button>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Recipes:</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index} className="text-gray-700">
                <a href={recipe.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  {recipe.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;