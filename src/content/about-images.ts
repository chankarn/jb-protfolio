// Shape per docs/SA_BLUEPRINT.md §2. `position` drives where each image sits
// before it scales up on scroll (Zoom Parallax, see sections/about.tsx).
//
// Real photos (2026-07-06), picked for variety rather than an all-tech set:
// a candid portrait (centerpiece — most viewed, most "connects" since it's a
// direct-eye-contact smile rather than a posed/looking-away shot), two work
// samples (VS Code editing this very site, and a shipped landing page —
// process + output), a Kasetsart University orientation photo (education/
// journey), and a travel photo (personality beyond work). The two screenshot
// slots (top-left/top-right) are widened relative to the others since source
// screenshots are landscape, not portrait like the photos — reduces how much
// of the screenshot's sides get cropped by object-cover.
export interface AboutImage {
  src: string;
  alt: string;
  scaleTarget: number; // max scroll-linked scale factor for the Zoom Parallax effect
  position: { top: string; left: string; width: string; height: string };
}

export const aboutImages: AboutImage[] = [
  {
    src: "/aboutME/DSC05559.jpg",
    alt: "Chanakarn smiling at a coffee shop",
    scaleTarget: 4,
    position: { top: "50%", left: "50%", width: "25vw", height: "35vh" },
  },
  {
    src: "/aboutME/code2.png",
    alt: "VS Code open on this portfolio site's contact form code",
    scaleTarget: 5,
    position: { top: "18%", left: "16%", width: "20vw", height: "18vh" },
  },
  {
    src: "/aboutME/code1.png",
    alt: "A shipped landing page project, Astralix Codeplay",
    scaleTarget: 6,
    position: { top: "22%", left: "82%", width: "18vw", height: "16vh" },
  },
  {
    src: "/aboutME/ku.jpg",
    alt: "Kasetsart University freshman orientation",
    scaleTarget: 5,
    position: { top: "80%", left: "20%", width: "16vw", height: "22vh" },
  },
  {
    src: "/aboutME/travel.JPG",
    alt: "Traveling in Jiufen, Taiwan",
    scaleTarget: 8,
    position: { top: "82%", left: "80%", width: "14vw", height: "20vh" },
  },
];
