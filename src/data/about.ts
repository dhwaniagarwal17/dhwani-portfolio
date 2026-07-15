export const ABOUT_TEXT =
  "I am Dhwani Agarwal, a Computer Engineering student at Thapar Institute of Engineering & Technology, passionate about software engineering, artificial intelligence, and building meaningful digital products. I enjoy transforming ideas into real-world applications through clean engineering, intuitive user experiences, and continuous learning. I believe the best technology solves real problems while remaining elegant, efficient, and human-centred.";

export interface CornerImage {
  src: string;
  pos: string;
  w: string;
  delay: number;
  x: number;
}

export const CORNER_IMAGES: CornerImage[] = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    pos: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
    w: "w-[105px] sm:w-[140px] md:w-[185px]",
    delay: 0.1,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    pos: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
    w: "w-[88px] sm:w-[123px] md:w-[158px]",
    delay: 0.25,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    pos: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
    w: "w-[105px] sm:w-[140px] md:w-[185px]",
    delay: 0.15,
    x: 80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    pos: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
    w: "w-[114px] sm:w-[150px] md:w-[193px]",
    delay: 0.3,
    x: 80,
  },
];
