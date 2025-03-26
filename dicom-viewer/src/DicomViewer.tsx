import React, { useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';
import CPUFallbackColormap from './CPUFallbackColormap';

export interface ViewportState {
  zoom?: number;
  flipH?: boolean;
  flipV?: boolean;
  rotation?: number;
  invert?: boolean;
  colormap?: string; // '', 'rainbow', 'hot', 'gray', etc.
}

interface DicomViewerProps {
  imageId: string;
  viewportState: ViewportState;
}


const displayImageWithOptionalColormap = (
  element: HTMLDivElement,
  imageId: string,
  useColormap: boolean,
  viewportState: ViewportState
) => {
  cornerstone.loadImage(imageId).then((image: any) => {
    // colormap 사용 여부에 따라 image의 color 플래그를 설정
    if (!useColormap) {
      image.color = false; // Grayscale 모드
    } else {
      image.color = true;
    }
    
    // 이미지 표시
    cornerstone.displayImage(element, image);
    
    // displayImage 호출 후, viewport를 가져와 추가 상태를 적용
    const viewport = cornerstone.getViewport(element);
    if (!viewport) return;
    
    // Zoom, Flip, Rotation, Invert 값 적용
    viewport.scale = viewportState.zoom ?? 1;
    viewport.hflip = viewportState.flipH ?? false;
    viewport.vflip = viewportState.flipV ?? false;
    viewport.rotation = viewportState.rotation ?? 0;
    viewport.invert = viewportState.invert ?? false;
    
    // colormap이 활성화된 경우에만 CPUFallbackColormap을 적용
    if (useColormap && viewportState.colormap && viewportState.colormap !== '') {
      const colormapObj = new CPUFallbackColormap({ name: viewportState.colormap });
      viewport.colormap = colormapObj;
    } else {
      // colormap 비활성화 시, viewport의 colormap은 해제
      viewport.colormap = undefined;
    }
    
    // 최종적으로 변경된 viewport를 적용
    cornerstone.setViewport(element, viewport);
  });
};

const DicomViewer: React.FC<DicomViewerProps> = ({ imageId, viewportState }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시 Cornerstone 초기화 및 최초 이미지 로드
  useEffect(() => {
    if (!elementRef.current) return;

    // Cornerstone을 해당 DOM 요소에 활성화
    cornerstone.enable(elementRef.current);
    // WADO Image Loader가 cornerstone과 dicomParser를 사용하도록 설정
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    // 초기 이미지 로드 및 표시 (colormap 상태에 따라 처리)
    displayImageWithOptionalColormap(
      elementRef.current,
      imageId,
      viewportState.colormap !== '' && !!viewportState.colormap,
      viewportState
    );

    return () => {
      cornerstone.disable(elementRef.current!);
    };
  }, [imageId]);

  useEffect(() => {
    if (!elementRef.current) return;

    // colormap 사용 여부 결정: 빈 문자열이면 비활성화 (Grayscale)
    const useColormap = viewportState.colormap !== '' && !!viewportState.colormap;

    // 변경된 상태를 반영하여 이미지를 다시 로드 및 표시
    displayImageWithOptionalColormap(elementRef.current, imageId, useColormap, viewportState);
  }, [imageId, viewportState]);

  return (
    <div className="container mx-auto p-4">
      <div
        ref={elementRef}
        id="dicomViewport"
        style={{ width: 512, height: 512, background: 'black' }}
      />
    </div>
  );
};

export default DicomViewer;
