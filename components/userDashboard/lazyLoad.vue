<template>
    <div class="lazy_load">
        <div v-if="isIntersecting">
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            <p>fetching data...</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        callback: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            observer: null,
            isIntersecting: false,
        };
    },

    mounted() {
        this.observer = new IntersectionObserver(this.observerHandler, {
            threshold: 1.0,
            rootMargin: "0px",
        });

        this.observer.observe(this.$el);
    },

    methods: {
        observerHandler(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.isIntersecting = true;
                    this.callback();
                } else {
                    this.isIntersecting = false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.lazy_load {
    width: 100%;
    height: 200px;
    background: transparent;

    & > div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
}

.spinner {
    animation: rotate 2s linear infinite;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
}

.path {
    stroke: $color-primary;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
</style>
