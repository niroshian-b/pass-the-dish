export const recieveRecipeDetails = (id, recipe) => ({
	type: 'RECIEVE_RECIPE_DETAILS',
	id,
	recipe,
});

export const errorRecieveRecipeDetails = () => ({
	type: 'ERROR_RECIEVE_RECIPE_DETAILS',
});

export const receiveNutritionInformation = (id, nutrition) => ({
	type: 'RECEIVE_NUTRITIONAL_INFORMATION',
	id,
	nutrition,
});

export const errorReceiveNutritionInformation = () => ({
	type: 'ERROR_RECEIVE_NUTRITIONAL_INFORMATION',
});
