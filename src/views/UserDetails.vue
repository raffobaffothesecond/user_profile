<template>
    <div class="info-container">

        <div class="user-list-card main-info">

            <user-avatar
                    class="offset-center shadow"
                    size="lg"
                    :avatar-url="userAvatar" />


            <template v-if="loading">

                <div class="loader-container">
                    <b-spinner
                               class="loading-contact-spinner"
                               label="Spinning"></b-spinner>
                </div>

            </template>
            <template v-else>

                <h2 class="user-full-name">
                    {{userDetails.first_name}} {{userDetails.last_name}}
                </h2>
                <p class="user-email">
                    {{userDetails.email}}
                </p>

                <p class="user-status"
                   :class="{
                             'text-success': userDetails.status === 'active',
                             'text-danger': userDetails.status !== 'active'
                              }">
                    {{userDetails.status}}
                </p>
                <dial-contacts :contacts="contacts"/>

            </template>
        </div>

        <div class="other-info-container"
             :class="{'empty':loading}">

            <!-- Date of Birth -->
            <extra-detail
                    label="Date of birth"
                    :value="formatDob">

                <b-icon-calendar3-event-fill variant="info" />

            </extra-detail>

            <!-- Home Address -->
            <extra-detail
                    v-if="userDetails.address"
                    label="Address"
                    :value="userDetails.address">

                <b-icon-house-door-fill variant="info" />

            </extra-detail>

            <!-- Website Address -->
            <extra-detail
                    label="Website"
                    :link="userDetails.website"
                    :value="userDetails.website"
                    v-if="userDetails.website">


                <b-icon-link45deg variant="info" />

            </extra-detail>

            <!-- Email Plain -->
            <extra-detail
                    label="Email"
                    :link="`mailto:${userDetails.email}`"
                    v-if="userDetails.email"
                    :value="userDetails.email">
                <b-icon-envelope-fill variant="info" />
            </extra-detail>

            <!-- Phone Plain  -->
            <extra-detail
                    label="Telephone"
                    :link="`tel:${userDetails.phone}`"
                    v-if="userDetails.phone"
                    :value="userDetails.phone">
                <b-icon-telephone-fill variant="info" />
            </extra-detail>

        </div>




    </div>
</template>

<script>

    import gorest from '../apis/gorest'


    const UserAvatar = () => import("../components/UserAvatar");
    const DialContacts = () => import("../components/DialContacts");
    const ExtraDetail = () => import("../components/ExtraDetail");

    import { BSpinner, BIconCalendar3EventFill, BIconHouseDoorFill,BIconEnvelopeFill, BIconLink45deg, BIconTelephoneFill } from 'bootstrap-vue'

    export default {
        name: "UserDetails.vue",
        components: {
            UserAvatar,
            DialContacts,
            BSpinner,
            BIconCalendar3EventFill,
            BIconHouseDoorFill,
            BIconLink45deg,
            BIconTelephoneFill,
            BIconEnvelopeFill,
            ExtraDetail
        },
        data(){

            return {
                userDetails: {
                    address: null,
                    dob: null,
                    email: null,
                    first_name: null,
                    gender: null,
                    id: null,
                    last_name: null,
                    phone: null,
                    status: null,
                    website: null,
                    _links: {avatar: null}
                },
                loading: true
            }
        },
        mounted(){
            this.getUser(this.$route.params.userId)
        },
        computed: {
            userAvatar: function () {
                return this.userDetails?._links?.avatar?.href || false
            },
            contacts: function () {
                return {
                    email: this.userDetails.email,
                    phone: this.userDetails.phone
                }
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
             * return dd+'.'+mm+'.'+yyyy
             *
             * or by using a library like moments.js
             */
            formatDob: function () {

                const date = new Date(this.userDetails.dob);
                return date.toLocaleDateString('de-DE');
            }
        },

        methods: {

            getUser(userId) {

                this.loading = true;

                gorest.users.getUser(userId)
                    .then(res => {
                        this.userDetails = {...res?.data?.result};
                    })
                    .catch(() => {
                        //should handle errors
                    })
                    .finally(() => this.loading = false)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .main-info {

        position: relative;
        flex-direction: column;
        margin-top: 80px;
        padding-bottom: 20px;
        text-align: center;
    }

    .offset-center {
        position: relative;
        top: -60px;
        margin: auto;
    }

    .user-full-name {
        font-weight: 600;
    }

    .user-status {
        font-weight: 600;
        text-transform: uppercase;
        font-size: .9em;
    }
    .user-email {

        color: $dark;
        font-size: .9em;
    }

    .loader-container{
        min-height: 150px;
    }

    .loading-contact-spinner{

        width: 100px;
        height: 100px;
    }

    .info-container {
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    @media screen and (min-width: 768px)
    {
        .info-container{
            flex-direction: row;
            width: 768px;
            margin: auto;
            min-height: 80%;
        }

        .main-info {
            margin: auto 3%;
        }

        .other-info-container {
            width: 60%;
            border: solid 1px lighten($dark,70);
            transform: scaleY(1);
            transition: transform .2s ease-out;
            background-color: $white;
            margin: 9px 15px;
            box-shadow: 0 3px 4px rgba($dark,.3);
            border-radius: 4px;
        }

        .other-info-container.empty{
            transform: scaleY(0);
        }

    }

</style>