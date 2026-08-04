import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Star } from "../_libs/lucide-react.mjs";
import { g as useCart } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-DJm4eIcq.js
var import_jsx_runtime = require_jsx_runtime();
function Stars({ rating, reviews }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1 text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex",
				"aria-label": `Rated ${rating} out of 5`,
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: i <= Math.round(rating) ? "h-3.5 w-3.5 fill-accent text-accent" : "h-3.5 w-3.5 text-muted-foreground/40" }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rating.toFixed(1) }),
			reviews !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"(",
				reviews,
				")"
			] })
		]
	});
}
function ProductCard({ product }) {
	const cart = useCart();
	const hasVariants = Boolean(product.variants);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col border border-border bg-card transition-colors hover:border-primary/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$slug",
			params: { slug: product.slug },
			className: "relative block overflow-hidden bg-secondary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					loading: "lazy",
					width: 900,
					height: 900,
					className: "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-0 top-0 flex flex-col items-start gap-1 p-2",
					children: [product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground",
						children: "Sale"
					}), product.tags.includes("new") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground",
						children: "New"
					})]
				}),
				!product.inStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-x-0 bottom-0 bg-background/85 py-1.5 text-center text-xs font-semibold uppercase tracking-widest",
					children: "Out of stock"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-widest text-muted-foreground",
					children: product.subcategory
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base leading-tight",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: product.slug },
						className: "hover:text-primary",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
					rating: product.rating,
					reviews: product.reviews
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-baseline gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-bold",
						children: formatPKR(product.price)
					}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground line-through",
						children: formatPKR(product.oldPrice)
					})]
				}),
				!product.inStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: product.slug },
					className: "mt-2 block border border-border px-3 py-2 text-center text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary",
					children: "Read more"
				}) : hasVariants ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: product.slug },
					className: "mt-2 block border border-border px-3 py-2 text-center text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary",
					children: "Select options"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						cart.add({
							slug: product.slug,
							name: product.name,
							price: product.price,
							image: product.image
						});
						toast.success(`${product.name} added to cart`);
					},
					className: "mt-2 bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/85",
					children: "Add to cart"
				})
			]
		})]
	});
}
//#endregion
export { Stars as n, ProductCard as t };
