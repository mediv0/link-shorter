<template>
    <div class="auth">
        <img src="~/assets/images/dashboard_empty_state.png" alt="login logo" class="auth__pic" />
        <p class="font-700">Login to your account to see your links</p>
        <p class="auth__desc_text">very cool stuff coming soon...</p>

        <div class="auth__action">
            <button class="auth__action--login" @click="login">sign in</button>
            <button class="auth__action--account" @click="signUp">create new account</button>
        </div>

        <client-only>
            <xmodal name="auth" />
        </client-only>
    </div>
</template>

<script>
import modalOptions from "~/mixins/modal";
export default {
    mixins: [modalOptions],
    methods: {
        login() {
            this.$xmodal.open(this.getModalOptions(import("./auth/login.vue")), "auth");
        },
        signUp() {
            this.$xmodal.open(this.getModalOptions(import("./auth/newAccount.vue")), "auth");
        },
    },
};
</script>

<style lang="scss" scoped>
.auth {
    display: flex;
    align-items: center;
    flex-direction: column;

    &__pic {
        width: 300px;
        pointer-events: none;
        user-select: none;
    }

    &__desc_text {
        margin-top: 5px;
        font-size: 0.89rem;
        color: $color-gray-2;
    }

    &__action {
        margin-top: 35px;
        & > button {
            padding: 10px 17px;
            border-radius: 3px;
            color: white;
        }

        &--login {
            background: $color-primary;
        }

        &--account {
            background: $color-blue;
        }
    }
}
</style>
