/**
 * Created by MacBookPro on 7/15/15.
 */

addComments = function(idData, textComments, sCollections){
    sCollections.update(idData, {
            $addToSet: {
                comment: {
                    comment_text: textComments,
                    comment_By: username(),
                    comment_Byid: Meteor.userId(),
                    comment_createdAt: new Date(TimeSync.serverTime())
                }
            }
        },
        {validate: true});
}

