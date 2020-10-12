<template>
  <!-- Header -->
<header class="main-header">
    <div id="logo">
        <a href="#">
            <img src="dist/media/img/logo.png" alt="logo">
        </a>
    </div>
    <div class="header-nav">
        <ul class="nav">
            <li><a href="#" data-navigation-target="contact-information">Profile</a></li>
            <li><a href="#" data-navigation-target="friends">Search</a></li>
            <li><a href="#" data-navigation-target="favorites">Favorites</a></li>
            <li><a href="#" data-navigation-target="archived">Archived</a></li>
        </ul>
    </div>
    <div class="header-right">
        <div class="navbar-toggler">
            <a href="#">
                <i data-feather="menu"></i>
            </a>
        </div>
        <div class="dropdown">
            <a href="#" data-toggle="dropdown">
                <span class="mr-2 d-none d-sm-inline-block">{{authuser.name}}</span>
                <figure class="avatar">
                    <img v-if="authuser.displayPicture" :src="authuser.displayPicture" class="rounded-circle" alt="image">
                    <span v-else class="avatar-title bg-success rounded-circle" :class="authuser.meta.color[0]">{{ authuser.name[0] }}</span>
                </figure>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <a href="#" @click.prevent="openProfile(authuser,true)" class="dropdown-item" data-navigation-target="contact-information">Profile</a>
                <a href="#" class="dropdown-item" data-toggle="modal" data-target="#settingModal">Settings</a>
                <div class="dropdown-divider"></div>
                <router-link to="/"   class="dropdown-item text-warning">Refresh</router-link>
                <a href="#" @click.prevent="logout()" class="dropdown-item text-danger">Logout</a>
            </div>
        </div>
    </div>
</header>
<!-- ./ Header -->
</template>

<script>
import Mixin from "./../mixin";
export default {
    mixins:[Mixin],
    methods:{
        logout(){
            this.$emit("logout");
        }
    }

}
</script>

<style>

</style>