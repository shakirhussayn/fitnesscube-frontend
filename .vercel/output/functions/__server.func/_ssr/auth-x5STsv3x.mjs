import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$12, s as safeNext, x as useAuth } from "./router-DGC0Z0lz.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-x5STsv3x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts?.redirect_uri ? { redirect_uri: opts.redirect_uri } : {},
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AuthPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const search = Route$12.useSearch();
	const next = safeNext(search.next);
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		email: "",
		password: "",
		full_name: ""
	});
	(0, import_react.useEffect)(() => {
		if (!user) return;
		if (next) {
			window.location.href = next;
			return;
		}
		navigate({
			to: "/account",
			replace: true
		});
	}, [
		user,
		navigate,
		next
	]);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		if (mode === "signup") {
			const { data, error } = await supabase.auth.signUp({
				email: form.email,
				password: form.password,
				options: {
					emailRedirectTo: next ? window.location.origin + next : window.location.origin,
					data: { full_name: form.full_name }
				}
			});
			setBusy(false);
			if (error) {
				toast.error(error.message);
				return;
			}
			if (!data.session) {
				toast.success("Check your email to confirm your account.");
				return;
			}
			toast.success("Welcome to FitnessCube!");
		} else {
			const { error } = await supabase.auth.signInWithPassword({
				email: form.email,
				password: form.password
			});
			setBusy(false);
			if (error) {
				toast.error(error.message);
				return;
			}
			toast.success("Signed in");
		}
	};
	const google = async () => {
		if ((await lovable.auth.signInWithOAuth("google", { redirect_uri: next ? window.location.origin + next : window.location.origin })).error) {
			toast.error("Google sign-in failed. Please try again.");
			return;
		}
	};
	const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl",
				children: mode === "signin" ? "Sign in" : "Create account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: mode === "signin" ? "Access your orders, wishlist and saved addresses." : "Save your details and track every order in one place."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 space-y-4",
				children: [
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							className: field,
							value: form.full_name,
							onChange: (e) => setForm({
								...form,
								full_name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "email",
							className: field,
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "password",
							minLength: 6,
							className: field,
							value: form.password,
							onChange: (e) => setForm({
								...form,
								password: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "w-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50",
						children: busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
					" or ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: google,
				className: "w-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary",
				children: "Continue with Google"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-center text-sm text-muted-foreground",
				children: [
					mode === "signin" ? "New to FitnessCube?" : "Already have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
						className: "font-bold text-primary hover:underline",
						children: mode === "signin" ? "Create an account" : "Sign in"
					})
				]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
