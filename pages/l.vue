<template>
    <div></div>
</template>

<script>
/* eslint-disable */
export default {
    async created() {
        const { path } = this.$route;
        const normalizeParam = path.split("/")[2];
        const { data } = await this.$axios.post(`/api/redirect/`, {
            param: normalizeParam,
        });

        let url = data.url?.orginal;

        var pattern = /^((http|https|ftp):\/\/)/;

        if (url && !pattern.test(url)) {
            url = "http://" + url;
        }
        if (process.browser) {
            console.log(url);
            url ? (window.location.href = url): (window.location.href = "http://localhost:3000");
        }
    },
};
</script>
