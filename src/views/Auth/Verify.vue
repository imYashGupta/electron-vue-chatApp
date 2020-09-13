<template>
    <div class="body-form-membership">
        <div class="form-wrapper">
            <!-- logo -->
            <div class="logo">
                <img src="dist/media/img/small-logo.png" alt="logo" />
            </div>
            <!-- ./ logo -->

            <h5>Please verify your email</h5>
            <p
                class="text-muted"
            >We've emailed you a link to verify your account,by clicking the link you will be logged in automatically.</p>

            <div class="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
            </div>

            <!-- <template v-if="false">

      <p class="text-muted">Write the confirmation code that came to your phone in the box below.</p>
      <form>
        <div class="form-group">
          <input type="text" class="form-control text-center" placeholder="_ _ _ _ _" autofocus />
        </div>
        <button class="btn btn-primary btn-block">Confirm Code</button>
      </form>
            </template>-->
            <hr />
            <p class="text-muted">Did'nt recived the email?</p>
            <router-link to="register" class="btn btn-sm btn-outline-light mr-1">Resend email</router-link>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        const user = JSON.parse(this.$route.params.user);
        this.sockets.subscribe(user.email, () => {
            this.$store
                .dispatch("login", {
                    email: user.email,
                    password: user.password,
                })
                .then((res) => {
                    localStorage.setItem("__token", res.data.token);
                    return this.$store.dispatch("homeData");
                }).then(() => {
                    this.$router.push("/");
                });
        });
    },
};
</script>

<style scoped>
::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(200, 200, 200, 0.438) !important;
    opacity: 1; /* Firefox */
}
.invalid-feedback {
    text-align: left;
    font-size: 13px;
    margin-left: 2px;
    margin-top: 5px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}

body.dark input,
body.dark select,
body.dark textarea {
    background-color: #2e364a !important;
    color: rgba(255, 255, 255, 0.7);
    border-color: #424a5e !important;
}
</style>