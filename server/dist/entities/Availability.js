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
var User_1 = require("entities/User");
var Availability = /** @class */ (function () {
    function Availability() {
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], Availability.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        type_graphql_1.Field(function (type) { return String; }),
        __metadata("design:type", String)
    ], Availability.prototype, "from", void 0);
    __decorate([
        typeorm_1.Column(),
        type_graphql_1.Field(function (type) { return String; }),
        __metadata("design:type", String)
    ], Availability.prototype, "to", void 0);
    __decorate([
        typeorm_1.Column(),
        type_graphql_1.Field(function (type) { return Boolean; }),
        __metadata("design:type", Boolean)
    ], Availability.prototype, "available", void 0);
    __decorate([
        typeorm_1.Column(),
        type_graphql_1.Field(function (type) { return Boolean; }),
        __metadata("design:type", Boolean)
    ], Availability.prototype, "uncertain", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return User_1.default; }),
        typeorm_1.ManyToOne(function (type) { return User_1.default; }),
        __metadata("design:type", User_1.default)
    ], Availability.prototype, "user", void 0);
    Availability = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], Availability);
    return Availability;
}());
exports.default = Availability;
