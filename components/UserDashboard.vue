<template>
    <div class="dashboard_group">
        <h2 class="font-700 dashboard_group__title">All Records <span class="font-400">345</span></h2>
        <div class="h-divider"></div>
        <list />
    </div>
</template>

<script>
import Linklist from "@/components/userDashboard/list.vue";
export default {
    components: {
        list: Linklist,
    },
};
</script>

<style lang="scss" scoped>
.dashboard_group {
    margin-top: 70px;
    &__title {
        color: black;

        & > span {
            color: $color-gray-2;
            font-size: 1rem;
            vertical-align: middle;
            margin-bottom: 3px;
        }
    }
}
</style>
