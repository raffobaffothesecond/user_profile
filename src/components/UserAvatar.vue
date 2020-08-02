
<template>

    <div class="avatar-container"
         :class="size">

        <img :src="avatarUrl"
             alt="avatar"
             v-if="avatarUrl"
             :class="{'toLoad':!avatarReady}"
             @load="avatarReady = true"
             class="img-fluid">

        <b-icon-person-circle
                v-if="!avatarUrl || !avatarReady"
                icon="person-fill"
                variant="secondary"
                :class="size"
                class="placeholder-img">
        </b-icon-person-circle>

        <b-spinner variant="light"
                   v-if="avatarUrl && !avatarReady"
                   label="Loading image"
                   class="img-loader"></b-spinner>

    </div>
</template>

<script>

    import { BIconPersonCircle, BSpinner} from 'bootstrap-vue'

    export default {
        name: "UserAvatar.vue",
        components: {
            BIconPersonCircle, BSpinner
        },
        props: {
            avatarUrl: {
                required: false
            },
            size: {
                type: String,
                required: false,
                default: 'sm'
            }
        },
        data(){
            return {
                avatarReady: false
            }
        }
    }
</script>

<style lang="scss" scoped>

    .avatar-container {

        overflow: hidden;
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background-color: $white;
        position: relative;
    }

    .avatar-container.lg{
        width: 120px;
        height: 120px;
        border-radius: 120px;

    }

    .placeholder-img{
        width: 60px;
        height: 60px;
    }

    .placeholder-img.lg{
        width: 120px;
        height: 120px;
    }

    .toLoad {
        width: 1px;
        height: 1px;
        position: absolute;
    }

    .img-loader {
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin: auto;
    }


</style>