/**
 * Created by MacBookPro on 6/17/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

FlexurioController = RouteController.extend({
    onBeforeAction: function () {
        this.next();
    },
    action_home: function () {
        this.render('home');
    },
    action_article: function () {
        this.render('articleLists');
    },
    action_categorys: function () {
        this.render('categorys');
    },
    action_loading: function () {
        this.render('loading');
    },
    action_profile: function () {
        this.render('profile');
    }

});
