import React from 'react';

interface ToolbarProps {
  onZoomIn: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
  onRotate: () => void;
  onInvert: () => void;
  onToggleColormap: () => void;
  onReset: () => void;
  onPreviousImage: () => void;
  onNextImage: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onZoomIn,
  onFlipH,
  onFlipV,
  onRotate,
  onInvert,
  onToggleColormap,
  onReset,
  onPreviousImage,
  onNextImage,
}) => {
  const buttonClass =
    'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors';

  return (
    <div className="toolbar mb-4 flex flex-wrap gap-2">
      <button className={buttonClass} onClick={onZoomIn}>Zoom In</button>
      <button className={buttonClass} onClick={onFlipH}>Flip Horizontal</button>
      <button className={buttonClass} onClick={onFlipV}>Flip Vertical</button>
      <button className={buttonClass} onClick={onRotate}>Rotate</button>
      <button className={buttonClass} onClick={onInvert}>Invert</button>
      <button className={buttonClass} onClick={onToggleColormap}>Toggle Colormap</button>
      <button className={buttonClass} onClick={onReset}>Reset</button>
      <button className={buttonClass} onClick={onPreviousImage}>Previous</button>
      <button className={buttonClass} onClick={onNextImage}>Next</button>
    </div>
  );
};

export default Toolbar;
