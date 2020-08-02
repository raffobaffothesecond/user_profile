<template>

        <div class="user-list-card">
            <div class="card-inner">
                <div class="user-thumb">
                    <user-avatar :avatar-url="userAvatar" />
                </div>

                <div class="user-info">

                    <p class="full-name">
                        <span class="d-block d-sm-inline">{{user.first_name}}</span> {{user.last_name}}
                    </p>

                    <p class="user-birthday">
                        <b-icon-calendar3-event variant="muted" /> {{formatDob}}
                    </p>

                    <dial-contacts :contacts="contacts"
                                   :size="'sm'"/>

                </div>

                <div class="user-actions">

                    <b-button size="sm"
                              variant="outline-info"
                              class="opn-btn"
                              @click="openUserDetail()">
                        Details
                    </b-button>

                </div>
            </div>

        </div>
</template>

<script>

    import { BButton,BIconCalendar3Event } from 'bootstrap-vue'
    import UserAvatar from './UserAvatar'
    import { EventBus } from '../EventBus.js';
    import DialContacts from './DialContacts'

    export default {
        name: "UserListCard.vue",

        components: {UserAvatar, BButton,BIconCalendar3Event,DialContacts},

        props: {

            user: {

                type: Object,
                required: true
            }
        },

        computed: {
            contacts: function () {
                return {
                    email: this.user?.email,
                    phone: this.user?.phone
                }
            },
            userAvatar: function() {
                return this.user?._links?.avatar?.href
            },

            /**
             *
             * Format the DOB to DD.MM.YYYY
             * NOTE. Months and days with length of one
             * would not show the prepended 0
             * eg 2010/01/01 will be 1.1.2010
             *
             * to show the "missing" zeros, the function could be modified like so:
             *
             * const date = new Date(this.user?.dob);
             * let dd = date.getDate();
             * let mm = date.getMonth()+1;
             * let yyyy = date.getFullYear();
             * dd = (dd<10) ? '0'+dd : dd;
             * mm = (mm<10) ? '0'+mm : mm;
             *
             * return dd+'.'.mm.'.'.yyyy
             *
             * or by using a library like moments.js
             */
            formatDob: function() {

                const date = new Date(this.user?.dob);
                return date.toLocaleDateString('de-DE');
            }
        },

        methods: {

            /**
             * Emit the user-selected event in the Bus
             */
            openUserDetail() {

                EventBus.$emit('user-selected',this.user.id)
            }
        }


    }
</script>

<style lang="scss" scoped>

    p {
        margin: 2px 0;
    }

    .user-thumb {
        margin: auto;
    }

    .user-status {
        font-weight: 700;
        text-transform: capitalize;
        color: $dark;
    }

    .user-status.active {
        color: $success;
    }

    .opn-btn {
        font-weight: 500;
    }

    .card-inner {
        margin: 5px;
        display: flex;
        flex: 1;
    }

    .user-info {
        margin-left: 15px;
        text-align: left;
        flex: 1;
    }


    .user-actions {
        margin: auto 0 auto 24px;
    }

    .user-list-card {
        margin: 14px;
        max-width: 100%;
    }

    .full-name {
        font-weight: 600;
        color: $dark;
    }

    .user-birthday {
        color: $text-muted;
        font-size: .8em;
        margin: .3em 1px;
    }

    @media screen and (min-width: 768px){
        .user-list-card {
            min-width: 740px;
        }
    }

</style>