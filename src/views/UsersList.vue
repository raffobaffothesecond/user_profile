<template>
    <div class="users-list-main">

        <div v-if="loading" class="loading-container">
            <div class="loading-text">
                <b-spinner type="grow" label="Loading"></b-spinner>
            </div>
        </div>
        <div v-if="error" class="error-container">
            <div class="error-text">
                <h2>An error occurred</h2>
            </div>
        </div>
        <div class="search-bar shadow-sm">

            <b-icon-search class="mx-2 my-auto"/>

                <b-form-select
                        aria-label="Field to search"
                        class="no-border query-select"
                        v-model="searchQuery"
                        :options="searchOptions">
                </b-form-select>


            <b-form-input
                    id="input-live"
                    aria-label="Value to search"
                    v-model="searchValue"
                    class="no-border"
                    aria-describedby="input-live-help input-live-feedback"
                    :placeholder="searchPlaceholder"
                    trim
            ></b-form-input>

            <b-button size="sm"
                      @click="clearSearch"
                      class="no-radius">Clear</b-button>

        </div>

        <UserListTable :users="users" v-if="!loading && !error" />

        <div class="pagination-container" v-if="pageCount > 1">
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="pageCount"
                            variant="info"
                            pills
                            :per-page="1"
                    ></b-pagination>
                </div>


    </div>

</template>

<script>

    import gorest from '../apis/gorest'
    import { BPagination, BSpinner, BFormInput, BFormSelect, BIconSearch, BButton } from 'bootstrap-vue'
    import { EventBus } from '../EventBus.js';

    const UserListTable = () => ({
        component: import('../components/UsersListTable.vue')
    });

    export default {
        name: "UsersList.vue",
        components: {
            BPagination,BSpinner, UserListTable, BFormInput, BFormSelect, BIconSearch, BButton
        },
        data(){
            return {
                users: [],
                currentPage: 1,
                pageCount: 1,
                loading: true,
                error: false,
                searchQuery: 'first_name',
                searchValue: '',
                inputTimer: null,
                searchOptions: [
                    { value: 'first_name', text: 'First name' },
                    { value: 'last_name', text: 'Last name' },
                ]
            }
        },

        /**
         * On Component mount Register for updates from the EventBus
         * Then Get all the users.
         *
         */
        mounted(){

            EventBus.$on('user-selected', user => {
                const path = `/${user}`;
                if(this.$route.path !== path){
                    this.$router.push(path);
                }
            });

            this.getUsers();
        },
        watch: {

            /**
             *  Observe current page indicator and triggers relative http method
             *
             *
             */
            currentPage: function () {
                if(this.searchQuery === '' && this.searchValue === ''){
                    this.getUsers();
                } else {
                    this.searchUsers({ query:this.searchQuery, value:this.searchValue, page: this.currentPage})

                }
            },

            /**
             *  Observe search query change and triggers http request
             *
             *
             */
            searchQuery: function() {

                if(this.searchValue.length > 3){
                    this.searchUsers({ query:this.searchQuery, value:this.searchValue, page: this.currentPage})
                }
            },

            /**
             *  Observe search value change and triggers http request after 400ms from latest input
             *
             * @param newValue
             * @param oldValue
             */
            searchValue: function (newValue, oldValue) {

                if(newValue !== oldValue){
                    clearTimeout(this.inputTimer);
                    this.inputTimer = setTimeout(() => {
                        this.searchUsers({ query:this.searchQuery, value:newValue, page: this.currentPage})
                    }, 400)
                }
            }
        },

        computed: {

            /**
             * Dynamically change the value of the search input placeholder
             * @return {string}
             */
            searchPlaceholder: function () {

                const what = this.searchOptions
                    .find(option => option.value === this.searchQuery).text;

                return `${what} to search..`

            }
        },

        methods: {

            /**
             * Clean search parameters
             */
            clearSearch(){
                this.searchQuery = 'first_name';
                this.searchValue = '';
            },

            /**
             * Get all ACTIVE users
             */
            getUsers(){

                this.loading = true;
                gorest.users.getUsers(this.currentPage)
                    .then(res => {
                        this.error = false;
                        this.users = res?.data?.result;
                        this.currentPage = res?.data?._meta?.currentPage;
                        this.pageCount = res?.data?._meta?.pageCount;
                    })
                    .catch(() => {
                        this.error = true;
                    })
                    .finally(() => this.loading = false)
            },

            /**
             * Get all users filtered by query
             *
             * @param params Object
             */
            searchUsers(params){
                this.loading = true;
                gorest.users.searchUser(params)
                    .then(res => {

                        this.error = false;
                        this.users = res?.data?.result;
                        this.currentPage = res?.data?._meta?.currentPage;
                        this.pageCount = res?.data?._meta?.pageCount;
                    })
                    .catch(() => {
                        this.error = true;
                    })
                    .finally(() => this.loading = false)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .pagination-container {
        margin: auto auto 0 auto;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;


        .b-pagination{

            margin: auto;
            background-color: rgba($white,.6);
            padding: 8px;
        }
    }

    .users-list-main {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 100%;
        position: relative;
    }

    .loading-container {
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: rgba($white,.8);
        display: flex;
    }

    .loading-text {
        margin: auto;
    }
    .error-container {
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: rgba($white,.8);
        display: flex;
    }

    .error-text {
        margin: auto;
    }

    .search-bar {
        display: flex;
        position: sticky;
        top: 0;
        background-color: $white;
        font-size: .9em;
        z-index: 2;
    }

    .query-select {
       width: 120px;
    }

    .no-border {
        border: none;
        border-radius: 0;
    }

    .no-radius{
        border-radius: 0;
    }
</style>