<template>
    <div class="form">
        <input type="text" name="form_input" class="form__input" />
        <button class="form__submit">Process</button>
        <p v-if="hasError" class="form__error">Invalid URL. please provide valid url and try again</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hasError: false,
        };
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
