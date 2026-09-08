# BTS Fabric Pipeline — detail page sections

Content for `content/projects.ts`. Drawn from the project's GitHub README.
Nothing invented.

---

## Project entry

- **slug:** `bts-fabric-pipeline`
- **title:** BTS Airline On-Time Performance — Fabric Lakehouse
- **tags:** `Microsoft Fabric`, `PySpark`, `Data Engineering`, `Delta Lake`
- **repoUrl:** https://github.com/siamsadman/bts-fabric-pipeline
- **palette:** pick something distinct from blue / teal-navy / coral-gold — the
  report screenshot will suggest it
- **pages:** Report page (single page — KPI cards, on-time and cancellation rate
  by month, carrier comparison, delay minutes by cause)

**Card summary:**

> A medallion-architecture lakehouse over 41.8 million US flight records — PySpark
> transformation, watermark-driven incremental loading, and a Direct Lake semantic
> model, with validation gates at every layer boundary.

---

## Images to copy into `public/projects/bts-fabric-pipeline/`

From the repo's `docs/` folder. Suggested set and captions:

| File | Caption |
|---|---|
| `14-report-page.png` | Report page — card image and gallery lead |
| `05-bronze-table-111-columns.png` | Bronze — source contract preserved, 111 columns |
| `06-silver-table-56-columns.png` | Silver — typed and named, 56 columns |
| `13-silver-validation-gates.png` | Silver validation gates |
| `08-backfill-71-periods-7h06m.png` | Backfill — 71 periods, 7h 06m, zero failures |
| `10-referential-integrity-full-dataset.png` | Referential integrity across 41.2M rows |
| `15-pipeline-failure-unpublished-period.png` | Failure path — unpublished period, no partial data |

The two architecture diagrams in the README are Mermaid, not images. Either export
them from GitHub as PNGs, or render them on the detail page — worth deciding, since
the architecture is the thing a reader most wants to see first.

---

## Section list

**Report → Architecture → Pipeline → Validation → Results → Platform notes**

Deliberately different from the Olist projects' Screenshots → Data Model → Data
quality → Modelling decisions → Findings. This is the per-project section list doing
what it was built for.

---

## 1. Report

Type: `gallery`, heading "Report".

Image: `14-report-page.png`, alt "BTS on-time performance report".

Prose beneath:

> One page: KPI cards, on-time and cancellation rate by month across the full range,
> carrier comparison, and delay minutes by cause.
>
> The page carries a note explaining that on-time performance *improved* through
> mid-2020 while cancellations spiked to 41.5%. Both are real — domestic volume fell
> below 30% of normal, so the flights that did operate met empty airports and
> uncongested airspace. April 2020 records **95.1% on-time and 41.5% cancelled in the
> same month**: the best punctuality and the worst reliability in the dataset.
> Retaining cancelled flights is what makes that visible.

---

## 2. Architecture

Type: `prose`, heading "Architecture" (plus the diagram image if exported).

> A medallion lakehouse in Microsoft Fabric over US Bureau of Transportation
> Statistics flight data: January 2020 to June 2026, 78 monthly files, **41.8 million
> flight records**, roughly 20 GB of source CSV.
>
> Landing holds raw CSV. Bronze preserves the source contract with an explicit
> schema and audit columns. Silver types and cleans, reducing 109 source fields to
> 56 and merging on a business key. Gold is a star schema — two facts, five
> dimensions. A Direct Lake semantic model sits on the gold tables only.
>
> Layer separation is by table-name prefix within a single lakehouse. Three separate
> lakehouses would mean cross-lakehouse references in every notebook for no
> architectural gain at this scale.
>
> Orchestration is two Data Factory pipelines: one that processes a single period
> through four notebook activities, and a backfill that invokes it sequentially per
> period. Activities are chained **on success**, not on completion — on-completion
> would let a failed landing step run bronze anyway, which is how partial data gets
> written and reported as a success. All four activities share a Spark session tag so
> the pipeline runs as one Spark application rather than four, which is necessary on
> F4 capacity and removes three session startups from every run.

**Why this dataset** — worth a short block:

