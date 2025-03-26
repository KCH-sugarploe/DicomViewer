import { Color } from './types/declarations';

/**
 * CPUFallbackColormapData:
 * - name: 적용할 컬러맵 이름 (예: 'gray', 'hot', 'rainbow')
 */
export interface CPUFallbackColormapData {
  name: string;
}

/**
 * HSV -> RGB 변환 함수
 * - h, s, v: 0~1 범위를 가정
 * - 반환값: [r, g, b] (각각 0~1 범위)
 */
function HSVToRGB(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: return [v, t, p];
    case 1: return [q, v, p];
    case 2: return [p, v, t];
    case 3: return [p, q, v];
    case 4: return [t, p, v];
    case 5: return [v, p, q];
    default: return [v, v, v];
  }
}

/**
 * CPUFallbackColormap 클래스
 * - CPU 모드에서 LUT(look-up table)를 생성하기 위한 클래스
 * - name에 따라 'gray', 'hot', 'rainbow' 컬러맵을 만듭니다.
 */
export default class CPUFallbackColormap {
  private name: string;
  private colors: Array<Color>;
  private numberOfColors: number;

  constructor(colormapData: CPUFallbackColormapData) {
    this.name = colormapData.name;
    this.numberOfColors = 256;

    switch (this.name.toLowerCase()) {
      case 'rainbow':
        this.colors = this.buildRainbow();
        break;
      case 'hot':
        this.colors = this.buildHot();
        break;
      case 'gray':
      default:
        this.colors = this.buildGray();
        break;
    }
  }

  // Grayscale LUT: 0~255
  private buildGray(): Array<Color> {
    const lut: Array<Color> = [];
    for (let i = 0; i < this.numberOfColors; i++) {
      lut.push([i, i, i, 255]);
    }
    return lut;
  }

  // Hot LUT (예시)
  private buildHot(): Array<Color> {
    const lut: Array<Color> = [];
    for (let i = 0; i < this.numberOfColors; i++) {
      const r = i;
      const g = Math.min(255, i * 1.2);
      const b = Math.min(255, i * 0.5);
      lut.push([r, g, b, 255]);
    }
    return lut;
  }

  // Rainbow LUT: HSV를 이용해 생성 (0~0.8 범위)
  private buildRainbow(): Array<Color> {
    const lut: Array<Color> = [];
    for (let i = 0; i < this.numberOfColors; i++) {
      const ratio = i / (this.numberOfColors - 1);
      const hue = 0.8 * ratio;
      const sat = 1;
      const val = 1;
      const [rf, gf, bf] = HSVToRGB(hue, sat, val);
      const r = Math.round(rf * 255);
      const g = Math.round(gf * 255);
      const b = Math.round(bf * 255);
      lut.push([r, g, b, 255]);
    }
    return lut;
  }

  public getColors(): Array<Color> {
    return this.colors;
  }

  public getId(): string {
    return this.name;
  }

  public setNumberOfColors(num: number): void {
    this.numberOfColors = num;
    switch (this.name.toLowerCase()) {
      case 'rainbow':
        this.colors = this.buildRainbow();
        break;
      case 'hot':
        this.colors = this.buildHot();
        break;
      case 'gray':
      default:
        this.colors = this.buildGray();
        break;
    }
  }

  public createLookupTable(): Array<Color> {
    return this.getColors();
  }
}
