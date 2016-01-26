/**
 * Created by ThinkMac on 1/10/16.
 */

Security.defineMethod('ownsDocument', {
	fetch: ['createByID'],
	deny: function (type, arg, userId, doc) {
		return userId !== doc.createByID;
	}
});