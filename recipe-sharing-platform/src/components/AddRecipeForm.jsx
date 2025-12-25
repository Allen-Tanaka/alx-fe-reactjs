import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Recipe title is required.";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients =
        "Please enter at least two ingredients.";
    }

    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      steps,
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Clear form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
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
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}
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
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ingredients}
            </p>
          )}
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
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">
              {errors.steps}
            </p>
          )}
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
