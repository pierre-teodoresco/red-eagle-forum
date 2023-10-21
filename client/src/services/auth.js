import Cookies from 'js-cookie';
import Service from '../services';

export default {
    data() {
        return {
            user: null,
        };
    },
    async checkUserSession() {
        const sessionToken = Cookies.get('sessionToken');
        if (sessionToken) {
            try {
                const data = await Service.checkSessionTokenValidity(sessionToken);
                if (data.isValid) {
                    this.user = data.user;
                } else {
                    this.handleInvalidToken();
                }
            } catch (error) {
                console.error('Error checking token validity:', error);
            }
        }
    },
    handleInvalidToken() {
        Cookies.remove('sessionToken');
        // Ajoutez ici la logique pour gérer un token invalide, par exemple, afficher un formulaire de connexion
    },
};
