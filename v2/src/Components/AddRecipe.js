import React from 'react';
import ImageUpload from './ImageUpload';
import { useAuth } from '../Contexts/AuthContext';

const AddRecipe = () => {
	const { user } = useAuth();

	return (
		<div>
			<ImageUpload user={user} />
		</div>
	);
};

export default AddRecipe;
