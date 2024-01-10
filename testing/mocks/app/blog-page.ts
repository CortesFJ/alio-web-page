import { BlogDataContent } from "@/app/blog-page/page"

export const fakeData1: BlogDataContent = {
  title: "Exciting Adventures",
  content: [
    {
      subtitle:"A beautiful landscape",
      image: {
        url: "https://picsum.photos/600/400?random=1",
        description: "A landscape",
      },
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      subtitle:"Exploring the unknown",
      image: {
        url: "https://picsum.photos/600/400?random=2",
        description: "Exploring",
      },
      paragraphs: [
        "Ut enim ad minim veniam, quis nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in esse cillum dolore eu fugiat nulla pariatur.",
      ],
    },
    {
      subtitle:"Adventurous",
      image: {
        description: "Adventurous journey",
        url: "https://picsum.photos/600/400?random=3",
      },
      paragraphs: [
        "Excepteur sint occaecat cupidatat deserunt mollit anim id est laborum.",
        "Curabitur pretium tincidunt lacus. Nulla , turpis et commodo pharetra.",
      ],
    },
  ],
}

export const fakeData2: BlogDataContent = {
  title: "A World of Imagination",
  content: [
    {
      subtitle:"A landscape",
      image: {
        url: "https://picsum.photos/800/400?random=1",
        description: "A mesmerizing landscape",
      },
      paragraphs: [
        "Duis aute irure dolor in reprehenderit in eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, anim id est laborum.",
      ],
    },
    {
      subtitle:"Territories",
      image: {
        url: "https://picsum.photos/800/400?random=2",
        description: "Uncharted territories",
      },
      paragraphs: [
        "Curabitur pretium tincidunt lacus. Nulla gravida turpis et commodo pharetra.",
        "Sed do eiusmod tempor incididunt ut labore et dolore aliqua.",
      ],
    },
    {
      subtitle:"Epic adventures await",
      image: {
        url: "https://picsum.photos/800/400?random=3",
        description: "Epic adventures",
      },
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        "Ut enim ad minim veniam, quis nostrud exercitation consequat.",
      ],
    },
  ],
}
