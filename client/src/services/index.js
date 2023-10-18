// service/index.js

export default {
    /**
     * @brief check if the session token is valid
     * @param {string} token
     */
    async checkSessionTokenValidity(token) {
        // Send a GET request to the server to check the token
        try {
            const uri = `/api/check-token?token=${token}`;
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = await response.json();

            if (!response.ok) {
                // Handle server errors or other issues
                throw new Error(responseData.message || 'Internal server error');
            } else {
                // Return true if the token is valid, false otherwise
                return {
                    isValid: responseData.isValid,
                    user: responseData.user,
                }
            }
        } catch (error) {
            console.error('Error checking token validity: ', error);
            throw error;
        }
    },
}

