<template>
    <div class="login">
        <modal-header><span class="font-700">Login</span> to your Account</modal-header>
        <form class="mt-50">
            <label for="email" class="textbox_label">email</label>
            <input type="text" name="email" class="textbox" />
            <label for="password" class="textbox_label label2">password</label>
            <input type="password" name="password" class="textbox" />
            <btn class="mt-15">Login</btn>
        </form>
        <!-- spinner here -->
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
