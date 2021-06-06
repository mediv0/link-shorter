export default {
    data() {
        return {
            modalBaseOptions: {
                backgroundColor: "#000000",
                opacity: "0.4",
                animation: "scaleIn",
            },
        };
    },

    methods: {
        getModalOptions(cmp, options = {}) {
            return {
                component: cmp,
                ...this.modalBaseOptions,
                ...options,
            };
        },
    },
};
