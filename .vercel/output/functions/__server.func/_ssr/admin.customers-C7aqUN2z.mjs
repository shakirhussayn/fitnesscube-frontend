import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as ShieldOff, f as ShieldCheck } from "../_libs/lucide-react.mjs";
import { f as useAdminOrders, l as useAdminCustomers, m as useAdminRoles, x as useAuth } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers-C7aqUN2z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCustomers() {
	const customers = useAdminCustomers();
	const orders = useAdminOrders();
	const roles = useAdminRoles();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [term, setTerm] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const stats = /* @__PURE__ */ new Map();
		for (const o of orders.data ?? []) {
			const s = stats.get(o.user_id) ?? {
				count: 0,
				spend: 0,
				email: o.email,
				last: o.created_at
			};
			s.count += 1;
			if (o.status !== "cancelled") s.spend += o.total;
			if (o.created_at > s.last) s.last = o.created_at;
			s.email = s.email || o.email;
			stats.set(o.user_id, s);
		}
		const adminIds = new Set((roles.data ?? []).filter((r) => r.role === "admin").map((r) => r.user_id));
		let list = (customers.data ?? []).map((c) => ({
			...c,
			email: stats.get(c.id)?.email ?? "",
			orders: stats.get(c.id)?.count ?? 0,
			spend: stats.get(c.id)?.spend ?? 0,
			isAdmin: adminIds.has(c.id)
		}));
		if (term.trim()) {
			const needle = term.trim().toLowerCase();
			list = list.filter((c) => [
				c.full_name,
				c.email,
				c.phone,
				c.city
			].filter(Boolean).join(" ").toLowerCase().includes(needle));
		}
		return list.sort((a, b) => b.spend - a.spend);
	}, [
		customers.data,
		orders.data,
		roles.data,
		term
	]);
	const setAdmin = async (userId, makeAdmin) => {
		const { error } = makeAdmin ? await supabase.from("user_roles").insert({
			user_id: userId,
			role: "admin"
		}) : await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(makeAdmin ? "Admin access granted" : "Admin access removed");
		await queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
	};
	if (customers.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading customers…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value: term,
		onChange: (e) => setTerm(e.target.value),
		placeholder: "Search customers",
		"aria-label": "Search customers",
		className: "mb-5 h-10 w-full max-w-xs border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
	}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-border p-10 text-center text-sm text-muted-foreground",
		children: "No customers yet."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-border border border-border",
		children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-sm font-bold",
						children: [c.full_name || c.email || "Customer", c.isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary",
							children: "admin"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: [
							c.email,
							c.phone,
							c.city
						].filter(Boolean).join(" · ") || "No contact details saved"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-foreground",
						children: formatPKR(c.spend)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						c.orders,
						" order",
						c.orders === 1 ? "" : "s"
					] })]
				}),
				c.id !== user?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setAdmin(c.id, !c.isAdmin),
					className: "flex items-center gap-2 border border-border px-3 py-2 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary",
					children: [c.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), c.isAdmin ? "Revoke admin" : "Make admin"]
				})
			]
		}, c.id))
	})] });
}
//#endregion
export { AdminCustomers as component };
