/**
 * Created by MacBookPro on 6/3/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

Template.profile.helpers({
    fullname:function(){
        return username();
    },
    email:function(){
        return email();
    },
    pictProfile: function () {
        return pictProfile();
    }
});
