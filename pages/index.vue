<template>
    <div class="container wrapper">
        <div class="logo">
            <img src="~/assets/images/logo.png" alt="logo" width="50" />
            <p class="logo__name font-700">Link<span>Share</span></p>
            <p class="logo__github">V 1.0.0</p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 50px 0;
}
.container {
    margin: 0 auto;
    max-width: 500px;
}

.logo {
    display: flex;
    align-items: center;

    & > p {
        margin-top: 5px;
    }

    &__name {
        font-size: 1.286rem;
        margin-left: 10px;
        color: $color-gray-2;

        & > span {
            color: $color-primary;
        }
    }

    &__github {
        margin-left: auto;
        color: $color-gray-1;
    }
}
</style>
