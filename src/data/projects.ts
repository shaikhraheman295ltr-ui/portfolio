export interface Project {
  id: number;
  number: string;
  category: "Client" | "Personal";
  title: string;
  liveUrl: string;
  images: {
    leftTop: string;
    leftBottom: string;
    rightTall: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    category: "Client",
    title: "Nextlevel Studio",
    liveUrl: "#",
    images: {
      leftTop: "/images/projects/nextlevel-top.jpg",
      leftBottom: "/images/projects/nextlevel-bottom.jpg",
      rightTall: "/images/projects/nextlevel-tall.jpg",
    },
  },
  {
    id: 2,
    number: "02",
    category: "Personal",
    title: "Aura Brand Identity",
    liveUrl: "#",
    images: {
      leftTop: "/images/projects/aura-top.jpg",
      leftBottom: "/images/projects/aura-bottom.jpg",
      rightTall: "/images/projects/aura-tall.jpg",
    },
  },
  {
    id: 3,
    number: "03",
    category: "Client",
    title: "Solaris Digital",
    liveUrl: "#",
    images: {
      leftTop: "/images/projects/solaris-top.jpg",
      leftBottom: "/images/projects/solaris-bottom.jpg",
      rightTall: "/images/projects/solaris-tall.jpg",
    },
  },
];
