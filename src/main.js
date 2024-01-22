import './assets/main.css'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import { createApp }  from 'vue'
import App from './App.vue'

 
defineIonPhaser(window);

createApp(App).mount('#app')
