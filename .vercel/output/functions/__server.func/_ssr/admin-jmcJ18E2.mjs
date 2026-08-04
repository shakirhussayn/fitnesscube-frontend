import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, d as Outlet, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as LayoutDashboard, _ as Package, r as Users, u as ShoppingBag } from "../_libs/lucide-react.mjs";
import { h as useIsAdmin, u as useAdminExists, x as useAuth } from "./router-DGC0Z0lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-jmcJ18E2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/orders",
		label: "Orders",
		icon: ShoppingBag,
		exact: false
	},
	{
		to: "/admin/products",
		label: "Products",
		icon: Package,
		exact: false
	},
	{
		to: "/admin/customers",
		label: "Customers",
		icon: Users,
		exact: false
	}
];
function AdminLayout() {
	const { user, loading } = useAuth();
	const { isAdmin, checking } = useIsAdmin();
	const adminExists = useAdminExists();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({
			to: "/auth",
			search: { next: "/admin" }
		});
	}, [
		loading,
		user,
		navigate
	]);
	if (loading || checking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground",
		children: "Checking access…"
	});
	if (!user) return null;
	if (!isAdmin) {
		const canClaim = adminExists.data === false;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl px-4 py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl",
				children: "Store admin"
			}), canClaim ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"No owner account has been set up yet. Claim owner access for ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.email }),
					" — this can only be done once."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: async () => {
					const { data, error } = await supabase.rpc("claim_first_admin");
					if (error || !data) {
						toast.error(error?.message ?? "Owner access has already been claimed");
						return;
					}
					toast.success("You are now the store owner");
					await queryClient.invalidateQueries();
				},
				className: "mt-6 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85",
				children: "Claim owner access"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "This area is for store staff only. Ask the store owner to grant your account admin access from Admin → Customers."
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl",
				children: "Store admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: ["Signed in as ", user.email]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-6 flex flex-wrap gap-1 border-b border-border",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: t.to,
					activeOptions: { exact: t.exact },
					className: "flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground",
					activeProps: { className: "flex items-center gap-2 border-b-2 border-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-4 w-4" }), t.label]
				}, t.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
