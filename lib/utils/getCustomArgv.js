
Object.defineProperty(exports, "__esModule", { value: true });
function getCustomArgv(list) {
    if (list === void 0) { list = process.argv; }
    var res = {};
    list.forEach(function (item) {
        if (item.startsWith('custom.')) {
            var str = item.replace('custom.', '');
            var strList = str.split('=');
            res[strList[0]] = strList[1];
        }
    });
    return res;
}
exports.default = getCustomArgv;
