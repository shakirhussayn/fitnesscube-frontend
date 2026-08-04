import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { x as useAuth } from "./router-DGC0Z0lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-Bx79r-wt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Account() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)({
		full_name: "",
		phone: "",
		address: "",
		city: ""
	});
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
		supabase.from("profiles").select("full_name, phone, address, city").eq("id", user.id).maybeSingle().then(({ data }) => {
			if (data) setProfile({
				full_name: data.full_name ?? "",
				phone: data.phone ?? "",
				address: data.address ?? "",
				city: data.city ?? ""
			});
		});
	}, [user]);
	const save = async (e) => {
		e.preventDefault();
		if (!user) return;
		setSaving(true);
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			...profile,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Profile saved");
	};
	const signOut = async () => {
		await supabase.auth.signOut();
		navigate({
			to: "/",
			replace: true
		});
	};
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground",
		children: "Loading…"
	});
	const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "My account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: ["Signed in as ", user.email]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						className: "border border-border px-4 py-2 hover:border-primary hover:text-primary",
						children: "Order history"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wishlist",
						className: "border border-border px-4 py-2 hover:border-primary hover:text-primary",
						children: "Wishlist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: signOut,
						className: "border border-border px-4 py-2 hover:border-destructive hover:text-destructive",
						children: "Sign out"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: save,
				className: "mt-10 space-y-4 border border-border p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Delivery details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: profile.full_name,
									onChange: (e) => setProfile({
										...profile,
										full_name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: profile.phone,
									onChange: (e) => setProfile({
										...profile,
										phone: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
									children: "City"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: profile.city,
									onChange: (e) => setProfile({
										...profile,
										city: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: profile.address,
									onChange: (e) => setProfile({
										...profile,
										address: e.target.value
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: saving,
						className: "bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50",
						children: saving ? "Saving…" : "Save changes"
					})
				]
			})
		]
	});
}
//#endregion
export { Account as component };
