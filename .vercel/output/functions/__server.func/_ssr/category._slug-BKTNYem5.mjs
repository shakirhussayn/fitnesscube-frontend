import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as useCatalog, r as Route$1 } from "./router-DGC0Z0lz.mjs";
import { t as ProductCard } from "./ProductCard-DJm4eIcq.mjs";
import { n as SortSelect, r as sortProducts, t as PriceRange } from "./ProductFilters-B4HqoY3S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-BKTNYem5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRICE_BOUND = 25e4;
function CategoryPage() {
	const { category } = Route$1.useLoaderData();
	const catalog = useCatalog();
	const all = (0, import_react.useMemo)(() => catalog.filter((p) => p.category === category.slug), [catalog, category.slug]);
	const subcategories = (0, import_react.useMemo)(() => [...new Set(all.map((p) => p.subcategory))], [all]);
	const [sub, setSub] = (0, import_react.useState)(null);
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [range, setRange] = (0, import_react.useState)({
		min: 0,
		max: PRICE_BOUND
	});
	const list = (0, import_react.useMemo)(() => {
		const lo = Math.min(range.min, range.max);
		const hi = Math.max(range.min, range.max);
		const filtered = all.filter((p) => sub ? p.subcategory === sub : true).filter((p) => p.price >= lo && p.price <= hi);
		return sortProducts(filtered, sort);
	}, [
		all,
		sub,
		sort,
		range
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative isolate overflow-hidden border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: category.image,
				alt: category.name,
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-4 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mb-3 text-xs uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-primary",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: category.name })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-5xl",
						children: category.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: category.blurb
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[220px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm tracking-widest",
						children: "Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSub(null),
							className: !sub ? "text-primary" : "text-muted-foreground hover:text-foreground",
							children: ["All ", category.name.toLowerCase()]
						}) }), subcategories.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSub(s),
							className: sub === s ? "text-primary" : "text-muted-foreground hover:text-foreground",
							children: s
						}) }, s))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceRange, {
						min: range.min,
						max: range.max,
						bound: PRICE_BOUND,
						onChange: setRange
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							q: void 0,
							category: category.slug,
							min: 0,
							max: PRICE_BOUND,
							sort: "featured"
						},
						className: "inline-block border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary",
						children: "Search this category"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [list.length, " products"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortSelect, {
					value: sort,
					onChange: setSort
				})]
			}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border border-border p-10 text-center text-sm text-muted-foreground",
				children: "No products match your filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})] })]
		})
	})] });
}
//#endregion
export { CategoryPage as component };
