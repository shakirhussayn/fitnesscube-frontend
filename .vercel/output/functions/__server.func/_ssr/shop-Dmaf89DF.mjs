import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Search } from "../_libs/lucide-react.mjs";
import { _ as categories, a as PRICE_BOUND, b as useCatalog, i as Route$7 } from "./router-DGC0Z0lz.mjs";
import { t as ProductCard } from "./ProductCard-DJm4eIcq.mjs";
import { n as SortSelect, r as sortProducts, t as PriceRange } from "./ProductFilters-B4HqoY3S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Dmaf89DF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { q, category, min, max, sort } = Route$7.useSearch();
	const navigate = useNavigate({ from: "/shop" });
	const [term, setTerm] = (0, import_react.useState)(q ?? "");
	(0, import_react.useEffect)(() => {
		setTerm(q ?? "");
	}, [q]);
	const safeSort = [
		"featured",
		"price-asc",
		"price-desc",
		"rating"
	].includes(sort) ? sort : "featured";
	const catalog = useCatalog();
	const results = (0, import_react.useMemo)(() => {
		let list = catalog.slice();
		if (category) list = list.filter((p) => p.category === category);
		if (q) {
			const needle = q.toLowerCase();
			list = list.filter((p) => [
				p.name,
				p.brand,
				p.subcategory,
				p.description
			].join(" ").toLowerCase().includes(needle));
		}
		const lo = Math.min(min, max);
		const hi = Math.max(min, max);
		list = list.filter((p) => p.price >= lo && p.price <= hi);
		return sortProducts(list, safeSort);
	}, [
		q,
		category,
		min,
		max,
		safeSort
	]);
	const filtersActive = Boolean(q || category) || min > 0 || max < 25e4 || safeSort !== "featured";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: q ? `Results for "${q}"` : "Shop all"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [results.length, " products"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[220px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								navigate({ search: (prev) => ({
									...prev,
									q: term.trim() || void 0
								}) });
							},
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: term,
								onChange: (e) => setTerm(e.target.value),
								placeholder: "Search products",
								"aria-label": "Search products",
								className: "h-10 w-full border border-input bg-secondary/40 pl-9 pr-3 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm tracking-widest",
							children: "Categories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: (prev) => ({
									...prev,
									category: void 0
								}),
								className: !category ? "text-primary" : "text-muted-foreground hover:text-foreground",
								children: "All products"
							}) }), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: (prev) => ({
									...prev,
									category: c.slug
								}),
								className: category === c.slug ? "text-primary" : "text-muted-foreground hover:text-foreground",
								children: c.name
							}) }, c.slug))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceRange, {
							min,
							max,
							bound: PRICE_BOUND,
							onChange: (next) => navigate({ search: (prev) => ({
								...prev,
								...next
							}) })
						}),
						filtersActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								q: void 0,
								category: void 0,
								min: 0,
								max: 25e4,
								sort: "featured"
							},
							className: "inline-block border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary",
							children: "Clear filters"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortSelect, {
						value: safeSort,
						onChange: (value) => navigate({ search: (prev) => ({
							...prev,
							sort: value
						}) })
					})
				}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-border p-10 text-center text-sm text-muted-foreground",
					children: "No products match your filters."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
				})] })]
			})
		]
	});
}
//#endregion
export { Shop as component };
