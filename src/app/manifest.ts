import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nitin Kumar - Portfolio",
    short_name: "Nitin Kumar",
    description:
      "Python Developer, Automation Engineer, and Cyber Security Enthusiast",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#00E5FF",
    icons: [
      {
        src: "/images/favicon-1.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
