import React, { useState, useEffect } from 'react';
import DicomViewer, { ViewportState } from './DicomViewer';
import Toolbar from './Toolbar';

const App: React.FC = () => {
  // 여러 DICOM 이미지 URL
  const imageIds = [
    'wadouri:http://localhost:3000/dicom/image1.dcm',
    'wadouri:http://localhost:3000/dicom/image2.dcm',
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [imageId, setImageId] = useState<string>(imageIds[0]);

  // viewportState: zoom, flipH, flipV, rotation, invert, colormap
  const [viewportState, setViewportState] = useState<ViewportState>({
    zoom: 1,
    flipH: false,
    flipV: false,
    rotation: 0,
    invert: false,
    colormap: '',
  });

  // Zoom In
  const handleZoomIn = () =>
    setViewportState(prev => ({ ...prev, zoom: (prev.zoom || 1) + 0.1 }));

  // Flip Horizontal
  const handleFlipH = () =>
    setViewportState(prev => ({ ...prev, flipH: !prev.flipH }));

  // Flip Vertical
  const handleFlipV = () =>
    setViewportState(prev => ({ ...prev, flipV: !prev.flipV }));

  // Rotate
  const handleRotate = () =>
    setViewportState(prev => ({ ...prev, rotation: (prev.rotation || 0) + 30 }));

  // Invert
  const handleInvert = () =>
    setViewportState(prev => ({ ...prev, invert: !prev.invert }));

  // Toggle Colormap ('' ↔ 'rainbow')
  const handleColormap = () =>
    setViewportState(prev => ({
      ...prev,
      colormap: prev.colormap === '' ? 'rainbow' : '',
    }));

  // Reset
  const handleReset = () =>
    setViewportState({
      zoom: 1,
      flipH: false,
      flipV: false,
      rotation: 0,
      invert: false,
      colormap: '',
    });

  // 이미지 전/후
  const handlePreviousImage = () =>
    setSelectedImageIndex(prev => (prev === 0 ? imageIds.length - 1 : prev - 1));
  const handleNextImage = () =>
    setSelectedImageIndex(prev => (prev === imageIds.length - 1 ? 0 : prev + 1));

  // selectedImageIndex 변경 시, imageId 업데이트
  useEffect(() => {
    setImageId(imageIds[selectedImageIndex]);
  }, [selectedImageIndex]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dicom Viewer App</h1>
      <Toolbar
        onZoomIn={handleZoomIn}
        onFlipH={handleFlipH}
        onFlipV={handleFlipV}
        onRotate={handleRotate}
        onInvert={handleInvert}
        onToggleColormap={handleColormap}
        onReset={handleReset}
        onPreviousImage={handlePreviousImage}
        onNextImage={handleNextImage}
      />
      <DicomViewer imageId={imageId} viewportState={viewportState} />
    </div>
  );
};

export default App;
