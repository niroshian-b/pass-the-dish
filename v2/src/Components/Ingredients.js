import React from 'react';
import styled from 'styled-components';

const Ingredients = ({ ingredients, setIngredients }) => {
	// { qty: '', measurement: '', name: '' }
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const updatedIngredients = [...ingredients];

		updatedIngredients[index][name] = value;

		setIngredients(updatedIngredients);
	};

	const handleMinusClick = (index) => {
		const newingredients = [...ingredients];

		newingredients.splice(index, 1);

		setIngredients(newingredients);
	};

	const handlePlusClick = () => {
		setIngredients([
			...ingredients,
			{ qty: '', measurement: '', name: '' },
		]);
	};

	return (
		<Wrapper>
			<h2>Ingredients</h2>
			{ingredients.map((item, index) => {
				return (
					<Item>
						<div>
							<input
								type="number"
								name="qty"
								value={item.qty}
								placeholder="Add the quantity"
								min="0.1"
								onChange={(e) => handleInputChange(e, index)}
								required
							></input>
							<select
								name="measurement"
								value={item.measurement}
								onChange={(e) => handleInputChange(e, index)}
								required
							>
								<option value="piece(s)">piece(s)</option>
								<option value="sheet(s)">sheet(s)</option>
								<option value="quarter(s)">quarter(s)</option>
								<option value="half">half</option>
								<optgroup label="-------Volume-------" />
								<option value="pinch">pinch</option>
								<option value="tsp">tsp</option>
								<option value="tbsp">tbsp</option>
								<option value="fl oz">fl oz</option>
								<option value="cup">cup</option>
								<option value="pint">pint</option>
								<option value="quart">quart</option>
								<option value="gallon">gallon</option>
								<option value="mL">mL</option>
								<option value="L">L</option>
								<optgroup label="---Mass or Weight---" />
								<option value="lb">lb</option>
								<option value="oz">oz</option>
								<option value="mg">mg</option>
								<option value="g">g</option>
								<option value="kg">kg</option>
							</select>
							<input
								type="text"
								name="name"
								value={item.name}
								placeholder="Ingredient Name"
								onChange={(e) => handleInputChange(e, index)}
								required
							/>
							{ingredients.length !== 1 && (
								<button onClick={() => handleMinusClick(index)}>
									➖
								</button>
							)}
							{ingredients.length - 1 === index && (
								<button onClick={handlePlusClick}>➕</button>
							)}
						</div>
					</Item>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 10px 0;
`;

const Item = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
`;

export default Ingredients;
