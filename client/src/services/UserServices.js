// service/UserServices.js

import Cookies from 'js-cookie';

export default {
    /**
     * @brief Verify if the user is logged in
     * @return {JSON} json containing if logged in
     *  - a boolean isLoggedIn to true and the user data if logged in
     *  - a boolean isLoggedIn to false and an empty object otherwise
     */
    async isLoggedIn() {
        // Check if the user is already logged in
        const response = await fetch('/user/check-login', {
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
    /**
     * @brief Remember the user
     * @param {String} token
     */
    rememberMe(token) {
        // Remember the user
        Cookies.set('rememberMeToken', token, { expires: 7 });
    },
    /**
     * @brief Forget the user
     */
    forgetMe() {
        // Forget the user if remembered
        if (Cookies.get('rememberMeToken')) {
            Cookies.remove('rememberMeToken');
        }
    },
    /**
     * @brief check if the user is remembered
     * @return {JSON} json containing if remembered
     * - a boolean isRemembered to true and the user data if remembered
     * - a boolean isRemembered to false and an empty object otherwise
     */
    async isRemembered() {
        // Check if the user is remembered
        const rememberMeToken = Cookies.get('rememberMeToken');
        
        if (!rememberMeToken) {
            return { isRemembered: false };
        }
        
        const response = await fetch(`/user/check-remember-me?token=${rememberMeToken}`, {
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

        return { isRemembered: true, user: responseData.user };
    },
}