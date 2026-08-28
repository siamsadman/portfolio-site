export type ProjectImage = {
  src: string;
  alt: string;
};

// Detail-page content block — not rendered yet (detail pages are a later
// pass), but defined now so future projects (and detail pages) don't force a
// schema change. A discriminated union so wildly different project types (a
// Power BI dashboard's "Screenshots"/"Data Model" vs. a Fabric project's
// "Architecture"/"Medallion Layers") can each pick whichever block kinds fit,
// in any order.
export type ProjectSection =
  | { type: "gallery"; heading: string; images: ProjectImage[] }
  | { type: "prose"; heading: string; paragraphs: string[] }
  | { type: "list"; heading: string; items: string[] };

export type Project = {
  slug: string;
  title: string;
  pages: string[];
  summary: string;
  tags: string[];
  palette: string;
  repoUrl: string;
  cardImage: ProjectImage;
  sections?: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "olist-sales",
    title: "Sales & Revenue Performance",
    pages: [
      "Executive Overview",
      "Category & Product Deep Dive",
      "Customer & Payment Insights",
    ],
    summary:
      "Three pages tracking sales performance from an executive-level overview down to category and product detail, plus customer and payment patterns behind the revenue.",
    tags: ["Power BI", "DAX", "T-SQL"],
    palette: "blue",
    repoUrl: "https://github.com/siamsadman/olist-sales-dashboard",
    cardImage: {
      src: "/projects/olist-sales/dashboard-01.png",
      alt: "Sales & Revenue Performance dashboard — Executive Overview page",
    },
    sections: [
      {
        type: "gallery",
        heading: "Screenshots",
        images: [
          { src: "/projects/olist-sales/dashboard-01.png", alt: "Executive Overview" },
          { src: "/projects/olist-sales/dashboard-02.png", alt: "Category & Product Deep Dive" },
          { src: "/projects/olist-sales/dashboard-03.png", alt: "Customer & Payment Insights" },
        ],
      },
      {
        type: "gallery",
        heading: "Data Model",
        images: [
          {
            src: "/projects/olist-sales/data-model.png",
            alt: "Sales & Revenue Performance data model",
          },
        ],
      },
      {
        type: "prose",
        heading: "Validation",
        paragraphs: [],
      },
      {
        type: "list",
        heading: "Findings",
        items: [],
      },
    ],
  },
  {
    slug: "olist-logistics",
    title: "Logistics & Delivery Performance",
    pages: ["Executive Overview", "Delay Analysis", "Seller & Freight"],
    summary:
      "An executive delivery overview backed by dedicated delay analysis and seller-and-freight breakdowns.",
    tags: ["Power BI", "DAX", "T-SQL"],
    palette: "teal-navy",
    repoUrl: "https://github.com/siamsadman/olist-logistics-dashboard",
    cardImage: {
      src: "/projects/olist-logistics/dashboard-01.png",
      alt: "Logistics & Delivery Performance dashboard — Executive Overview page",
    },
  },
  {
    slug: "olist-customer-satisfaction",
    title: "Customer Experience & Satisfaction",
    pages: ["Overview", "Drivers", "Sellers"],
    summary:
      "Three pages covering a satisfaction overview, the drivers behind it, and seller-level performance.",
    tags: ["Power BI", "DAX", "T-SQL"],
    palette: "coral-gold",
    repoUrl:
      "https://github.com/siamsadman/olist-customer-satisfaction-dashboard",
    cardImage: {
      src: "/projects/olist-customer-satisfaction/dashboard-01.png",
      alt: "Customer Experience & Satisfaction dashboard — Overview page",
    },
  },
];
