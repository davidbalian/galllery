export default interface Photo {
  id: number;
  alt: string;
  width: number;
  height: number;
  src: {
    medium: string;
    large: string;
    large2x: string;
    original: string;
  };
  avg_color: string;
}
