<template>
    <div class="form">
        <input v-model="url" type="text" name="form_input" placeholder="Enter your url..." class="form__input" />
        <button class="form__submit" @click="convertUrl">Process</button>
        <p v-if="hasError" class="form__error">Invalid URL. please provide valid url and try again</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: "",
            isFetching: false,
            hasError: false,
            audio: null,
        };
    },
    async mounted() {
        await this.fetchNotificationAudio();
    },
    methods: {
        async convertUrl() {
            if (!this.isFetching) {
                this.isFetching = true;
                this.hasError = false;
                try {
                    const { data } = await this.$axios.post("/api/link/create", {
                        url: this.url,
                    });
                    this.playDoneSong();
                    this.$toast.success(`your link: xe.na/l/${data.url}`, {
                        timeout: 7000,
                        draggable: false,
                        closeOnClick: false,
                    });
                    this.url = "";
                } catch (e) {
                    const { response } = e;

                    this.errorMsg = response.data.message;
                    this.hasError = true;
                }
                this.isFetching = false;
            }
        },
        async fetchNotificationAudio() {
            const { default: path } = await import("@/assets/audio/done.mp3");
            this.audio = new Audio(path);
        },
        playDoneSong() {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.play();
        },
    },
};
</script>

<style lang="scss" scoped>
$form-border-radius: 3px;
.form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    &__error {
        width: 100%;
        font-size: 0.857rem;
        color: $color-red;
    }

    &__input {
        font-family: "Inter";
        flex: 1;
        padding: 17px 10px;
        outline: none;
        border: 1px solid $color-gray-3;
        border-right: none;
        border-radius: $form-border-radius 0 0 $form-border-radius;
        transition: 100ms ease;

        &:focus {
            box-shadow: 0 0 5px $color-blue;
            border: 1px solid $color-blue;
        }
    }

    &__submit {
        padding: 0 16px;
        border-radius: 0 $form-border-radius $form-border-radius 0;
        background: white;
        border: 1px solid $color-gray-3;
        transition: 0.2s ease;

        &:hover {
            border-color: $color-primary;
            background: $color-primary;
            color: white;
        }
    }
}
</style>
