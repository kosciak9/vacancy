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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var Template_1 = require("entities/Template");
var typeorm_1 = require("typeorm");
var typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
var TemplateResolver = /** @class */ (function () {
    function TemplateResolver(templateRepository) {
        this.templateRepository = templateRepository;
    }
    TemplateResolver.prototype.recipes = function () {
        return this.templateRepository.find();
    };
    __decorate([
        type_graphql_1.Query(function (returns) { return [Template_1.default]; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TemplateResolver.prototype, "recipes", null);
    TemplateResolver = __decorate([
        type_graphql_1.Resolver(function (of) { return Template_1.default; }),
        __param(0, typeorm_typedi_extensions_1.InjectRepository(Template_1.default)),
        __metadata("design:paramtypes", [typeorm_1.Repository])
    ], TemplateResolver);
    return TemplateResolver;
}());
exports.default = TemplateResolver;
