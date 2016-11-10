"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tabs_1 = require("../tabs/tabs");
var UserAvatarPage = (function () {
    function UserAvatarPage(navCtrl, ionic, User) {
        this.navCtrl = navCtrl;
        this.ionic = ionic;
        this.User = User;
        this.submitted = false;
        this._user = User.current().attributes;
        if (this._user.photo) {
            this.photo = this._user.photo._url;
        }
        this.form = {
            username: this._user.username,
            name: this._user.name,
            gender: this._user.gender,
            birthday: this._user.birthday,
            status: this._user.status,
            email: this._user.email,
            phone: this._user.phone,
            website: this._user.website,
        };
    }
    UserAvatarPage.prototype.changeAvatar = function () {
        console.log('Mudar Foto');
    };
    UserAvatarPage.prototype.save = function (rForm) {
        var _this = this;
        this.submitted = true;
        if (rForm.valid) {
            this.ionic.onLoading();
            console.log(rForm);
            console.log(this.form);
            this.User.update(this.form).then(function (result) {
                console.log(result);
                _this.ionic.endLoading();
                _this.dismiss();
            }, function (error) {
                console.log(error);
                _this.dismiss();
                _this.ionic.endLoading();
            });
        }
    };
    UserAvatarPage.prototype.dismiss = function () {
        this.navCtrl.push(tabs_1.TabsPage);
    };
    UserAvatarPage = __decorate([
        core_1.Component({
            selector: 'user-avatar',
            templateUrl: 'user-avatar.html'
        })
    ], UserAvatarPage);
    return UserAvatarPage;
}());
exports.UserAvatarPage = UserAvatarPage;