> Volume justifies the architecture at roughly 600,000 flights per month. BTS
> publishes monthly, so the pipeline processes real new periods rather than a
> simulated drip-feed. And the period covered contains a natural stress test:
> domestic flights fell from 648,229 in March 2020 to 180,617 in May, with a 41.5%
> cancellation rate in April.

---

## 3. Pipeline

Type: `list`, heading "Pipeline decisions".

- **Explicit schema, not inference.** Inference reads the file twice and produces
  inconsistent types between months — a column entirely null in one month infers as
  `string` and as `int` in another, and the append then fails partway through a
  backfill. The schema is generated once from a reference month, hardened, and cached
  to a 20 KB JSON file rather than making two passes over 260 MB of CSV.
- **The phantom column.** BTS ends every row with a trailing comma, producing a 110th
  unnamed field. Declaring it as `_phantom` and dropping it by name avoids Spark
  flagging every row as containing discarded data — a false "corrupted records"
  warning on 600,000 rows trains you to ignore warnings. It is also faster: 13 seconds
  against 24.
- **Keep-list, not drop-list.** Silver reduces 109 fields to 56 using an explicit
  keep-list, so a new column in a future BTS vintage is ignored by default rather than
  flowing through uninvited.
- **Arrival timestamps take the date from arithmetic and the clock from BTS.** Adding
  elapsed minutes to the departure timestamp produced a **48% mismatch** against the
  reported arrival time. Every mismatch was a whole number of hours and tracked
  direction of travel — `ActualElapsedTime` is gate-to-gate in local clock time at each
  end, so pure arithmetic yields origin-local time while BTS reports destination-local.
  The hybrid resolves it without requiring an airport-to-timezone reference dataset.
- **The `2400` rule differs between departure and arrival, deliberately.** On the
  departure side the base date has not moved, so a day is added; on the arrival side
  the arithmetic has already crossed midnight, so it is not. Applying the departure
  rule to arrivals put 532 rows two days out.
- **Null-safe equality in the merge condition.** Standard `=` returns null when either
  side is null, so a row with a null key column would never match itself and would
  insert a duplicate on every run.
- **Natural keys throughout, not generated surrogates.**
  `monotonically_increasing_id()` is not stable across reruns, and a proper
  key-assignment step adds pipeline machinery this project does not need.
- **Airports are keyed on `airport_id`, not the IATA code.** BTS reuses IATA codes
  across different airports over time. Carriers join on DOT ID for the same reason —
  BTS defines a unique airline by its certificate regardless of code or holding
  company.
- **Dimensions rebuild in full every run.** This is what handled late-arriving members
  without special casing: `dim_airport` grew from 367 to 387 and `dim_carrier` from 17
  to 18 as periods outside the development slice introduced airports and carriers that
  had not appeared before.
- **Grain is one row per scheduled flight leg, including cancelled and diverted.**
  Filtering cancellations out is the common mistake with this dataset — it destroys
  cancellation-rate analysis and biases every delay average, because the worst
  operational days are the ones with the most cancellations. April 2020 would lose two
  fifths of its rows.

---

## 4. Validation

Type: `prose` intro plus `list`, heading "Validation".

Intro:

> Every layer boundary has a check that fails the run rather than warning. When the
> pipeline runs unattended, a bad month must fail the run rather than quietly write
> wrong data.
>
> `validate_timestamps()` runs two **independent** checks: that the derived clock
> matches the BTS reported time of day, and that the arrival date is the flight date or
> the day after. The `2400` bug passed the first at 100% and was caught only by the
> second. One passing check is not validation.

Items:

- Source archives CRC-verified before ingestion — 77 of 77 valid, 1.92 GB
- Explicit schema held across all 78 periods, 2020 to 2026
- Derived clock matched the BTS reported time at 100%, every period
- Arrival date within 0 to 1 days of flight date — 100%, zero outside range
- Business key unique — zero duplicates, every period
- Silver merge idempotent — row count unchanged on a full re-run at 41.2M rows
- Every delayed flight appears in delay attribution — 82,285 = 82,285
- Referential integrity across five relationships — zero orphans across 41.2M rows

