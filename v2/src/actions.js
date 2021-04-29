export const setAllRecipeDetails = (recipes) => ({
	type: 'SET_ALL_RECIPE_DETAILS',
	recipes,
});

export const setRecipeDetails = (id, recipe) => ({
	type: 'SET_RECIPE_DETAILS',
	id,
	recipe,
});

export const setNutritionInformation = (id, nutrition) => ({
	type: 'SET_NUTRITIONAL_INFORMATION',
	id,
	nutrition,
});
