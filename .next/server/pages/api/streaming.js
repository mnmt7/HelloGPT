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
exports.id = "pages/api/streaming";
exports.ids = ["pages/api/streaming"];
exports.modules = {

/***/ "express-sse":
/*!******************************!*\
  !*** external "express-sse" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-sse");

/***/ }),

/***/ "langchain/llms/openai":
/*!****************************************!*\
  !*** external "langchain/llms/openai" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("langchain/llms/openai");

/***/ }),

/***/ "(api)/./pages/api/streaming.js":
/*!********************************!*\
  !*** ./pages/api/streaming.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler),\n/* harmony export */   \"dynamic\": () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! langchain/llms/openai */ \"langchain/llms/openai\");\n/* harmony import */ var langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_sse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-sse */ \"express-sse\");\n/* harmony import */ var express_sse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_sse__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst dynamic = \"force-dynamic\";\nconst sse = new (express_sse__WEBPACK_IMPORTED_MODULE_1___default())();\nfunction handler(req, res) {\n    if (req.method === \"POST\") {\n        const { input  } = req.body;\n        if (!input) {\n            throw new Error(\"No input\");\n        }\n        // Initialize model\n        const llm = new langchain_llms_openai__WEBPACK_IMPORTED_MODULE_0__.OpenAI({\n            streaming: true,\n            callbacks: [\n                {\n                    handleLLMNewToken (token) {\n                        sse.send(token, \"newToken\");\n                    }\n                }\n            ]\n        });\n        const [creator, thing] = input.split(\", \");\n        // create the prompt\n        const prompt = `You are ${creator}. Create me a short rap about ${thing}.`;\n        console.log(prompt);\n        // call frontend to backend\n        llm.call(prompt).then(()=>{\n            sse.send(null, \"end\");\n        });\n        return res.status(200).json({\n            result: \"Streaming complete \"\n        });\n    } else if (req.method === \"GET\") {\n        sse.init(req, res);\n    } else {\n        res.status(405).json({\n            message: \"Method not allowed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RyZWFtaW5nLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUErQztBQUNqQjtBQUN2QixNQUFNRSxVQUFVLGdCQUFnQjtBQUN2QyxNQUFNQyxNQUFNLElBQUlGLG9EQUFHQTtBQUVKLFNBQVNHLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ3hDLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE1BQU0sRUFBRUMsTUFBSyxFQUFFLEdBQUdILElBQUlJLElBQUk7UUFFMUIsSUFBSSxDQUFDRCxPQUFPO1lBQ1YsTUFBTSxJQUFJRSxNQUFNLFlBQVk7UUFDOUIsQ0FBQztRQUNELG1CQUFtQjtRQUNuQixNQUFNQyxNQUFNLElBQUlYLHlEQUFNQSxDQUFDO1lBQ3JCWSxXQUFXLElBQUk7WUFDZkMsV0FBVztnQkFDVDtvQkFDRUMsbUJBQWtCQyxLQUFLLEVBQUU7d0JBQ3ZCWixJQUFJYSxJQUFJLENBQUNELE9BQU87b0JBQ2xCO2dCQUNGO2FBQ0Q7UUFDSDtRQUVBLE1BQU0sQ0FBQ0UsU0FBU0MsTUFBTSxHQUFHVixNQUFNVyxLQUFLLENBQUM7UUFDckMsb0JBQW9CO1FBQ3BCLE1BQU1DLFNBQVMsQ0FBQyxRQUFRLEVBQUVILFFBQVEsOEJBQThCLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO1FBQzFFRyxRQUFRQyxHQUFHLENBQUNGO1FBQ1osMkJBQTJCO1FBQzNCVCxJQUFJWSxJQUFJLENBQUNILFFBQVFJLElBQUksQ0FBQyxJQUFNO1lBQzFCckIsSUFBSWEsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQjtRQUVBLE9BQU9WLElBQUltQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFFBQVE7UUFBc0I7SUFDOUQsT0FBTyxJQUFJdEIsSUFBSUUsTUFBTSxLQUFLLE9BQU87UUFDL0JKLElBQUl5QixJQUFJLENBQUN2QixLQUFLQztJQUNoQixPQUFPO1FBQ0xBLElBQUltQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVHLFNBQVM7UUFBcUI7SUFDdkQsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95dC1zY3JpcHQtZ2VuZXJhdG9yLy4vcGFnZXMvYXBpL3N0cmVhbWluZy5qcz83YmU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZW5BSSB9IGZyb20gXCJsYW5nY2hhaW4vbGxtcy9vcGVuYWlcIjtcbmltcG9ydCBTU0UgZnJvbSBcImV4cHJlc3Mtc3NlXCI7XG5leHBvcnQgY29uc3QgZHluYW1pYyA9IFwiZm9yY2UtZHluYW1pY1wiO1xuY29uc3Qgc3NlID0gbmV3IFNTRSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGNvbnN0IHsgaW5wdXQgfSA9IHJlcS5ib2R5O1xuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gaW5wdXRcIik7XG4gICAgfVxuICAgIC8vIEluaXRpYWxpemUgbW9kZWxcbiAgICBjb25zdCBsbG0gPSBuZXcgT3BlbkFJKHtcbiAgICAgIHN0cmVhbWluZzogdHJ1ZSxcbiAgICAgIGNhbGxiYWNrczogW1xuICAgICAgICB7XG4gICAgICAgICAgaGFuZGxlTExNTmV3VG9rZW4odG9rZW4pIHtcbiAgICAgICAgICAgIHNzZS5zZW5kKHRva2VuLCBcIm5ld1Rva2VuXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgY29uc3QgW2NyZWF0b3IsIHRoaW5nXSA9IGlucHV0LnNwbGl0KFwiLCBcIik7XG4gICAgLy8gY3JlYXRlIHRoZSBwcm9tcHRcbiAgICBjb25zdCBwcm9tcHQgPSBgWW91IGFyZSAke2NyZWF0b3J9LiBDcmVhdGUgbWUgYSBzaG9ydCByYXAgYWJvdXQgJHt0aGluZ30uYDtcbiAgICBjb25zb2xlLmxvZyhwcm9tcHQpO1xuICAgIC8vIGNhbGwgZnJvbnRlbmQgdG8gYmFja2VuZFxuICAgIGxsbS5jYWxsKHByb21wdCkudGhlbigoKSA9PiB7XG4gICAgICBzc2Uuc2VuZChudWxsLCBcImVuZFwiKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHJlc3VsdDogXCJTdHJlYW1pbmcgY29tcGxldGUgXCIgfSk7XG4gIH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PT0gXCJHRVRcIikge1xuICAgIHNzZS5pbml0KHJlcSwgcmVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7IG1lc3NhZ2U6IFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJPcGVuQUkiLCJTU0UiLCJkeW5hbWljIiwic3NlIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImlucHV0IiwiYm9keSIsIkVycm9yIiwibGxtIiwic3RyZWFtaW5nIiwiY2FsbGJhY2tzIiwiaGFuZGxlTExNTmV3VG9rZW4iLCJ0b2tlbiIsInNlbmQiLCJjcmVhdG9yIiwidGhpbmciLCJzcGxpdCIsInByb21wdCIsImNvbnNvbGUiLCJsb2ciLCJjYWxsIiwidGhlbiIsInN0YXR1cyIsImpzb24iLCJyZXN1bHQiLCJpbml0IiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/streaming.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/streaming.js"));
module.exports = __webpack_exports__;

})();