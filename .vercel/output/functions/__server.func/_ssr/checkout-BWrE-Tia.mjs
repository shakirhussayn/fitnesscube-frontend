import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as useCart, x as useAuth } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BWrE-Tia.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const cart = useCart();
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		notes: "",
		payment_method: "cod"
	});
	const shipping = cart.subtotal > 25e3 || cart.subtotal === 0 ? 0 : 1500;
	const total = cart.subtotal + shipping;
	(0, import_react.useEffect)(() => {
		if (!user) return;
		setForm((f) => ({
			...f,
			email: f.email || user.email || ""
		}));
		supabase.from("profiles").select("full_name, phone, address, city").eq("id", user.id).maybeSingle().then(({ data }) => {
			if (!data) return;
			setForm((f) => ({
				...f,
				full_name: f.full_name || data.full_name || "",
				phone: f.phone || data.phone || "",
				address: f.address || data.address || "",
				city: f.city || data.city || ""
			}));
		});
	}, [user]);
	const submit = async (e) => {
		e.preventDefault();
		if (!user) {
			toast.error("Please sign in to place your order");
			navigate({ to: "/auth" });
			return;
		}
		if (cart.lines.length === 0) return;
		setSubmitting(true);
		const { data: order, error } = await supabase.from("orders").insert({
			user_id: user.id,
			full_name: form.full_name,
			email: form.email,
			phone: form.phone,
			address: form.address,
			city: form.city,
			notes: form.notes || null,
			payment_method: form.payment_method,
			subtotal: cart.subtotal,
			shipping,
			total
		}).select("id").single();
		if (error || !order) {
			setSubmitting(false);
			toast.error(error?.message ?? "Could not place your order");
			return;
		}
		const { error: itemsError } = await supabase.from("order_items").insert(cart.lines.map((l) => ({
			order_id: order.id,
			user_id: user.id,
			product_slug: l.slug,
			product_name: l.name,
			variant: l.variant ?? null,
			unit_price: l.price,
			quantity: l.quantity,
			image_url: l.image
		})));
		setSubmitting(false);
		if (itemsError) {
			toast.error(itemsError.message);
			return;
		}
		cart.clear();
		toast.success("Order placed! We'll call you to confirm.");
		navigate({ to: "/orders" });
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (cart.lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl",
			children: "Nothing to check out"
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
	});
	const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Checkout"
			}),
			!user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 border border-primary/40 bg-primary/10 p-4 text-sm",
				children: [
					"You need an account to place an order.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "font-bold text-primary underline",
						children: "Sign in or create one"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 grid gap-8 lg:grid-cols-[1fr_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 border border-border p-6",
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
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										className: field,
										value: form.phone,
										onChange: (e) => setForm({
											...form,
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
										required: true,
										className: field,
										value: form.city,
										onChange: (e) => setForm({
											...form,
											city: e.target.value
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
								children: "Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								className: field,
								value: form.address,
								onChange: (e) => setForm({
									...form,
									address: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs uppercase tracking-widest text-muted-foreground",
								children: "Order notes (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								className: "w-full border border-input bg-secondary/40 p-3 text-sm outline-none focus:border-primary",
								value: form.notes,
								onChange: (e) => setForm({
									...form,
									notes: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "pt-4 text-xl",
							children: "Payment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: [{
								id: "cod",
								label: "Cash on delivery"
							}, {
								id: "bank",
								label: "Bank transfer"
							}].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: `flex cursor-pointer items-center gap-3 border p-3 text-sm ${form.payment_method === m.id ? "border-primary bg-primary/10" : "border-border"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "payment",
									className: "accent-primary",
									checked: form.payment_method === m.id,
									onChange: () => setForm({
										...form,
										payment_method: m.id
									})
								}), m.label]
							}, m.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit border border-border p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl",
							children: "Your order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-sm",
							children: cart.lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										l.name,
										l.variant ? ` (${l.variant})` : "",
										" × ",
										l.quantity
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPKR(l.price * l.quantity) })]
							}, `${l.slug}-${l.variant ?? ""}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 border-t border-border pt-4 text-sm",
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
										children: formatPKR(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "mt-6 w-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50",
							children: submitting ? "Placing order…" : "Place order"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Checkout as component };
