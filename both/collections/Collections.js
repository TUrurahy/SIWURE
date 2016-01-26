/**
 * Created by ThinkMac on 10/10/15.
 */

// Log Activity
ActivityLogs = new Mongo.Collection('activitylogs');
DataNotifications = new Mongo.Collection('dataNotifications');

ArticleLists = new Mongo.Collection('articleLists');
Ground.Collection(ArticleLists);

Categorys = new Mongo.Collection('categorys');
Ground.Collection(Categorys);

UpkesCategorys = new Mongo.Collection('upkesCategorys');
Ground.Collection(UpkesCategorys);

UpkesDetailCategorys = new Mongo.Collection('upkesDetailCategorys');
Ground.Collection(UpkesDetailCategorys);


CategoryURLs = new Mongo.Collection('categoryURLs');
Ground.Collection(CategoryURLs);
