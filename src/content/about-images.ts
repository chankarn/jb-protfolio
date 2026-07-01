// Shape per docs/SA_BLUEPRINT.md §2. Real images (up to ~7) supplied during /dev
// per docs/UXUI_DESIGN.md §1 imagery placeholder treatment until then.
export interface AboutImage {
  src: string;
  alt: string;
  scaleTarget: number; // max scroll-linked scale factor for the Zoom Parallax effect
}

export const aboutImages: AboutImage[] = [];
