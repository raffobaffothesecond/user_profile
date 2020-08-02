module.exports = {
    publicPath: '/userprofiles/dist/',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/main.scss";`
            },
        }
    },
};

