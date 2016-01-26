/**
 * Created by MacBookPro on 10/2/15.
 */

Template.sidebar.rendered = function () {
    $("#sidebar").niceScroll(
        {
            autohidemode: 'true',
            cursorwidth: '0px',
            cursorborder: '0px',
            cursoropacitymin:'0',
            cursoropacitymax:'0'
        }
    );
}

/**
 * Created by MacBookPro on 6/3/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */

Template.sidebar.created = function () {
    Session.set('limit', 100);
    Session.set('textSearch', "");
    Session.set('isCommentsCategory', false);
    Session.set('idCommentsCategory', "");
    Session.set('scrollPosition', "");

    Deps.autorun(function () {
        Meteor.subscribe('categorys', Session.get('limit'));
    });
}

Template.sidebar.rendered = function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > Session.get('scrollPosition')+300) {
            Session.set('scrollPosition', $(window).scrollTop());
            incrementLimit();
        }
    });

}

Template.sidebar.helpers({
    isCommentsCategory: function () {
        return Session.get('isCommentsCategory');
    },
    isCreatingCategory: function () {
        return Session.get('isCreatingCategory');
    },
    isWarna: function () {
        if(Session.get('isCreatingCategory')){
            return "darkgrey";
        } else {
            return "white";
        };
    },
    categorys: function () {
        var textSearch = Session.get('textSearch').replace("#", "").trim();
        return Categorys.find(
            {judul: {$regex: ".*" + textSearch + ".*"}},
            {
                sort: {judul: 1},
                reactive: true,
                limit: Session.get('limit')
            }).fetch().reverse();
    },

    searchCategorys: function() {
        return {
            limit: 100,
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


Template.sidebar.events({
    'keyup input#searchBox': function (e, tpl) {
        var textSearch = tpl.$('input[name="search"]').val().replace("#", "").trim();
        Session.set('textSearch', textSearch);
    },

    'click a.create': function (e, tpl) {
        e.preventDefault();
        Session.set('isCreatingCategory', true);
    },

    'click a.lihatarticle': function (e, tpl) {
        e.preventDefault();
        console.log(e.currentTarget.id);
        Session.set('sCategoryArticle', e.currentTarget.id);
        Router.go('/loading');
    },

    'click a.profileLink': function (e, tpl) {
        e.preventDefault();
        Session.set('profileView', e.currentTarget.id);
        Router.go('/profile');
    },

    "click a.editCategory": function (e, tpl) {
        e.preventDefault();
        Session.set('CategoryId', this._id);
        Session.set('CategoryNama', this.judul);
        Router.go("/categorys");
    },

    "click a.addComments": function (e, tpl) {
        e.preventDefault();
        Session.set('isCommentsCategory', true);
        Session.set('idCommentsCategory', this._id);
        Session.set('namaCommentsCategory', this.judul);
    },

    'click a.remove': function (e, tpl) {
        e.preventDefault();
        FlashMessages.sendInfo("Warning ! <BR> " + username() + ",<BR>Categorys " + this.judul + ", Telah Anda delete.");
        addActivityLogs("DELETE", username() + " Mendelete data Categorys : `" + this.judul + "` dengan ID : `" + this._id + "`", "categorys", this._id);

        Categorys.remove(this._id);
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

    'submit form.create-category': function (e, tpl) {
        e.preventDefault();

        var categoryJudul = tpl.$('input[name=name]').val().toUpperCase();

        if(categoryJudul == ""){
            FlashMessages.sendWarning("Mohon input Judul Categorys");
            return;
        }

        Categorys.insert({
            judul: categoryJudul,
            createdAt: new Date(),
            createBy: username(),
            createByID: Meteor.userId(),
            urlRSS: []
        }, function (error, _id) {
            if (error) {
                Session.set('isCreatingCategory', true);
                FlashMessages.sendError("New Category : <BR>" + categoryJudul + ", ERROR TO SAVE. Please try again.<BR>" + error + "");
            } else {
                FlashMessages.sendInfo("New Category : <BR>" + categoryJudul + ", Telah Anda buat.");
                Session.set('isCreatingCategory', false);
            }
        });
    },


    "submit form.form-comments": function (e, tpl) {
        e.preventDefault();
        var textComments = tpl.$('input[name="comments"]').val();
        Session.set('isCommentsCategory', false);
        if (textComments.length) {
            Categorys.update(
                Session.get('idCommentsCategory'),
                {
                    $addToSet: {
                        urlRSS: {
                            url: textComments,
                            url_By: username(),
                            url_Byid: Meteor.userId(),
                            url_createdAt: new Date(TimeSync.serverTime())
                        }
                    }
                },
                {validate: true});
        }

    },

    "submit form.form-edit": function (e, tpl) {
        e.preventDefault();

        var categoryName = tpl.$('input[name="name"]').val();

        if (categoryName.length) {
            addActivityLogs("UPDATE", username() + " mengedit data Categorys : `" + this.judul + "` -->  `" + categoryName + "`", "categorys", this._id);
            Categorys.update(
                this._id,
                {$set: {
                    judul: categoryName}
                });
            Session.set('editedCategoryId', null);
            FlashMessages.sendInfo("Terima kasih " + username() + ",<BR>Categorys " + this.judul + ", Telah Anda update.");

        } else {
            FlashMessages.sendInfo("Judul Categorys Kosong, Edit data dibatalkan !");

        }
    }

});
