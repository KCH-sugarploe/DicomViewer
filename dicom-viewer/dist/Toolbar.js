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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Toolbar = function (_a) {
    var onZoom = _a.onZoom, onFlipH = _a.onFlipH, onFlipV = _a.onFlipV, onRotate = _a.onRotate, onInvert = _a.onInvert, onColormap = _a.onColormap, onReset = _a.onReset, onPrevious = _a.onPrevious, onNext = _a.onNext, disabled = _a.disabled;
    return (_jsxs("div", __assign({ className: "flex space-x-2 p-4 bg-gray-100" }, { children: [_jsx("button", __assign({ onClick: onZoom, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Zoom" })), _jsx("button", __assign({ onClick: onFlipH, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Flip H" })), _jsx("button", __assign({ onClick: onFlipV, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Flip V" })), _jsx("button", __assign({ onClick: onRotate, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Rotate 30\u00B0" })), _jsx("button", __assign({ onClick: onInvert, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Invert" })), _jsx("button", __assign({ onClick: onColormap, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Apply Colormap" })), _jsx("button", __assign({ onClick: onReset, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Reset" })), _jsx("button", __assign({ onClick: onPrevious, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Previous" })), _jsx("button", __assign({ onClick: onNext, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400" }, { children: "Next" }))] })));
};
export default Toolbar;
