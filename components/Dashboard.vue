<template>
    <div class="dashboard">
        <user-login v-if="!isAuth" />
        <user-dashboard v-else />
    </div>
</template>

<script>
import Auth from "~/components/Auth.vue";
import DashboardContent from "~/components/UserDashboard.vue";
export default {
    components: {
        userLogin: Auth,
        userDashboard: DashboardContent,
    },
    computed: {
        isAuth() {
            return this.$store.getters.isAuth;
        },
    },
    async created() {
        await this.$store.dispatch("isUserAuthenticated");
    },
};
</script>

<style lang="scss" scoped></style>
