import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as useAuth } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DBsEwzJU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Orders() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [fetching, setFetching] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({
			to: "/auth",
			replace: true
		});
	}, [
		loading,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("orders").select("id, created_at, status, total, city, payment_method, order_items(id, product_name, product_slug, variant, quantity, unit_price, image_url)").order("created_at", { ascending: false }).then(({ data }) => {
			setOrders(data ?? []);
			setFetching(false);
		});
	}, [user]);
	if (loading || !user || fetching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "Order history"
		}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border border-border p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "You haven't placed any orders yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				search: {
					q: void 0,
					category: void 0,
					min: 0,
					max: 25e4,
					sort: "featured"
				},
				className: "mt-6 inline-block bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground",
				children: "Start shopping"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-6",
			children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 text-xs uppercase tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"Order #",
								order.id.slice(0, 8),
								" · ",
								new Date(order.created_at).toLocaleDateString("en-PK")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-primary px-2 py-1 text-primary-foreground",
							children: order.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: order.order_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-4 p-4",
							children: [
								item.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image_url,
									alt: item.product_name,
									className: "h-16 w-16 object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/product/$slug",
											params: { slug: item.product_slug },
											className: "font-semibold hover:text-primary",
											children: item.product_name
										}),
										item.variant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: item.variant
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: ["Qty ", item.quantity]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: formatPKR(item.unit_price * item.quantity)
								})
							]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex justify-between border-t border-border p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								order.payment_method === "cod" ? "Cash on delivery" : "Bank transfer",
								" · ",
								order.city
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-primary",
							children: formatPKR(order.total)
						})]
					})
				]
			}, order.id))
		})]
	});
}
//#endregion
export { Orders as component };
