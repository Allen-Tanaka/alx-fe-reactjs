import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !ingredients || !steps) {
      setError("All fields are required.");
      return;
    }

    const ingredientsList = ingredients.split(",");

    if (ingredientsList.length < 2) {
      setError("Please enter at least two ingredients.");
      return;
    }

    setError("");

    const newRecipe = {
      title,
      ingredients: ingredientsList,
      steps,
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Clear form
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Recipe
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {/* Recipe Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter recipe title"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Ingredients (comma separated)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="3"
            placeholder="e.g. Eggs, Flour, Milk"
          ></textarea>
        </div>

        {/* Preparation Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
            placeholder="Describe the cooking steps"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
