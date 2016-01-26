/**
 * Created by MacBookPro on 6/17/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

Router.configure({
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

/**
 * require login, if user logged in then call loading template else back to login page
 **/

var requireLogin = function () {
    if (!Meteor.user()) {
        this.render("home");
    } else {
        this.next();
    }
}


Router.onBeforeAction(requireLogin, {
    except: [
        'indexLogin',
    ]
});

Router.route('forbidden', {
    template: 'templatePublicForbidden'
});

Router.route('/', {
    name: 'sitesIndex',
    controller: 'FlexurioController',
    action: 'action_home'
});

Router.route('/categorys', {
    name: 'sitesCategorys',
    controller: 'FlexurioController',
    action: 'action_categorys'
});

Router.route('/loading', {
    name: 'sitesLoading',
    controller: 'FlexurioController',
    action: 'action_loading'
});

Router.route('/article', {
    name: 'sitesArticle',
    controller: 'FlexurioController',
    action: 'action_article'
});


Router.route('/profile', {
    name: 'profileIndex',
    controller: 'FlexurioController',
    action: 'action_profile'
});
