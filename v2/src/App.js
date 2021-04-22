import React, { useState } from 'react';
import styled from 'styled-components';
import Post from './Components/Post';
import GlobalStyles from './Global/GlobalStyles.js';

function App() {
	const [posts, setPosts] = useState([]);

	//SAMPLE POST DATA - WILL DELETE
	const samplePosts = [
		{
			handle: 'BrockIsCooking',
			caption: "Onyx's favorite dish",
			imageUrl:
				'https://www.wandercooks.com/wp-content/uploads/2015/12/simple-onigiri-rice-ball-snack-11.jpg',
		},
		{
			handle: 'PickleRick',
			caption: 'WubbaLubbaDubDub',
			imageUrl:
				'https://i.pinimg.com/originals/b1/4e/f9/b14ef913e9fc913e17e55d0a9e89751a.jpg',
		},
		{
			handle: 'ChefBoyle',
			caption: 'Bon Appetit',
			imageUrl:
				'https://tastesbetterfromscratch.com/wp-content/uploads/2016/10/Croque-Monsieur-4-1-500x375.jpg',
		},
	];
	setPosts(samplePosts);
	//^^^ MUST DELETE AFTER ^^^

	return (
		<>
			<GlobalStyles />
			<Container>
				<div className="appHeader">
					<h1 className="appHeaderLogo">Pass the Dishes</h1>
				</div>
				{posts.map((post) => (
					<Post
						handle={post.handle}
						caption={post.caption}
						imageUrl={post.imageUrl}
					></Post>
				))}
				<h1>practiceApp</h1>
			</Container>
		</>
	);
}

const Container = styled.div`
	background-color: #fafafa;
`;

const Header = styled.div`
	object-fit: contain;
	padding: 20px;
	background-color: #fafafa;
	border-bottom: 1px solid lightgray;
`;
export default App;
