export default interface PhotosWrapper {
  images: {
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
    photographer: string;
    photographer_url: string;
  }[];
  handleImageClick: (index: number) => void;
  hasSearched: boolean;
  resultsAmount: number;
  search: string;
}
