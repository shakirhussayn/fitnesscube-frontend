import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useAdminOrderItems, f as useAdminOrders, p as useAdminProducts } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Df8Hattq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-2xl font-bold",
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function AdminDashboard() {
	const orders = useAdminOrders();
	const items = useAdminOrderItems();
	const products = useAdminProducts();
	const stats = (0, import_react.useMemo)(() => {
		const list = orders.data ?? [];
		const paidish = list.filter((o) => o.status !== "cancelled");
		const revenue = paidish.reduce((sum, o) => sum + o.total, 0);
		const pending = list.filter((o) => o.status === "pending").length;
		const now = Date.now();
		const last30 = paidish.filter((o) => now - new Date(o.created_at).getTime() < 2592e6);
		return {
			revenue,
			orders: list.length,
			pending,
			revenue30: last30.reduce((sum, o) => sum + o.total, 0),
			orders30: last30.length,
			avg: paidish.length ? Math.round(revenue / paidish.length) : 0
		};
	}, [orders.data]);
	const topProducts = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of items.data ?? []) {
			const entry = map.get(item.product_slug) ?? {
				name: item.product_name,
				qty: 0,
				revenue: 0
			};
			entry.qty += item.quantity;
			entry.revenue += item.quantity * item.unit_price;
			map.set(item.product_slug, entry);
		}
		return [...map.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
	}, [items.data]);
	const outOfStock = (products.data ?? []).filter((p) => !p.inStock);
	const hidden = (products.data ?? []).filter((p) => !p.isActive);
	if (orders.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading dashboard…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total revenue",
						value: formatPKR(stats.revenue),
						hint: `${stats.orders} orders`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Last 30 days",
						value: formatPKR(stats.revenue30),
						hint: `${stats.orders30} orders`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Average order",
						value: formatPKR(stats.avg)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Awaiting action",
						value: String(stats.pending),
						hint: "Orders still pending"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-xl",
						children: "Recent orders"
					}),
					(orders.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-border p-8 text-center text-sm text-muted-foreground",
						children: "No orders yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border border border-border",
						children: (orders.data ?? []).slice(0, 6).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-4 p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: o.full_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									new Date(o.created_at).toLocaleDateString(),
									" · ",
									o.city,
									" · ",
									o.status
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-primary",
								children: formatPKR(o.total)
							})]
						}, o.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/orders",
						className: "mt-3 inline-block text-xs uppercase tracking-widest text-primary hover:underline",
						children: "View all orders"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xl",
					children: "Best sellers"
				}), topProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-border p-8 text-center text-sm text-muted-foreground",
					children: "No sales recorded yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border border border-border",
					children: topProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-4 p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [p.qty, " sold"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-primary",
							children: formatPKR(p.revenue)
						})]
					}, p.name))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Out of stock",
					value: String(outOfStock.length),
					hint: outOfStock.slice(0, 3).map((p) => p.name).join(", ") || "Everything in stock"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Hidden products",
					value: String(hidden.length),
					hint: hidden.slice(0, 3).map((p) => p.name).join(", ") || "All products visible"
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
