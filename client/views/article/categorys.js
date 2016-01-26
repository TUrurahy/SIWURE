/**
 * Created by MacBookPro on 6/3/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

Template.categorys.created = function () {
	Session.set('limit', 100);
	Session.set('textSearch', "");
	Session.set('isCommentsCategory', false);
	Session.set('idCommentsCategory', "");
	Session.set('scrollPosition', "");

	Deps.autorun(function () {
		Meteor.subscribe('categorys', Session.get('limit'));
	});
}

Template.categorys.rendered = function () {
	$(window).scroll(function () {
		if ($(window).scrollTop() > Session.get('scrollPosition') + 300) {
			Session.set('scrollPosition', $(window).scrollTop());
			incrementLimit();
		}
	});

}

Template.categorys.helpers({
	isCommentsCategory: function () {
		return Session.get('isCommentsCategory');
	},
	isEditingCategory: function () {
		return Session.get('editedCategoryId') === this._id;
	},
	categoryURLs: function () {
		return CategoryURLs.find({categoryID: this._id}).fetch().reverse();
	},
	UpkesCategorys: function () {
		return UpkesCategorys.find({},
			{
				sort: {judul: 1},
				reactive: true
			}).fetch();
	},
	UpkesDetailCategorys: function () {
		return UpkesDetailCategorys.find({categoryUPKES_ID: Session.get('categoryUPKESID')}, {sort: {categoryDetail: 1}}).fetch();
	}
	,

	categorys: function () {
		var textSearch = Session.get('textSearch').replace("#", "").trim();
		return Categorys.find(
			{
				$or: [
					{judul: {$regex: ".*" + textSearch + ".*"}},
					{detail: {$regex: ".*" + textSearch + ".*"}},
					{statusCategorys: {$regex: ".*" + textSearch + ".*"}}
				],
				_id: Session.get('CategoryId')
			},
			{
				sort: {createAt: 1},
				reactive: true,
				limit: Session.get('limit')
			}).fetch().reverse();
	},

	searchAssign: function () {
		var UserList = Meteor.users;
		return {
			limit: 10,
			rules: [
				{
					collection: UserList,
					field: 'username',
					matchAll: true,
					template: Template.searchAssign
				}
			]
		};
	},

	searchCategorys: function () {
		return {
			limit: 10,
			rules: [
				{
					token: '#',
					collection: Categorys,
					field: 'judul',
					matchAll: true,
					template: Template.searchCategorys
				}
			]
		};
	}
});


Template.categorys.events({
	'change #categoryUPKES': function (e, tpl) {
		var kabupatenID = tpl.$('select[name=categoryUPKES]').val();
		console.log(kabupatenID);
		Session.set('categoryUPKESID', kabupatenID);
	},

	'keyup input#searchBox': function (e, tpl) {
		var textSearch = tpl.$('input[name="search"]').val().replace("#", "").trim();
		Session.set('textSearch', textSearch);
	},

	'click a.profileLink': function (e, tpl) {
		e.preventDefault();
		Session.set('profileView', e.currentTarget.id);
		Router.go('/profile');
	},

	"click a.edit": function (e, tpl) {
		e.preventDefault();
		Session.set('editedCategoryId', this._id);
	},

	"click a.addComments": function (e, tpl) {
		e.preventDefault();
		Session.set('isCommentsCategory', true);
		Session.set('idCommentsCategory', this._id);
	},

	'click a.remove': function (e, tpl) {
		e.preventDefault();

		UpkesCategorys.find({categoryID: this._id}).forEach(function (obj) {
			UpkesDetailCategorys.find({categoryUPKES_ID:obj._id}).forEach(function (obj2) {
				UpkesDetailCategorys.remove({_id:obj2._id});
			});
			UpkesCategorys.remove({_id:obj._id});
		});
		Categorys.remove({_id:this._id});

		FlashMessages.sendInfo("Warning ! <BR> " + profileName() + ",<BR>Categorys " + this.judul + ", Telah Anda delete.");
		addActivityLogs("DELETE", username() + " Mendelete data Categorys : `" + this.judul + "` dengan ID : `" + this._id + "`", "categorys", this._id);
		Router.go("/");
	},

	'click a.removeURL': function (e, tpl) {
		e.preventDefault();
		CategoryURLs.remove(e.currentTarget.id);
		FlashMessages.sendInfo("Warning ! <BR> " + profileName() + ",<BR>Categorys " + this.judul + ", Telah Anda delete.");
	},


	'click a.cancel': function (e, tpl) {
		e.preventDefault();
		Session.set('isCreatingCategory', false);
		Session.set('editedCategoryId', null);
		Session.set('isCommentsCategory', false);
	},

	'click a.loadmore': function (e, tpl) {
		e.preventDefault();
		incrementLimit();
	},

	"submit form.form-search": function (e, tpl) {
		e.preventDefault();
		var textSearch = tpl.$('input[name="search"]').val();
		Session.set('textSearch', textSearch);
	},

	"submit form.form-comments": function (e, tpl) {
		e.preventDefault();
		var textsURLS = tpl.$('input[name="sURLS"]').val();

		var categoryUPKESID = tpl.$('select[name="categoryUPKES"]').val();
		if (categoryUPKESID == "" || categoryUPKESID == null || categoryUPKESID == undefined) {
			categoryUPKES = tpl.$('input[name="categoryUPKESNew"]').val();

			UpkesCategorys.insert({
				categoryID: Session.get('idCommentsCategory'),
				categoryNama: Session.get('namaCommentsCategory'),
				judul: categoryUPKES.toUpperCase(),
				createdAt: new Date(),
				createBy: username(),
				createByID: Meteor.userId(),
				urlRSS: []
			}, function (error, _id) {
				if (error) {
					Session.set('isCreatingCategory', true);
					FlashMessages.sendError("New Category : <BR>" + categoryUPKES + ", ERROR TO SAVE. Please try again.<BR>" + error + "");
					return;
				} else {
					categoryUPKESID = _id;
				}
			});

		} else {
			var categoryUPKES = SelectedTerpilih('categoryUPKES');
		}


		if (categoryUPKESID == "" || categoryUPKESID == null || categoryUPKESID == undefined) {
			categoryUPKESID = UpkesCategorys.findOne({judul: categoryUPKES.toUpperCase(), categoryID: Session.get('idCommentsCategory')})._id;
		}


		var categoryIII = tpl.$('select[name="categoryIII"]').val();
		if (categoryIII == "" || categoryIII == undefined || categoryIII == null) {
			categoryIII = tpl.$('input[name="categoryIIINew"]').val();
			UpkesDetailCategorys.insert({
				categoryUPKES_ID: categoryUPKESID,
				categoryDetail: categoryIII.toUpperCase(),
				createdAt: new Date(),
				createBy: username(),
				createByID: Meteor.userId(),
				urlRSS: []
			});
		}

		var tipe = tpl.$('select[name=tipe]').val();

		if (textsURLS.length) {
			CategoryURLs.insert({
				categoryID: Session.get('idCommentsCategory'),
				categoryUPKES_ID: categoryUPKESID,
				categoryUPKES_Nama: categoryUPKES,
				categoryDetail: categoryIII,
				tipe: tipe,
				URL: textsURLS,
				createdAt: new Date(),
				createBy: username(),
				createByID: Meteor.userId()
			}, function (error, _id) {
				if (error) {
					Session.set('isCommentsCategory', true);
					FlashMessages.sendError("New URL : <BR>" + textsURLS + ", ERROR TO SAVE. Please try again.<BR>" + error + "");
				} else {
					FlashMessages.sendInfo("New URL : <BR>" + textsURLS + ", Telah Anda buat.");
					Session.set('isCommentsCategory', false);
				}
			});
		}
	},

	"submit form.form-edit": function (e, tpl) {
		e.preventDefault();

		var categoryName = tpl.$('input[name="name"]').val().toUpperCase();

		if (categoryName.length) {
			addActivityLogs("UPDATE", username() + " mengedit data Categorys : `" + this.judul + "` -->  `" + categoryName + "`", "categorys", this._id);
			Categorys.update(
				this._id,
				{
					$set: {
						judul: categoryName
					}
				});

			Session.set('editedCategoryId', null);
			FlashMessages.sendInfo("Terima kasih " + profileName() + ",<BR>Categorys " + this.judul + ", Telah Anda update.");

		} else {
			FlashMessages.sendInfo("Judul Categorys Kosong, Edit data dibatalkan !");

		}
	}

});