**On Assume referential integrity:**

> All semantic model relationships use Assume referential integrity, which generates
> INNER rather than OUTER joins on a 41M-row fact. That is a promise, not a check — it
> is only safe because the gold notebook verifies exactly these five relationships with
> `left_anti` joins on every load and raises on failure.

---

## 5. Results

Type: `list`, heading "Results".

- **41,829,828 rows**, identical across bronze, silver and `fact_flight` — no drift
  through the chain.
- **Full backfill of 71 periods ran unattended in 7 hours 6 minutes with zero
  failures.** Retries were configured on each activity but never fired.
- **One period end to end takes about 6.5 minutes** on F4 trial capacity — 53 seconds
  to fetch and extract, 13 seconds to bronze, 1m 22s through silver, 2m 25s to gold.
- **Incremental load demonstrated.** June 2026 was deliberately held back from the
  backfill and loaded afterwards through the same unchanged pipeline: 77 periods to
  78, and exactly 607,577 new rows — June's count as recorded in the watermark. No
  double-counting, no manual intervention.
- **The failure path works.** A later attempt at July 2026 returned HTTP 404 because
  BTS had not yet published it. Landing failed, and on-success chaining meant bronze,
  silver and gold never ran — they show as unstarted rather than skipped or failed. No
  partial data, no false success.
- **Late aircraft leads on total delay minutes despite fewer occurrences than carrier
  delay** — the cascade effect, where one delayed aircraft makes its subsequent flights
  late. Weather is the rarest cause and by far the most severe per occurrence at 70.4
  minutes average.
- **Attribution covers 91.3% of arrival delay minutes.** The gap is flights delayed 1
  to 14 minutes, for which BTS reports no cause. The unattributed share moves with
  severity — 11.7% when delays were mild, 5.2% when they were long. Correct behaviour,
  not a data quality issue.

---

## 6. Platform notes

Type: `list`, heading "Notes on the Fabric platform".

Intro line:

> Three defaults that cost time and are not obvious from the error messages.

- **GitHub sync is disabled tenant-wide by default.** The setting lives in the Admin
  portal, not workspace settings. With it off, GitHub simply does not appear in the
  workspace Git provider list — it looks like a missing feature rather than a
  permission.
- **High concurrency for pipelines is off by default.** Four notebook activities in
  sequence each request their own Spark session, and on F4 the second fails with
  `TooManyRequestsForCapacity`. Session tags are the mechanism, but they are ignored
  for pipelines unless the setting is enabled. The equivalent toggle for interactive
  notebooks is on by default, which makes the asymmetry easy to miss.
- **A notebook parameter cell must be toggled, not merely present.** Untoggled,
  pipeline values are silently ignored and the notebook runs its defaults — and the
  failure surfaces two activities downstream. A zero-row guard converted a silent
  misconfiguration into a named, actionable error.
- **HTTP 200 does not mean success.** TranStats returns 200 with an HTML body for URLs
  it does not recognise, which produced two false positives during the build. Both
  fetch paths assert on content — the zip download checks magic bytes, the lookup
  checks the CSV header — rather than trusting the status code.

---

## Deliberately left out

The README is much longer than the Olist ones. Cut for the site, all still in the repo:

- Repository layout and the Git-integration-before-items detail
- Known limitations section (timezone residual, IATA reuse not observed, both delay
  columns retained, explicit period rather than derived)
- The deferred list
- Detailed measure definitions (`Completed Flights` vs `Flights`, `_minutes` variants)
- The full delay-cause table

The `Completed Flights` vs `Flights` distinction is genuinely good and could earn a
place if the Validation section feels thin — it is the subtle version of the grain
mistake, and worth a line.

---

## Site housekeeping once this ships

- `CLAUDE.md` — the projects table lists three; add this one and update "next project
  to be built" to the SQL project
- The homepage proof-points strip still describes the Olist series only. The 48%
  timezone mismatch and the 41.8M-row zero-failure backfill are both stronger than
  "9 pages · 1 model" — worth revisiting what those three tiles show
- The handover doc's "next project" section is now stale
