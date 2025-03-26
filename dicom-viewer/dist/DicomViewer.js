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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import dicomImageLoader from '@cornerstonejs/dicom-image-loader';
var DicomViewer = function (_a) {
    var imageIds = _a.imageIds, selectedImageIndex = _a.selectedImageIndex, onSelect = _a.onSelect, viewportState = _a.viewportState;
    var elementRef = useRef(null);
    var _b = useState(false), isInitialized = _b[0], setIsInitialized = _b[1];
    useEffect(function () {
        var initializeCornerstone = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cornerstone.init()];
                    case 1:
                        _a.sent();
                        dicomImageLoader.wadouri.fileManager.initialize();
                        setIsInitialized(true);
                        return [2 /*return*/];
                }
            });
        }); };
        if (!isInitialized) {
            initializeCornerstone();
        }
    }, [isInitialized]);
    useEffect(function () {
        if (!isInitialized || !elementRef.current)
            return;
        var element = elementRef.current;
        cornerstone.enable(element);
        var loadAndDisplayImage = function () { return __awaiter(void 0, void 0, void 0, function () {
            var imageId, image, viewport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imageId = imageIds[selectedImageIndex];
                        return [4 /*yield*/, cornerstone.loadImage(imageId)];
                    case 1:
                        image = _a.sent();
                        cornerstone.displayImage(element, image);
                        viewport = cornerstone.getViewport(element);
                        if (viewport) {
                            viewport.scale = viewportState.scale;
                            viewport.hflip = viewportState.hflip;
                            viewport.vflip = viewportState.vflip;
                            viewport.rotation = viewportState.rotation;
                            viewport.invert = viewportState.invert;
                            if (viewportState.colormap) {
                                viewport.colormap = viewportState.colormap;
                            }
                            cornerstone.setViewport(element, viewport);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        loadAndDisplayImage();
        return function () {
            cornerstone.disable(element);
        };
    }, [isInitialized, selectedImageIndex, imageIds, viewportState]);
    var handleClick = function () {
        onSelect(selectedImageIndex);
    };
    return (_jsx("div", { ref: elementRef, className: "w-[512px] h-[512px] border border-gray-300", onClick: handleClick }));
};
export default DicomViewer;
