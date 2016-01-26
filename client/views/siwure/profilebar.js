/**
 * Created by MacBookPro on 6/18/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */


Template.profilebar.helpers({
    username:function(){
        return profileName();
    },
    email:function(){
        return email();
    },
    pictProfile: function () {
        return pictProfile();
    }
});


Template.profilebar.events({
    'click a.linkLogout': function (e, tpl) {
        Meteor.logout(function () {
            Router.go("/");
        });
    }
});

