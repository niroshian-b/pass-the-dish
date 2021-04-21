export const getUserProfile = () => ({ type: 'GET_USER_PROFILE' });
export const recievedUserProfile = (uid, currentUser, userData) => ({
	type: 'RECEIVED_USER_PROFILE',
	uid,
	currentUser,
	userData,
});
export const errorReceivingUserProfile = () => ({
	type: 'RECEIVING_USER_PROFILE_ERROR',
});
