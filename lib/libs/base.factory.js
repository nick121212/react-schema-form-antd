"use strict";
class BaseFactory {
    constructor() {
        this.instances = {};
    }
    add(name, intance, override = false) {
        if (override && this.instances.hasOwnProperty(name)) {
            return console.error(`已经存在name=【${name}】的engine！`);
        }
        this.instances[name] = intance;
    }
    get(name) {
        if (this.instances.hasOwnProperty(name)) {
            return this.instances[name];
        }
        return null;
    }
    use(name) {
        if (!name || !this.instances.hasOwnProperty(name)) {
            throw new Error(`base.factory-不存在name=【${name}】!`);
        }
        return this.instances[name];
    }
}
exports.BaseFactory = BaseFactory;
//# sourceMappingURL=base.factory.js.map