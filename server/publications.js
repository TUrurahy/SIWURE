/**
 * Created by MacBookPro on 6/16/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */


// ------------------ ACTIVITY LOGS -----------------------
Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId});
    } else {
        this.ready();
    }
});
ArticleLists.permit('remove').ifHasRole('root').apply();
ArticleLists.permit('insert').ifHasRole('root').apply();
ArticleLists.permit('update').ifHasRole('root').apply();

// ------------------ ACTIVITY LOGS -----------------------
Meteor.publish('activitylogs', function () {
    return ActivityLogs.find();
});
ActivityLogs.allow({
    'insert': function () {
        return true;
    }
});


// ------------------ ACTIVITY LOGS -----------------------
Meteor.publish('dataNotifications', function () {
    return DataNotifications.find();
});
DataNotifications.allow({
    'insert': function () {
        return true;
    }
});

// -------------------- CATEGORY ------------------------
Meteor.publish('categorys', function () {
    return Categorys.find();
});
Categorys.permit('remove').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
Categorys.permit('update').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
Categorys.permit('insert').ifLoggedIn().apply();

// -------------------- CATEGORY UPKES ------------------------
Meteor.publish('upkesCategorys', function () {
    return UpkesCategorys.find();
});
UpkesCategorys.permit('remove').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
UpkesCategorys.permit('update').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
UpkesCategorys.permit('insert').ifLoggedIn().apply();

// -------------------- CATEGORY UPKES ------------------------
Meteor.publish('upkesDetailCategorys', function () {
    return UpkesDetailCategorys.find();
});
UpkesDetailCategorys.permit('remove').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
UpkesDetailCategorys.permit('update').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
UpkesDetailCategorys.permit('insert').ifLoggedIn().apply();






// -------------------- CATEGORY URL ------------------------
Meteor.publish('categoryURLs', function () {
    return CategoryURLs.find();
});
CategoryURLs.allow({
    'insert': function () {
        return true;
    },
    'remove': function () {
        return true;
    },
    'update': function () {
        return true;
    }
});


// -------------------- ArticleList ------------------------
Meteor.publish('articleLists', function () {
    var start = new Date(new Date().setDate(new Date().getDate() -1));
    var end = new Date(new Date().setDate(new Date().getDate() +1));
    return ArticleLists.find({createdAt : { $gte : start, $lt: end }}, {sort: {createAt: 1},limit:100});
});
ArticleLists.permit('remove').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
ArticleLists.permit('update').ifHasRole('admin').ifHasRole('root').ownsDocument().apply();
ArticleLists.permit('insert').ifLoggedIn().apply();
