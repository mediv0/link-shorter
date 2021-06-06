<template>
    <button class="button" @click.prevent="clickEvent">
        <div v-if="!isLoading"><slot></slot></div>
        <div v-else class="button__loading">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        isLoading: Boolean,
    },
    methods: {
        clickEvent() {
            this.$emit("click");
        },
    },
};
</script>

<style lang="scss" scoped>
.button {
    width: 100%;
    background: $color-blue;
    outline: none;
    border-radius: 7px;
    padding: 12px 0;
    color: white;
}

// spinner styles
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 13px;
    height: 13px;
    margin-right: 70px;
}
.lds-ellipsis div {
    position: absolute;
    top: 30%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}
</style>
