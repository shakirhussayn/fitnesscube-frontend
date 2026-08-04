import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Heart, a as Truck, f as ShieldCheck, m as Plus, n as Wrench, y as Minus } from "../_libs/lucide-react.mjs";
import { b as useCatalog, g as useCart, n as Route, x as useAuth, y as productImagesList } from "./router-DGC0Z0lz.mjs";
import { t as formatPKR } from "./format-BeiLX4zr.mjs";
import { n as Stars, t as ProductCard } from "./ProductCard-DJm4eIcq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-UJiiajcu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product: loaded } = Route.useLoaderData();
	const catalog = useCatalog();
	const product = catalog.find((p) => p.slug === loaded.slug) ?? loaded;
	const cart = useCart();
	const { user } = useAuth();
	const [variant, setVariant] = (0, import_react.useState)(product.variants?.options[0]?.name);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [tab, setTab] = (0, import_react.useState)("description");
	const price = product.variants ? product.variants.options.find((o) => o.name === variant)?.price ?? product.price : product.price;
	const related = catalog.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
	const addToWishlist = async () => {
		if (!user) {
			toast.error("Sign in to save items to your wishlist");
			return;
		}
		const { error } = await supabase.from("wishlist_items").insert({
			user_id: user.id,
			product_slug: product.slug
		});
		if (error) {
			toast.error(error.message.includes("duplicate") ? "Already in your wishlist" : error.message);
			return;
		}
		toast.success("Saved to wishlist");
	};
	const gallery = productImagesList(product.imageKey || product.image_key);
	const [activeImg, setActiveImg] = (0, import_react.useState)(null);
	const currentImg = activeImg || gallery[0] || product.image;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-6 text-xs uppercase tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/category/$slug",
						params: { slug: product.category },
						className: "hover:text-primary",
						children: product.subcategory
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-border bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: currentImg,
							alt: product.name,
							width: 1200,
							height: 1200,
							className: "aspect-square w-full object-cover"
						})
					}), gallery.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: gallery.map((imgUrl, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActiveImg(imgUrl),
							className: `h-16 w-16 overflow-hidden border-2 bg-secondary ${currentImg === imgUrl ? "border-primary" : "border-border hover:border-primary/50"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: imgUrl,
								alt: "",
								className: "h-full w-full object-cover"
							})
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: product.brand
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl md:text-4xl",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
							rating: product.rating,
							reviews: product.reviews
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-3xl font-bold text-primary",
							children: formatPKR(price)
						}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg text-muted-foreground line-through",
							children: formatPKR(product.oldPrice)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-bold uppercase tracking-widest",
						children: product.inStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "In stock — ships in 2-4 days"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: "Out of stock"
						})
					}),
					product.variants && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-bold uppercase tracking-widest",
							children: product.variants.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: product.variants.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setVariant(o.name),
								className: `border px-4 py-2 text-sm ${variant === o.name ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/60"}`,
								children: o.name
							}, o.name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-stretch gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center border border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setQty((n) => Math.max(1, n - 1)),
										className: "grid h-12 w-12 place-items-center hover:text-primary",
										"aria-label": "Decrease quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-center text-sm font-bold",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setQty((n) => n + 1),
										className: "grid h-12 w-12 place-items-center hover:text-primary",
										"aria-label": "Increase quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !product.inStock,
								onClick: () => {
									cart.add({
										slug: product.slug,
										name: product.name,
										price,
										image: product.image,
										...variant ? { variant } : {}
									}, qty);
									toast.success(`${product.name} added to cart`);
								},
								className: "h-12 flex-1 bg-primary px-8 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-40",
								children: product.inStock ? "Add to cart" : "Out of stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: addToWishlist,
								className: "grid h-12 w-12 place-items-center border border-border hover:border-primary hover:text-primary",
								"aria-label": "Add to wishlist",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-primary" }), " Nationwide delivery across Pakistan"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 text-primary" }), " Free installation on large machines"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " 1 year parts & service warranty"]
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 border-t border-border pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-6 text-xs font-bold uppercase tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("description"),
						className: tab === "description" ? "text-primary" : "text-muted-foreground",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("specs"),
						className: tab === "specs" ? "text-primary" : "text-muted-foreground",
						children: "Specifications"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 max-w-3xl text-sm text-muted-foreground",
					children: tab === "description" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.description }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: product.specs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-border pb-2",
							children: s
						}, s))
					})
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-2xl",
					children: "You may also like"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
				})]
			})
		]
	});
}
//#endregion
export { ProductPage as component };
