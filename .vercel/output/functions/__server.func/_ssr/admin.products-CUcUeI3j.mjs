import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Eye, O as EyeOff, g as Pencil, m as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { _ as categories, p as useAdminProducts, v as imageKeys, y as productImagesList } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.products-CUcUeI3j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyDraft = {
	slug: "",
	name: "",
	brand: "FitnessCube",
	price: "",
	old_price: "",
	category: categories[0]?.slug ?? "cardio-equipment",
	subcategory: "General",
	image_key: "treadmill",
	in_stock: true,
	is_active: true,
	tags: "",
	description: "",
	specs: "",
	sort_order: "0"
};
function toDraft(p) {
	return {
		slug: p.slug,
		name: p.name,
		brand: p.brand,
		price: String(p.price),
		old_price: p.oldPrice ? String(p.oldPrice) : "",
		category: p.category,
		subcategory: p.subcategory,
		image_key: p.imageKey,
		in_stock: p.inStock,
		is_active: p.isActive,
		tags: p.tags.join(", "),
		description: p.description,
		specs: p.specs.join("\n"),
		sort_order: String(p.sortOrder)
	};
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function AdminProducts() {
	const products = useAdminProducts();
	const queryClient = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [term, setTerm] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		const rows = products.data ?? [];
		if (!term.trim()) return rows;
		const needle = term.trim().toLowerCase();
		return rows.filter((p) => [
			p.name,
			p.brand,
			p.category,
			p.subcategory
		].join(" ").toLowerCase().includes(needle));
	}, [products.data, term]);
	const refresh = async () => {
		await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
		await queryClient.invalidateQueries({ queryKey: ["catalog"] });
	};
	const startNew = () => {
		setDraft(emptyDraft);
		setEditing("new");
	};
	const startEdit = (p) => {
		setDraft(toDraft(p));
		setEditing(p.id);
	};
	const save = async () => {
		if (!draft.name.trim() || !draft.price) {
			toast.error("Name and price are required");
			return;
		}
		setSaving(true);
		const payload = {
			slug: slugify(draft.slug || draft.name),
			name: draft.name.trim(),
			brand: draft.brand.trim() || "FitnessCube",
			price: Number(draft.price),
			old_price: draft.old_price ? Number(draft.old_price) : null,
			category: draft.category,
			subcategory: draft.subcategory.trim() || "General",
			image_key: draft.image_key,
			in_stock: draft.in_stock,
			is_active: draft.is_active,
			tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
			description: draft.description.trim(),
			specs: draft.specs.split("\n").map((s) => s.trim()).filter(Boolean),
			sort_order: Number(draft.sort_order) || 0
		};
		const { error } = editing === "new" ? await supabase.from("products").insert(payload) : await supabase.from("products").update(payload).eq("id", editing);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(editing === "new" ? "Product added" : "Product updated");
		setEditing(null);
		await refresh();
	};
	const toggle = async (p, field, value) => {
		const patch = field === "is_active" ? { is_active: value } : { in_stock: value };
		const { error } = await supabase.from("products").update(patch).eq("id", p.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await refresh();
	};
	const handleFileUpload = (e) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;
		let loaded = 0;
		const newImages = [];
		files.forEach((file) => {
			if (file.size > 5242880) {
				toast.error(`File ${file.name} exceeds 5MB limit`);
				loaded++;
				return;
			}
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") newImages.push(reader.result);
				loaded++;
				if (loaded === files.length) {
					setDraft((prev) => {
						const combined = [...prev.image_key ? prev.image_key.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean) : [], ...newImages].join("\n");
						return {
							...prev,
							image_key: combined
						};
					});
					toast.success(`${newImages.length} photo(s) added!`);
				}
			};
			reader.readAsDataURL(file);
		});
	};
	const remove = async (p) => {
		if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
		const { error } = await supabase.from("products").delete().eq("id", p.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Product deleted");
		await refresh();
	};
	if (products.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading products…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: term,
				onChange: (e) => setTerm(e.target.value),
				placeholder: "Search products",
				"aria-label": "Search products",
				className: "h-10 w-full max-w-xs border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startNew,
				className: "ml-auto flex items-center gap-2 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New product"]
			})]
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 border border-primary/50 bg-secondary/30 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-xl",
					children: editing === "new" ? "New product" : "Edit product"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: draft.name,
								onChange: (e) => setDraft({
									...draft,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "URL slug (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: draft.slug,
								placeholder: slugify(draft.name),
								onChange: (e) => setDraft({
									...draft,
									slug: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: draft.brand,
								onChange: (e) => setDraft({
									...draft,
									brand: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputCls,
								value: draft.category,
								onChange: (e) => setDraft({
									...draft,
									category: e.target.value
								}),
								children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.slug,
									children: c.name
								}, c.slug))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Type (subcategory)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: draft.subcategory,
								onChange: (e) => setDraft({
									...draft,
									subcategory: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Product Photo(s)",
							wide: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "h-10 border border-input bg-background px-3 text-sm outline-none focus:border-primary",
												value: imageKeys.includes(draft.image_key) ? draft.image_key : "custom",
												onChange: (e) => {
													if (e.target.value !== "custom") setDraft({
														...draft,
														image_key: e.target.value
													});
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "custom",
													children: "Custom URLs / Multi-Photo Upload"
												}), imageKeys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: k,
													children: ["Preset: ", k]
												}, k))]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "cursor-pointer border border-border bg-secondary px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-primary",
												children: ["Upload Photo(s)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "image/*",
													multiple: true,
													className: "hidden",
													onChange: handleFileUpload
												})]
											}),
											draft.image_key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDraft({
													...draft,
													image_key: ""
												}),
												className: "border border-destructive/50 px-2 py-1 text-[10px] uppercase text-destructive hover:bg-destructive/10",
												children: "Clear Photos"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: productImagesList(draft.image_key).map((imgUrl, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: imgUrl,
											alt: "Preview",
											className: "h-12 w-12 border border-border object-cover"
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										className: inputCls,
										placeholder: "Paste Image URLs (one per line or separated by commas)",
										value: draft.image_key,
										onChange: (e) => setDraft({
											...draft,
											image_key: e.target.value
										})
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Price (PKR)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: inputCls,
								value: draft.price,
								onChange: (e) => setDraft({
									...draft,
									price: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Was price (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: inputCls,
								value: draft.old_price,
								onChange: (e) => setDraft({
									...draft,
									old_price: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tags (featured, new, bestseller)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: draft.tags,
								onChange: (e) => setDraft({
									...draft,
									tags: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Display order",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: inputCls,
								value: draft.sort_order,
								onChange: (e) => setDraft({
									...draft,
									sort_order: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							wide: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								className: inputCls,
								value: draft.description,
								onChange: (e) => setDraft({
									...draft,
									description: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Specifications (one per line)",
							wide: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 4,
								className: inputCls,
								value: draft.specs,
								onChange: (e) => setDraft({
									...draft,
									specs: e.target.value
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: draft.in_stock,
								onChange: (e) => setDraft({
									...draft,
									in_stock: e.target.checked
								})
							}), "In stock"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: draft.is_active,
								onChange: (e) => setDraft({
									...draft,
									is_active: e.target.checked
								})
							}), "Visible on storefront"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setEditing(null),
								className: "border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: saving,
								onClick: save,
								className: "bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50",
								children: saving ? "Saving…" : "Save product"
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border border border-border",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: "",
						className: "h-12 w-12 shrink-0 object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-sm font-bold",
							children: [p.name, !p.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-muted-foreground",
								children: "(hidden)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								p.brand,
								" · ",
								p.subcategory,
								" · ",
								p.inStock ? "in stock" : "out of stock"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-primary",
						children: formatPKR(p.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggle(p, "in_stock", !p.inStock),
								className: "border border-border px-2 py-1.5 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary",
								children: p.inStock ? "Mark out" : "Mark in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggle(p, "is_active", !p.isActive),
								className: "grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary",
								"aria-label": p.isActive ? "Hide product" : "Show product",
								children: p.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => startEdit(p),
								className: "grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary",
								"aria-label": `Edit ${p.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => remove(p),
								className: "grid h-8 w-8 place-items-center border border-border hover:border-destructive hover:text-destructive",
								"aria-label": `Delete ${p.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					})
				]
			}, p.id))
		})
	] });
}
var inputCls = "h-10 w-full border border-input bg-background px-3 text-sm outline-none focus:border-primary";
function Field({ label, children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `block text-xs uppercase tracking-widest text-muted-foreground ${wide ? "md:col-span-2" : ""}`,
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5 normal-case tracking-normal text-foreground",
			children
		})]
	});
}
//#endregion
export { AdminProducts as component };
