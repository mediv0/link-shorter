<template>
    <div class="signUp">
        <modal-header><span class="font-700">Create</span> new Account</modal-header>
        <form class="mt-50">
            <label for="email" class="textbox_label">email</label>
            <input v-model="email" v-validator="emailOptions" type="text" name="email" class="textbox" />
            <label for="password" class="textbox_label label2">password</label>
            <span class="passwordValidatorContainer"><input v-model="password" v-validator="passwordOption" type="password" name="password" class="textbox" /></span>
            <label for="repassword" class="textbox_label label2">Confirm your password</label>
            <input v-model="confirmPassword" v-validator="confirmPasswordOptions" type="password" name="repassword" class="textbox" />
            <btn class="mt-15" :is-loading="isLoading" @click="createAccount">Login</btn>
        </form>
        <!-- spinner here -->
        <p v-if="showSuccessMsg" class="successMsg">Your account created successfully</p>
        <p v-if="showErrorMsg" class="errorMsg">this account already exist</p>
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
            confirmPassword: "",
            isLoading: false,
            showSuccessMsg: false,
            showErrorMsg: false,

            emailOptions: {
                key: "email",
                items: [
                    {
                        label: "",
                        test: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    },
                ],
                onError: {
                    msg: "your email is not valid",
                    highlight: true,
                },
            },

            passwordOption: {
                key: "password",
                items: [
                    {
                        label: "at least 8 characters",
                        test: (val) => val.length >= 8,
                    },
                    {
                        label: "at least 1 numeric character",
                        test: /(?=.*[0-9])/,
                    },
                    {
                        label: "at least 1 uppercase alphabetical character",
                        test: /(?=.*[A-Z])/,
                    },
                    {
                        label: "at least 1 lowercase alphabetical character",
                        test: /(?=.*[a-z])/,
                    },
                ],
            },

            confirmPasswordOptions: {
                key: "confirmPassword",
                items: [
                    {
                        label: "",
                        test: (val) => val === this.$data.password && val.length !== 0,
                    },
                ],
                onError: {
                    msg: "your confirm password does not match your password",
                    highlight: true,
                },
            },
        };
    },

    methods: {
        async validateForm() {
            const { email, confirmPassword } = await this.$validator.validate("email", "confirmPassword");
            if (email && confirmPassword && this.$validator.isValid("password")) {
                return true;
            } else {
                return false;
            }
        },
        async createAccount() {
            const isValid = await this.validateForm();
            if (isValid) {
                try {
                    this.isLoading = true;
                    this.showSuccessMsg = false;
                    this.showErrorMsg = false;

                    await this.$axios.post(
                        "/api/auth/signup",
                        {
                            email: this.email,
                            password: this.password,
                            confirmPassword: this.confirmPassword,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    this.showSuccessMsg = true;
                    this.$store.commit("setIsAuth", true);
                } catch (e) {
                    this.showErrorMsg = true;
                }

                this.isLoading = false;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.signUp {
    @include modalBaseStyle;
    width: 400px;
    max-height: 70%;
    overflow: auto;

    & > form {
        & > button {
            margin-bottom: 20px;
        }
    }
}

.passwordValidatorContainer {
    font-size: 12px;
}
</style>
