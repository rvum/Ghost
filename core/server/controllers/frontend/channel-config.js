var _ = require('lodash'),
    config = require('../../config'),
    channelConfig;

channelConfig = function channelConfig() {
    var defaults = {
        index: {
            name: 'index',
            route: '/',
            frontPageTemplate: 'home'
        },
        tag: {
            name: 'tag',
            route: '/' + config.get('routeKeywords').tag + '/:slug/',
            postOptions: {
                filter: 'tags:\'%s\'+tags.visibility:\'public\''
            },
            data: {
                tag: {
                    type: 'read',
                    resource: 'tags',
                    options: {slug: '%s', visibility: 'public'}
                }
            },
            slugTemplate: true,
            editRedirect: '/ghost/settings/tags/:slug/'
        },
        author: {
            name: 'author',
            route: '/' + config.get('routeKeywords').author + '/:slug/',
            postOptions: {
                filter: 'author:\'%s\''
            },
            data: {
                author: {
                    type: 'read',
                    resource: 'users',
                    options: {slug: '%s'}
                }
            },
            slugTemplate: true,
            editRedirect: '/ghost/team/:slug/'
        }
    };

    return defaults;
};

module.exports.list = function list() {
    return channelConfig();
};

module.exports.get = function get(name) {
    return _.cloneDeep(channelConfig()[name]);
};
