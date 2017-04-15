<template>
<div class="main">      
    <navbar></navbar>   
    <div class="page">
        <div class="page-content padding-30 container-fluid">        
        <transition name="fade" mode="out-in">
            <router-view class="view" keep-alive></router-view>
        </transition>    
        </div>
    </div>
</div>
</template>

<script>
import Navbar from './views/navbar.vue'
import { mapGetters } from 'vuex'
export default {
    components: { navbar: Navbar},

    computed: {
        ...mapGetters({
            authenticated: 'authenticated'          
        })
    },


    created() {
        this.$store.dispatch('REQUEST_AUTH').then(res => {
            if (!this.authenticated && this.$route.meta.auth) {
                this.$router.push('/login');
            }
        });
    }  
}
</script>