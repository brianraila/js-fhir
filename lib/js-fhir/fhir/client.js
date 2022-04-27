"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FHIRClient = void 0;
var resources_1 = require("../resources");
var cross_fetch_1 = require("cross-fetch");
function isBearer(object) {
    return 'token' in object;
}
function isBasicAuth(object) {
    return 'pass' in object && 'user' in object;
}
var FHIRfetch = function (params, parse) {
    if (parse === void 0) { parse = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _defaultHeaders, response, responseJSON, res_1, res, error_1, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _defaultHeaders = __assign(__assign({ "Content-Type": 'application/json' }, (params.authType === "bearer") && { "Authorization": "Bearer ".concat(isBasicAuth(params.auth)) }), (params.authType === "basicAuth") && { "Authorization": "Basic ".concat(isBearer(params.auth)) });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4, (0, cross_fetch_1.fetch)(String(params.url), __assign({ headers: _defaultHeaders, method: params.method ? String(params.method) : 'GET' }, (params.method !== 'GET') && { body: String(params.data) }))];
                case 2:
                    response = _a.sent();
                    return [4, response.json()];
                case 3:
                    responseJSON = _a.sent();
                    if (parse) {
                        res_1 = {
                            status: response.status,
                            statusText: response.statusText,
                            content: responseJSON
                        };
                        return [2, res_1];
                    }
                    res = {
                        status: response.status,
                        statusText: response.statusText,
                        content: JSON.stringify(responseJSON)
                    };
                    return [2, res];
                case 4:
                    error_1 = _a.sent();
                    res = {
                        statusText: "FHIRFetch: server error",
                        status: 999,
                        content: error_1
                    };
                    console.error(error_1);
                    return [2, res];
                case 5: return [2];
            }
        });
    });
};
var FHIRClient = (function () {
    function FHIRClient(baseUrl, auth) {
        this.baseUrl = baseUrl;
        if (!auth) {
            this.auth = this.noAuth;
            this.authType = 'noAuth';
            this.fetchParams = __assign(__assign({}, this.fetchParams), { auth: null });
            return;
        }
        this.auth = auth;
        if (isBearer(auth)) {
            this.bearer = { token: auth.token };
            this.authType = 'bearer';
            this.fetchParams = __assign(__assign({}, this.fetchParams), { auth: this.bearer });
            return;
        }
        if (isBasicAuth(auth)) {
            this.basicAuth = { user: auth.user, pass: auth.pass };
            this.authType = 'basicAuth';
            this.fetchParams = __assign(__assign({}, this.fetchParams), { auth: this.basicAuth });
            return;
        }
        return;
    }
    FHIRClient.prototype.testConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, FHIRfetch(this.fetchParams)];
                    case 1:
                        _a.response = _b.sent();
                        if (this.response && this.response.status === 200) {
                            return [2, true];
                        }
                        return [2, false];
                }
            });
        });
    };
    FHIRClient.prototype.read = function (resource, id, fields, parse) {
        if (parse === void 0) { parse = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (resources_1.resources.indexOf(resource) < 0) {
                            console.error({ error: "invalid resource name" });
                            return [2, { statusText: "Invalid Resource Name", content: "Unsupported FHIR Resource name provided", status: 900 }];
                        }
                        this.fetchParams = __assign(__assign({}, this.fetchParams), { url: id ? "".concat(this.baseUrl, "/").concat(resource, "/").concat(id) : "".concat(this.baseUrl, "/").concat(resource), method: 'GET' });
                        _a = this;
                        return [4, FHIRfetch(this.fetchParams, parse = parse)];
                    case 1:
                        _a.response = _b.sent();
                        return [2, this.response];
                }
            });
        });
    };
    FHIRClient.prototype.update = function (resource, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (resources_1.resources.indexOf(resource) < 0) {
                            console.error({ error: "invalid resource name" });
                            return [2, { statusText: "Invalid Resource Name", content: "Unsupported FHIR Resource name provided", status: 900 }];
                        }
                        this.fetchParams = __assign(__assign({}, this.fetchParams), { url: "".concat(this.baseUrl, "/").concat(resource, "/").concat(id), method: 'PUT', data: JSON.stringify(__assign({}, (JSON.parse(data)))) });
                        _a = this;
                        return [4, FHIRfetch(this.fetchParams)];
                    case 1:
                        _a.response = _b.sent();
                        return [2, this.response];
                }
            });
        });
    };
    FHIRClient.prototype.search = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (resources_1.resources.indexOf(resource) < 0) {
                            console.error({ error: "invalid resource name" });
                            return [2, { statusText: "Invalid Resource Name", content: "Unsupported FHIR Resource name provided", status: 900 }];
                        }
                        _a = this;
                        return [4, FHIRfetch(this.fetchParams)];
                    case 1:
                        _a.response = _c.sent();
                        this.fetchParams = __assign(__assign({}, this.fetchParams), { url: "".concat(this.baseUrl, "/").concat(resource), method: 'GET' });
                        _b = this;
                        return [4, FHIRfetch(this.fetchParams)];
                    case 2:
                        _b.response = _c.sent();
                        return [2, this.response];
                }
            });
        });
    };
    FHIRClient.prototype.delete = function (resource, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (resources_1.resources.indexOf(resource) < 0) {
                            console.error({ error: "invalid resource name" });
                            return [2, { statusText: "Invalid Resource Name", content: "Unsupported FHIR Resource name provided", status: 900 }];
                        }
                        this.fetchParams = __assign(__assign({}, this.fetchParams), { url: "".concat(this.baseUrl, "/").concat(resource, "/").concat(id), method: 'DELETE' });
                        _a = this;
                        return [4, FHIRfetch(this.fetchParams, true)];
                    case 1:
                        _a.response = _b.sent();
                        return [2, this.response];
                }
            });
        });
    };
    FHIRClient.prototype.save = function (resource, data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (resources_1.resources.indexOf(resource) < 0) {
                            console.error({ error: "Invalid Resource Name" });
                            return [2, { statusText: "Invalid Resource Name", content: "Unsupported FHIR Resource name provided", status: 900 }];
                        }
                        if (id) {
                            if (!(/^[A-Za-z0-9]*$/.test(id))) {
                                console.error('clients may only assign IDs which contain at least one non-numeric character');
                                return [2, { statusText: "invalid resource id", content: "clients may only assign IDs which contain at least one non-numeric character", status: 909 }];
                            }
                        }
                        this.fetchParams = __assign(__assign({}, this.fetchParams), { url: id ? "".concat(this.baseUrl, "/").concat(resource, "/").concat(id) : "".concat(this.baseUrl, "/").concat(resource), method: id ? 'PUT' : 'POST', data: id ? JSON.stringify(__assign(__assign({}, (JSON.parse(data))), { id: id })) : JSON.stringify(JSON.parse(data)) });
                        _a = this;
                        return [4, FHIRfetch(this.fetchParams)];
                    case 1:
                        _a.response = _b.sent();
                        return [2, this.response];
                }
            });
        });
    };
    return FHIRClient;
}());
exports.FHIRClient = FHIRClient;
//# sourceMappingURL=client.js.map