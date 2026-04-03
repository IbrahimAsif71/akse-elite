export interface GalleryPhoto {
  src: string;
  caption?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  featured?: boolean;
  author?: string;
  publishedAt?: string;
  mainImage?: any;
  bodyHtml?: string;
  gallery?: GalleryPhoto[];
}

export const LOCAL_BLOG_POSTS: BlogPost[] = [
  {
    _id: "blog-1",
    title: "The Steam and the Soul: A Pilgrimage to Golra Sharif Junction",
    slug: { current: "the-steam-and-the-soul" },
    excerpt: "There is a specific kind of silence at Golra Sharif—a quietude that only exists where a century and a half of history rests under the shade of ancient Banyan trees.",
    category: "Heritage Sites",
    featured: true,
    author: "AKSE Editorial",
    publishedAt: new Date().toISOString(),
    mainImage: "/golra.jpeg",
    gallery: [
      { src: "/golra.jpeg",  caption: "The Victorian-era station platform, 1882" },
      { src: "/image7.jpeg", caption: "Mechanical clock frozen at 1947" },
      { src: "/image8.jpeg", caption: "Original teak woodwork detail" },
      { src: "/image9.jpeg", caption: "The 1888 Royal Saloon carriage" },
      { src: "/image10.jpeg", caption: "Arched windows & sandstone masonry" },
      { src: "/image11.jpeg", caption: "Heritage rail exhibits" },
    ],
    bodyHtml: `
<h2>The Atmosphere of 1882</h2>
<p>There is a specific kind of silence at Golra Sharif—a quietude that only exists where a century and a half of history rests under the shade of ancient Banyan trees. As you walk toward the Victorian-era station, the air feels heavier, thick with the scent of rusted iron and aged teak. Built in 1882 during the height of the British Raj’s railway expansion, this junction was a colonial outpost of engineering marvel.</p>

<h2>The Architectural Narrative</h2>
<p>The station’s yellow sandstone masonry and its signature arched windows reflect the "Railway Gothic" style of the late 19th century. These platforms have hosted monumental figures; both Lord Mountbatten and Quaid-e-Azam Muhammad Ali Jinnah once stood upon these very stones. If you look up at the gabled roofs, you can still find vintage mechanical clocks—many of which remain frozen at the very hour the British departed in 1947.</p>

<h2>The Royal Legacy</h2>
<p>One of the site's most remarkable treasures is the 1888 Royal Saloon, which was originally a wedding gift from the Maharaja of Jodhpur. It remains a testament to a bygone era of luxury, featuring intricate ceiling carvings and original brass fittings that speak to the craftsmanship of the late 1800s. Golra stands as a bridge to our industrial past, ensuring the "Golden Age of the Rail" remains part of the Pakistani identity.</p>
`
  },
  {
    _id: "blog-2",
    title: "The Silent Convergence: Navigating the Multi-Faith Stones of Saidpur Village",
    slug: { current: "the-silent-convergence" },
    excerpt: "Nestled in a lush ravine of the Margalla Hills, Saidpur Village is a living museum of human coexistence. Founded in 1530 by Mirza Fateh Ali...",
    category: "Cultural History",
    featured: false,
    author: "AKSE Editorial",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    mainImage: "/saidpur.jpeg",
    gallery: [
      { src: "/saidpur.jpeg",  caption: "The cobbled streets of Saidpur Village" },
      { src: "/image4.jpeg",   caption: "Mughal-era stonework at the village entrance" },
      { src: "/image5.jpeg",   caption: "The Rama Mandir temple compound" },
      { src: "/image6.jpeg",   caption: "Artisan's Alley — potters at work" },
      { src: "/image12.jpeg",  caption: "Multi-faith architecture side-by-side" },
      { src: "/image13.jpeg",  caption: "Ravine of the Margalla Hills" },
    ],
    bodyHtml: `
<h2>The Ravine of Memories</h2>
<p>Nestled in a lush ravine of the Margalla Hills, Saidpur Village is a living museum of human coexistence. Founded in 1530 by Mirza Fateh Ali, this village has served as a sanctuary for half a millennium. Long before it became a destination for modern leisure, it was a sacred site where Hindu pilgrims bathed in the Rama Kunda ponds and Sikh devotees gathered in the Gurdwara.</p>

<h2>The Layers of Stone</h2>
<p>What makes Saidpur extraordinary is the visual dialogue between three faiths. In a respectful, silent huddle, you will find the Rama Mandir (the Hindu temple), the Sikh Gurdwara, and a Mughal-era Mosque standing side-by-side. The architecture itself is a hybrid, blending Mughal influences with local Himalayan stone-craft.</p>

<h2>A Village of Artisans</h2>
<p>The village’s character is defined by its narrow, cobbled streets and dramatic elevation changes. In the "Artisan’s Alley," potters still work their wheels just as they have for generations, surrounded by ancient mud-brick walls that have stood the test of time. Saidpur remains a fragile treasure; it is a village that has refused to let its history be forgotten, serving as an archive of a time when different cultures lived in seamless harmony.</p>
`
  },
  {
    _id: "blog-3",
    title: "The Crown of the Capital: A Vantage Point at Daman-e-Koh",
    slug: { current: "the-crown-of-the-capital" },
    excerpt: "Perched 2,400 feet above sea level, Daman-e-Koh has long been the \"midpoint\" of Islamabad—a place where the rugged beauty of the Margalla Hills meets the planned precision of the city below.",
    category: "Landmarks",
    featured: false,
    author: "AKSE Editorial",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    mainImage: "/dome.jpeg",
    gallery: [
      { src: "/dome.jpeg",   caption: "The Dome Restaurant panorama at dusk" },
      { src: "/image1.jpeg", caption: "Interior dining terrace" },
      { src: "/image2.jpeg", caption: "Terrace overlooking Islamabad" },
      { src: "/image3.jpeg", caption: "Golden hour over Faisal Mosque" },
      { src: "/image14.jpeg", caption: "Hilltop skyline at twilight" },
    ],
    bodyHtml: `
<h2>The Heart of the Hills</h2>
<p>Perched 2,400 feet above sea level, Daman-e-Koh has long been the "midpoint" of Islamabad—a place where the rugged beauty of the Margalla Hills meets the planned precision of the city below. Long before the modern skyline took shape, this viewpoint served as a natural sanctuary, offering a perspective of the Potohar Plateau that has captivated travelers for decades.</p>

<h2>A Legacy of Hosting</h2>
<p>The location where The Dome now stands is steeped in diplomatic and royal history. This hilltop has been a stage for international friendship, having hosted world leaders during the Fourth SAARC Summit in 1988. It famously welcomed Princess Diana in 1991, echoing a time when the Margallas were the primary backdrop for Pakistan’s burgeoning identity on the world stage. Even the restaurant’s terraces are named in tribute to these connections, with one honoring King Fahd of Saudi Arabia and his contributions to regional unity.</p>

<h2>The Architectural Dialogue</h2>
<p>The structure of The Dome is designed to disappear into its surroundings, allowing the panoramic views of the Faisal Mosque and Rawal Lake to take center stage. It is a site defined by "Twilight Flavors," where the golden hour transforms the city into a sea of lights. By blending traditional Pakistani hospitality with a location that has seen the passage of kings and icons, the site remains a living bridge between Islamabad’s natural heritage and its historical milestones.</p>
`
  }
];
