import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import recipesData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Recipe Sharing Platform
      </h1>

      <div className="text-center mb-6">
        <Link
          to="/add-recipe"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add New Recipe
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {recipe.summary}
              </p>

              <Link to={`/recipe/${recipe.id}`}
                className="mt-4 inline-block text-blue-500 hover:underline text-sm"
                >
                View Recipe →
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
