<template>
    <div class="extra-information">

        <p class="info-label">
            <slot>
            </slot>
            {{label}}
        </p>
        <p class="other-info" v-if="!link">
                {{value}}
        </p>
        <a class="other-info"
           target="_blank"
           v-if="link"
           :href="link">{{value}}</a>
    </div>
</template>

<script>
    export default {
        name: "ExtraDetail.vue",
        props: {

            label: {
                type: String,
                required: true
            },

            value: {
                type: String,
                required: true
            },

            link: {
                type: String,
                required: false
            }

        }
    }
</script>

<style lang="scss" scoped>

    .info-label {
        display: block;
        font-weight: 500;
        font-size: .9em;
        margin-bottom: .3em;
    }

    .other-info{
        font-weight: 800;
    }
    .extra-information {
        margin: 2em;

    }


    a:link,a:visited,a:hover,a:active  {
        color: $dark;
        text-decoration: underline;
    }

    .value-text {
        text-indent: 1em;
    }

</style>