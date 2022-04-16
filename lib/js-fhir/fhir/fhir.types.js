"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBasicAuth = exports.isBearer = void 0;
function isBearer(object) {
    return 'token' in object;
}
exports.isBearer = isBearer;
function isBasicAuth(object) {
    return 'pass' in object && 'user' in object;
}
exports.isBasicAuth = isBasicAuth;
//# sourceMappingURL=fhir.types.js.map