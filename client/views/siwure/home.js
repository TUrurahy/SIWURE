/**
 * Created by ThinkMac on 12/14/15.
 */

Template.home.events({
	'click a#loginGoogle': function(e, t) {
		e.preventDefault();

		console.log("MASUK");
		Meteor.loginWithGoogle(
			{
				requestPermissions: [
					'https://picasaweb.google.com/data/',
					'https://www.googleapis.com/auth/userinfo.email',
					'https://www.googleapis.com/auth/userinfo.profile',
					'https://www.googleapis.com/auth/plus.me'
				],
				requestOfflineToken: 'true'
			}, Router.go('/'));
	}
})
