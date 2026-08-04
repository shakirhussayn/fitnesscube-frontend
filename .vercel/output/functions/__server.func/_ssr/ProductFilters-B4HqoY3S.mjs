import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductFilters-B4HqoY3S.js
var import_jsx_runtime = require_jsx_runtime();
var SORT_OPTIONS = [
	{
		value: "featured",
		label: "Sort: featured"
	},
	{
		value: "price-asc",
		label: "Price: low to high"
	},
	{
		value: "price-desc",
		label: "Price: high to low"
	},
	{
		value: "rating",
		label: "Top rated"
	}
];
function SortSelect({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		"aria-label": "Sort products",
		className: "h-10 border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary",
		children: SORT_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o.value,
			children: o.label
		}, o.value))
	});
}
function PriceRange({ min, max, bound, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm tracking-widest",
			children: "Price range"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					value: min,
					min: 0,
					step: 1e3,
					"aria-label": "Minimum price",
					onChange: (e) => onChange({
						min: Math.max(0, Number(e.target.value) || 0),
						max
					}),
					className: "h-9 w-full border border-input bg-secondary/40 px-2 text-sm outline-none focus:border-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "to"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					value: max,
					min: 0,
					step: 1e3,
					"aria-label": "Maximum price",
					onChange: (e) => onChange({
						min,
						max: Math.max(0, Number(e.target.value) || 0)
					}),
					className: "h-9 w-full border border-input bg-secondary/40 px-2 text-sm outline-none focus:border-primary"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 0,
			max: bound,
			step: 1e3,
			value: Math.min(max, bound),
			onChange: (e) => onChange({
				min,
				max: Number(e.target.value)
			}),
			className: "mt-3 w-full accent-primary",
			"aria-label": "Maximum price slider"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: [
				formatPKR(min),
				" — ",
				formatPKR(max)
			]
		})
	] });
}
function sortProducts(list, sort) {
	const next = list.slice();
	if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
	if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
	if (sort === "rating") next.sort((a, b) => b.rating - a.rating);
	return next;
}
//#endregion
export { SortSelect as n, sortProducts as r, PriceRange as t };
