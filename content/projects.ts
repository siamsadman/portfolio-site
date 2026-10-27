export type ProjectImage = {
  src: string;
  alt: string;
  darkSrc?: string; // optional dark-theme variant; omit to render unchanged in both themes
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
  | {
      type: "list";
      heading: string;
      intro?: string;
      items: string[];
      images?: ProjectImage[]; // rendered after the list items
    };

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
      "Three pages covering a satisfaction overview, the drivers behind it, and seller-level performance across the qualifying seller base.",
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
  {
    slug: "bts-fabric-pipeline",
    title: "BTS Airline On-Time Performance — Fabric Lakehouse",
    pages: ["Report page"],
    summary:
      "A medallion-architecture lakehouse over 41.8 million US flight records — PySpark transformation, watermark-driven incremental loading, and a Direct Lake semantic model, with validation gates at every layer boundary.",
    tags: ["Microsoft Fabric", "PySpark", "Data Engineering", "Delta Lake"],
    palette: "indigo",
    repoUrl: "https://github.com/siamsadman/bts-fabric-pipeline",
    cardImage: {
      src: "/projects/bts-fabric-pipeline/14-report-page.png",
      alt: "BTS on-time performance report",
    },
    sections: [
      {
        type: "gallery",
        heading: "Report",
        images: [
          { src: "/projects/bts-fabric-pipeline/14-report-page.png", alt: "BTS on-time performance report" },
        ],
        paragraphs: [
          "One page: KPI cards, on-time and cancellation rate by month across the full range, carrier comparison, and delay minutes by cause.",
          "The page carries a note explaining that on-time performance *improved* through mid-2020 while cancellations spiked to 41.5%. Both are real — domestic volume fell below 30% of normal, so the flights that did operate met empty airports and uncongested airspace. April 2020 records **95.1% on-time and 41.5% cancelled in the same month**: the best punctuality and the worst reliability in the dataset. Retaining cancelled flights is what makes that visible.",
        ],
      },
      {
        type: "gallery",
        heading: "Architecture",
        images: [
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
        heading: "Validation",
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
        heading: "Results",
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
        ],
      },
      {
        type: "list",
        heading: "Notes on the Fabric platform",
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
    title: "Live Aircraft Data — Fabric Real-Time Intelligence",
    pages: ["Aircraft per 5 minutes", "Rapid descents"],
    summary:
      "Live OpenSky aircraft positions streamed through a Fabric Eventstream into an Eventhouse, analysed with KQL, shown on a Real-Time Dashboard, with an Activator rule on top. A streaming counterpart to the BTS batch lakehouse; the write-up states what failed and what was not verified.",
    tags: ["Microsoft Fabric", "Real-Time Intelligence", "KQL", "Python"],
    palette: "sky",
    repoUrl: "https://github.com/siamsadman/opensky-fabric-rti",
    cardImage: {
      src: "/projects/opensky-fabric-rti/22-powerbi-report.png",
      alt: "OpenSky Power BI report page: KPI cards, aircraft per 5 minutes, top origin countries and a table of airborne readings below -20 m/s",
    },
    sections: [
      {
        type: "gallery",
        heading: "Dashboard",
        images: [
          {
            src: "/projects/opensky-fabric-rti/14-dashboard-strict-tile.png",
            alt: "Real-Time Dashboard — distinct aircraft per 5 minutes and rapid descents",
          },
        ],
        paragraphs: [
          "A Real-Time Dashboard with two tiles, built on an Eventhouse table of live aircraft states from the OpenSky Network. Tile 1 shows distinct aircraft per 5 minutes and honours the dashboard time range. Tile 2 lists airborne readings below -20 m/s whose reported vertical rate is within 5 m/s of the rate calculated from the altitude change.",
          "Tile 2 was tightened after a first version that used the reported rate alone: most of that version's hits looked inconsistent with altitude.",
        ],
      },
      {
        type: "list",
        heading: "Pipeline",
        intro:
          "Built in one session on a Fabric trial on 25 Oct 2026. The repo includes a log of the problems hit along the way.",
        items: [
          "**Source.** The OpenSky REST API for a bounding box over South Asia (latitude 5 to 35, longitude 60 to 100), polled by a Python producer set to a 60-second interval. OpenSky requires OAuth2 client credentials, so the producer fetches a token and refreshes it before it expires.",
          "**Ingestion.** The producer sends one JSON event per aircraft to an Eventstream custom endpoint over the Event Hubs protocol, and the Eventstream feeds an Eventhouse table by direct ingestion. I used a script because the Eventstream HTTP source (preview) is documented with Anonymous, Basic and API key authentication and says OAuth is not supported; I did not test the HTTP source.",
          "**Store.** The destination setup created the table `aircraft_states`. A saved KQL function, `aircraft_clean()`, converts epoch seconds to datetimes and keeps one row per aircraft and position time.",
          "**Alert.** An Activator rule created from the second dashboard tile checks `vertical_rate_ms` below -20 every 5 minutes.",
        ],
      },
      {
        type: "list",
        heading: "Data and findings",
        items: [
          "**Volume.** 54,587 events ingested between 10:16 and 13:34 UTC, a span of 3 h 18 min with gaps, covering about 1,086 distinct aircraft (a `dcount` estimate).",
          "**Repeated positions.** Each poll resends aircraft that have not reported a new position, so `aircraft_clean()` removed 8,583 of the 54,587 rows (about 15.7%), mostly repeats.",
          "**Registration, not location.** In a query at 11:06 UTC India led with 408 distinct aircraft, then the UAE with 47. `origin_country` is inferred from the transponder address, so this is registration country, not where the aircraft were flying.",
          "**Reported rapid descents often disagreed with altitude.** Of 12 readings reported below -20 m/s, 2 agreed with the rate calculated from the altitude change between consecutive readings (within 5 m/s, a tolerance I chose) and 10 did not. The sample is small and I did not investigate why they disagree.",
        ],
      },
      {
        type: "gallery",
        heading: "Alert rule",
        images: [
          {
            src: "/projects/opensky-fabric-rti/18-activator-history.png",
            alt: "Activator rule history — one recorded activation",
          },
        ],
        paragraphs: [
          "`rapid_descent_consistent` was created from tile 2 and showed Running. At about 13:03 UTC its History tab showed 1 recorded activation, a borderline case: reported -21.46 m/s against -16.7 m/s calculated from altitude.",
          "**Notification delivery is not verified.** The account has no working mailbox or Teams subscription: the email test failed and a Teams subscription error was shown.",
        ],
      },
      {
        type: "gallery",
        heading: "Power BI report",
        images: [
          {
            src: "/projects/opensky-fabric-rti/22-powerbi-report.png",
            alt: "Power BI report page: four KPI cards, a line chart of distinct aircraft per 5-minute window, a bar chart of the top 8 origin countries and a table of airborne readings below -20 m/s",
          },
        ],
        paragraphs: [
          "A one-page Power BI report on an imported snapshot of `aircraft_clean()` (46,004 rows), not a live connection to the Eventhouse. Four KPI cards, distinct aircraft per 5-minute window, the top 8 origin countries, and a table of the 26 airborne readings reported below -20 m/s.",
          "The report was built with Claude Code and Microsoft's Power BI authoring plugin.",
          "**Checks.** The imported row count matches the KQL result, the table's 26 readings equal the `Readings Below -20 m/s` measure, and the nine rows at the top of the table match a DAX query on the model. The other measures were checked in the model only, not cross-checked in KQL.",
          "**Limits.** The time axis shows 12-hour labels, the table scrolls (about eight of its 26 rows are visible at once), and the Power BI project files are not published because they contain the Eventhouse address.",
        ],
      },
      {
        type: "list",
        heading: "Limits and what I did not verify",
        items: [
          "**Not a continuous series.** Eight gaps longer than 90 seconds, up to 487 seconds: one is the producer restart, two match producer timeouts, and five are unexplained.",
          "**Producer timeouts.** One ReadTimeout and several ConnectTimeouts calling OpenSky. The script logged each and recovered at the next interval; I did not determine the cause.",
          "**The flag is a data check, not a safety signal.** Many reported rapid descents looked inconsistent with altitude, which could be bad values, and I did not establish what actually happened.",
          "**Mistakes I made and fixed.** The first dashboard tile ignored the time-range filter, the alert condition first saved as equal to instead of less than, I first counted live-feed rows as activations, and my first redaction of the dashboard export missed one identifier. All are in the problems log.",
          "**Not tested.** The Eventstream HTTP source, ingestion latency, rebuilding the project from scratch on another machine, and a live (DirectQuery) Power BI connection to the Eventhouse.",
          "**After the trial.** The Fabric items disappear when the trial ends. The repo keeps the producer script, the KQL scripts, a sanitized dashboard export, the problems log and 22 screenshots.",
        ],
      },
    ],
  },
];
