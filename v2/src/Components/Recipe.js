import React from 'react';
import styled from 'styled-components';
const Recipe = ({ recipe, setRecipe }) => {
	const handleInputChange = (e, index) => {
		const step = e.target.value;
		const updatedRecipe = [...recipe];
		updatedRecipe[index] = step;

		setRecipe(updatedRecipe);
	};

	const handleMinusClick = (index) => {
		const newRecipe = [...recipe];
		newRecipe.splice(index, 1);
		setRecipe(newRecipe);
	};

	const handlePlusClick = () => {
		setRecipe([...recipe, '']);
	};

	return (
		<Wrapper>
			<h2>Directions</h2>
			{recipe.map((step, index) => {
				return (
					<Step>
						<h3>Step {index + 1}</h3>
						<Input
							type="text"
							name="step"
							value={step}
							placeholder="Add a step to your recipe"
							onChange={(e) => handleInputChange(e, index)}
							required
						/>
						{recipe.length !== 1 && (
							<Button onClick={() => handleMinusClick(index)}>
								➖
							</Button>
						)}
						{recipe.length - 1 === index && (
							<Button onClick={handlePlusClick}>➕</Button>
						)}
					</Step>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 10px 0;
`;

const Step = styled.div`
	margin: 5px 0;
`;

const Input = styled.input`
	width: calc(100% - 90px);
`;
const Button = styled.button`
	margin: 0 5px;
`;
export default Recipe;
