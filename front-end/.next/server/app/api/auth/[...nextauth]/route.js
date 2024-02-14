"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=D%3A%5Clearn%5Cvidx%5Cfront-end%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Clearn%5Cvidx%5Cfront-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=D%3A%5Clearn%5Cvidx%5Cfront-end%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Clearn%5Cvidx%5Cfront-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_learn_vidx_front_end_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.js */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\learn\\\\vidx\\\\front-end\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.js\",\n    nextConfigOutput,\n    userland: D_learn_vidx_front_end_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1EJTNBJTVDbGVhcm4lNUN2aWR4JTVDZnJvbnQtZW5kJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDbGVhcm4lNUN2aWR4JTVDZnJvbnQtZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3dCO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlkeC8/Y2FhOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxsZWFyblxcXFx2aWR4XFxcXGZyb250LWVuZFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcbGVhcm5cXFxcdmlkeFxcXFxmcm9udC1lbmRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=D%3A%5Clearn%5Cvidx%5Cfront-end%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Clearn%5Cvidx%5Cfront-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.js":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   handler: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_github__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/github */ \"(rsc)/./node_modules/next-auth/providers/github.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _lib_user_handleSignIn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/user/handleSignIn */ \"(rsc)/./src/lib/user/handleSignIn.js\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_github__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            id: \"github\",\n            clientId: process.env.GITHUB_CLIENT_ID,\n            clientSecret: process.env.GITHUB_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            id: \"google\",\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile, email, credentials }) {\n            if (account?.provider == \"github\" || account?.provider == \"google\") {\n                const res = await (0,_lib_user_handleSignIn__WEBPACK_IMPORTED_MODULE_3__.handleSignIn)({\n                    name: user.name,\n                    email: user.email,\n                    password: \"\",\n                    image: user.image,\n                    method: account?.provider\n                });\n                if (res?.success) {\n                    return true;\n                } else {\n                    return false;\n                }\n            }\n        },\n        async redirect ({ url, baseUrl }) {\n            return baseUrl;\n        },\n        async jwt ({ token, user }) {\n            return token;\n        },\n        async session ({ session, token, user }) {\n            return session;\n        }\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ3VCO0FBQ0E7QUFDRDtBQUVoRCxNQUFNSSxjQUFjO0lBQ3pCQyxXQUFXO1FBQ1RKLHNFQUFjQSxDQUFDO1lBQ2JLLElBQUk7WUFDSkMsVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7WUFDdENDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CO1FBQ2hEO1FBQ0FWLHNFQUFjQSxDQUFDO1lBQ2JJLElBQUk7WUFDSkMsVUFBVUMsUUFBUUMsR0FBRyxDQUFDSSxnQkFBZ0I7WUFDdENGLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0ssb0JBQW9CO1FBQ2hEO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLFFBQU8sRUFBRUMsSUFBSSxFQUFFQyxPQUFPLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxXQUFXLEVBQUU7WUFDekQsSUFBSUgsU0FBU0ksWUFBWSxZQUFZSixTQUFTSSxZQUFZLFVBQVU7Z0JBQ2xFLE1BQU1DLE1BQU0sTUFBTXBCLG9FQUFZQSxDQUFDO29CQUM3QnFCLE1BQU1QLEtBQUtPLElBQUk7b0JBQ2ZKLE9BQU9ILEtBQUtHLEtBQUs7b0JBQ2pCSyxVQUFVO29CQUNWQyxPQUFPVCxLQUFLUyxLQUFLO29CQUNqQkMsUUFBUVQsU0FBU0k7Z0JBQ25CO2dCQUVBLElBQUlDLEtBQUtLLFNBQVM7b0JBQ2hCLE9BQU87Z0JBQ1QsT0FBTztvQkFDTCxPQUFPO2dCQUNUO1lBQ0Y7UUFDRjtRQUNBLE1BQU1DLFVBQVMsRUFBRUMsR0FBRyxFQUFFQyxPQUFPLEVBQUU7WUFDN0IsT0FBT0E7UUFDVDtRQUNBLE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFaEIsSUFBSSxFQUFFO1lBQ3ZCLE9BQU9nQjtRQUNUO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRWhCLElBQUksRUFBRTtZQUNwQyxPQUFPaUI7UUFDVDtJQUNGO0FBQ0YsRUFBRTtBQUVLLE1BQU1DLFVBQVVuQyxnREFBUUEsQ0FBQ0ksYUFBYTtBQUVGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlkeC8uL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcz8yMzJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBHaXRodWJQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9naXRodWJcIjtcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xyXG5pbXBvcnQgeyBoYW5kbGVTaWduSW4gfSBmcm9tIFwiQC9saWIvdXNlci9oYW5kbGVTaWduSW5cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEdpdGh1YlByb3ZpZGVyKHtcclxuICAgICAgaWQ6IFwiZ2l0aHViXCIsXHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX0lELFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdJVEhVQl9DTElFTlRfU0VDUkVULFxyXG4gICAgfSksXHJcbiAgICBHb29nbGVQcm92aWRlcih7XHJcbiAgICAgIGlkOiBcImdvb2dsZVwiLFxyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlLCBlbWFpbCwgY3JlZGVudGlhbHMgfSkge1xyXG4gICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT0gXCJnaXRodWJcIiB8fCBhY2NvdW50Py5wcm92aWRlciA9PSBcImdvb2dsZVwiKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgaGFuZGxlU2lnbkluKHtcclxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcclxuICAgICAgICAgIG1ldGhvZDogYWNjb3VudD8ucHJvdmlkZXIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZXM/LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcmVkaXJlY3QoeyB1cmwsIGJhc2VVcmwgfSkge1xyXG4gICAgICByZXR1cm4gYmFzZVVybDtcclxuICAgIH0sXHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHaXRodWJQcm92aWRlciIsIkdvb2dsZVByb3ZpZGVyIiwiaGFuZGxlU2lnbkluIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJpZCIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdJVEhVQl9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHSVRIVUJfQ0xJRU5UX1NFQ1JFVCIsIkdPT0dMRV9DTElFTlRfSUQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImNhbGxiYWNrcyIsInNpZ25JbiIsInVzZXIiLCJhY2NvdW50IiwicHJvZmlsZSIsImVtYWlsIiwiY3JlZGVudGlhbHMiLCJwcm92aWRlciIsInJlcyIsIm5hbWUiLCJwYXNzd29yZCIsImltYWdlIiwibWV0aG9kIiwic3VjY2VzcyIsInJlZGlyZWN0IiwidXJsIiwiYmFzZVVybCIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/db/connect.js":
/*!*******************************!*\
  !*** ./src/lib/db/connect.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet connectionStatus = false;\nconst connectToDB = async ()=>{\n    if (connectionStatus) {\n        console.log(\"[*] Already Connected to MongoDB...\");\n        return true;\n    }\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI);\n        console.log(\"[*] Connected to Mongodb...\");\n        connectionStatus = true;\n        return true;\n    } catch (e) {\n        return false;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiL2Nvbm5lY3QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLElBQUlDLG1CQUFtQjtBQUVoQixNQUFNQyxjQUFjO0lBQ3pCLElBQUlELGtCQUFrQjtRQUNwQkUsUUFBUUMsR0FBRyxDQUFDO1FBQ1osT0FBTztJQUNUO0lBRUEsSUFBSTtRQUNGLE1BQU1KLHVEQUFnQixDQUFDTSxRQUFRQyxHQUFHLENBQUNDLFdBQVc7UUFDOUNMLFFBQVFDLEdBQUcsQ0FBQztRQUNaSCxtQkFBbUI7UUFDbkIsT0FBTztJQUNULEVBQUUsT0FBT1EsR0FBRztRQUNWLE9BQU87SUFDVDtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWR4Ly4vc3JjL2xpYi9kYi9jb25uZWN0LmpzPzdjNGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxubGV0IGNvbm5lY3Rpb25TdGF0dXMgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb25uZWN0VG9EQiA9IGFzeW5jICgpID0+IHtcclxuICBpZiAoY29ubmVjdGlvblN0YXR1cykge1xyXG4gICAgY29uc29sZS5sb2coXCJbKl0gQWxyZWFkeSBDb25uZWN0ZWQgdG8gTW9uZ29EQi4uLlwiKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QocHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkpO1xyXG4gICAgY29uc29sZS5sb2coXCJbKl0gQ29ubmVjdGVkIHRvIE1vbmdvZGIuLi5cIik7XHJcbiAgICBjb25uZWN0aW9uU3RhdHVzID0gdHJ1ZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImNvbm5lY3Rpb25TdGF0dXMiLCJjb25uZWN0VG9EQiIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0IiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db/connect.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/models/user.model.js":
/*!**************************************!*\
  !*** ./src/lib/models/user.model.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserModel: () => (/* binding */ UserModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst authSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    email: {\n        type: String,\n        required: [\n            true,\n            \"Email is required.\"\n        ],\n        unique: [\n            true,\n            \"Email already exists.\"\n        ],\n        trim: true\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Password is required.\"\n        ],\n        trim: true\n    },\n    name: {\n        type: String,\n        lowercase: true,\n        required: [\n            true,\n            \"Name is required.\"\n        ],\n        trim: true\n    },\n    image: {\n        type: String,\n        default: \"https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg\"\n    },\n    hasChannel: {\n        type: Boolean,\n        default: false,\n        required: [\n            true,\n            \"Channel is required.\"\n        ]\n    },\n    dob: {\n        type: String\n    },\n    method: {\n        type: String,\n        lowercase: true,\n        enum: [\n            \"google\",\n            \"github\"\n        ],\n        trim: true,\n        required: [\n            true,\n            \"Method is required\"\n        ]\n    }\n}, {\n    timestamps: true\n});\nconst UserModel = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models)[\"user\"] || new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model)(\"user\", authSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vZGVscy91c2VyLm1vZGVsLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxhQUFhLElBQUlELHdEQUFlLENBQ3BDO0lBQ0VHLE9BQU87UUFDTEMsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBcUI7UUFDdENDLFFBQVE7WUFBQztZQUFNO1NBQXdCO1FBQ3ZDQyxNQUFNO0lBQ1I7SUFDQUMsVUFBVTtRQUNSTCxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUF3QjtRQUN6Q0UsTUFBTTtJQUNSO0lBQ0FFLE1BQU07UUFDSk4sTUFBTUM7UUFDTk0sV0FBVztRQUNYTCxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0UsTUFBTTtJQUNSO0lBQ0FJLE9BQU87UUFDTFIsTUFBTUM7UUFDTlEsU0FDRTtJQUNKO0lBQ0FDLFlBQVk7UUFDVlYsTUFBTVc7UUFDTkYsU0FBUztRQUNUUCxVQUFVO1lBQUM7WUFBTTtTQUF1QjtJQUMxQztJQUNBVSxLQUFLO1FBQ0haLE1BQU1DO0lBQ1I7SUFDQVksUUFBUTtRQUNOYixNQUFNQztRQUNOTSxXQUFXO1FBQ1hPLE1BQU07WUFBQztZQUFVO1NBQVM7UUFDMUJWLE1BQU07UUFDTkYsVUFBVTtZQUFDO1lBQU07U0FBcUI7SUFDeEM7QUFDRixHQUNBO0lBQUVhLFlBQVk7QUFBSztBQUdkLE1BQU1DLFlBQ1hwQix3REFBZSxDQUFDLE9BQU8sSUFBSSxJQUFJQSx1REFBYyxDQUFDLFFBQVFDLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWR4Ly4vc3JjL2xpYi9tb2RlbHMvdXNlci5tb2RlbC5qcz82NmQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IGF1dGhTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gIHtcclxuICAgIGVtYWlsOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIkVtYWlsIGlzIHJlcXVpcmVkLlwiXSxcclxuICAgICAgdW5pcXVlOiBbdHJ1ZSwgXCJFbWFpbCBhbHJlYWR5IGV4aXN0cy5cIl0sXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmQ6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGFzc3dvcmQgaXMgcmVxdWlyZWQuXCJdLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIG5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBsb3dlcmNhc2U6IHRydWUsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJOYW1lIGlzIHJlcXVpcmVkLlwiXSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBpbWFnZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgXCJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzUvNTAvVXNlcl9pY29uLWNwLnN2Z1wiLFxyXG4gICAgfSxcclxuICAgIGhhc0NoYW5uZWw6IHtcclxuICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJDaGFubmVsIGlzIHJlcXVpcmVkLlwiXSxcclxuICAgIH0sXHJcbiAgICBkb2I6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgfSxcclxuICAgIG1ldGhvZDoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcclxuICAgICAgZW51bTogW1wiZ29vZ2xlXCIsIFwiZ2l0aHViXCJdLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiTWV0aG9kIGlzIHJlcXVpcmVkXCJdLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgVXNlck1vZGVsID1cclxuICBtb25nb29zZS5tb2RlbHNbXCJ1c2VyXCJdIHx8IG5ldyBtb25nb29zZS5tb2RlbChcInVzZXJcIiwgYXV0aFNjaGVtYSk7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImF1dGhTY2hlbWEiLCJTY2hlbWEiLCJlbWFpbCIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInVuaXF1ZSIsInRyaW0iLCJwYXNzd29yZCIsIm5hbWUiLCJsb3dlcmNhc2UiLCJpbWFnZSIsImRlZmF1bHQiLCJoYXNDaGFubmVsIiwiQm9vbGVhbiIsImRvYiIsIm1ldGhvZCIsImVudW0iLCJ0aW1lc3RhbXBzIiwiVXNlck1vZGVsIiwibW9kZWxzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/models/user.model.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/user/handleSignIn.js":
/*!**************************************!*\
  !*** ./src/lib/user/handleSignIn.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleSignIn: () => (/* binding */ handleSignIn)\n/* harmony export */ });\n/* harmony import */ var _lib_db_connect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db/connect.js */ \"(rsc)/./src/lib/db/connect.js\");\n/* harmony import */ var _lib_models_user_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/models/user.model.js */ \"(rsc)/./src/lib/models/user.model.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst handleSignIn = async ({ name, email, password, image, method })=>{\n    try {\n        // converting name to lower case\n        name = String(name).toLowerCase();\n        // connect to database\n        await (0,_lib_db_connect_js__WEBPACK_IMPORTED_MODULE_0__.connectToDB)();\n        // login user if exists\n        const user = await _lib_models_user_model_js__WEBPACK_IMPORTED_MODULE_1__.UserModel.findOne({\n            email\n        });\n        if (user) {\n            // matching previous method and current method of authentication\n            if (method !== user.method) {\n                throw new Error(`Authentication method ${method}`);\n            }\n            let userData = {\n                id: user._id,\n                name: name,\n                email,\n                image: user.image,\n                joined_at: user.createdAt\n            };\n            return {\n                success: true,\n                message: `User found.`,\n                userData\n            };\n        }\n        // generating new password if not provided\n        if (!password) {\n            password = crypto__WEBPACK_IMPORTED_MODULE_3___default().randomBytes(16).toString(\"hex\");\n        }\n        if (!image) image = undefined;\n        // create new user if do not exists\n        await new _lib_models_user_model_js__WEBPACK_IMPORTED_MODULE_1__.UserModel({\n            name,\n            email,\n            password: bcrypt__WEBPACK_IMPORTED_MODULE_2___default().hashSync(password, 10),\n            image,\n            method\n        }).save();\n        const newUser = await _lib_models_user_model_js__WEBPACK_IMPORTED_MODULE_1__.UserModel.findOne({\n            email\n        });\n        let userData = {\n            id: newUser._id,\n            name,\n            email,\n            image: newUser.image,\n            joined_at: newUser.createdAt\n        };\n        return {\n            success: true,\n            message: `User created.`,\n            userData\n        };\n    } catch (error) {\n        return {\n            success: false,\n            error: error.message\n        };\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3VzZXIvaGFuZGxlU2lnbkluLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBa0Q7QUFDSztBQUMzQjtBQUNBO0FBRXJCLE1BQU1JLGVBQWUsT0FBTyxFQUNqQ0MsSUFBSSxFQUNKQyxLQUFLLEVBQ0xDLFFBQVEsRUFDUkMsS0FBSyxFQUNMQyxNQUFNLEVBQ1A7SUFDQyxJQUFJO1FBQ0YsZ0NBQWdDO1FBQ2hDSixPQUFPSyxPQUFPTCxNQUFNTSxXQUFXO1FBRS9CLHNCQUFzQjtRQUN0QixNQUFNWCwrREFBV0E7UUFFakIsdUJBQXVCO1FBQ3ZCLE1BQU1ZLE9BQU8sTUFBTVgsZ0VBQVNBLENBQUNZLE9BQU8sQ0FBQztZQUFFUDtRQUFNO1FBQzdDLElBQUlNLE1BQU07WUFDUixnRUFBZ0U7WUFDaEUsSUFBSUgsV0FBV0csS0FBS0gsTUFBTSxFQUFFO2dCQUMxQixNQUFNLElBQUlLLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRUwsT0FBTyxDQUFDO1lBQ25EO1lBRUEsSUFBSU0sV0FBVztnQkFDYkMsSUFBSUosS0FBS0ssR0FBRztnQkFDWlosTUFBTUE7Z0JBQ05DO2dCQUNBRSxPQUFPSSxLQUFLSixLQUFLO2dCQUNqQlUsV0FBV04sS0FBS08sU0FBUztZQUMzQjtZQUVBLE9BQU87Z0JBQ0xDLFNBQVM7Z0JBQ1RDLFNBQVMsQ0FBQyxXQUFXLENBQUM7Z0JBQ3RCTjtZQUNGO1FBQ0Y7UUFFQSwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDUixVQUFVO1lBQ2JBLFdBQVdKLHlEQUFrQixDQUFDLElBQUlvQixRQUFRLENBQUM7UUFDN0M7UUFFQSxJQUFJLENBQUNmLE9BQU9BLFFBQVFnQjtRQUVwQixtQ0FBbUM7UUFDbkMsTUFBTSxJQUFJdkIsZ0VBQVNBLENBQUM7WUFDbEJJO1lBQ0FDO1lBQ0FDLFVBQVVMLHNEQUFlLENBQUNLLFVBQVU7WUFDcENDO1lBQ0FDO1FBQ0YsR0FBR2lCLElBQUk7UUFFUCxNQUFNQyxVQUFVLE1BQU0xQixnRUFBU0EsQ0FBQ1ksT0FBTyxDQUFDO1lBQUVQO1FBQU07UUFDaEQsSUFBSVMsV0FBVztZQUNiQyxJQUFJVyxRQUFRVixHQUFHO1lBQ2ZaO1lBQ0FDO1lBQ0FFLE9BQU9tQixRQUFRbkIsS0FBSztZQUNwQlUsV0FBV1MsUUFBUVIsU0FBUztRQUM5QjtRQUVBLE9BQU87WUFDTEMsU0FBUztZQUNUQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ3hCTjtRQUNGO0lBQ0YsRUFBRSxPQUFPYSxPQUFPO1FBQ2QsT0FBTztZQUFFUixTQUFTO1lBQU9RLE9BQU9BLE1BQU1QLE9BQU87UUFBQztJQUNoRDtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWR4Ly4vc3JjL2xpYi91c2VyL2hhbmRsZVNpZ25Jbi5qcz8yZDBhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbm5lY3RUb0RCIH0gZnJvbSBcIkAvbGliL2RiL2Nvbm5lY3QuanNcIjtcclxuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSBcIkAvbGliL21vZGVscy91c2VyLm1vZGVsLmpzXCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xyXG5pbXBvcnQgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTaWduSW4gPSBhc3luYyAoe1xyXG4gIG5hbWUsXHJcbiAgZW1haWwsXHJcbiAgcGFzc3dvcmQsXHJcbiAgaW1hZ2UsXHJcbiAgbWV0aG9kLFxyXG59KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIGNvbnZlcnRpbmcgbmFtZSB0byBsb3dlciBjYXNlXHJcbiAgICBuYW1lID0gU3RyaW5nKG5hbWUpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgLy8gY29ubmVjdCB0byBkYXRhYmFzZVxyXG4gICAgYXdhaXQgY29ubmVjdFRvREIoKTtcclxuXHJcbiAgICAvLyBsb2dpbiB1c2VyIGlmIGV4aXN0c1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICAvLyBtYXRjaGluZyBwcmV2aW91cyBtZXRob2QgYW5kIGN1cnJlbnQgbWV0aG9kIG9mIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgIGlmIChtZXRob2QgIT09IHVzZXIubWV0aG9kKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdXRoZW50aWNhdGlvbiBtZXRob2QgJHttZXRob2R9YCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB1c2VyRGF0YSA9IHtcclxuICAgICAgICBpZDogdXNlci5faWQsXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBlbWFpbCxcclxuICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcclxuICAgICAgICBqb2luZWRfYXQ6IHVzZXIuY3JlYXRlZEF0LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIG1lc3NhZ2U6IGBVc2VyIGZvdW5kLmAsXHJcbiAgICAgICAgdXNlckRhdGEsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2VuZXJhdGluZyBuZXcgcGFzc3dvcmQgaWYgbm90IHByb3ZpZGVkXHJcbiAgICBpZiAoIXBhc3N3b3JkKSB7XHJcbiAgICAgIHBhc3N3b3JkID0gY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KS50b1N0cmluZyhcImhleFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWltYWdlKSBpbWFnZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvLyBjcmVhdGUgbmV3IHVzZXIgaWYgZG8gbm90IGV4aXN0c1xyXG4gICAgYXdhaXQgbmV3IFVzZXJNb2RlbCh7XHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIGVtYWlsLFxyXG4gICAgICBwYXNzd29yZDogYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkLCAxMCksXHJcbiAgICAgIGltYWdlLFxyXG4gICAgICBtZXRob2QsXHJcbiAgICB9KS5zYXZlKCk7XHJcblxyXG4gICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICBsZXQgdXNlckRhdGEgPSB7XHJcbiAgICAgIGlkOiBuZXdVc2VyLl9pZCxcclxuICAgICAgbmFtZSxcclxuICAgICAgZW1haWwsXHJcbiAgICAgIGltYWdlOiBuZXdVc2VyLmltYWdlLFxyXG4gICAgICBqb2luZWRfYXQ6IG5ld1VzZXIuY3JlYXRlZEF0LFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBgVXNlciBjcmVhdGVkLmAsXHJcbiAgICAgIHVzZXJEYXRhLFxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH07XHJcbiAgfVxyXG59O1xyXG4iXSwibmFtZXMiOlsiY29ubmVjdFRvREIiLCJVc2VyTW9kZWwiLCJiY3J5cHQiLCJjcnlwdG8iLCJoYW5kbGVTaWduSW4iLCJuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsImltYWdlIiwibWV0aG9kIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJ1c2VyIiwiZmluZE9uZSIsIkVycm9yIiwidXNlckRhdGEiLCJpZCIsIl9pZCIsImpvaW5lZF9hdCIsImNyZWF0ZWRBdCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwicmFuZG9tQnl0ZXMiLCJ0b1N0cmluZyIsInVuZGVmaW5lZCIsImhhc2hTeW5jIiwic2F2ZSIsIm5ld1VzZXIiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/user/handleSignIn.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/yallist","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=D%3A%5Clearn%5Cvidx%5Cfront-end%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Clearn%5Cvidx%5Cfront-end&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();