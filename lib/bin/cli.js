#!/usr/bin/env node
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var create_project_1 = __importDefault(require("../scripts/create-project/create-project"));
var global_declaration_1 = require("../declaration/global-declaration");
var do_pack_1 = __importDefault(require("../scripts/do-pack/do-pack"));
var sync_1 = __importDefault(require("../scripts/sync/sync"));
var plugin_1 = __importDefault(require("../scripts/plugin/plugin"));
var packageInfo = require('../../package.json');
commander_1.default.version(packageInfo.version);
// .option('-s --sourcemap', '构建时生成 map 文件');
commander_1.default
    .command('create')
    .description('创建项目')
    .action(function () {
    (0, create_project_1.default)();
});
commander_1.default
    .command('start')
    .description('启动项目')
    .action(function () {
    console.log('项目启动中……');
    (0, do_pack_1.default)({
        mode: global_declaration_1.ModeEnum.DEV,
    });
});
commander_1.default
    .command('build')
    .description('构建项目')
    .action(function () {
    console.log("".concat(packageInfo.name, " build"));
    (0, do_pack_1.default)({
        mode: global_declaration_1.ModeEnum.PRO,
    });
});
commander_1.default
    .command('sync')
    .description('同步配置')
    .action(function () {
    (0, sync_1.default)();
});
commander_1.default
    .command('plugin')
    .description('安装插件')
    .action(function () {
    (0, plugin_1.default)();
});
commander_1.default.parse(process.argv);
