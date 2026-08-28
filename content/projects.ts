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
  | {
      type: "gallery";
      heading: string;
      images: ProjectImage[];
      paragraphs?: string[]; // optional explanatory text beneath the images
    }
  | { type: "prose"; heading: string; paragraphs: string[] }
  | { type: "list"; heading: string; intro?: string; items: string[] };

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
        paragraphs: [
          "Two fact tables at different grains — `fact_order_items`, one row per order line item, and `fact_payments`, one row per payment installment record — with `dim_date`, `dim_customer`, `dim_seller`, `dim_product` and `dim_order` as dimensions.",
          "Both facts share `order_id`, but the field is unique in neither: an order has multiple line items and multiple payment records. Relating them directly produces an uncontrolled many-to-many relationship that silently inflates revenue and payment totals depending on query context. `dim_order` sits between them as a proper dimension, so both facts relate to it many-to-one — a clean, predictable star pattern.",
        ],
      },
      {
        type: "list",
        heading: "Data quality",
        intro:
          "Real datasets are messy. Documenting these decisions matters more than the charts — it shows how the problems were reasoned about, not just what got built.",
        items: [
          "`customer_id` is order-specific — the same person receives a new ID for every order. Used `customer_unique_id` as the true customer key for all customer-level metrics, including repeat rate and unique customer counts.",
          "The `order_items` to `payments` relationship was many-to-many. Introduced `dim_order` as a bridge dimension so both facts relate many-to-one.",
          "775 orders had no rows in `order_items`, having been cancelled or become unavailable before fulfilment. Confirmed as expected: the fact grain is order line item, so these are naturally excluded.",
          "623 products carried untranslated, Portuguese-only category names. Manually mapped the three missing categories to the translation table.",
          "461 orders marked `canceled` still had line items, having been cancelled after fulfilment began. Built a primary `Total Revenue` measure excluding cancelled and unavailable statuses, alongside a separate `Total Revenue (Gross)` measure for demand analysis.",
          "The final month of data, September 2018, was incomplete — the extract was taken mid-month. Filtered all trend visuals to complete months only, through August 2018, to avoid a misleading revenue cliff.",
          "Datetime columns imported as SQL Server `time`, silently dropping the date portion. Diagnosed via `INFORMATION_SCHEMA.COLUMNS` and fixed by re-importing with an explicit `yyyy-MM-dd HH:mm:ss` format mapping.",
        ],
      },
      {
        type: "list",
        heading: "Modelling decisions",
        items: [
          "**Revenue definition.** `Total Revenue` excludes cancelled and unavailable orders to reflect realised performance, with `Total Revenue (Gross)` available for demand analysis. Ratio measures such as Average Order Value use the same filtered population in numerator and denominator, so the two never disagree.",
          "**Year-over-year growth.** Calculated as a fixed comparison of full calendar 2018 against full calendar 2017, rather than an open date range — an open range compares a partial year against a complete one and produces misleading results.",
          "**Repeat customer rate.** Calculated on a lifetime basis rather than within the selected period, so a customer whose two orders fall in different years is not counted as non-repeating.",
          "**Statistical significance threshold.** The top loyalty state insight considers only states with at least 500 customers, so a small, low-volume state where one or two repeat customers dominate the percentage cannot surface as a false leader.",
        ],
      },
      {
        type: "list",
        heading: "Findings",
        items: [
          "**São Paulo drives around 40% of 2018 revenue** — the widest concentration of any state, and a signal that customer acquisition is heavily weighted toward one region.",
          "**Revenue concentrates at category level too.** The top two categories account for roughly 20% of total revenue; the bottom five combined contribute under 1%.",
          "**The repeat purchase rate is very low, around 3%,** consistent with a multi-vendor marketplace lacking platform-level loyalty mechanisms. The state with the strongest repeat behaviour, among those with meaningful sample size, is not the state with the most revenue — loyalty and revenue scale do not move together.",
          "**Credit card is the platform's de facto financing mechanism,** carrying both the highest average installment count and the highest average order value, while boleto, debit and voucher payments are overwhelmingly pay-in-full, lower-value transactions.",
        ],
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
    sections: [
      {
        type: "gallery",
        heading: "Screenshots",
        images: [
          { src: "/projects/olist-logistics/dashboard-01.png", alt: "Executive Overview" },
          { src: "/projects/olist-logistics/dashboard-02.png", alt: "Delay Analysis" },
          { src: "/projects/olist-logistics/dashboard-03.png", alt: "Seller & Freight" },
        ],
      },
      {
        type: "gallery",
        heading: "Data Model",
        images: [
          {
            src: "/projects/olist-logistics/data-model.png",
            alt: "Logistics & Delivery Performance data model",
          },
        ],
        paragraphs: [
          "A star schema centred on `fact_deliveries`, at one row per order, carrying five role-playing date keys — purchase, approved, carrier handoff, delivered and estimated delivery — along with aggregated freight value and pre-computed timing measures. It reuses `dim_date`, `dim_customer`, `dim_seller` and `dim_product` from the sales model without modifying any of those tables.",
          "An order can legitimately involve more than one seller, or span more than one product category. Forcing a single seller or category onto each order row would misrepresent roughly 1.3% of orders and undercount category-level performance. Two lightweight bridge tables — `bridge_order_seller` and `bridge_order_product` — let both relationships resolve as two clean many-to-one hops rather than one uncontrolled many-to-many.",
          "`dim_order` from the sales model already existed at one-row-per-order grain, so adding delivery columns there was tempting. `fact_deliveries` was built as a fully separate table instead, so nothing here could alter a table the published sales dashboard depends on. The same principle applied upstream: rather than updating `stg_orders` in place, it was duplicated to `stg_orders_logistics` before cleaning, leaving the earlier pipeline untouched.",
        ],
      },
      {
        type: "list",
        heading: "Data quality",
        items: [
          "The Part 1 cleaning script filled missing delivery timestamps with a placeholder `1900-01-01` rather than leaving them null. Rewrote the script to use `pd.to_datetime(errors='coerce')`, producing true nulls, and separately patched the already-loaded staging table with `UPDATE ... SET ... = NULL`.",
          "2,965 orders have no `order_delivered_customer_date` and were never confirmed delivered. Confirmed as expected: largely explained by a visible drop-off between carrier handoff and delivery — 1,182 of the 2,965 — rather than by cancellations.",
          "`dim_date`, built for Part 1, covered only the purchase-date range and did not extend far enough to cover `order_estimated_delivery_date`, which projects up to 26 days past the last purchase date. Extended `dim_date` with the missing range only, touching no existing rows.",
          "Both bridge table relationships defaulted to single-direction cross-filtering, silently preventing category and seller filters from reaching `fact_deliveries`. Changed both to bidirectional cross-filtering.",
          "A small number of orders show extreme delivery delays, up to 132 days past estimate. Verified against raw timestamps rather than assumed to be bad data — confirmed as a real event, with two unrelated orders both clearing in an apparent batch resolution in September 2017.",
          "59% of sellers, 1,824 of 3,095, have fulfilled fewer than ten orders. Applied a minimum sample size threshold of 30 orders before a seller enters any ranking measure, so a tiny-sample seller cannot produce a misleadingly perfect or terrible rate.",
        ],
      },
      {
        type: "list",
        heading: "Modelling decisions",
        items: [
          "**Blank-safe rate calculations.** Every rate measure explicitly excludes rows where the outcome is unresolved — `is_late` blank, meaning the order was never confirmed delivered — rather than relying on DAX's default blank handling. An early version of the on-time rate measure that did not do this returned 95% instead of the correct 91.9%: a three-point error that would have overstated performance on a published dashboard.",
          "**Role-playing date dimension.** `fact_deliveries` relates to `dim_date` five separate times. Only the purchase-date relationship is active by default, matching the sales model's convention; the other four are invoked explicitly with `USERELATIONSHIP()` wherever a measure needs to pivot onto a different date stage.",
          "**Minimum sample size for seller rankings.** Any top-seller measure requires at least 30 resolved orders before a seller qualifies, so a seller with two orders and a lucky outcome cannot show a meaningless 100% rate.",
          "**Trend visuals exclude statistically thin months.** Delivery-time trends are filtered to February 2017 through August 2018. Outside that range monthly order counts fall below 300, against 5,000 to 8,000 in a typical month, letting a handful of orders swing the average enough to produce misleading spikes at both ends.",
        ],
      },
      {
        type: "list",
        heading: "Findings",
        items: [
          "**Delivery beats the promised estimate by 11.9 days on average.** The estimated delivery windows are notably conservative — actual delivery consistently arrives well ahead of what is promised, suggesting room to tighten estimates without risking on-time performance.",
          "**Delivery times follow a clear seasonal pattern,** peaking above 15 days across the November 2017 to February 2018 holiday period, then improving steadily to around 9 days by August 2018.",
          "**The seller base is heavily centralised.** São Paulo alone accounts for 1,849 of roughly 3,095 sellers and over 70,000 of roughly 99,441 orders — far more concentrated than the customer base, which spreads more evenly across states.",
          "**Multi-seller orders outperform single-seller orders.** Against the intuitive assumption that splitting an order across sellers would hurt coordination, multi-seller orders show a higher on-time rate at 98.6% versus 91.8% — likely because they skew toward larger, more established sellers with better logistics.",
          "**Among orders that never reached delivery, more were lost in transit than cancelled.** 37% of non-delivered orders were already marked shipped, a larger share than cancelled at 21% or unavailable at 21% — pointing to carrier handoff, not customer cancellation, as the bigger operational risk.",
        ],
      },
    ],
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
