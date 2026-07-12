/**
 * site.ts — single source of truth for Time Imprints content.
 * Prices and product data extracted from the brand's Instagram
 * (stories "Ціни/price", Feb 2026) — see ../../RECAP_TIME-IMPRINTS.md.
 */

export const SITE = {
  name: "Time Imprints",
  tagline: "Turn your touch into art",
  description:
    "DIY paint-imprint kits: capture your hugs, kisses, hands and body on canvas or t-shirts. Skin-safe paint, worldwide shipping.",
  instagram: "https://www.instagram.com/time_imprints/",
  instagramDm: "https://ig.me/m/time_imprints",
  tiktok: "https://www.tiktok.com/@time_imprints",
  threads: "https://www.threads.com/@time_imprints",
  handle: "@time_imprints",
  followers: "58K",
  tiktokLikes: "197K",
  topReelLikes: "985K",
};

export interface Product {
  slug: string;
  name: string;
  short: string;
  priceEur: number;
  priceUah: number;
  category: "canvas" | "tshirt";
  image: string;
  gallery: string[];
  description: string;
  contents: string[];
  colors: string[];
  options?: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "hand-imprints",
    name: "Hand Imprints Kit",
    short: "Your hands, side by side, on canvas — the classic keepsake.",
    priceEur: 15,
    priceUah: 600,
    category: "canvas",
    image: "/img/kit-hands.jpg",
    gallery: ["/img/kit-hands.jpg", "/img/kit-hands-2.jpg", "/img/palette.jpg"],
    description:
      "The kit that started it all. Press your hands (big and small) onto a deep black canvas and keep the exact size of this moment forever. Perfect for couples, new parents and families.",
    contents: [
      "1 black or white canvas, 25×35 cm",
      "2 pearlescent paint colors of your choice",
      "2 brushes",
      "Step-by-step instructions",
      "Gift-ready packaging",
    ],
    colors: ["Orange", "Green", "Sky blue", "Gold", "Pink", "Silver"],
    options: ["Extra canvas +6 €", "Extra paint jar +2.5 €"],
    badge: "Bestseller",
  },
  {
    slug: "kisses",
    name: "Kisses Kit",
    short: "A heart made of your kisses on a soft cotton tee.",
    priceEur: 20,
    priceUah: 900,
    category: "tshirt",
    image: "/img/kit-kisses.jpg",
    gallery: ["/img/kit-kisses.jpg", "/img/kit-kisses-2.jpg"],
    description:
      "Paint your lips, kiss the fabric, repeat. The Kisses kit turns your affection into a wearable heart of lip prints — the gift that makes everyone smile (then blush).",
    contents: [
      "1 t-shirt, 100% cotton (S–XL)",
      "Skin-safe lip paint",
      "Brush",
      "Instructions",
      "Branded gift packaging",
    ],
    colors: ["Red", "Pink", "Black"],
    badge: "Valentine's favorite",
  },
  {
    slug: "body-tshirt",
    name: "Body T-shirt Kit",
    short: "The shape of you, printed on a tee they'll actually wear.",
    priceEur: 25,
    priceUah: 1000,
    category: "tshirt",
    image: "/img/kit-body-tshirt.jpg",
    gallery: ["/img/kit-body-tshirt.jpg", "/img/kit-body-tshirt-2.jpg"],
    description:
      "Brush the paint on, press the fabric against your body, and wear each other. Fabric-fixing paint survives the washing machine — the memory stays put.",
    contents: [
      "1 t-shirt, 100% cotton (S–XL)",
      "Professional fabric paint (machine-washable once dry)",
      "Brush",
      "Instructions",
      "Gift-ready packaging",
    ],
    colors: ["Black", "White", "Red", "Sky blue", "Pink"],
  },
  {
    slug: "hugs",
    name: "Hugs Kit",
    short: "Two tees, four painted arms, one hug you can wear.",
    priceEur: 30,
    priceUah: 1300,
    category: "tshirt",
    image: "/img/kit-hugs.jpg",
    gallery: ["/img/kit-hugs.jpg", "/img/kit-hugs-2.jpg", "/img/kit-hugs-3.jpg"],
    description:
      "Paint each other's arms, hug tight, and keep the exact imprint of that embrace on the back of your t-shirts. Made for couples, best friends, parents and kids.",
    contents: [
      "2 t-shirts, black or white, 100% cotton (S, M, L, XL)",
      "2 paint colors of your choice",
      "Brushes",
      "Instructions",
      "Gift-ready packaging",
    ],
    colors: ["Black", "White", "Red", "Sky blue", "Pink"],
    badge: "Most gifted",
  },
  {
    slug: "body-imprints",
    name: "Body Imprints Kit",
    short: "An intimate portrait of two, on a 50×70 canvas.",
    priceEur: 35,
    priceUah: 1500,
    category: "canvas",
    image: "/img/kit-body.jpg",
    gallery: ["/img/kit-body.jpg", "/img/kit-body-2.jpg", "/img/kit-body-3.jpg"],
    description:
      "Our signature kit. Skin-safe paint, a large black canvas, and the two of you — the result is an abstract artwork only you can decode. 985K people liked it; one couple gets to own it.",
    contents: [
      "1 black canvas, 50×70 cm",
      "Special body paint (color of your choice)",
      "Brushes",
      "Instructions",
      "Premium gift packaging",
    ],
    colors: ["Orange", "Green", "Sky blue", "Gold", "Pink", "Silver"],
    badge: "Signature",
  },
];

