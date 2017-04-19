"use strict";
var BaseFactory = (function () {
    function BaseFactory() {
        this.instances = {};
    }
    BaseFactory.prototype.add = function (name, intance, override) {
        if (override === void 0) { override = false; }
        if (override && this.instances.hasOwnProperty(name)) {
            return console.error("\u5DF2\u7ECF\u5B58\u5728name=\u3010" + name + "\u3011\u7684engine\uFF01");
        }
        this.instances[name] = intance;
    };
    BaseFactory.prototype.get = function (name) {
        if (this.instances.hasOwnProperty(name)) {
            return this.instances[name];
        }
        return null;
    };
    BaseFactory.prototype.use = function (name) {
        if (!name || !this.instances.hasOwnProperty(name)) {
            throw new Error("base.factory-\u4E0D\u5B58\u5728name=\u3010" + name + "\u3011!");
        }
        return this.instances[name];
    };
    return BaseFactory;
}());
exports.BaseFactory = BaseFactory;
//# sourceMappingURL=base.factory.js.map