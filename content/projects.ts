export type ProjectImage = {
  src: string;
  alt: string;
  darkSrc?: string; // optional dark-theme variant; omit to render unchanged in both themes
  portrait?: boolean; // phone screenshots: shown in a compact row instead of full width
};

// Detail-page content block — not rendered yet (detail pages are a later
// pass), but defined now so future projects (and detail pages) don't force a
// schema change. A discriminated union so wildly different project types (a
// Power BI dashboard's "Screenshots"/"Data Model" vs. a Fabric project's
// "Architecture"/"Medallion Layers") can each pick whichever block kinds fit,
// in any order.
export type ProjectSection =
  | {
      type: "gallery";
      kicker?: string;
      heading: string;
      images: ProjectImage[];
      paragraphs?: string[]; // optional explanatory text beneath the images
    }
  | { type: "prose"; kicker?: string; heading: string; paragraphs: string[] }
  | {
      type: "list";
      kicker?: string;
      heading: string;
      intro?: string;
      items: string[];
      images?: ProjectImage[]; // rendered after the list items
    };

export type ProjectCategory = "bi" | "fabric" | "de";

// Write-up template blocks (all optional so a project can adopt them one at a time)
export type ProjectNumber = { big: string; label: string };
export type ProjectLayer = {
  label: string; // BRONZE / SILVER / GOLD
  title: string;
  text: string;
  gate: string;
  gateLabel?: string; // defaults to "Gate"
  highlight?: boolean; // accent border on the final layer
};
export type ProjectFinding = { big: string; title: string; text: string };

export type Project = {
  slug: string;
  // Homepage card fields (short copy shown on the project grid)
  category: ProjectCategory; // drives the homepage filter chips
  kind: string; // small chip on the card image
  cardTitle: string;
  cardText: string;
  outcome: string; // one verified fact shown in accent colour
  cardTags: string[];
  title: string;
  pages?: string[]; // omit to hide the line entirely
  pagesLabel?: string; // defaults to "Report pages"
  summary: string;
  tags: string[];
  palette: string;
  repoUrl: string;
  docsUrl?: string; // optional link to a live docs site, shown beside the GitHub link
  demoUrl?: string; // optional link to a recorded demo, shown beside the GitHub link
  downloadUrl?: string; // optional file download (for example a .pbix), shown beside the GitHub link
  downloadLabel?: string; // defaults to "Download"
  cardImage: ProjectImage;
  eyebrow?: string; // mono label above the title on the write-up page
  numbers?: ProjectNumber[]; // key-number cards
  archHeading?: string;
  layers?: ProjectLayer[]; // Bronze / Silver / Gold cards
  archNote?: string; // paragraph under the layer cards
  diagrams?: ProjectImage[]; // full architecture and orchestration diagrams
  findingsHeading?: string;
  findingsNote?: string; // muted line under the finding cards
  findings?: ProjectFinding[];
  screensHeading?: string;
  screens?: { images: ProjectImage[]; paragraphs?: string[] };
  sections?: ProjectSection[];
};

// Order used on the homepage grid and for previous/next links on write-ups
export const projectOrder: string[] = [
  "bts-fabric-pipeline",
  "opensky-fabric-rti",
  "grid-shift",
  "olist-dbt-databricks",
  "olist-sales",
  "olist-logistics",
  "olist-customer-satisfaction",
];

