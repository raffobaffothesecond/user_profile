<template>
    <div class="list-container">
        <transition-group name="fade" tag="div" class="list-container-inner"  v-if="users.length">
            <user-list-card
                    v-for="user in users"
                    :key="user.id"
                    :user="user" />
        </transition-group>
        <transition name="fade"
                          v-if="!users.length">

            <div class="empty-list">
                <h3 class="text-dark my-auto">
                    <b-icon-search class="mx-auto my-3 d-block" font-scale="2"/>

                    It seems there are no users with the specified parameters...
                </h3>
            </div>

        </transition>

    </div>
</template>

<script>

    const UserListCard = () => ({
        component: import('../components/UserListCard.vue')
    });
    import {BIconSearch } from 'bootstrap-vue'

    export default {
        name: "UsersListTable.vue",
        components: {
            UserListCard, BIconSearch
        },
        props: {
            users: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

    .fade-enter-active, .fade-leave-active {
        transition: transform .2s ease-in-out;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {

        transform: translateX(-100vw);
    }

    .list-container {
        margin-bottom: 80px;
        max-width: 768px;
    }

    .list-container-inner {

        display: flex;
        flex-direction: column;
        margin: auto;
        width: 100%;
    }

    .empty-list {
        min-height: 80vh;
        display: flex;
        padding: 0 1em;
    }

    @media screen and (min-width: 768px){
        .list-container {
            margin: 10px auto 80px auto;
        }
    }


</style>