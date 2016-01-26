/**
 * Created by MacBookPro on 7/27/15.
 */

var user = Meteor.users.findOne({username: profileName() + ' [ ' + email() + ' ] '});
if(!user) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {username: profileName() + " [ " + email + " ] ", "profile.email": email, "status": "VERIFIED", "jab": "member"}});
}
