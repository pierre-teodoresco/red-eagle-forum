// service/index.js

export default {
    /**
     * @brief Verify if the user is logged in
     * @return {JSON} json containing if logged in
     *  - a boolean isLoggedIn to true and the user data if logged in
     *  - a boolean isLoggedIn to false and an empty object otherwise
     */
    async isLoggedIn() {
        // Check if the user is already logged in
        const response = await fetch('/api/check-login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Get the data from the backend response
        const responseData = await response.json();

        if (!response.ok) {
            // The request failed
            throw new Error('Internal Server Error');
        }

        return responseData;
    },
}