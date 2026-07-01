// Shape per docs/SA_BLUEPRINT.md §2. `src` is empty until real photos are supplied;
// the Zoom Parallax renders placeholder boxes meanwhile (docs/UXUI_DESIGN.md §1).
// `position` drives where each image sits before it scales up on scroll.
export interface AboutImage {
  src: string;
  alt: string;
  scaleTarget: number; // max scroll-linked scale factor for the Zoom Parallax effect
  position: { top: string; left: string; width: string; height: string };
}

export const aboutImages: AboutImage[] = [
  {
    src: "",
    alt: "Placeholder — centerpiece image",
    scaleTarget: 4,
    position: { top: "50%", left: "50%", width: "25vw", height: "35vh" },
  },
  {
    src: "",
    alt: "Placeholder — top left",
    scaleTarget: 5,
    position: { top: "18%", left: "16%", width: "16vw", height: "24vh" },
  },
  {
    src: "",
    alt: "Placeholder — top right",
    scaleTarget: 6,
    position: { top: "22%", left: "82%", width: "14vw", height: "22vh" },
  },
  {
    src: "",
    alt: "Placeholder — bottom left",
    scaleTarget: 5,
    position: { top: "80%", left: "20%", width: "16vw", height: "22vh" },
  },
  {
    src: "",
    alt: "Placeholder — bottom right",
    scaleTarget: 8,
    position: { top: "82%", left: "80%", width: "14vw", height: "20vh" },
  },
];
