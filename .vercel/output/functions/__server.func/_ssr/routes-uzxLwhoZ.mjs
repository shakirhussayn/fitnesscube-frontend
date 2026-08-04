import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as ArrowRight, a as Truck, f as ShieldCheck, k as CreditCard, n as Wrench } from "../_libs/lucide-react.mjs";
import { _ as categories, b as useCatalog } from "./router-DGC0Z0lz.mjs";
import { t as ProductCard } from "./ProductCard-DJm4eIcq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-uzxLwhoZ.js
var import_jsx_runtime = require_jsx_runtime();
var hero_treadmill_default = "/assets/hero-treadmill-C_kRoipn.jpg";
var hero_weights_default = "/assets/hero-weights-gNn8F-ui.jpg";
var hero_homegym_default = "/assets/hero-homegym-QMaFEzlZ.jpg";
var perks = [
	{
		icon: Truck,
		title: "Nationwide delivery",
		copy: "Lahore, Karachi, Islamabad and beyond"
	},
	{
		icon: Wrench,
		title: "Free installation",
		copy: "On all large cardio & strength machines"
	},
	{
		icon: ShieldCheck,
		title: "1 year warranty",
		copy: "Parts and service on every machine"
	},
	{
		icon: CreditCard,
		title: "Cash on delivery",
		copy: "Pay when your order arrives"
	}
];
function Home() {
	const catalog = useCatalog();
	const featured = catalog.filter((p) => p.tags.includes("featured")).slice(0, 8);
	const bestsellers = catalog.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
	const onSale = catalog.filter((p) => p.oldPrice).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_treadmill_default,
					alt: "Athlete running on a treadmill in a dark home gym",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 md:py-36",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 inline-flex w-fit bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-primary-foreground",
							children: "New season drop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "max-w-2xl text-5xl leading-[0.95] md:text-7xl",
							children: ["Build your gym ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "at home"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-lg text-base text-muted-foreground md:text-lg",
							children: "Commercial-grade treadmills, racks and free weights — delivered and installed anywhere in Pakistan."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								search: {
									q: void 0,
									category: void 0,
									min: 0,
									max: 25e4,
									sort: "featured"
								},
								className: "inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85",
								children: ["Shop now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/category/$slug",
								params: { slug: "cardio-equipment" },
								className: "inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary",
								children: "Cardio machines"
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4",
				children: perks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "mt-0.5 h-6 w-6 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold uppercase tracking-wide",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: p.copy
					})] })]
				}, p.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl md:text-4xl",
					children: "Shop by category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						q: void 0,
						category: void 0,
						min: 0,
						max: 25e4,
						sort: "featured"
					},
					className: "text-xs font-bold uppercase tracking-widest text-primary hover:underline",
					children: "View all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/category/$slug",
					params: { slug: c.slug },
					className: "group relative isolate overflow-hidden border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: c.name,
							loading: "lazy",
							className: "aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: c.blurb
							})]
						})
					]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-8 text-3xl md:text-4xl",
				children: "Featured equipment"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden border-y border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_weights_default,
					alt: "Rack of dumbbells and weight plates",
					loading: "lazy",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/75" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "max-w-xl text-4xl md:text-5xl",
							children: [
								"Up to ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "15% off"
								}),
								" free weights"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-muted-foreground",
							children: "Rubber hex dumbbells, Olympic plates and kettlebells — stock up while the sale lasts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/category/$slug",
							params: { slug: "weight-training" },
							className: "mt-2 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85",
							children: ["Shop weights ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-8 text-3xl md:text-4xl",
					children: "Bestsellers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: bestsellers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-8 mt-16 text-3xl md:text-4xl",
					children: "On sale"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: onSale.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_homegym_default,
					alt: "Fully equipped home gym setup",
					loading: "lazy",
					className: "aspect-[4/3] w-full border border-border object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl md:text-4xl",
						children: "Kit out your space, properly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Whether it's a corner of the bedroom or a full commercial floor, our team helps you pick the right machines for your space and budget — then delivers and installs them for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Free layout consultation over WhatsApp" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Commercial packages for gyms and hotels" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· After-sales service in all major cities" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "mt-8 inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary",
						children: "Talk to us"
					})
				] })]
			})
		})
	] });
}
//#endregion
export { Home as component };
