/**
 * Created by MacBookPro on 6/18/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

BASE_URL = function() {
    return Meteor.absoluteUrl();
};

incrementLimit = function () {
    newLimit = Session.get('limit') + 5;
    Session.set('limit', newLimit);
};


profileName = function () {
    if(Meteor.userId()){
        return Meteor.user().profile.name;
    }
};
username = function () {
    if(Meteor.userId()){
        return Meteor.user().profile.name + ' [ ' + Meteor.user().services.google.email + ' ] ';
    }

};
email = function () {
    if(Meteor.userId()){
        return Meteor.user().services.google.email;
    }
};
pictProfile = function () {
    if(Meteor.userId()){
        return Meteor.user().services.google.picture;
    } else {
        return "/avatar.jpg";
    }
};


DesktopNotification_Show = function () {
    var user=username();
    Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
            Notification.permission = status;
        }
    });

    var dataNotifikasi = DataNotifications.find({username: user, status: true}).forEach(function (obj) {
        var options = {body: obj.isi, icon: sURL + "images/icon.png"}
        var notification = new Notification(obj.judul, options);

        notification.onclick = function () {
            window.open(obj.url);
        };
        DataNotifications.remove({_id:obj._id});
    });
};


addActivityLogs = function(sStatus, sDetail, sCollectionsData, sIdData){
    ActivityLogs.insert({
        status: sStatus,
        detail: sDetail,
        collectionsData: sCollectionsData,
        idData: sIdData,
        createdAt: new Date(),
        createBy: username(),
        createByID: Meteor.userId()
    });
};


refreshUser = function () {
    if (Meteor.user()) {
        var user = Meteor.users.findOne({'profile.email': email()});
        if(!user) {
            Meteor.call('updateProfile', email(),profileName(), function (err, res) {
                console.log(err);
                console.log(res);
            });
        }
        Router.go("/");
    } else {
        Router.go("/");
    }
}