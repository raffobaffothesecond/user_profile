<template>
    <div class="cta-container">

        <a class="cta-option bg-primary shadow-sm"
           :href="`mailto:${contacts.email}`"
           :class="size"
           v-if="contacts.email">
                <b-icon-envelope-fill class="cta-icon"></b-icon-envelope-fill>
        </a>

        <a class="cta-option bg-info shadow-sm"
           :href="`sms:${contacts.phone}`"
           :class="size"
           v-if="contacts.phone">

                <b-icon-chat-dots-fill class="cta-icon"></b-icon-chat-dots-fill>

        </a>

        <a class="cta-option bg-success shadow-sm"
           :class="size"
           :href="`tel:${contacts.phone}`"
           v-if="contacts.phone">

            <b-icon-telephone-fill class="cta-icon"></b-icon-telephone-fill>

        </a>
    </div>
</template>

<script>
    import {BIconEnvelopeFill, BIconTelephoneFill, BIconChatDotsFill} from 'bootstrap-vue'
    export default {
        name: "DialContacts.vue",
        props: {
            contacts: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        email: null,
                        phone: null
                    }
                }
            },
            size: {
                type: String,
                required: false,
                default: '_'
            }
        },
        components: {
            BIconEnvelopeFill, BIconTelephoneFill, BIconChatDotsFill
        },

    }
</script>

<style lang="scss" scoped>

    .cta-container {
        display: flex;
        flex-wrap: wrap;
        margin: 20px auto;
    }
    .cta-option{
        border-radius: 40px;
        overflow: hidden;
        width: 50px;
        height: 50px;
        display: flex;
        margin: auto 5px;
    }
    .cta-option.sm {
        width: 30px;
        height: 30px;
    }
    .cta-icon {

        color: $white;
        vertical-align: middle;
        width: 25px;
        height: 25px;
        margin: auto;
    }

    .cta-option.sm .cta-icon {
        width: 15px;
        height: 15px;
    }

</style>