/**
 * Created by MacBookPro on 9/21/15.
 */


Template.header.created = function () {
	if (Meteor.user()) {
		DesktopNotification_Show();
	}
};

Template.header.helpers({
	pictProfile: function () {
		return pictProfile();
	}
});
