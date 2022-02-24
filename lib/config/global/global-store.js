
Object.defineProperty(exports, "__esModule", { value: true });
var global_declaration_1 = require("../../declaration/global-declaration");
var GlobalStore = /** @class */ (function () {
    function GlobalStore() {
        /**
         * @description 模式（开发、生产）
         */
        this._mode = global_declaration_1.ModeEnum.PRO;
        /**
         * @description 是否是开发模式
         */
        this.isDev = false;
        /**
         * @description 是否是生产模式
         */
        this.isPro = true;
    }
    Object.defineProperty(GlobalStore.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            this._mode = mode;
            this.isDev = mode === global_declaration_1.ModeEnum.DEV;
            this.isPro = mode === global_declaration_1.ModeEnum.PRO;
        },
        enumerable: false,
        configurable: true
    });
    return GlobalStore;
}());
var globalStore = new GlobalStore();
exports.default = globalStore;
