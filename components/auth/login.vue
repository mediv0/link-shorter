<template>
    <div class="login">
        <modal-header><span class="font-700">Login</span> to your Account</modal-header>
        <form class="mt-50">
            <label for="email" class="textbox_label">email</label>
            <input v-model="email" type="text" name="email" class="textbox" />
            <label for="password" class="textbox_label label2">password</label>
            <input v-model="password" type="password" name="password" class="textbox" />
            <btn class="mt-15" :is-loading="isLoading" @click="login">Login</btn>
        </form>
        <!-- spinner here -->
        <p v-if="hasError" class="errorMsg">{{ errorMsg }}</p>
    </div>
</template>

<script>
import header from "@/components/auth/modalHeader.vue";
import button from "@/components/components/button.vue";
export default {
    components: {
        modalHeader: header,
        btn: button,
    },

    data() {
        return {
            email: "",
            password: "",

            hasError: false,
            errorMsg: "something went wrong...",
            isLoading: false,
        };
    },

    methods: {
        async login() {
            this.isLoading = true;
            try {
                await this.$axios.post("/api/auth/login", {
                    email: this.email,
                    password: this.password,
                });

                this.$store.commit("setIsAuth", true);
            } catch (e) {
                const { response } = e;
                this.errorMsg = response.data.message;
                this.hasError = true;
            }

            this.isLoading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.login {
    @include modalBaseStyle;
    width: 400px;
    height: 65%;
    overflow: hidden;
}
</style>
