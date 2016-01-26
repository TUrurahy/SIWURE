/**
 * Created by ThinkMac on 1/4/16.
 */

var read = Meteor.npmRequire('readability-js');


var isiBerita = function () {
	ArticleLists.find({content: "SERVER NOT UP TO DATE"}).forEach(function (obj) {
		read(obj.link, Meteor.bindEnvironment (function (err, article) {
			var sArticleJudul = article.title;
			if (sArticleJudul == "404 error: page not found" || sArticleJudul == "") {
				console.log("----------------------");
				console.log(sArticleJudul);
				console.log(obj.link);
				console.log("----------------------");
				ArticleLists.remove(obj._id);
				console.log("GET DETAIL ARTICLE -- > NOT UP TO DATE");
			} else {
				ArticleLists.update({_id: obj._id},
						{
							$set: {content: article.content.text()}
						},
						function (error) {
							if (error) {
								ArticleLists.remove(obj._id);
								console.log("GET DETAIL ARTICLE -- > NO TEXT CONTENT");
							} else {
								console.log("NEW ARTICLE -- > GET DETAIL");
							}
						})


			}
		}));
	});
}
var updateBerita = function () {
	console.log("UPDATE BERITA");
	CategoryURLs.find().forEach(function (obj) {
		var username = "CRON SERVER";
		var userid = "CRS";
		var categoryID = obj.categoryID;
		var categoryUPKESID = obj.categoryUPKES_ID;
		var categoryUPKESDetail = obj.categoryDetail;
		var sURL = obj.URL;
		var sTipe = obj.tipe;

		var tData;
		var dataInsert = "ALL ARTICLE UP TO DATE";
		var dataBaru;
		var dataDetail, sUrl;

		if (sTipe === "WEB ARTICLE") {
			tData = Scrape.website(sURL);
		} else if (sTipe === "RSS") {
			tData = Scrape.feed(sURL);
		} else if (sTipe === "WIKIPEDIA") {
			tData = Scrape.wikipedia(sURL);
		} else if (sTipe === "URL") {
			tData = Scrape.url(sURL);
		}


		if (tData.items) {
			for (var i = 0; i < tData.items.length; i++) {

				sUrl = tData.items[i].link;
				if (sUrl === "") {
					sUrl = tData.items[i].url;
				}

				var dataArticle = ArticleLists.findOne({$or: [{link: sUrl}, {title: tData.items[i].title}]})

				if (dataArticle === undefined) {
					dataInsert = "UPDATE NEW ARTICLE";

					dataBaru = {
						categoryId: categoryID,
						categoryUPKES: categoryUPKESID,
						categoryDetailUPKES: categoryUPKESDetail,
						title: tData.items[i].title,
						content: "SERVER NOT UP TO DATE",
						description: tData.items[i].description,
						link: sUrl,
						pubDate: tData.items[i].pubDate,
						image: tData.items[i].image,
						language: tData.items[i].language,
						tags: tData.items[i].tags,
						createdAt: new Date(),
						createBy: username,
						createByID: userid

					};

					if (sUrl == undefined) {
						console.log("URL " + sUrl + "GAK VALID BROO,....");
					} else {
						ArticleLists.insert(dataBaru, function (error, _id) {
							if (error) {
								alert(error);
							} else {
								console.log("NEW ARTICLE");
							}
						});
					}
				}
			}
		} else {
			console.log("UP TO DATE");
		}

		isiBerita();

	});
}

Meteor.startup(function () {
	WebApp.connectHandlers.use(function (req, res, next) {
		res.setHeader("access-control-allow-origin", "*");
		return next();
	});

	updateBerita();
	isiBerita();
});

var cronUpdate = new Meteor.Cron({
	events: {
		"6 * * * *": updateBerita,
		"6 * * * *": isiBerita,
	}
});