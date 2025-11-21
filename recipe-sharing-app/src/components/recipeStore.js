import create from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',

  favorites: [],             // Added for user favorites
  recommendations: [],       // Added for personalized recommendations

  // CRUD actions
  addRecipe: (newRecipe) => {
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return { recipes: updatedRecipes, filteredRecipes: updatedRecipes };
    });
  },

  updateRecipe: (updatedRecipe) => {
    set((state) => {
      const updatedList = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return { recipes: updatedList, filteredRecipes: updatedList };
    });
  },

  deleteRecipe: (id) => {
    set((state) => {
      const updatedList = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updatedList,
        filteredRecipes: updatedList,
        favorites: state.favorites.filter((favId) => favId !== id),
      };
    });
  },

  // Search & Filtering
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const filtered = recipes.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },

  // Favorites actions
  addFavorite: (recipeId) => {
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    }));
    get().generateRecommendations();
  },

  removeFavorite: (recipeId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    }));
    get().generateRecommendations();
  },

  // Recommendations (mock example: picks some of the favorites randomly)
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (r) => favorites.includes(r.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },
}));
