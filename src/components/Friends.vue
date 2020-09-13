<template>
    <!-- Friends sidebar -->
    <div id="friends" class="sidebar">
        <header>
            <span>Search</span>
            <ul class="list-inline">
                <li class="list-inline-item" data-toggle="tooltip" title="Add friends">
                    <a
                        class="btn btn-outline-light"
                        href="#"
                        data-toggle="modal"
                        data-target="#addFriends"
                    >
                        <i class="mdi mdi-account-plus"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a href="#" class="btn btn-danger sidebar-close">
                        <i class="mdi mdi-close"></i>
                    </a>
                </li>
            </ul>
        </header>
        <form @submit.prevent>
            <input
                type="text"
                @input.prevent="handleInput($event)"
                class="form-control"
                placeholder="Search"
            />
        </form>
        <div class="sidebar-body">
            <template v-if="!loading">
                <template v-if="users.length > 0">
                    <p>Results {{users.length}}</p>
                    <div>
                        <ul class="list-group list-group-flush">
                            <li v-for="user in users" :key="user._id" class="list-group-item">
                                <div>
                                    <figure class="avatar">
                                        <img
                                            v-if="user.displayPicture!=null"
                                            @error="user.displayPicture=null"
                                            :src="user.displayPicture"
                                            class="rounded-circle"
                                            alt="image"
                                        />
                                        <span
                                            v-else
                                            class="avatar-title bg-success rounded-circle"
                                            :class="user.meta.color[0]"
                                        >{{ user.name[0] }}</span>
                                    </figure>
                                </div>
                                <div class="users-list-body">
                                    <div
                                        :class="user.about==undefined ? 'justify-content-center' : ''"
                                    >
                                        <h5>{{user.name}}</h5>
                                        <p v-if="user.about==undefined">{{user.about}}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <div class="action-toggle">
                                            <div class="dropdown">
                                                <a data-toggle="dropdown" href="#">
                                                    <i class="mdi mdi-dots-horizontal"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <router-link :to="{name:'chat',params:{id:user._id,user:user}}" href="#" class="dropdown-item">New chat</router-link>
                                                    <a
                                                        href="#"
                                                        data-navigation-target="contact-information"
                                                        class="dropdown-item"
                                                    >Profile</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a
                                                        href="#"
                                                        class="dropdown-item text-danger disabled"
                                                    >Block</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <p v-if="text.length==0">type name or email to find user.</p>
                    <p v-else>we could'nt find user with these name or email.</p>
                </template>
            </template>
            <template v-else>
                <div class="d-flex justify-content-center">

                <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                </div>
            </template>
        </div>
    </div>
    <!-- ./ Friends sidebar -->
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            contacts: "contacts",
        }),
    },
    data() {
        return {
            text: "",
            users: [],
            loading: false,
        };
    },
    methods: {
        handleInput(event) {
            this.loading = true;
            this.text = event.target.value;
            console.log(event.target.value);
            Axios.get("/chat/users?name=" + event.target.value)
                .then((response) => {
                    console.log(response);
                    const { users } = response.data;
                    const formatedUsers = users.map((user) => {
                        user.about =
                            user.meta?.about != null ? false : user.meta?.about;
                        return user;
                    });
                    console.log(formatedUsers);
                    this.users = formatedUsers;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created() {},
};
</script>

<style>
</style>