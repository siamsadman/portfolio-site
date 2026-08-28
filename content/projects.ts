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
    sections: [
      {
        type: "gallery",
        heading: "Screenshots",
        images: [
          { src: "/projects/olist-customer-satisfaction/dashboard-01.png", alt: "Overview" },
          { src: "/projects/olist-customer-satisfaction/dashboard-02.png", alt: "Drivers" },
          { src: "/projects/olist-customer-satisfaction/dashboard-03.png", alt: "Sellers" },
        ],
      },
      {
        type: "gallery",
        heading: "Data Model",
        images: [
          {
            src: "/projects/olist-customer-satisfaction/data-model.png",
            alt: "Customer Experience & Satisfaction data model",
          },
        ],
        paragraphs: [
          "A review-grain fact table with three many-to-many bridges and one deliberately disconnected table, reusing `dim_date`, `dim_customer`, `dim_seller` and `dim_product` from the earlier two parts without modifying any existing table.",
          "Worth naming precisely: this is **not a textbook star schema**. Bridges sit between the fact and three of its dimensions, so `dim_seller`, `dim_product` and `dim_customer` are two hops from `fact_reviews` rather than one; all three bridges use bidirectional cross-filtering; and `bridge_review_category_delay` has no relationships at all. It is a bridge-heavy dimensional model, and each departure from the clean star was a decision with a reason.",
          "The obvious design puts a single `order_id` column on the review table. It is also wrong, and quietly so. In this dataset 789 review IDs appear against more than one order, and 547 orders carry more than one review. The duplicated rows are identical on every field except `order_id`, so a careless `DISTINCT` hides the problem rather than solving it. `bridge_review_order` resolves it as two clean many-to-one hops. Each of the three many-to-many relationships across the series was verified with a count query before its bridge was built, not assumed from the table names.",
          "One table is deliberately disconnected. The category-by-delivery-outcome heatmap has to cross two independent many-to-many bridges in a single filter context — product category through one, delivery delay through another. Three separate DAX approaches all returned wrong-but-plausible numbers, the standard failure mode when averaging across two unrelated many-to-many paths. Rather than keep iterating on DAX producing numbers that could not be independently reproduced, the join was pre-flattened in SQL into `bridge_review_category_delay` and left with no relationships in the model. The heatmap reads it directly, the result is deterministic, and it matches the validation queries exactly. It is an unglamorous solution and it breaks the clean star, which is why it is documented rather than hidden.",
          "Every object in this project is new, and the four shared dimensions are read but never written. `dim_date` was checked against this project's full date range before any fact load — it already spanned September 2016 to November 2018, so unlike Part 2 no extension was needed. Verifying that up front is the point; Part 2 discovered its gap as a foreign key violation mid-load.",
        ],
      },
      {
        type: "list",
        heading: "Data quality",
        items: [
          "Reviews and orders form a genuine many-to-many: 789 reviews span multiple orders and 547 orders carry multiple reviews. Built `bridge_review_order` rather than forcing a false one-to-one, verified with count queries before designing the schema.",
          "5,127 reviews, 5.4%, have a **negative** delivery-to-review interval — the review predates the recorded delivery timestamp. Investigated as a possible timestamp-rounding artifact and ruled out: only 56% fall within seven days, with a much deeper tail. Treated as unreliable timing data and excluded from `[Avg Days to Review]`, with the rows retained so the anomaly stays inspectable.",
          "759 rows have a null `order_value`, confirmed as the known zero-item orders from Part 1 — cancelled or unavailable before fulfilment. Bucketed as \"Unknown\" and filtered out of the price chart rather than coerced to zero: a cancelled order is not an order worth R$0.",
          "701 reviews have no seller attribution, same root cause. Documented rather than silently dropped, since seller-level review counts therefore do not sum to the review total and any share-of-all-reviews measure at seller grain overstates slightly.",
          "`BLANK() = FALSE` evaluates to `TRUE` in DAX, so `is_late = FALSE` silently swept in 2,865 never-delivered orders. Added explicit `NOT ISBLANK()` guards. Without them the on-time count read 91,523 instead of 88,658 and the on-time average read 4.22 instead of 4.29 — an error that flatters the result and would have shipped invisibly.",
          "Bridge relationships defaulted to single-direction cross-filtering, silently preventing filters from reaching `fact_reviews`. Set all three to bidirectional. Caught the same way as in Part 2: every category rendering an identical value is the symptom.",
          "Averaging review scores across two independent many-to-many bridges returned wrong-but-plausible results through three separate DAX approaches. Pre-flattened the join in SQL into a standalone, deliberately disconnected table. Deterministic, and matches the validation queries exactly.",
          "`category_name_en` exists in both `dim_product` and the flattened table with no relationship between them. Dragging the wrong one into a visual makes every matrix row show the identical grand total. Fixed by verifying the source table of every field, not just its name.",
          "Declaring comment columns as `NVARCHAR(MAX)` collapsed CSV import to around ten rows per second. Bounding them to `NVARCHAR(4000)` dropped the same 98,000-row import from over ten minutes to 41 seconds.",
          "October to December 2016 carries negligible volume — 176, 101 and 45 reviews. Excluded from trend visuals only, via a visual-level filter; the rows remain in all totals and KPIs.",
          "Category `Unknown`, n=1,457, is translation residue rather than a business category, and is excluded from category rankings. The source also contains a genuine typo category, `costruction_tools_garden`, distinct from `garden_tools` — retained as-is, since silently merging it would misstate the source.",
        ],
      },
      {
        type: "list",
        heading: "Modelling decisions",
        items: [
          "**Every measure was validated against an independent SQL query before being trusted in a visual.** This is the discipline the project rests on, and it caught three real bugs that would otherwise have shipped silently: the blank-handling error above, a wrong-table field binding that flattened an entire matrix, and a cross-filter direction that made every category look identical. Those queries are published with expected values stated inline, so every figure on the dashboard traces back to the query that confirmed it.",
          "**Minimum sample size chosen from the distribution rather than guessed.** Seller rankings require at least 30 reviews. That number came from a threshold sweep: at 5, thirty-six sellers sit tied at a perfect 5.00, making any Top 10 arbitrary. That collapses to two sellers at 10 and one at 20. At 30 the ranking is stable — rank 10 at 4.66 is cleanly separated from ranks 11 and 12 at 4.64 — 630 sellers still qualify, and 83.2% of review links are retained.",
          "**Extreme seller scores are mostly small-sample noise, and the dashboard says so.** Average scores are flat across volume bands, so high-volume sellers do not score worse — a plausible-looking hypothesis the data killed. What changes is the range: sellers with 30 to 49 reviews span 3.07 to 5.00, while the 26 largest all fall between 3.49 and 4.34. The page carries that caveat in a callout, because a Top 10 chart invites exactly the wrong conclusion without it.",
          "**Rate measures defined by subtraction where possible.** `[Pct No Comment]` is defined as `1 - [Comment Rate]` rather than as a `has_comment = FALSE` test. Both return the same figure here, but the subtraction is immune by construction to the blank-comparison trap, and guarantees the pages reconcile permanently rather than by coincidence.",
          "**Role-playing date dimension.** `fact_reviews` and `bridge_review_order` relate to `dim_date` four times in total. Only review creation is active; the rest are invoked with `USERELATIONSHIP()`. Only one can be active at a time — the direct path from the bridge and the path through the fact table together form a loop.",
          "**Trend visuals exclude statistically thin months,** filtered to January 2017 through August 2018. Outside that window monthly review counts fall to between 45 and 176, against 5,000 to 9,000 in a typical month.",
        ],
      },
      {
        type: "list",
        heading: "Findings",
        items: [
          "**Late delivery is the single largest driver of dissatisfaction in the dataset.** On-time deliveries average 4.29; late deliveries average 2.57 — a 1.73-point gap. Scores fall off sharply right at the delivery deadline rather than degrading gradually, which suggests customers react to the broken promise itself, not to waiting.",
          "**A long wait is worse than no delivery at all.** Orders delayed 8 to 14 days score 1.68, below orders never delivered at 1.76. Customers appear to forgive an early cancellation more readily than an extended, unresolved wait.",
          "**Unhappy customers explain themselves; satisfied ones don't.** Comment rate falls from 77.3% at one star to 32.8% at four, then ticks back to 38.1% at five. The overall 43.07% rate badly understates how much written feedback concentrates in the one and two star bucket — free-text review mining on this platform disproportionately samples the unhappy.",
          "**Extreme seller scores are mostly small-sample effects.** The best and worst qualifying sellers differ by 2.67 points, but that spread collapses as volume rises: sellers with 30 to 49 reviews range across 1.93 points, the 26 largest span only 0.85. Seller-level satisfaction converges hard toward the 4.09 platform average.",
          "**Higher-value orders score consistently lower,** from 4.16 under R$50 down to 3.93 above R$500 — a modest but monotonic decline, suggesting expectations scale with price faster than service does.",
          "**Response is fast for almost everyone, and glacial for a few.** 86% of reviews get a response within three days, but a 655-review tail waits over 30 days, with the longest cases stretching past a year.",
        ],
      },
    ],
  },
];
