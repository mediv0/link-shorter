<template>
    <div>hello world</div>
</template>

<script>
/* eslint-disable */
export default {
    async asyncData({ params }) {
        const slug = params.url;
        return { slug };
    },
    created() {
        // const url = await this.$axios.get("/api/")

        console.log(this.slug);
        console.log(this.this.$route);
    },
};
</script>
