<template>
    <div class="listView">
        <ul class="list">
            <li v-for="(link, i) in data" :key="i" class="list__item">
                <div class="list__item__avatar" :style="{ backgroundColor: `#${getRandomColor()}` }">
                    <p class="font-700">{{ getFirstChar(link.orginal).toUpperCase() }}</p>
                </div>
                <div class="list__item__domains">
                    <p class="list__item__domains__orginal">{{ getURLDomain(link.orginal) }}</p>
                    <p class="list__item__domains__short">
                        <a target="_blank" :href="`/l/${link.short}`">{{ link.short }}</a>
                    </p>
                </div>
            </li>
        </ul>
        <lazy :callback="fetchData" />
    </div>
</template>

<script>
import lazyLoad from "@/components/userDashboard/lazyLoad.vue";
export default {
    components: {
        lazy: lazyLoad,
    },
    data() {
        return {
            colors: ["2a9d8f", "e76f51", "3f37c9", "f72585", "219ebc", "9d0208", "ffafcc", "99d98c", "8338ec", "3a86ff", "723d46", "212529", "ff9100", "52b788", "b388eb", "38a3a5", "2dc653", "ee6055", "8e94f2", "2dc7ff", "f1a208"],
            data: [],
            page: 0,
        };
    },
    methods: {
        async fetchData() {
            // fetch from server
            this.page++;
            const { data } = await this.$axios.get(`/api/link/getlinks?page=${this.page}`);
            this.data.push(...data.list);
            this.data.reverse();
        },
        getURLDomain(domain) {
            return this.normalizeURL(domain);
        },
        getFirstChar(domain) {
            return this.normalizeURL(domain)[0];
        },
        getRandomColor() {
            const colorIndex = Math.floor(Math.random() * this.colors.length);
            return this.colors[colorIndex];
        },
        normalizeURL(url) {
            return url;
        },

        buildExternalUrl(url) {
            const pattern = /^((http|https|ftp):\/\/)/;
            if (!pattern.test(url)) {
                url = "http://" + url;
            }

            return url;
        },
    },
};
</script>

<style lang="scss" scoped>
.list {
    &__item {
        margin-bottom: 25px;
        display: flex;
        align-items: center;

        &__avatar {
            min-width: 30px;
            min-height: 30px;
            border-radius: 50%;
            color: white;

            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__domains {
            margin-left: 10px;
            width: 100%;
            &__orginal {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 4px;
            }
        }
    }
}
</style>
