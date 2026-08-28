# Olist Sales — detail page sections

Content for `content/projects.ts`, `olist-sales` entry. Everything below is drawn
from the project's GitHub README. Nothing invented.

Section list, in order:
**Screenshots → Data Model → Data quality → Modelling decisions → Findings**

Screenshots and Data Model already exist. The three below are new.

---

## Data Model — add prose beneath the existing image

Type: `prose`, heading "Data Model", placed after the image.

> Two fact tables at different grains — `fact_order_items`, one row per order line
> item, and `fact_payments`, one row per payment installment record — with
> `dim_date`, `dim_customer`, `dim_seller`, `dim_product` and `dim_order` as
> dimensions.
>
> Both facts share `order_id`, but the field is unique in neither: an order has
> multiple line items and multiple payment records. Relating them directly
> produces an uncontrolled many-to-many relationship that silently inflates
> revenue and payment totals depending on query context. `dim_order` sits between
> them as a proper dimension, so both facts relate to it many-to-one — a clean,
> predictable star pattern.

---

## Data quality

Type: `list`, heading "Data quality".

Intro line (if the section type supports one, otherwise omit):
> Real datasets are messy. Documenting these decisions matters more than the
> charts — it shows how the problems were reasoned about, not just what got built.

Items:

- `customer_id` is order-specific — the same person receives a new ID for every
  order. Used `customer_unique_id` as the true customer key for all
  customer-level metrics, including repeat rate and unique customer counts.
- The `order_items` to `payments` relationship was many-to-many. Introduced
  `dim_order` as a bridge dimension so both facts relate many-to-one.
- 775 orders had no rows in `order_items`, having been cancelled or become
  unavailable before fulfilment. Confirmed as expected: the fact grain is order
  line item, so these are naturally excluded.
- 623 products carried untranslated, Portuguese-only category names. Manually
  mapped the three missing categories to the translation table.
- 461 orders marked `canceled` still had line items, having been cancelled after
  fulfilment began. Built a primary `Total Revenue` measure excluding cancelled
  and unavailable statuses, alongside a separate `Total Revenue (Gross)` measure
  for demand analysis.
- The final month of data, September 2018, was incomplete — the extract was taken
  mid-month. Filtered all trend visuals to complete months only, through August
  2018, to avoid a misleading revenue cliff.
- Datetime columns imported as SQL Server `time`, silently dropping the date
  portion. Diagnosed via `INFORMATION_SCHEMA.COLUMNS` and fixed by re-importing
  with an explicit `yyyy-MM-dd HH:mm:ss` format mapping.

---

## Modelling decisions

Type: `list`, heading "Modelling decisions".

- **Revenue definition.** `Total Revenue` excludes cancelled and unavailable
  orders to reflect realised performance, with `Total Revenue (Gross)` available
  for demand analysis. Ratio measures such as Average Order Value use the same
  filtered population in numerator and denominator, so the two never disagree.
- **Year-over-year growth.** Calculated as a fixed comparison of full calendar
  2018 against full calendar 2017, rather than an open date range — an open range
  compares a partial year against a complete one and produces misleading results.
- **Repeat customer rate.** Calculated on a lifetime basis rather than within the
  selected period, so a customer whose two orders fall in different years is not
  counted as non-repeating.
- **Statistical significance threshold.** The top loyalty state insight considers
  only states with at least 500 customers, so a small, low-volume state where one
  or two repeat customers dominate the percentage cannot surface as a false
  leader.

---

## Findings

Type: `list`, heading "Findings".

- **São Paulo drives around 40% of 2018 revenue** — the widest concentration of
  any state, and a signal that customer acquisition is heavily weighted toward one
  region.
- **Revenue concentrates at category level too.** The top two categories account
  for roughly 20% of total revenue; the bottom five combined contribute under 1%.
- **The repeat purchase rate is very low, around 3%,** consistent with a
  multi-vendor marketplace lacking platform-level loyalty mechanisms. The state
  with the strongest repeat behaviour, among those with meaningful sample size, is
  not the state with the most revenue — loyalty and revenue scale do not move
  together.
- **Credit card is the platform's de facto financing mechanism,** carrying both
  the highest average installment count and the highest average order value, while
  boleto, debit and voucher payments are overwhelmingly pay-in-full, lower-value
  transactions.

---

## Two things to check before this ships

**1. The import fix.** `CLAUDE.md` records "cut a 98,000-row SQL Server import
from 10+ minutes to 41 seconds by correcting column type declarations." This
README documents a column type problem with a different consequence — datetimes
silently losing their date portion. Same root cause, different outcome described.
Confirm whether these are one event or two before either appears on the site.

**2. Terminology.** The README calls `dim_order` both "a bridge table" and "a
proper dimension." Both are defensible, but a reviewer may notice the tension.
Since both facts relate to it many-to-one, "dimension" is the more accurate word,
and the model is a legitimate star.

**3. Not Sales.** The bridge-table *disconnection* described in `CLAUDE.md` — where
DAX across two independent many-to-many paths returned plausible but wrong results
— is the opposite of what this README describes. It belongs to Logistics or
Customer Experience. Do not attribute it here.
