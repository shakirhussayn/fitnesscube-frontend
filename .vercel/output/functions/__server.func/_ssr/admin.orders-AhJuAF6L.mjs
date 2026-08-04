import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as ChevronDown, j as ChevronRight } from "../_libs/lucide-react.mjs";
import { c as ORDER_STATUSES, d as useAdminOrderItems, f as useAdminOrders } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.orders-AhJuAF6L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
	confirmed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
	shipped: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
	delivered: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
	cancelled: "bg-destructive/15 text-destructive"
};
function AdminOrders() {
	const orders = useAdminOrders();
	const items = useAdminOrderItems();
	const queryClient = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(null);
	const [term, setTerm] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		let rows = orders.data ?? [];
		if (filter !== "all") rows = rows.filter((o) => o.status === filter);
		if (term.trim()) {
			const needle = term.trim().toLowerCase();
			rows = rows.filter((o) => [
				o.full_name,
				o.email,
				o.phone,
				o.city
			].join(" ").toLowerCase().includes(needle));
		}
		return rows;
	}, [
		orders.data,
		filter,
		term
	]);
	const itemsByOrder = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of items.data ?? []) {
			const arr = map.get(item.order_id) ?? [];
			arr.push(item);
			map.set(item.order_id, arr);
		}
		return map;
	}, [items.data]);
	const updateStatus = async (id, status) => {
		const { error } = await supabase.from("orders").update({ status }).eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(`Order marked ${status}`);
		await queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
	};
	if (orders.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading orders…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-wrap items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: term,
			onChange: (e) => setTerm(e.target.value),
			placeholder: "Search name, email, phone, city",
			"aria-label": "Search orders",
			className: "h-10 w-full max-w-xs border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1",
			children: ["all", ...ORDER_STATUSES].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(s),
				className: `border px-3 py-2 text-xs uppercase tracking-widest ${filter === s ? "border-primary text-primary" : "border-border text-muted-foreground"}`,
				children: s
			}, s))
		})]
	}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-border p-10 text-center text-sm text-muted-foreground",
		children: "No orders found."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-border border border-border",
		children: list.map((o) => {
			const expanded = open === o.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(expanded ? null : o.id),
						className: "flex min-w-0 flex-1 items-center gap-3 text-left",
						"aria-expanded": expanded,
						children: [expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-bold",
								children: [
									o.full_name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-normal text-muted-foreground",
										children: ["· ", o.city]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									new Date(o.created_at).toLocaleString(),
									" · ",
									o.payment_method.toUpperCase(),
									" ·",
									" ",
									"#",
									o.id.slice(0, 8)
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${statusStyles[o.status] ?? "bg-secondary text-muted-foreground"}`,
						children: o.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-28 text-right text-sm font-bold text-primary",
						children: formatPKR(o.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: o.status,
						onChange: (e) => updateStatus(o.id, e.target.value),
						"aria-label": `Update status for order ${o.id.slice(0, 8)}`,
						className: "h-9 border border-input bg-secondary/40 px-2 text-xs uppercase tracking-widest outline-none focus:border-primary",
						children: ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))
					})
				]
			}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 border-t border-border bg-secondary/30 p-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-xs uppercase tracking-widest text-muted-foreground",
							children: "Delivery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: o.full_name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: o.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: o.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${o.phone}`,
								className: "text-primary hover:underline",
								children: o.phone
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${o.email}`,
							className: "text-primary hover:underline",
							children: o.email
						}) }),
						o.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted-foreground",
							children: ["Note: ", o.notes]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-xs uppercase tracking-widest text-muted-foreground",
							children: "Items"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: (itemsByOrder.get(o.id) ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.quantity,
									" × ",
									item.product_name,
									item.variant ? ` (${item.variant})` : ""
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPKR(item.unit_price * item.quantity) })]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-1 border-t border-border pt-3 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPKR(o.subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.shipping === 0 ? "Free" : formatPKR(o.shipping) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex justify-between font-bold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPKR(o.total) })]
								})
							]
						})
					]
				})]
			})] }, o.id);
		})
	})] });
}
//#endregion
export { AdminOrders as component };
