import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Plus, o as Trash2, y as Minus } from "../_libs/lucide-react.mjs";
import { g as useCart } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DSFfx7DP.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const cart = useCart();
	const shipping = cart.subtotal > 25e3 || cart.subtotal === 0 ? 0 : 1500;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "Your cart"
		}), cart.lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 border border-border p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Your cart is empty."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				search: {
					q: void 0,
					category: void 0,
					min: 0,
					max: 25e4,
					sort: "featured"
				},
				className: "mt-6 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85",
				children: "Start shopping"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border border border-border",
				children: cart.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: line.image,
							alt: line.name,
							className: "h-24 w-24 shrink-0 object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$slug",
									params: { slug: line.slug },
									className: "font-semibold hover:text-primary",
									children: line.name
								}),
								line.variant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: line.variant
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-primary",
									children: formatPKR(line.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => cart.setQuantity(line.slug, line.variant, line.quantity - 1),
												className: "grid h-9 w-9 place-items-center hover:text-primary",
												"aria-label": "Decrease quantity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-8 text-center text-sm",
												children: line.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => cart.setQuantity(line.slug, line.variant, line.quantity + 1),
												className: "grid h-9 w-9 place-items-center hover:text-primary",
												"aria-label": "Increase quantity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => cart.remove(line.slug, line.variant),
										className: "inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: formatPKR(line.price * line.quantity)
						})
					]
				}, `${line.slug}-${line.variant ?? ""}`))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit border border-border p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatPKR(cart.subtotal) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: shipping === 0 ? "Free" : formatPKR(shipping) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-3 text-base font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-primary",
									children: formatPKR(cart.subtotal + shipping)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "mt-6 block bg-primary px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: cart.clear,
						className: "mt-3 w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive",
						children: "Clear cart"
					})
				]
			})]
		})]
	});
}
//#endregion
export { CartPage as component };
