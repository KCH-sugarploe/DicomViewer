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
import { useState } from 'react';
import DicomViewer from './DicomViewer';
import Toolbar from './Toolbar';
var App = function () {
    var imageIds = [
        'wadouri:/dicom/image1.dcm',
        'wadouri:/dicom/image2.dcm',
        'wadouri:/dicom/image3.dcm',
    ];
    var _a = useState(null), selectedImageIndex = _a[0], setSelectedImageIndex = _a[1];
    var _b = useState([
        { scale: 1, hflip: false, vflip: false, rotation: 0, invert: false },
        { scale: 1, hflip: false, vflip: false, rotation: 0, invert: false },
        { scale: 1, hflip: false, vflip: false, rotation: 0, invert: false },
    ]), viewportStates = _b[0], setViewportStates = _b[1];
    var handleSelect = function (index) {
        setSelectedImageIndex(index);
    };
    var applyViewportState = function (index, state) {
        setViewportStates(function (prev) {
            return prev.map(function (s, i) { return (i === index ? __assign(__assign({}, s), state) : s); });
        });
    };
    var handleZoom = function () {
        if (selectedImageIndex === null)
            return;
        var newScale = viewportStates[selectedImageIndex].scale + 0.2;
        applyViewportState(selectedImageIndex, { scale: newScale });
    };
    var handleFlipH = function () {
        if (selectedImageIndex === null)
            return;
        var newHflip = !viewportStates[selectedImageIndex].hflip;
        applyViewportState(selectedImageIndex, { hflip: newHflip });
    };
    var handleFlipV = function () {
        if (selectedImageIndex === null)
            return;
        var newVflip = !viewportStates[selectedImageIndex].vflip;
        applyViewportState(selectedImageIndex, { vflip: newVflip });
    };
    var handleRotate = function () {
        if (selectedImageIndex === null)
            return;
        var newRotation = (viewportStates[selectedImageIndex].rotation + 30) % 360;
        applyViewportState(selectedImageIndex, { rotation: newRotation });
    };
    var handleInvert = function () {
        if (selectedImageIndex === null)
            return;
        var newInvert = !viewportStates[selectedImageIndex].invert;
        applyViewportState(selectedImageIndex, { invert: newInvert });
    };
    var handleColormap = function () {
        if (selectedImageIndex === null)
            return;
        applyViewportState(selectedImageIndex, { colormap: 'hot' });
    };
    var handleReset = function () {
        if (selectedImageIndex === null)
            return;
        applyViewportState(selectedImageIndex, {
            scale: 1,
            hflip: false,
            vflip: false,
            rotation: 0,
            invert: false,
            colormap: undefined,
        });
    };
    var handlePrevious = function () {
        if (selectedImageIndex === null || selectedImageIndex === 0)
            return;
        setSelectedImageIndex(selectedImageIndex - 1);
    };
    var handleNext = function () {
        if (selectedImageIndex === null || selectedImageIndex === imageIds.length - 1)
            return;
        setSelectedImageIndex(selectedImageIndex + 1);
    };
    return (_jsxs("div", __assign({ className: "flex flex-col items-center p-4" }, { children: [_jsx("h1", __assign({ className: "text-2xl font-bold mb-4" }, { children: "DICOM Viewer" })), _jsx("div", __assign({ className: "flex space-x-4" }, { children: imageIds.map(function (imageId, index) { return (_jsx(DicomViewer, { imageIds: imageIds, selectedImageIndex: index, onSelect: handleSelect, viewportState: viewportStates[index] }, index)); }) })), _jsx(Toolbar, { onZoom: handleZoom, onFlipH: handleFlipH, onFlipV: handleFlipV, onRotate: handleRotate, onInvert: handleInvert, onColormap: handleColormap, onReset: handleReset, onPrevious: handlePrevious, onNext: handleNext, disabled: selectedImageIndex === null })] })));
};
export default App;
