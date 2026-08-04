import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Trash2 } from "../_libs/lucide-react.mjs";
import { b as useCatalog, x as useAuth } from "./router-DGC0Z0lz.mjs";
import { t as ProductCard } from "./ProductCard-DJm4eIcq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-DOTPZiHj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Wishlist() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [slugs, setSlugs] = (0, import_react.useState)([]);
	const [fetching, setFetching] = (0, import_react.useState)(true);
	const catalog = useCatalog();
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
		supabase.from("wishlist_items").select("product_slug").order("created_at", { ascending: false }).then(({ data }) => {
			setSlugs((data ?? []).map((r) => r.product_slug));
			setFetching(false);
		});
	}, [user]);
	const removeItem = async (slug) => {
		if (!user) return;
		const { error } = await supabase.from("wishlist_items").delete().eq("user_id", user.id).eq("product_slug", slug);
		if (error) {
			toast.error(error.message);
			return;
		}
		setSlugs((s) => s.filter((x) => x !== slug));
		toast.success("Removed from wishlist");
	};
	if (loading || !user || fetching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground",
		children: "Loading…"
	});
	const items = slugs.map((s) => catalog.find((p) => p.slug === s)).filter((p) => Boolean(p));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "Wishlist"
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border border-border p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Nothing saved yet."
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
				children: "Browse products"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => removeItem(p.slug),
					className: "absolute right-2 top-2 grid h-9 w-9 place-items-center bg-background/80 hover:text-destructive",
					"aria-label": `Remove ${p.name} from wishlist`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}, p.slug))
		})]
	});
}
//#endregion
export { Wishlist as component };
