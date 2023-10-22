<template>
    <div>
        <div v-if="showingPopup" class="popup">
            Topic créé avec succès !
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showingPopup: false
        };
    },
    methods: {
        showPopup() {
            this.showingPopup = true;
            setTimeout(() => {
                this.showingPopup = false;
            }, 2000);
        }
    }
};
</script>
  
<style scoped>
.header {
    height: 60px;
    /* Ajustez la hauteur de l'en-tête selon vos besoins */
    background: #333;
    /* Couleur d'arrière-plan de l'en-tête */
    color: white;
    /* Couleur du texte de l'en-tête */
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup {
    background: green;
    /* Fond vert */
    color: white;
    /* Texte blanc */
    padding: 10px;
    text-align: center;
    position: fixed;
    top: 75px;
    /* La hauteur de l'en-tête */
    width: 100%;
    z-index: 999;
}</style>
  