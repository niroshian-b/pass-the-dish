import React from 'react';
import styled from 'styled-components';

import BaseButton from '../Button';

const SubmitButton = ({ disabled, buttonText }) => {
	return (
		<Submit>
			<Button disabled={disabled} type="submit">
				{buttonText}
			</Button>
		</Submit>
	);
};

const Submit = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: flex-end;
`;
const Button = styled(BaseButton)`
	&:disabled {
		border: 3px solid #999999;
		background-color: #cccccc;
		color: #666666;
	}
`;
export default SubmitButton;