export const projects: Project[] = [
  {
    slug: "olist-sales",
    category: "bi",
    kind: "Power BI",
    cardTitle: "Sales & Revenue Performance",
    cardText:
      "Executive overview down to category and product detail, plus the customer and payment patterns behind revenue.",
    outcome: "98K orders · 7 data problems fixed",
    cardTags: ["Power BI", "DAX", "T-SQL"],
    title: "Olist Sales & Revenue Performance: a Power BI dashboard",
    eyebrow: "Power BI · Olist series, part 1 of 3",
    pages: [
      "Executive Overview",
      "Category & Product Deep Dive",
      "Customer & Payment Insights",
    ],
    summary:
      "A three-page Power BI dashboard on sales, category and customer and payment performance for Olist, a Brazilian multi-vendor marketplace. Built end to end from raw CSVs: data cleaning, star schema design, DAX modelling and dashboard design.",
    tags: ["Power BI", "DAX", "T-SQL", "SQL Server", "Python", "Star schema"],
    palette: "blue",
    repoUrl: "https://github.com/siamsadman/olist-sales-dashboard",
    downloadUrl:
      "https://github.com/siamsadman/olist-sales-dashboard/blob/main/dashboard/olist_sales_dashboard.pbix",
    downloadLabel: "Download .pbix",
    cardImage: {
      src: "/projects/olist-sales/dashboard-01.png",
      alt: "Sales & Revenue Performance dashboard — Executive Overview page",
    },
    numbers: [
      { big: "R$ 7.3M", label: "total revenue, Jan to Aug 2018, on the Executive Overview" },
      { big: "53,530", label: "orders in the same period, across a star schema of two fact tables and five dimensions" },
      { big: "7", label: "data-quality problems found in the raw data, each documented and handled" },
    ],
    archHeading: "From raw CSVs to three report pages",
    layers: [
      {
        label: "CLEAN",
        title: "pandas and SQL Server",
        text: "Raw Olist CSVs are cleaned in Python, imported into a Dockerized SQL Server for staging, and transformed into a star schema with T-SQL scripts.",
        gateLabel: "Checked",
        gate: "Datetime columns that silently lost their date portion were diagnosed and re-imported with an explicit format.",
      },
      {
        label: "MODEL",
        title: "Star schema with a bridge",
        text: "Two fact tables at different grains relate through a `dim_order` bridge, so both join many-to-one, next to date, customer, seller and product dimensions.",
        gateLabel: "Checked",
        gate: "775 orders with no line items were confirmed as expected, because the fact grain is the order line item.",
      },
      {
        label: "REPORT",
        title: "Power BI, three pages",
        text: "DAX measures drive the pages. The callout boxes are dynamic measures that update live with the applied filters, not static text.",
        gateLabel: "Checked",
        gate: "Trend visuals stop at August 2018, the last complete month, so there is no false revenue cliff.",
        highlight: true,
      },
    ],
    archNote:
      "I chose the Olist dataset over a simpler single-table one on purpose: it mirrors real business complexity, with related tables at different grains, inconsistent category naming, missing translations and orphaned records. The model covers about 98k orders from September 2016 to October 2018; the headline figures above are the Executive Overview for January to August 2018. The aim was the full analyst workflow: clean messy data, model it correctly, justify the business logic and communicate the result.",
    diagrams: [
      {
        src: "/projects/olist-sales/data-model.png",
        alt: "Sales & Revenue Performance data model — two fact tables related through dim_order, with date, customer, seller and product dimensions",
      },
    ],
    findingsHeading: "What the dashboard shows",
    findings: [
      {
        big: "~40%",
        title: "São Paulo drives 2018 revenue",
        text: "The widest concentration of any state, and a signal that customer acquisition is heavily weighted toward one region.",
      },
      {
        big: "Top 2 ≈ 20%",
        title: "Revenue concentrates at category level too",
        text: "The top two categories account for roughly 20% of total revenue, while the bottom five combined contribute under 1%.",
      },
      {
        big: "~3%",
        title: "A very low repeat purchase rate",
        text: "Consistent with a multi-vendor marketplace without platform-level loyalty mechanisms. The state with the strongest repeat behaviour, among states with a meaningful sample, is not the state with the most revenue: loyalty and revenue scale do not move together.",
      },
      {
        big: "Credit card",
        title: "The de facto financing mechanism",
        text: "It carries both the highest average installment count and the highest average order value, while boleto, debit and voucher payments are overwhelmingly pay-in-full, lower-value transactions.",
      },
    ],
    screensHeading: "The three report pages",
    screens: {
      images: [
        { src: "/projects/olist-sales/dashboard-01.png", alt: "Executive Overview" },
        { src: "/projects/olist-sales/dashboard-02.png", alt: "Category & Product Deep Dive" },
        { src: "/projects/olist-sales/dashboard-03.png", alt: "Customer & Payment Insights" },
      ],
      paragraphs: [
        "**Executive Overview.** Top-line KPIs, revenue trend, geographic distribution and category leaders: the 30-second summary.",
        "**Category & Product Deep Dive.** A category performance table, revenue concentration in a treemap, top and bottom performers, and price distribution.",
        "**Customer & Payment Insights.** Payment method behaviour, installment patterns, the new versus repeat customer split, and a state-level loyalty comparison.",
        "All three pages share a synced filter panel and carry both auto-generated statistical highlights from Power BI Smart Insights and hand-written analyst takeaways.",
      ],
    },
    sections: [
      {
        type: "prose",
        kicker: "Data model",
        heading: "Why orders get a bridge table",
        paragraphs: [
          "`fact_order_items` has one row per order line item and `fact_payments` has one row per payment installment record. Both share `order_id`, but the field is unique in neither: an order has multiple line items and multiple payment records.",
          "Relating them directly produces an uncontrolled many-to-many relationship that silently inflates revenue and payment totals depending on query context. `dim_order` sits between them as a proper dimension, so both facts relate to it many-to-one: a clean, predictable star pattern.",
        ],
      },
      {
        type: "list",
        kicker: "Data quality",
        heading: "Seven problems in the raw data",
        intro:
          "Real datasets are messy. Documenting these decisions matters more than the charts: it shows how the problems were reasoned about, not just what got built.",
        items: [
          "`customer_id` is order-specific, so the same person receives a new ID for every order. I used `customer_unique_id` as the true customer key for all customer-level metrics, including repeat rate and unique customer counts.",
          "The `order_items` to `payments` relationship was many-to-many. I introduced `dim_order` as a bridge dimension so both facts relate many-to-one.",
          "775 orders had no rows in `order_items`, having been cancelled or become unavailable before fulfilment. Confirmed as expected: the fact grain is order line item, so these are naturally excluded.",
          "461 orders marked `canceled` still had line items, having been cancelled after fulfilment began. I built a primary `Total Revenue` measure excluding cancelled and unavailable statuses, alongside a separate `Total Revenue (Gross)` measure for demand analysis.",
          "The final month of data, September 2018, was incomplete because the extract was taken mid-month. I filtered all trend visuals to complete months only, through August 2018.",
          "623 products carried untranslated, Portuguese-only category names. I manually mapped the three missing categories to the translation table.",
          "Datetime columns imported as SQL Server `time`, silently dropping the date portion. Diagnosed via `INFORMATION_SCHEMA.COLUMNS` and fixed by re-importing with an explicit `yyyy-MM-dd HH:mm:ss` format mapping.",
        ],
      },
      {
        type: "list",
        kicker: "Modelling",
        heading: "Four decisions behind the numbers",
        items: [
          "**Revenue definition.** `Total Revenue` excludes cancelled and unavailable orders to reflect realised performance, with `Total Revenue (Gross)` available for demand analysis. Ratio measures such as Average Order Value use the same filtered population in numerator and denominator, so the two never disagree.",
          "**Year-over-year growth.** Calculated as a fixed comparison of full calendar 2018 against full calendar 2017, not an open date range, which would compare a partial year against a complete one.",
          "**Repeat customer rate.** Calculated on a lifetime basis rather than within the selected period, so a customer whose two orders fall in different years is not counted as non-repeating.",
          "**Statistical significance threshold.** The top loyalty state insight considers only states with at least 500 customers, so a small state where one or two repeat customers dominate the percentage cannot surface as a false leader.",
        ],
      },
    ],
  },
  {
    slug: "olist-logistics",
    category: "bi",
    kind: "Power BI",
    cardTitle: "Logistics & Delivery Performance",
    cardText:
      "Executive delivery overview with dedicated delay analysis and seller-and-freight breakdowns.",
    outcome: "99,441 orders · 91.9% on time",
    cardTags: ["Power BI", "DAX", "T-SQL"],
    title: "Olist Logistics & Delivery Performance: a Power BI dashboard",
    eyebrow: "Power BI · Olist series, part 2 of 3",
    pages: ["Executive Overview", "Delay & Timing Analysis", "Seller & Freight Performance"],
    summary:
      "A three-page Power BI dashboard on how reliably Olist keeps its delivery promises: delivery timing, delay patterns, and seller and freight performance. The second report in the Olist series, built on the same raw data with a new order-grain fact table.",
    tags: ["Power BI", "DAX", "T-SQL", "SQL Server", "Python", "Star schema"],
    palette: "teal-navy",
    repoUrl: "https://github.com/siamsadman/olist-logistics-dashboard",
    downloadUrl:
      "https://github.com/siamsadman/olist-logistics-dashboard/blob/main/dashboard/olist_logistics_dashboard.pbix",
    downloadLabel: "Download .pbix",
    cardImage: {
      src: "/projects/olist-logistics/dashboard-01.png",
      alt: "Logistics & Delivery Performance dashboard — Executive Overview page",
    },
    numbers: [
      { big: "91.89%", label: "of delivered orders arrived on time: 96,476 delivered, 7,827 late" },
      { big: "11.9 days", label: "average margin by which deliveries beat the promised date" },
      { big: "2,965", label: "orders never confirmed delivered, 1,182 of them after the carrier handoff" },
    ],
    archHeading: "From raw CSVs to three report pages",
    layers: [
      {
        label: "CLEAN",
        title: "pandas and SQL Server",
        text: "The cleaning script is rewritten so missing delivery timestamps stay null, and a copy of the staging orders is fixed in Dockerized SQL Server, leaving the sales pipeline untouched.",
        gateLabel: "Checked",
        gate: "Placeholder dates were counted before the fix (160, 1,783 and 2,965) and again after, at zero.",
      },
      {
        label: "MODEL",
        title: "Order-grain fact with bridges",
        text: "One fact row per order with five role-playing date keys. Two bridge tables resolve orders with several sellers or categories, next to dimensions reused from Part 1.",
        gateLabel: "Caught",
        gate: "Both bridge relationships were silently single-direction, so seller and category filters never reached the fact table. Both are now bidirectional.",
      },
      {
        label: "REPORT",
        title: "Power BI, three pages",
        text: "Only the purchase-date relationship is active. The other four dates are invoked with `USERELATIONSHIP()` inside each measure that needs them.",
        gateLabel: "Caught",
        gate: "Rate measures now exclude unresolved orders. An early on-time rate returned 95% instead of the correct 91.9%.",
        highlight: true,
      },
    ],
    archNote:
      "The dataset is the same as Part 1, but the question is different. Part 1 asked how the business is performing; this report asks how well it keeps its promises to customers. I built `fact_deliveries` as a separate table and cleaned a copy of the staging orders, so nothing the published sales dashboard depends on could change. The one shared table that does grow is `dim_date`, which gains 26 dates for estimated delivery and leaves every existing row alone.",
    diagrams: [
      {
        src: "/projects/olist-logistics/data-model.png",
        alt: "Logistics & Delivery Performance data model — fact_deliveries with five date roles, two bridge tables, and the date, customer, seller and product dimensions",
      },
    ],
    findingsHeading: "What the dashboard shows",
    findingsNote: "All figures are for the full model, with no filters applied.",
    findings: [
      {
        big: "11.9 days",
        title: "Delivery estimates are conservative",
        text: "Deliveries arrive 11.9 days ahead of the promised date on average, which suggests the estimates could be tightened.",
      },
      {
        big: "15.3 days",
        title: "A slow spell from December to April",
        text: "Average delivery time rose from 11.8 days in November 2017 to a peak of 15.3 in March 2018, stayed above 14 from December through April, and fell to 8.7 days by August 2018.",
      },
      {
        big: "98.6% vs 91.8%",
        title: "Multi-seller orders arrive on time more often",
        text: "Orders split across sellers (1.29% of orders) beat single-seller orders on on-time rate, the opposite of what I expected. They probably skew toward larger, more established sellers, but I have not tested that.",
      },
      {
        big: "37%",
        title: "Carrier handoff is the bigger risk",
        text: "Of orders that never reached delivered status, 37% were still marked shipped, against 21% cancelled and 21% unavailable.",
      },
      {
        big: "1,849 of 3,095",
        title: "Sellers cluster in São Paulo",
        text: "São Paulo sellers carry 70,188 of 99,441 orders, a far more concentrated base than the customers, who spread more evenly across states.",
      },
    ],
    screensHeading: "The three report pages",
    screens: {
      images: [
        { src: "/projects/olist-logistics/dashboard-01.png", alt: "Executive Overview" },
        { src: "/projects/olist-logistics/dashboard-02.png", alt: "Delay & Timing Analysis" },
        { src: "/projects/olist-logistics/dashboard-03.png", alt: "Seller & Freight Performance" },
      ],
      paragraphs: [
        "**Executive Overview.** Delivery KPIs, an order-stage funnel from purchase to delivery, the delivery-time trend and on-time rate by state: the 30-second summary.",
        "**Delay & Timing Analysis.** Days early or late against the estimate, a delay-by-state map, on-time rate by category and delivery time by weekday.",
        "**Seller & Freight Performance.** Seller reliability, freight against weight, and a direct test of whether multi-seller orders do worse.",
        "All three pages share a synced Year, State and Category filter panel and carry both Power BI Smart Narrative highlights and hand-written analyst takeaways.",
      ],
    },
    sections: [
      {
        type: "prose",
        kicker: "Data model",
        heading: "Why bridges and a separate fact table",
        paragraphs: [
          "An order can involve more than one seller or span more than one product category. Forcing a single seller or category onto each order would misrepresent about 1.3% of orders and undercount category-level performance. `bridge_order_seller` and `bridge_order_product` resolve both as two clean many-to-one hops instead of one uncontrolled many-to-many.",
          "Part 1's `dim_order` already sat at one row per order, so adding delivery columns there was tempting. I built `fact_deliveries` as a separate table instead, so nothing here could change a table the published sales dashboard depends on. The same principle applied upstream: the staging orders were copied to `stg_orders_logistics` before cleaning.",
        ],
      },
      {
        type: "list",
        kicker: "Data quality",
        heading: "Six problems found along the way",
        intro:
          "Each of these would have changed a headline number if left alone, which is why they are documented in the repository as well as fixed.",
        items: [
          "The Part 1 cleaning script filled missing delivery timestamps with `1900-01-01` instead of null. That was harmless for sales, but it would have corrupted every delivery-time and on-time measure here. I rewrote the script to use `pd.to_datetime(errors='coerce')` and converted the staging copy with `UPDATE ... SET ... = NULL`.",
          "2,965 orders have no delivery date. That is expected: the funnel narrows at every stage (99,441 purchased, 99,281 approved, 97,658 handed to the carrier, 96,476 delivered), and 1,182 of the 2,965 dropped out after the carrier handoff.",
          "`dim_date` only covered the purchase-date range, but estimated delivery dates run up to 26 days past the last purchase, which would have broken the foreign key. I added the missing 26 dates and changed no existing row.",
          "Both bridge relationships defaulted to single-direction filtering, silently stopping seller and category filters from reaching `fact_deliveries`. I changed both to bidirectional.",
          "Some orders arrive extremely late, up to 188 days past the estimate. I checked the raw timestamps rather than assuming bad data: they are real, and 21 orders delivered on the same day, 19 September 2017, were each 100 or more days late, which looks like a batch resolution.",
          "59% of sellers (1,824 of 3,095) have fewer than ten orders, so a seller needs at least 30 orders before it enters any ranking measure.",
        ],
      },
      {
        type: "list",
        kicker: "Modelling",
        heading: "Four decisions behind the numbers",
        items: [
          "**Blank-safe rates.** Every rate measure explicitly excludes orders whose outcome is unresolved (`is_late` blank) instead of relying on DAX's default blank handling. The early version that did not returned 95% rather than 91.9%, a three-point error that would have overstated performance.",
          "**Role-playing dates.** `fact_deliveries` relates to `dim_date` five times. Only the purchase-date relationship is active, matching Part 1, and measures that need the delivered, estimated, approved or carrier date switch to it with `USERELATIONSHIP()`.",
          "**Seller ranking threshold.** Top-seller measures require at least 30 orders, so a seller with two orders and a lucky outcome cannot show a meaningless 100% rate.",
          "**Trend window.** Delivery-time trends run from February 2017 to August 2018. Every month inside that window has at least 1,653 delivered orders; outside it none has more than 750, so a handful of orders could swing the average into a misleading spike.",
        ],
      },
    ],
  },
  {
    slug: "olist-customer-satisfaction",
    category: "bi",
    kind: "Power BI",
    cardTitle: "Customer Experience & Satisfaction",
    cardText:
      "Satisfaction overview, the drivers behind it, and seller-level performance across qualifying sellers.",
    outcome: "98,410 reviews · late orders score 1.73 lower",
    cardTags: ["Power BI", "DAX", "T-SQL"],
    title: "Olist Customer Experience & Satisfaction: a Power BI dashboard",
    eyebrow: "Power BI · Olist series, part 3 of 3",
    pages: ["Overview", "Drivers", "Sellers"],
    summary:
      "A three-page Power BI dashboard on what makes Olist's customers unhappy: review scores, satisfaction drivers and seller-level review signals. The third report in the Olist series, and the one that puts a customer-score price on the delivery problems from part 2.",
    tags: ["Power BI", "DAX", "T-SQL", "SQL Server", "Python", "Star schema"],
    palette: "coral-gold",
    repoUrl: "https://github.com/siamsadman/olist-customer-satisfaction-dashboard",
    downloadUrl:
      "https://github.com/siamsadman/olist-customer-satisfaction-dashboard/blob/main/dashboard/olist_customer_satisfaction_dashboard.pbix",
    downloadLabel: "Download .pbix",
    cardImage: {
      src: "/projects/olist-customer-satisfaction/dashboard-01.png",
      alt: "Customer Experience & Satisfaction dashboard — Overview page",
    },
    numbers: [
      { big: "1.73 points", label: "lower review score for late orders: 4.29 on time against 2.57 late" },
      { big: "98,410", label: "reviews, modelled with three many-to-many bridges and one deliberately disconnected table" },
      { big: "3", label: "real bugs caught by checking every measure against an independent SQL query" },
    ],
    archHeading: "From raw CSVs to three report pages",
    layers: [
      {
        label: "CLEAN",
        title: "pandas and SQL Server",
        text: "Review text is collapsed to a comment flag, the many-to-many bridges are extracted in Python, and everything loads into a Dockerized SQL Server schema.",
        gateLabel: "Fixed",
        gate: "Unbounded comment columns slowed the import to about 10 rows a second. Capping them at 4,000 characters cut over 10 minutes to 41 seconds.",
      },
      {
        label: "MODEL",
        title: "Bridge-heavy dimensional model",
        text: "One fact row per review, three bridges to orders, sellers and products, and one pre-flattened table left disconnected on purpose.",
        gateLabel: "Checked",
        gate: "A count query showed 789 reviews span several orders and 547 orders carry several reviews, so a single order column on the review would have been wrong.",
      },
      {
        label: "REPORT",
        title: "Power BI, three pages",
        text: "Hand-written callouts sit on every page, and every figure quoted in them was confirmed against SQL before it was written.",
        gateLabel: "Caught",
        gate: "Comparing measures with SQL exposed a blank-handling error, a field from the wrong table and a cross-filter direction that made every category look identical.",
        highlight: true,
      },
    ],
    archNote:
      "Same dataset as Parts 1 and 2, third business angle. Part 1 asked how the business is performing and Part 2 asked how well it keeps its promises. This one asks what actually makes customers unhappy, and whether the data can prove it. The strongest answer draws on Part 2: a late delivery is not just a missed estimate, it costs 1.73 review points. The four shared dimensions are read but never written, and `dim_date` already covered the full range, so unlike Part 2 it needed no extension.",
    diagrams: [
      {
        src: "/projects/olist-customer-satisfaction/data-model.png",
        alt: "Customer Experience & Satisfaction data model — fact_reviews with bridges to orders, sellers and products, a disconnected category-delay table, and shared dimensions",
      },
    ],
    findingsHeading: "What the dashboard shows",
    findingsNote: "All figures are for the full model, with no filters applied.",
    findings: [
      {
        big: "1.73 points",
        title: "Late delivery is the biggest driver of low scores",
        text: "On-time orders average 4.29 and late orders 2.57. Scores fall off sharply at the delivery deadline instead of degrading gradually, which suggests customers react to the broken promise itself, not to the waiting.",
      },
      {
        big: "1.68",
        title: "A long wait scores worse than no delivery",
        text: "Orders delayed 8 to 14 days average 1.68 and those delayed 15 days or more 1.72, both below never-delivered orders at 1.76. Customers may forgive an early cancellation more readily than an unresolved wait.",
      },
      {
        big: "77.3%",
        title: "Unhappy customers explain themselves",
        text: "The comment rate is 77.3% at one star, falls to 32.8% at four stars and rises slightly to 38.1% at five. Overall it is 43.07%, so written feedback concentrates among the unhappy.",
      },
      {
        big: "2.67 points",
        title: "Extreme seller scores are mostly small-sample noise",
        text: "The best and worst qualifying sellers (5.00 and 2.33) are 2.67 points apart. But sellers with 30 to 49 reviews span 1.93 points while the 26 largest span only 0.85, converging toward the 4.09 platform average.",
      },
      {
        big: "3.94",
        title: "Higher-priced orders score lower",
        text: "Average score falls from 4.17 for orders under R$25 to 3.94 above R$500, so expectations may rise with price faster than service does.",
      },
      {
        big: "86%",
        title: "Sellers respond fast, with a long tail",
        text: "86% of reviews get a seller response within three days, but 655 wait more than 30 days, the longest 518 days.",
      },
    ],
    screensHeading: "The three report pages",
    screens: {
      images: [
        { src: "/projects/olist-customer-satisfaction/dashboard-01.png", alt: "Overview" },
        { src: "/projects/olist-customer-satisfaction/dashboard-02.png", alt: "Drivers: delivery and price impact" },
        { src: "/projects/olist-customer-satisfaction/dashboard-03.png", alt: "Sellers: performance and review signals" },
      ],
      paragraphs: [
        "**Overview.** Score KPIs, the score distribution, a state map, the promoter, passive and detractor split, and the score trend against the platform average.",
        "**Drivers.** Average score by delivery outcome, score against days early or late, a category-by-outcome heatmap and score by order value. This page prices Part 2's delivery problems in customer terms.",
        "**Sellers.** Top and bottom sellers with a minimum-sample threshold, the response-time distribution, and how comment rate varies with score.",
        "All three pages share a synced Year, State and Category filter panel.",
      ],
    },
    sections: [
      {
        type: "prose",
        kicker: "Data model",
        heading: "Not a textbook star schema",
        paragraphs: [
          "Bridges sit between the fact table and three dimensions, so seller, product and customer are two hops from `fact_reviews`. All three bridges filter in both directions, and one table has no relationships at all. Each departure from the clean star was a decision with a reason.",
          "The review-to-order link is a true many-to-many: 789 reviews appear against more than one order and 547 orders carry more than one review. The duplicated rows are identical except for `order_id`, so a careless `DISTINCT` hides the problem. `bridge_review_order` resolves it as two clean many-to-one hops.",
          "The category-by-delivery heatmap needs two independent many-to-many paths in one filter context, and three separate DAX approaches returned wrong but plausible numbers. I pre-flattened the join in SQL into `bridge_review_category_delay` and left it disconnected, so the heatmap reads it directly and matches the validation queries. It breaks the clean star, and I documented it because knowing when to move the work to SQL is part of the job.",
        ],
      },
      {
        type: "list",
        kicker: "Data quality",
        heading: "Eight problems found along the way",
        intro:
          "Several of these produced plausible numbers rather than errors, which is what made them worth documenting.",
        items: [
          "In DAX, `BLANK() = FALSE` evaluates to true, so `is_late = FALSE` swept in 2,865 never-delivered orders. Explicit `NOT ISBLANK()` guards fixed it. Without them the on-time count read 91,523 instead of 88,658 and the on-time average 4.22 instead of 4.29, an error that flatters the result.",
          "5,127 reviews predate the recorded delivery timestamp. I checked whether this was timestamp rounding and ruled it out. They are excluded from the average days to review with a `>= 0` filter but kept in the data so the anomaly stays inspectable.",
          "759 rows have no order value: the cancelled or unavailable orders with no items from Part 1. I bucketed them as Unknown and kept them out of the price chart instead of coercing them to R$0, because a cancelled order is not an order worth nothing.",
          "701 reviews have no seller, so seller-level counts do not sum to the review total and any share-of-reviews measure at seller grain overstates slightly.",
          "All three bridge relationships defaulted to single-direction filtering, silently stopping filters from reaching `fact_reviews`. The symptom was every category showing an identical value.",
          "`category_name_en` exists in both `dim_product` and the flattened table, with no relationship between them. Dragging the wrong one makes every matrix row show the grand total, so I verify the source table of every field, not just its name.",
          "Oct to Dec 2016 carry only 176, 101 and 45 reviews, so they are removed from trend visuals only. The rows stay in every total and KPI.",
          "The `Unknown` category is a translation residue, so it is excluded from category rankings. A genuine typo category, `costruction_tools_garden`, is kept as it appears in the source, since merging it silently would misstate the data.",
        ],
      },
      {
        type: "list",
        kicker: "Modelling",
        heading: "Five decisions behind the numbers",
        items: [
          "**Every measure checked against independent SQL.** The queries are published in `sql/03_validation.sql` with expected values stated inline, so each dashboard figure traces back to a query that confirmed it. This caught three real bugs: the blank-handling error, a wrong-table field and a cross-filter direction.",
          "**Seller threshold chosen from the data.** Rankings need at least 30 reviews. A threshold sweep showed ties at a perfect 5.00 at low thresholds, which makes any Top 10 arbitrary. At 30 the ranking is stable, 630 sellers still qualify and 83.2% of review links are kept.",
          "**Rates by subtraction.** `Pct No Comment` is defined as `1 - Comment Rate` rather than a `has_comment = FALSE` test. Both return 56.93%, but the subtraction cannot hit the blank-comparison trap and keeps pages 1 and 3 reconciled.",
          "**Role-playing dates.** Review creation, review answer, delivery and estimated delivery all relate to `dim_date`. Only review creation is active, and the others are invoked with `USERELATIONSHIP()`.",
          "**Trend window.** Monthly trends run from January 2017 to August 2018, because the three months before have only 45 to 176 reviews and a handful of them could swing the average into a misleading spike.",
        ],
      },
    ],
  },
  {
    slug: "bts-fabric-pipeline",
    category: "fabric",
    kind: "Fabric lakehouse",
    cardTitle: "BTS Airline On-Time Performance",
    cardText:
      "Medallion lakehouse over US flight records: PySpark, watermark-driven incremental loading, Direct Lake model, validation gates at every layer.",
    outcome: "41.8M records · 71-period backfill, no failures",
    cardTags: ["Microsoft Fabric", "PySpark", "Delta Lake"],
    title: "BTS Airline On-Time Performance: a Fabric medallion lakehouse",
    eyebrow: "Microsoft Fabric · Data engineering",
    summary:
      "A medallion-architecture lakehouse over 41.8 million US flight records — PySpark transformation, watermark-driven incremental loading, and a Direct Lake semantic model, with validation gates at every layer boundary.",
    tags: ["Microsoft Fabric", "PySpark", "Delta Lake", "Direct Lake", "Data Factory"],
    palette: "indigo",
    repoUrl: "https://github.com/siamsadman/bts-fabric-pipeline",
    cardImage: {
      src: "/projects/bts-fabric-pipeline/14-report-page.png",
      alt: "BTS on-time performance report",
    },
    numbers: [
      { big: "41.8M", label: "flight records" },
      { big: "78", label: "monthly periods, Jan 2020 to Jun 2026" },
      { big: "7h 06m", label: "unattended backfill of 71 periods, zero failures" },
    ],
    archHeading: "Three layers, a gate between each",
    layers: [
      {
        label: "BRONZE",
        title: "Source contract, preserved",
        text: "A landing notebook fetches each monthly file server-side. Bronze loads it with an explicit schema and audit columns and no other change. Re-runs delete and append by source file, so a month never loads twice.",
        gate: "Schema held across all 78 periods; 77 of 77 source archives CRC-verified before ingestion.",
      },
      {
        label: "SILVER",
        title: "PySpark transformation",
        text: "A keep-list reduces 109 source fields to 56, timestamps are derived, and rows merge on a business key with null-safe equality.",
        gate: "Derived clock matched BTS at 100% in every period; zero duplicate keys; merge idempotent at 41.2M rows.",
      },
      {
        label: "GOLD",
        title: "Star schema and Direct Lake",
        text: "Two fact tables and five dimensions on natural keys, one row per scheduled flight leg including cancelled and diverted, served to Power BI through a Direct Lake model.",
        gate: "Referential integrity checked on every load: zero orphans across 41.2M rows.",
        highlight: true,
      },
    ],
    archNote:
      "Two Data Factory pipelines orchestrate the notebooks: one processes a single period, chained on success, and a backfill pipeline calls it once per period. All layers live in one lakehouse, separated by table-name prefix, and the workspace was connected to GitHub before any item existed, so the commit history tracks the build.",
    diagrams: [
      {
        src: "/projects/bts-fabric-pipeline/architecture_light.png",
        darkSrc: "/projects/bts-fabric-pipeline/architecture_dark.png",
        alt: "Medallion lakehouse architecture — landing, bronze, silver, gold and the Direct Lake semantic model",
      },
      {
        src: "/projects/bts-fabric-pipeline/orchestration_light.png",
        darkSrc: "/projects/bts-fabric-pipeline/orchestration_dark.png",
        alt: "Pipeline orchestration — single-period and backfill Data Factory pipelines",
      },
    ],
    findingsHeading: "What validation found",
    findings: [
      {
        big: "48% mismatch",
        title: "Arrival timestamp derivation",
        text: "Adding elapsed minutes to the departure time disagreed with the reported arrival on nearly half of all flights. The cause was gate-to-gate local clock time, resolved without a timezone reference dataset.",
      },
      {
        big: "607,577 new rows",
        title: "Incremental load, to the row",
        text: "June 2026 was held back from the backfill and loaded afterwards through the same unchanged pipeline. Periods went from 77 to 78, and the fact table grew by exactly June's count in the watermark: no double-counting, no manual step.",
      },
      {
        big: "95.1% on time, 41.5% cancelled",
        title: "April 2020, in the same month",
        text: "The best punctuality and the worst reliability in the dataset. Keeping cancelled flights in the data is what makes it visible; filtering them out would have removed two fifths of the month.",
      },
      {
        big: "100% pass, still wrong",
        title: "One passing check is not validation",
        text: "The 2400 midnight bug passed the clock check at 100% and was caught only by the independent date check. Applying the departure rule to arrivals had put 532 rows two days out.",
      },
    ],
    screensHeading: "The report",
    screens: {
      images: [
        { src: "/projects/bts-fabric-pipeline/14-report-page.png", alt: "BTS on-time performance report" },
      ],
      paragraphs: [
        "One page: KPI cards, on-time and cancellation rate by month across the full range, carrier comparison, and delay minutes by cause.",
        "The page carries a note explaining that on-time performance *improved* through mid-2020 while cancellations spiked to 41.5%. Both are real: domestic volume fell below 30% of normal, so the flights that did operate met empty airports and uncongested airspace.",
      ],
    },
    sections: [
      {
        type: "prose",
        kicker: "Design",
        heading: "How it fits together",
        paragraphs: [
"A medallion lakehouse in Microsoft Fabric over US Bureau of Transportation Statistics flight data: January 2020 to June 2026, 78 monthly files, **41.8 million flight records**, roughly 20 GB of source CSV.",
          "Landing holds raw CSV. Bronze preserves the source contract with an explicit schema and audit columns. Silver types and cleans, reducing 109 source fields to 56 and merging on a business key. Gold is a star schema — two facts, five dimensions. A Direct Lake semantic model sits on the gold tables only.",
          "Layer separation is by table-name prefix within a single lakehouse. Three separate lakehouses would mean cross-lakehouse references in every notebook for no architectural gain at this scale.",
          "Orchestration is two Data Factory pipelines: one that processes a single period through four notebook activities, and a backfill that invokes it sequentially per period. Activities are chained **on success**, not on completion — on-completion would let a failed landing step run bronze anyway, which is how partial data gets written and reported as a success. All four activities share a Spark session tag so the pipeline runs as one Spark application rather than four, which is necessary on F4 capacity and removes three session startups from every run.",
          "**Why this dataset.** Volume justifies the architecture at roughly 600,000 flights per month. BTS publishes monthly, so the pipeline processes real new periods rather than a simulated drip-feed. And the period covered contains a natural stress test: domestic flights fell from 648,229 in March 2020 to 180,617 in May, with a 41.5% cancellation rate in April.",
        ],
      },
      {
        type: "list",
        kicker: "Decisions",
        heading: "Pipeline decisions",
        items: [
          "**Explicit schema, not inference.** Inference reads the file twice and produces inconsistent types between months — a column entirely null in one month infers as `string` and as `int` in another, and the append then fails partway through a backfill. The schema is generated once from a reference month, hardened, and cached to a 20 KB JSON file rather than making two passes over 260 MB of CSV.",
          "**The phantom column.** BTS ends every row with a trailing comma, producing a 110th unnamed field. Declaring it as `_phantom` and dropping it by name avoids Spark flagging every row as containing discarded data — a false \"corrupted records\" warning on 600,000 rows trains you to ignore warnings. It is also faster: 13 seconds against 24.",
          "**Keep-list, not drop-list.** Silver reduces 109 fields to 56 using an explicit keep-list, so a new column in a future BTS vintage is ignored by default rather than flowing through uninvited.",
          "**Arrival timestamps take the date from arithmetic and the clock from BTS.** Adding elapsed minutes to the departure timestamp produced a **48% mismatch** against the reported arrival time. Every mismatch was a whole number of hours and tracked direction of travel — `ActualElapsedTime` is gate-to-gate in local clock time at each end, so pure arithmetic yields origin-local time while BTS reports destination-local. The hybrid resolves it without requiring an airport-to-timezone reference dataset.",
          "**The `2400` rule differs between departure and arrival, deliberately.** On the departure side the base date has not moved, so a day is added; on the arrival side the arithmetic has already crossed midnight, so it is not. Applying the departure rule to arrivals put 532 rows two days out.",
          "**Null-safe equality in the merge condition.** Standard `=` returns null when either side is null, so a row with a null key column would never match itself and would insert a duplicate on every run.",
          "**Natural keys throughout, not generated surrogates.** `monotonically_increasing_id()` is not stable across reruns, and a proper key-assignment step adds pipeline machinery this project does not need.",
          "**Airports are keyed on `airport_id`, not the IATA code.** BTS reuses IATA codes across different airports over time. Carriers join on DOT ID for the same reason — BTS defines a unique airline by its certificate regardless of code or holding company.",
          "**Dimensions rebuild in full every run.** This is what handled late-arriving members without special casing: `dim_airport` grew from 367 to 387 and `dim_carrier` from 17 to 18 as periods outside the development slice introduced airports and carriers that had not appeared before.",
          "**Grain is one row per scheduled flight leg, including cancelled and diverted.** Filtering cancellations out is the common mistake with this dataset — it destroys cancellation-rate analysis and biases every delay average, because the worst operational days are the ones with the most cancellations. April 2020 would lose two fifths of its rows.",
        ],
        images: [
          { src: "/projects/bts-fabric-pipeline/05-bronze-table-111-columns.png", alt: "Bronze — source contract preserved, 111 columns" },
          { src: "/projects/bts-fabric-pipeline/06-silver-table-56-columns.png", alt: "Silver — typed and named, 56 columns" },
        ],
      },
      {
        type: "list",
        kicker: "Semantic model",
        heading: "Direct Lake over the gold layer",
        intro:
          "The model reads the seven gold tables only. Bronze, silver and the watermark are deliberately excluded: a semantic model is the presentation layer, and staging tables in it are working notes shipped to the customer.",
        items: [
          "**Eleven measures on a dedicated `_measures` table.** Its single dummy column is hidden, so the measures sort to the top of the field list instead of hiding inside a fact table.",
          "**`dim_airport` role-plays.** Two relationships to `fact_flight`: active on `origin_airport_id`, inactive on `dest_airport_id`. `Arriving Flights` exposes the destination side with `USERELATIONSHIP`, so one dimension answers both \"flights from LAX\" and \"flights to LAX\".",
          "**`Completed Flights` is the measure that matters.** It excludes cancelled and diverted flights and is the correct denominator for punctuality, because a cancelled flight has no arrival time and must not dilute a delay average. `Flights` is the denominator for reliability. Conflating the two is the subtle version of the grain mistake.",
          "**Delay averages use the `_minutes` variants, which floor at zero.** Using `arr_delay` would let early arrivals offset late ones and give a much lower, misleading figure.",
        ],
      },
      {
        type: "list",
        kicker: "Validation",
        heading: "Every layer boundary fails the run",
        intro:
          "Every layer boundary has a check that fails the run rather than warning. When the pipeline runs unattended, a bad month must fail the run rather than quietly write wrong data.\n\n`validate_timestamps()` runs two **independent** checks: that the derived clock matches the BTS reported time of day, and that the arrival date is the flight date or the day after. The `2400` bug passed the first at 100% and was caught only by the second. One passing check is not validation.",
        items: [
          "Source archives CRC-verified before ingestion — 77 of 77 valid, 1.92 GB",
          "Explicit schema held across all 78 periods, 2020 to 2026",
          "Derived clock matched the BTS reported time at 100%, every period",
          "Arrival date within 0 to 1 days of flight date — 100%, zero outside range",
          "Business key unique — zero duplicates, every period",
          "Silver merge idempotent — row count unchanged on a full re-run at 41.2M rows",
          "Every delayed flight appears in delay attribution — 82,285 = 82,285",
          "Referential integrity across five relationships — zero orphans across 41.2M rows",
          "**Assume referential integrity.** All semantic model relationships use Assume referential integrity, which generates INNER rather than OUTER joins on a 41M-row fact. That is a promise, not a check — it is only safe because the gold notebook verifies exactly these five relationships with `left_anti` joins on every load and raises on failure.",
        ],
        images: [
          { src: "/projects/bts-fabric-pipeline/13-silver-validation-gates.png", alt: "Silver validation gates" },
          { src: "/projects/bts-fabric-pipeline/10-referential-integrity-full-dataset.png", alt: "Referential integrity across 41.2M rows" },
        ],
      },
      {
        type: "list",
        kicker: "Results",
        heading: "What the run showed",
        items: [
          "**41,829,828 rows**, identical across bronze, silver and `fact_flight` — no drift through the chain.",
          "**Full backfill of 71 periods ran unattended in 7 hours 6 minutes with zero failures.** Retries were configured on each activity but never fired.",
          "**One period end to end takes about 6.5 minutes** on F4 trial capacity — 53 seconds to fetch and extract, 13 seconds to bronze, 1m 22s through silver, 2m 25s to gold.",
          "**Incremental load demonstrated.** June 2026 was deliberately held back from the backfill and loaded afterwards through the same unchanged pipeline: 77 periods to 78, and exactly 607,577 new rows — June's count as recorded in the watermark. No double-counting, no manual intervention.",
          "**The failure path works.** A later attempt at July 2026 returned HTTP 404 because BTS had not yet published it. Landing failed, and on-success chaining meant bronze, silver and gold never ran — they show as unstarted rather than skipped or failed. No partial data, no false success.",
          "**Late aircraft leads on total delay minutes despite fewer occurrences than carrier delay** — the cascade effect, where one delayed aircraft makes its subsequent flights late. Weather is the rarest cause and by far the most severe per occurrence at 70.4 minutes average.",
          "**Attribution covers 91.3% of arrival delay minutes.** The gap is flights delayed 1 to 14 minutes, for which BTS reports no cause. The unattributed share moves with severity — 11.7% when delays were mild, 5.2% when they were long. Correct behaviour, not a data quality issue.",
        ],
        images: [
          { src: "/projects/bts-fabric-pipeline/08-backfill-71-periods-7h06m.png", alt: "Backfill — 71 periods, 7h 06m, zero failures" },
          { src: "/projects/bts-fabric-pipeline/15-pipeline-failure-unpublished-period.png", alt: "Failure path — unpublished period, no partial data" },
          { src: "/projects/bts-fabric-pipeline/11-watermark-before-incremental-77.png", alt: "Watermark before the incremental load: 77 periods, 41,222,251 rows" },
          { src: "/projects/bts-fabric-pipeline/12-watermark-after-incremental-78.png", alt: "Watermark after the incremental load: 78 periods, 41,829,828 rows" },
        ],
      },
      {
        type: "list",
        kicker: "Limitations",
        heading: "What it does not do",
        intro: "Stated in the repository as well, so nobody has to find them by accident.",
        items: [
          "**Arrival timestamps are destination-local wall clock, with a date derived from origin-local arithmetic.** A small residual remains where the arithmetic date lands on the other side of midnight. Timezone-correct conversion would need a third data source keyed on IATA codes, plus DST-aware conversion, for accuracy no measure in the model consumes. Every metric is a duration or a delay, both differences within the same frame.",
          "**IATA code reuse is defended against but not observed in this range.** All 78 periods report 387 distinct `airport_id` and 387 distinct `airport_code`, so no collisions. BTS reuses codes across decades, so six and a half years does not exercise it. The check stays as a gate.",
          "**Delay-cause totals do not reconcile to all delay minutes, by design.** Flights delayed 1 to 14 minutes have no BTS-reported cause.",
          "**Both `dep_delay` and `dep_delay_minutes` are kept.** The first goes negative for early departures and the second floors at zero, so averaging the wrong one gives a different answer.",
          "**The pipeline takes an explicit period instead of deriving it.** A Lookup activity against `load_watermark` returning the next unprocessed period would make a schedule self-driving. The watermark table already supports it; the backfill did not need it.",
          "**Deferred:** timezone-correct arrival times, Type 2 SCD on airports, a time-block dimension, and watermark-driven scheduling.",
        ],
      },
      {
        type: "list",
        kicker: "Platform notes",
        heading: "Fabric defaults that cost time",
        intro: "Three defaults that cost time and are not obvious from the error messages.",
        items: [
          "**GitHub sync is disabled tenant-wide by default.** The setting lives in the Admin portal, not workspace settings. With it off, GitHub simply does not appear in the workspace Git provider list — it looks like a missing feature rather than a permission.",
          "**High concurrency for pipelines is off by default.** Four notebook activities in sequence each request their own Spark session, and on F4 the second fails with `TooManyRequestsForCapacity`. Session tags are the mechanism, but they are ignored for pipelines unless the setting is enabled. The equivalent toggle for interactive notebooks is on by default, which makes the asymmetry easy to miss.",
          "**A notebook parameter cell must be toggled, not merely present.** Untoggled, pipeline values are silently ignored and the notebook runs its defaults — and the failure surfaces two activities downstream. A zero-row guard converted a silent misconfiguration into a named, actionable error.",
          "**HTTP 200 does not mean success.** TranStats returns 200 with an HTML body for URLs it does not recognise, which produced two false positives during the build. Both fetch paths assert on content — the zip download checks magic bytes, the lookup checks the CSV header — rather than trusting the status code.",
        ],
      },
    ],
  },
  {
    slug: "opensky-fabric-rti",
    category: "fabric",
    kind: "Real-Time Intelligence",
    cardTitle: "Live Aircraft Data",
    cardText:
      "OpenSky positions streamed through Eventstream into an Eventhouse, analysed in KQL, with a Real-Time Dashboard and an Activator rule.",
    outcome: "54,587 events · 46,004 unique after cleaning",
    cardTags: ["Eventstream", "KQL", "Power BI"],
    title: "Live aircraft data in Fabric Real-Time Intelligence",
    eyebrow: "Microsoft Fabric · Real-Time Intelligence",
    summary:
      "Live OpenSky aircraft positions streamed through a Fabric Eventstream into an Eventhouse, analysed with KQL, shown on a Real-Time Dashboard and in a Power BI report on an imported snapshot, with an Activator rule on top. A streaming counterpart to the BTS batch lakehouse; the write-up states what failed and what was not verified.",
    tags: ["Microsoft Fabric", "Real-Time Intelligence", "Eventstream", "KQL", "Activator", "Python", "Power BI"],
    palette: "sky",
    repoUrl: "https://github.com/siamsadman/opensky-fabric-rti",
    cardImage: {
      src: "/projects/opensky-fabric-rti/22-powerbi-report.png",
      alt: "OpenSky Power BI report page: KPI cards, aircraft per 5 minutes, top origin countries and a table of airborne readings below -20 m/s",
    },
    numbers: [
      { big: "54,587", label: "events ingested in 3 h 18 min, 10:16 to 13:34 UTC, with gaps" },
      { big: "46,004", label: "unique positions after cleaning; 8,583 repeats removed (about 15.7%)" },
      { big: "~1,086", label: "distinct aircraft (a dcount estimate)" },
    ],
    archHeading: "From the OpenSky API to a dashboard and an alert",
    layers: [
      {
        label: "INGEST",
        title: "Python producer to Eventstream",
        text: "A Python producer gets an OAuth2 token, polls a South Asia bounding box every 60 seconds and sends one JSON event per aircraft to an Eventstream custom endpoint.",
        gateLabel: "Checked",
        gate: "The first run sent 321 events, and the credit counter fell by 4 per call, as documented.",
      },
      {
        label: "STORE",
        title: "Eventhouse and KQL",
        text: "Direct ingestion into `aircraft_states`. A saved function, `aircraft_clean()`, types the data and keeps one row per aircraft and position time.",
        gateLabel: "Checked",
        gate: "Raw rows split into unique positions and repeats, so the gap between raw and clean is explained.",
      },
      {
        label: "SERVE",
        title: "Dashboard, alert and report",
        text: "A Real-Time Dashboard with two tiles, an Activator rule built from the second tile, and a Power BI report on an imported snapshot.",
        gateLabel: "Not verified",
        gate: "Notification delivery. The rule recorded 1 activation, but the account has no working Teams or mailbox.",
        highlight: true,
      },
    ],
    archNote:
      "Built in one session on 25 Oct 2026 on a Fabric trial. A script feeds the Eventstream because OpenSky requires OAuth2 client credentials and the Eventstream HTTP source (preview) is documented without OAuth support; I did not test the HTTP source. Data: OpenSky Network, used under their API terms, for a non-commercial portfolio project. All times are UTC.",
    findingsHeading: "What the data and the checks showed",
    findings: [
      {
        big: "19 of 23",
        title: "Reported rapid descents mostly disagreed with altitude",
        text: "On the final data, 23 of the 26 airborne readings below -20 m/s had an earlier reading from the same aircraft 5 to 120 seconds before. 4 agreed with the rate calculated from the altitude change (within 5 m/s, a tolerance I chose) and 19 did not. I did not investigate why.",
      },
      {
        big: "1 of 3",
        title: "Live-feed rows are not activations",
        text: "The alert's live feed listed 3 matching rows, but History recorded 1 activation, a borderline case: reported -21.46 m/s against -16.7 m/s from altitude. The other two likely arrived before I corrected the condition from 'is equal to' to 'is less than' (not verified).",
      },
      {
        big: "8 gaps",
        title: "Not a continuous 60-second series",
        text: "Eight gaps longer than 90 seconds, up to 487 seconds. One is a producer restart, two match producer timeouts and five are unexplained, so per-window counts dip where collection stopped.",
      },
      {
        big: "Registration, not location",
        title: "India leads, but that is where aircraft are registered",
        text: "`origin_country` is inferred from the transponder address, so India's lead says where aircraft are registered, not where they were flying.",
      },
    ],
    screensHeading: "The Power BI report",
    screens: {
      images: [
        {
          src: "/projects/opensky-fabric-rti/22-powerbi-report.png",
          alt: "Power BI report page: four KPI cards, a line chart of distinct aircraft per 5-minute window, a bar chart of the top 8 origin countries and a table of airborne readings below -20 m/s",
        },
      ],
      paragraphs: [
        "A one-page Power BI report on an imported snapshot of `aircraft_clean()` (46,004 rows), not a live connection to the Eventhouse. Four KPI cards, distinct aircraft per 5-minute window, the top 8 origin countries, and a table of the 26 airborne readings reported below -20 m/s. It was built with Claude Code and Microsoft's Power BI authoring plugin.",
        "**Checks.** The five count measures match a KQL cross-check on the final data (46,004 / 1,088 / 1,081 / 26 / 21), the table's 26 readings equal the `Readings Below -20 m/s` measure, and the nine rows at the top of the table match a DAX query on the model. The top-8 countries measure was checked with a DAX query only, not in KQL.",
        "**Limits.** The time axis shows 12-hour labels, the table scrolls (about eight of its 26 rows are visible at once), and the Power BI project files are not published because they contain the Eventhouse address.",
      ],
    },
    sections: [
      {
        type: "list",
        kicker: "Queries",
        heading: "What the queries showed",
        intro:
          "Nine queries are in the repo (`kql/03_analysis.kql`). Times are when each one was run, so the figures come from a table that was still filling.",
        items: [
          "**Aircraft per 5 minutes.** Roughly 250 to 350 distinct aircraft per window while the producer was running, with dips where it was stopped or failing.",
          "**Top origin countries (11:06 UTC, before collection ended).** India 408 distinct aircraft, UAE 47, Thailand 44, China 25, Bangladesh 24.",
          "**Vertical rate of airborne readings (11:12 UTC, 14,104 readings).** Median 0 m/s, 5th to 95th percentile about -8.8 to +9.7 m/s, extremes -44.87 and +26.33 m/s.",
          "**Emergency squawk codes 7500, 7600, 7700.** No rows when I ran the query at 11:14 UTC. I did not re-run it on the full table.",
          "**Rapid-descent frequency (11:19 UTC, 15,938 airborne readings).** 71 below -15 m/s, 8 below -20 m/s, 5 below -25 m/s.",
        ],
        images: [
          { src: "/projects/opensky-fabric-rti/05-dedup-breakdown.png", alt: "Raw rows split into unique positions and repeated positions" },
          { src: "/projects/opensky-fabric-rti/13-descent-consistency.png", alt: "Consistency check of reported rapid descents against altitude change" },
        ],
      },
      {
        type: "gallery",
        kicker: "Dashboard",
        heading: "Two tiles, one tightened",
        images: [
          {
            src: "/projects/opensky-fabric-rti/14-dashboard-strict-tile.png",
            alt: "Real-Time Dashboard — distinct aircraft per 5 minutes and rapid descents",
          },
        ],
        paragraphs: [
          "Tile 1 shows distinct aircraft per 5 minutes and honours the dashboard time range. Tile 2 lists airborne readings below -20 m/s whose reported vertical rate is within 5 m/s of the rate calculated from the altitude change.",
          "Tile 2 was tightened after a first version that used the reported rate alone: most of that version's hits looked inconsistent with altitude.",
        ],
      },
      {
        type: "gallery",
        kicker: "Alert",
        heading: "One recorded activation",
        images: [
          {
            src: "/projects/opensky-fabric-rti/18-activator-history.png",
            alt: "Activator rule history — one recorded activation",
          },
        ],
        paragraphs: [
          "`rapid_descent_consistent` was created from tile 2: the query runs every 5 minutes, the condition is `vertical_rate_ms` less than -20, and the action is a Teams message to my own account. It showed Running. At about 13:03 UTC its History tab showed 1 recorded activation (12:44:52 UTC). I did not re-check History after that.",
          "**Notification delivery is not verified.** The account has no working mailbox or Teams subscription: the email test failed with 'email address is not defined in your profile' and a Teams subscription error was shown. I did not determine whether Activator records an activation when delivery fails.",
        ],
      },
      {
        type: "list",
        kicker: "Limits",
        heading: "What I did not verify",
        items: [
          "**Where the gaps are.** The producer restart gap runs from 10:35:09 to 10:43:16 UTC, and the five unexplained gaps fall between 12:13 and 12:43 UTC. All eight are listed in the problems log.",
          "**The flag is a data check, not a safety signal.** Many reported rapid descents looked inconsistent with altitude, which could be bad values, and I did not establish what actually happened.",
          "**Mistakes I made and fixed.** The first dashboard tile ignored the time-range filter, so its label did not match its data. The alert condition first saved as equal to instead of less than. I first counted live-feed rows as activations. My first redaction of the dashboard export missed one identifier. The Power BI report's 5-minute window column first loaded as text because its query had no type step. All are in the problems log.",
          "**Not tested.** The Eventstream HTTP source, ingestion latency, rebuilding the project from scratch on another machine, and a live (DirectQuery) Power BI connection to the Eventhouse.",
          "**Producer timeouts.** One ReadTimeout and several ConnectTimeouts calling OpenSky. The script logs each and tries again at the next interval, and recovered every time. It has no retry logic of its own, and I did not determine the cause.",
          "**Events sent before the destination existed.** A test run of 321 events went out before the Eventhouse destination was added. The table's first event is 10:16 UTC, so those events appear not to have been stored (inferred from timestamps).",
          "**Hard-coded local paths.** The producer script keeps its credential and connection-string paths on my machine, outside the repo.",
          "**After the trial.** The Fabric items disappear when the trial ends. The repo keeps the producer script, the KQL scripts, a sanitized dashboard export, the problems log and 22 screenshots.",
        ],
      },
    ],
  },
  {
    slug: "grid-shift",
    category: "fabric",
    kind: "Fabric App (preview)",
    cardTitle: "Grid Shift",
    cardText:
      "How Bangladesh generates electricity, compared with South Asia and the world, as a Fabric App over a Direct Lake semantic model.",
    outcome: "285,700 rows · 22 DAX measures",
    cardTags: ["Dataflow Gen2", "DAX", "Direct Lake"],
    title: "Grid Shift: how Bangladesh's electricity is generated",
    eyebrow: "Microsoft Fabric · Fabric App (preview)",
    pages: ["Overview", "Monthly"],
    pagesLabel: "Views",
    summary:
      "How Bangladesh's electricity is generated, and how it compares with South Asia and the world. A Dataflow Gen2 loads Ember's open data into a Fabric Warehouse, a star schema and a Direct Lake semantic model sit on top, and a Fabric App (preview) presents it.",
    tags: [
      "Microsoft Fabric",
      "Dataflow Gen2",
      "T-SQL",
      "Direct Lake",
      "DAX",
      "Fabric Apps (preview)",
      "TypeScript",
    ],
    palette: "emerald",
    repoUrl: "https://github.com/siamsadman/ember-fabric-app",
    demoUrl: "https://github.com/user-attachments/assets/2abf29a0-7a3b-4adb-a5df-3e6353965018",
    cardImage: {
      src: "/projects/grid-shift/01_Bangladesh_overview_dark_theme_card.png",
      alt: "Grid Shift overview for Bangladesh, dark theme — KPI cards and the generation-mix chart",
    },
    numbers: [
      { big: "285,700", label: "source rows loaded: 104,241 yearly and 181,459 monthly" },
      { big: "22", label: "DAX measures on a Direct Lake model with 6 relationships" },
      { big: "224", label: "areas in the yearly data, 2000 to 2025; 99 in the monthly data, to Aug 2026" },
    ],
    archHeading: "From Ember's CSVs to a Fabric App",
    layers: [
      {
        label: "LOAD",
        title: "Dataflow Gen2 into a Warehouse",
        text: "df_ember_load reads Ember's yearly and monthly CSVs over the web, keeps and renames the columns, types them, and writes two staging tables to a Fabric Warehouse. A run takes about 20 minutes.",
        gateLabel: "Checked",
        gate: "Row counts match the CSVs: 104,241 yearly and 181,459 monthly.",
      },
      {
        label: "MODEL",
        title: "Star schema and Direct Lake",
        text: "T-SQL CTAS builds a star schema in the warehouse's mart schema: four dimensions and two facts. The semantic model sm_grid_shift sits on it in Direct Lake mode, with 6 relationships and 22 DAX measures.",
        gateLabel: "Checked",
        gate: "Duplicate checks on the fact grain, and Bangladesh 2025 values reconciled between a DAX query and Ember's raw CSV.",
      },
      {
        label: "SERVE",
        title: "Fabric App (preview)",
        text: "A React and TypeScript app on the dataapp template with delegated sign-in. Overview and Monthly views, light and dark themes, a phone layout, and per-user watchlist notes in the app's own SQL database.",
        gateLabel: "Checked",
        gate: "Every number comes from a model measure, with no mock data. Per-user notes tested with two accounts.",
        highlight: true,
      },
    ],
    archNote:
      "The semantic model is edited as TMDL through Fabric Git integration (the fabric branch). Summary sources such as Clean, Fossil and Total are never summed with individual fuels. Built end to end on a Fabric trial in October 2026. Data: Ember, Electricity Data (CC BY 4.0).",
    diagrams: [
      {
        src: "/projects/grid-shift/architecture.png",
        alt: "Architecture — Ember CSVs through Dataflow Gen2 into a Fabric Warehouse, a star schema and Direct Lake semantic model, then the Fabric App",
      },
    ],
    findingsHeading: "What the data says about Bangladesh, 2025",
    findings: [
      {
        big: "64.3%",
        title: "Gas is losing share",
        text: "Gas generated 64.3% of Bangladesh's electricity in 2025, down from a 92.5% peak in 2010, mainly to coal and imports.",
      },
      {
        big: "21.5%",
        title: "Coal took most of it",
        text: "Coal went from about 0% in 2000 to 21.5% in 2025, and net imports now equal 14.2% of generation.",
      },
      {
        big: "2.1%",
        title: "Clean power is still small",
        text: "The story is not a solar boom: clean power was 2.1% of generation in 2025.",
      },
      {
        big: "696 gCO2e/kWh",
        title: "Carbon intensity",
        text: "Against a total demand of 118.0 TWh in 2025.",
      },
    ],
    findingsNote:
      "Figures come from the semantic model and were reconciled against Ember's raw CSV.",
    screensHeading: "The app",
    screens: {
      images: [
        {
          src: "/projects/grid-shift/01_Bangladesh_overview_dark_theme.png",
          alt: "Grid Shift overview for Bangladesh, dark theme",
        },
        {
          src: "/projects/grid-shift/02_Bangladesh_overview_light_theme.png",
          alt: "Overview for Bangladesh, light theme",
        },
        {
          src: "/projects/grid-shift/03_India_overview_dark_theme.png",
          alt: "Overview for India, dark theme",
        },
        {
          src: "/projects/grid-shift/04_Bangladesh_monthly_dark_theme.png",
          alt: "Monthly view for Bangladesh — generation by fuel, month by month",
        },
        {
          src: "/projects/grid-shift/05_Nepal_monthly_dark_theme.png",
          alt: "Monthly view for Nepal — an explicit empty state, because Ember has yearly data only for Nepal",
        },
        { src: "/projects/grid-shift/06a_Phone_overview_top.png", alt: "Phone: header and KPI cards", portrait: true },
        { src: "/projects/grid-shift/06b_Phone_overview_middle.png", alt: "Phone: fuel legend and latest-year mix", portrait: true },
        { src: "/projects/grid-shift/06c_Phone_peers_and_watchlist.png", alt: "Phone: peer chart and watchlist", portrait: true },
      ],
    },
    sections: [
      {
        type: "list",
        kicker: "Build",
        heading: "How it was built",
        items: [
          "**Two source files.** Ember's yearly file has 104,241 rows across 224 areas, 2000 to 2025. The monthly file has 181,459 rows across 99 areas, Jan 2019 to Aug 2026. Nepal is in the yearly file only.",
          "**Two date tables.** `dim_year` serves the yearly grain and `dim_date` the monthly grain, next to `dim_source`, `dim_area` and the two fact tables. Row counts and duplicate checks are in the schema script.",
          "**Semantic model.** `sm_grid_shift` reads the warehouse in Direct Lake mode. 22 measures were verified, for example Bangladesh 2025 gas share 64.29%, coal 21.52%, import share 14.17% and carbon intensity 696.1 gCO2e/kWh.",
          "**Measures, not raw columns.** The app reads the model through the semantic-model connector, so every number is a measure. There is no mock data, and where a country has no monthly data, the Monthly view says so instead of drawing an empty chart.",
          "**Watchlist.** A small notes feature backed by the app's own SQL database, to show the app can write as well as read. It follows the documented `@role` policy pattern, so each user sees and deletes only their own notes.",
          "**Setup the app needs.** The Semantic Model Execute Queries REST API tenant setting, plus Build and Read permission on the model.",
          "**Three details were not in the docs pages I read:** Direct Lake as the model's storage mode, the database `dialect: mssql` setting, and the `devUri` local dev flow.",
        ],
      },
      {
        type: "list",
        kicker: "Checks",
        heading: "Checks and limits",
        items: [
          "**How it was built.** With AI assistance. Claude drafted the SQL and Power Query, and Claude Code wrote the app code and DAX measures. I chose the dataset and the story, decided the architecture and the warehouse model, ran every step in Fabric, validated the results against Ember's raw data, and tested the per-user notes with two accounts.",
          "**Reconciled against source.** Bangladesh's 2025 values were checked between a DAX query and Ember's raw CSV, and a monthly comparison (Bangladesh coal, Aug 2026 vs Aug 2025) was checked the same way.",
          "**Per-user notes tested with two accounts** in separate private browser sessions, with a database check that each note carries its author's owner ID. The app keeps its sign-in cached per browser, so testing several accounts needs separate private windows.",
          "**Preview and sign-in.** Fabric Apps are in preview and the live app needs a Fabric sign-in with access to the workspace, so there is no public link. It ran on a trial capacity that was due to end in early November 2026, so the screenshots and the recorded demo are the lasting record.",
          "**Data limits.** Ember's latest months are provisional and get revised. Pakistan's monthly series ends earlier than the others, and Nepal has yearly data only.",
        ],
      },
    ],
  },
  {
    slug: "olist-dbt-databricks",
    category: "de",
    kind: "dbt on Databricks",
    cardTitle: "Olist Pipeline",
    cardText:
      "The pipelines behind the three Olist dashboards, rebuilt in dbt on Databricks Free Edition. A learning project, built with AI as a guide.",
    outcome: "25 models · 57 tests passing",
    cardTags: ["dbt", "Databricks", "Unity Catalog"],
    title: "Olist Pipeline: dbt on Databricks",
    eyebrow: "dbt · Databricks · Olist series, rebuilt as code",
    summary:
      "A learning project that rebuilds the pipelines behind my three Olist Power BI dashboards as dbt models on Databricks Free Edition: 25 models, 57 tests, a Databricks job, a Lakeflow pipeline and a Unity Catalog row filter. I used AI as a guide and checked every mart against the original projects.",
    tags: ["dbt", "Databricks", "SQL", "Unity Catalog", "Lakeflow"],
    palette: "amber",
    repoUrl: "https://github.com/siamsadman/olist-dbt-databricks",
    docsUrl: "https://olist-dbt-docs.vercel.app",
    cardImage: {
      src: "/projects/olist-dbt-databricks/card.png",
      alt: "Databricks dashboard on the dbt marts — six KPIs, revenue by month, late-delivery rate, review score by delay, delivery time against review score by state, and the payment mix",
    },
    numbers: [
      { big: "25", label: "models: 9 staging views, 1 intermediate view and 15 marts, with 57 tests and 1 seed" },
      { big: "85 of 85", label: "build steps pass, locally and in the Databricks job, counting two project hooks" },
      { big: "8", label: "delivered orders with no delivery date, found by a Lakeflow expectation after I first counted 2" },
    ],
    archHeading: "From raw CSVs to a dashboard",
    layers: [
      {
        label: "LOAD",
        title: "Raw tables in Unity Catalog",
        text: "Nine Olist CSVs are loaded with hand-run SQL as all-text tables, so every cast and every cleaning decision lives in dbt code where it can be tested.",
        gateLabel: "Checked",
        gate: "Row counts were compared with the source files, for example 99,441 orders and 99,224 review rows.",
      },
      {
        label: "TRANSFORM",
        title: "dbt: staging, intermediate, marts",
        text: "Nine staging views cast and rename, one intermediate view holds the shared lateness rule, and 15 marts rebuild the three dashboards' star schemas.",
        gateLabel: "Rule",
        gate: "Staging uses `cast`, not `try_cast`, so bad data fails the build instead of turning into a silent NULL.",
      },
      {
        label: "RUN",
        title: "Job, pipeline and dashboard",
        text: "A Databricks Asset Bundle deploys a serverless job that runs `dbt build`, plus a Lakeflow pipeline. A dashboard built by hand reads the marts.",
        gateLabel: "Checked",
        gate: "`dbt build` passes 83 of 83 locally and in the job, or 85 counting the two project hooks.",
        highlight: true,
      },
    ],
    archNote:
      "I built this to learn dbt and Databricks by doing, using the pipelines behind my three Olist dashboards as the exercise. I am a BI developer coming from the Microsoft stack, not a dbt expert, and I used AI (Claude) as a guide throughout. I ran every step myself, and every mart is reconciled against the original projects, with the differences documented rather than forced to match.",
    diagrams: [
      {
        src: "/projects/olist-dbt-databricks/lineage-graph.png",
        alt: "dbt lineage for fact_deliveries — five raw sources and a seed, through staging views and an intermediate view, into the mart",
      },
    ],
    findingsHeading: "What reconciles, and what does not",
    findingsNote: "Counts are from my own build, compared with the published Olist projects.",
    findings: [
      {
        big: "7,827 late",
        title: "Lateness reproduces exactly",
        text: "`fact_deliveries` gives 88,649 on time, 7,827 late and 2,965 never delivered, with an average delivery time of 12.50 days: the same figures as the Logistics report.",
      },
      {
        big: "4.29 vs 2.57",
        title: "Review scores reproduce too",
        text: "`bridge_review_order` gives 88,658 on-time, 7,701 late and 2,865 never-delivered review links, with average scores of 4.29 on time and 2.57 late, as in the Customer Satisfaction report.",
      },
      {
        big: "98,991 vs 103,831",
        title: "One published count only reproduces without DISTINCT",
        text: "The published row count for `bridge_review_category_delay` appears only when the join runs without `DISTINCT`, although the original SQL contains it. I kept `DISTINCT` and documented the gap.",
      },
    ],
    screensHeading: "The dashboard on the marts",
    screens: {
      images: [
        {
          src: "/projects/olist-dbt-databricks/dashboard.png",
          alt: "Databricks dashboard on the dbt marts: six KPI tiles, revenue by month, late deliveries by purchase month, review score by delay bucket, delivery time against review score by state, and payment value by type",
        },
      ],
      paragraphs: [
        "Built by hand in the Databricks dashboard editor, with six SQL datasets reading the marts: six KPI tiles, revenue by month, late deliveries by purchase month, review score by delay bucket, delivery time against review score by state, and payment value by type.",
        "The late-delivery line counts only months with 100 or more orders, because a handful of orders in September 2016 gave a meaningless 100% rate. The bundle does not deploy the dashboard: its exported JSON is in the repository, but I have not tested re-importing it into a fresh workspace.",
      ],
    },
    sections: [
      {
        type: "list",
        kicker: "Pipeline",
        heading: "What got built",
        items: [
          "**Raw layer.** The nine Olist CSV files are loaded as all-text tables in `workspace.olist_raw`, so dbt does every cast and clean.",
          "**dbt models.** 25 models (9 staging views, 1 intermediate view and 15 marts) plus 57 tests and 1 seed. `dbt build` passes 83 of 83, or 85 counting two project hooks.",
          "**Databricks job.** A Databricks Asset Bundle deploys a serverless job that runs `dbt build`. The job runs dbt 1.12.6 while I develop locally with dbt v2 (2.0.11), and the same project ran unchanged under both.",
          "**Lakeflow pipeline.** Auto Loader reads the orders file in two batches into a streaming table with three data-quality expectations, plus a materialized view. The stream is simulated: the Olist data is static, so I split one CSV into two files and uploaded them by hand.",
          "**Row filter.** A Unity Catalog row filter on `dim_customer` lets admins see every customer and everyone else only São Paulo. dbt hooks re-apply it after every rebuild.",
          "**Docs.** A dbt Docs v2 site with lineage, descriptions and tests, hosted on Vercel.",
        ],
        images: [
          {
            src: "/projects/olist-dbt-databricks/dbt-docs-columns.png",
            alt: "Generated dbt docs for fact_deliveries — every column has a description; the sidebar shows 25 models, 57 tests, 9 sources and 1 seed",
          },
        ],
      },
      {
        type: "list",
        kicker: "Data quality",
        heading: "Six problems in the raw files",
        items: [
          "`review_id` is not unique: there are 98,410 distinct values across 99,224 rows. The real grain is the pair of review and order, enforced by a singular test, so `fact_reviews` keeps one row per review and `bridge_review_order` keeps every pair.",
          "Review comments contain line breaks and quotes, which breaks a default CSV load. The raw load for that file uses the multi-line and quote-escape options, and the correct count is 99,224 rows.",
          "610 products have no category and 13 more sit in two categories missing from the translation file, 623 untranslated in total. The 610 become `Unknown` and the other two are mapped by hand in a seed.",
          "2 products have no weight. I set them to 0, following the original rule; it is a made-up value for two products, not a measurement.",
          "775 orders have no items, so order value and weight stay NULL in `fact_deliveries` instead of being turned into zeros.",
          "Geolocation has coordinates outside Brazil. No current mart uses that table, so I left it, with a note that any future mart would need to filter or flag the points.",
        ],
      },
      {
        type: "list",
        kicker: "Reconciliation",
        heading: "Where my numbers differ",
        intro:
          "Every mart was compared with the numbers from my published Olist projects. Where they differ, the difference is documented rather than hidden.",
        items: [
          "**`bridge_review_category_delay`: 98,991 rows against the published 103,831.** The published count only reproduces when the same join runs without `DISTINCT`, although the original SQL contains `SELECT DISTINCT`. I kept `DISTINCT`: one row per review, category and delay bucket.",
          "**Late means a timestamp comparison, not a date comparison.** The published review figures only reproduce when lateness compares full timestamps. The date-based version in the SQL file gives an average score of 2.27 for late orders against the published 2.57.",
          "**`dim_order` has 99,441 rows, the published Sales model has 98,666.** The Sales model leaves out the 775 orders with no line items. The 99,441 target came from an approximate figure in a SQL comment, and my mart keeps every order.",
          "**`dim_customer` takes each customer's address from their latest order.** 252 customers (0.26%) have more than one address, so a few rows can differ from the published project.",
          "**`dim_date` has 800 days, not 774.** The logistics project needed estimated delivery dates beyond the last purchase date.",
        ],
      },
      {
        type: "list",
        kicker: "Lessons",
        heading: "What went wrong",
        items: [
          "**A dbt rebuild silently dropped the row filter.** Rebuilding `dim_customer` removed it. The fix is dbt hooks (an `on-run-start` function and a model `post_hook`), verified in both dbt versions.",
          "**Anaconda broke the Databricks CLI.** A user-level `SSL_CERT_FILE` variable made it fail with a certificate error. Clearing it in each terminal session fixes it.",
          "**Expectations on an existing streaming table checked nothing at first.** A streaming table does not re-read files it has already processed, so a normal run only sees new data and a full refresh was needed.",
          "**I first counted the wrong number of delivered orders without a delivery date.** I recorded 2 and the right number is 8, because my comparison netted out other statuses.",
          "**Deleting a Lakeflow pipeline did not delete its tables.** I dropped them by hand before the bundle took over the pipeline.",
        ],
      },
      {
        type: "list",
        kicker: "Lessons",
        heading: "What I learned",
        items: [
          "**Models with `ref()` replace scripts run by hand.** dbt works out the build order and the lineage itself.",
          "**Tests catch what row counts cannot.** Matching numbers did not prove that a rebuild kept the row filter, so I checked the state directly.",
          "**Docs only stay true if I regenerate them.** I forgot to after adding the hooks and had to redo them.",
          "**Reconciling is most useful when it fails.** Three of the five differences came from the original SQL and the published numbers not agreeing with each other.",
          "**Day differences must be computed on dates, not timestamps.** SQL Server counts date boundaries.",
        ],
      },
      {
        type: "list",
        kicker: "Limits",
        heading: "Checks and limits",
        items: [
          "**Checked.** `dbt build` passes 83 of 83 locally and in the Databricks job, the marts reconcile against my published figures apart from the differences above, and the row filter was confirmed in `information_schema.row_filters` after a rebuild.",
          "**Row filter limit.** I tested it by swapping in a rule that referenced a group I do not belong to, not with a second real user.",
          "**Expectations.** The drop-row and fail-update expectations fired zero times on the real data, so they show the mechanism, not a cleaned dataset. The warning expectation flagged 8 delivered orders with no delivery date.",
          "**Raw layer.** Loaded by running SQL by hand, with no automated ingestion for the nine main tables.",
          "**Docs.** dbt Docs v2 is alpha and loads its viewer libraries from a CDN.",
          "**Free Edition.** Serverless compute only, one SQL warehouse and one active pipeline per type, with a daily compute quota whose size is not published.",
        ],
        images: [
          {
            src: "/projects/olist-dbt-databricks/dbt-build-local.png",
            alt: "Local dbt build on dbt v2 (2.0.11) — 25 models, 57 tests, 1 seed and 2 hooks, 85 of 85 succeeded in 1 minute 35 seconds",
          },
          {
            src: "/projects/olist-dbt-databricks/job-run.png",
            alt: "Databricks job run output — dbt build completed successfully, 85 of 85 including two project hooks",
          },
          {
            src: "/projects/olist-dbt-databricks/lakeflow-pipeline.png",
            alt: "Lakeflow pipeline graph with the expectations panel — 99,441 rows written, none dropped, 8 warnings on delivered_has_date",
          },
          {
            src: "/projects/olist-dbt-databricks/row-filter.png",
            alt: "Query result showing the row filter attached to dim_customer",
          },
        ],
      },
    ],
  },
];
