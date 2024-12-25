import React, { useState } from "react";

const IngredientSection = ({ category, ingredients, onSelect, selectedIngredients }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track whether the list is open or collapsed

  // Toggle the open/close state
  const toggleCategory = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="space-y-2">
      {/* Category Header */}
      <div
        onClick={toggleCategory}
        className="cursor-pointer text-2xl font-semibold text-gray-800 hover:text-gray-600 transition-colors"
      >
        {category}
      </div>

      {/* Ingredient List (shown only when isOpen is true) */}
      {isOpen && (
        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
        <div className="flex flex-wrap gap-4">
          {ingredients.map((ingredient, index) => {
            const isSelected = selectedIngredients.includes(ingredient.name); // Check if the ingredient is selected
            return (
              <button
                key={index}
                onClick={() => onSelect(ingredient)}
                className={`p-2 border-2 rounded-lg text-gray-700 cursor-pointer w-max transition-all
                  ${isSelected ? 'bg-green-100 border-green-300' : 'hover:bg-gray-200'}`}
              >
                {ingredient.name}
              </button>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSection;
