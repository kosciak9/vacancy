"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var Organization_1 = require("entities/Organization");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        type_graphql_1.Field(function (type) { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        type_graphql_1.Field(function (type) { return String; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "locale", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Organization_1.default; }),
        typeorm_1.ManyToOne(function (type) { return Organization_1.default; }),
        __metadata("design:type", Organization_1.default)
    ], User.prototype, "user", void 0);
    User = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], User);
    return User;
}());
exports.default = User;