/** One-of-a-kind finished pieces sold on the /paintings/ page. */
export interface Readymade {
  id: string;
  title: string;
  image: string;
  priceEur: number;
  size: string;
  note: string;
  sold?: boolean;
}

export const READYMADE: Readymade[] = [
  {
    id: "ready-fresh-easel",
    title: "Fresh Off the Easel",
    image: "/img/painting-01.jpg",
    priceEur: 89,
    size: "50 × 70 cm · canvas",
    note: "A vivid red body print on deep black — bold, glossy, unmistakably two people.",
  },
  {
    id: "ready-date-night",
    title: "Date Night",
    image: "/img/painting-02.jpg",
    priceEur: 79,
    size: "50 × 70 cm · canvas",
    note: "Crimson prints caught mid-embrace, framed and ready to hang.",
  },
  {
    id: "ready-roses-red",
    title: "Roses & Red",
    image: "/img/painting-03.jpg",
    priceEur: 75,
    size: "40 × 50 cm · canvas",
    note: "Warm red imprints styled with a bouquet — a romantic, gifting-ready original.",
  },
  {
    id: "ready-fairy-lights",
    title: "Under the Fairy Lights",
    image: "/img/painting-04.jpg",
    priceEur: 69,
    size: "40 × 50 cm · canvas",
    note: "Soft, glowing red on black — the cosiest piece in the collection.",
    sold: true,
  },
  {
    id: "ready-velvet-crimson",
    title: "Velvet & Crimson",
    image: "/img/painting-05.jpg",
    priceEur: 85,
    size: "50 × 70 cm · canvas",
    note: "Deep crimson body print with a velvet-rich finish.",
  },
  {
    id: "ready-silver-hands",
    title: "Silver, Hands & Lips",
    image: "/img/painting-06.jpg",
    priceEur: 95,
    size: "50 × 70 cm · canvas",
    note: "Silver hands, feet and a kiss — a full-story piece in moody light.",
  },
  {
    id: "ready-pink-cyan",
    title: "Pink Meets Cyan",
    image: "/img/painting-07.jpg",
    priceEur: 65,
    size: "30 × 40 cm · canvas",
    note: "Pearlescent pink and cyan overlapping in close-up — the brand's signature palette.",
  },
  {
    id: "ready-gold-anniversary",
    title: "Gold Anniversary",
    image: "/img/painting-08.jpg",
    priceEur: 89,
    size: "50 × 70 cm · canvas",
    note: "Gold and silver layered handprints — made for a first-anniversary gift.",
    sold: true,
  },
];

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Kits", href: "/kits/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Paintings", href: "/paintings/" },
  { label: "About", href: "/about/" },
];
