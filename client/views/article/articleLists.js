/**
 * Created by MacBookPro on 6/3/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

Template.articleLists.created = function () {
	Session.set('limit', 100);
	Session.set('textSearch', "");
	Session.set('isCommentsArticleList', false);
	Session.set('idCommentsArticleList', "");
	Session.set('scrollPosition', "");

	Deps.autorun(function () {
		Meteor.subscribe('articleLists', Session.get('limit'));
	});
}

Template.articleLists.rendered = function () {

	$(window).scroll(function () {
		if ($(window).scrollTop() > Session.get('scrollPosition') + 100) {
			Session.set('scrollPosition', $(window).scrollTop());
			incrementLimit();
		}
	});

}

Template.articleLists.helpers({
	isAdaFoto: function () {
		return (this.image === "" || this.image === null);
	},

	showTitle: function () {
		return Session.get('showTitle');
	},

	showContent: function () {
		return Session.get('showContent');
	},

	isCommentsArticleList: function () {
		return Session.get('isCommentsArticleList');
	},
	isReadMore: function () {
		return Session.get('isReadMore');
	},
	articleData: function () {
		var textSearch = Session.get('textSearch').replace("#", "").trim();
		var idCategory = Session.get('sCategoryArticle');
		var sFilter = {};


		if (idCategory === "" | idCategory === undefined) {
			sFilter = {
				$or: [
					{title: {$regex: ".*" + textSearch + ".*"}},
					{url: {$regex: ".*" + textSearch + ".*"}}

				]
			};
		} else {
			sFilter = {
				$or: [
					{title: {$regex: ".*" + textSearch + ".*"}},
					{url: {$regex: ".*" + textSearch + ".*"}}
				],
				categoryId: idCategory
			};
		}

		return ArticleLists.find(sFilter,
			{
				sort: {createAt: -1},
				reactive: true,
				limit: Session.get('limit')
			}).fetch();
	}
});

Template.articleLists.events({
	'click a.readMore': function (e, tpl) {
		e.preventDefault();
		Session.set('isReadMore', true);
		Session.set('showTitle', this.title);
		Session.set('showContent', this.content);
	},
	'click a.tutup': function (e, tpl) {
		e.preventDefault();
		Session.set('isReadMore', false);
	}
});