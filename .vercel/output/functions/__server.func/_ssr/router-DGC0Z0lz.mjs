import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1llcpoA1.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { M as notFound, _ as useNavigate, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { C as LayoutDashboard, E as Facebook, S as Mail, T as Heart, b as Menu, h as Phone, i as User, l as ShoppingCart, p as Search, s as Sun, t as X, v as Moon, w as Instagram, x as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B2YXWYfZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)({
	session: null,
	user: null,
	loading: true
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
			setSession(next);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			session,
			user: session?.user ?? null,
			loading
		},
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DSMjubbG.js
var p_treadmill_default = "/assets/p-treadmill-Bt62OZ_w.jpg";
var p_elliptical_default = "/assets/p-elliptical-CBBT5Vs5.jpg";
var p_bike_default = "/assets/p-bike-BMEAHfT7.jpg";
var p_bench_default = "/assets/p-bench-DW1tEv4i.jpg";
var p_multigym_default = "/assets/p-multigym-CloSk1-W.jpg";
var p_dumbbells_default = "/assets/p-dumbbells-CftEZhUe.jpg";
var p_plates_default = "/assets/p-plates-Cqm1ZNuT.jpg";
var p_yogamat_default = "/assets/p-yogamat-BY-V3eUx.jpg";
var p_trampoline_default = "/assets/p-trampoline-CySZQreo.jpg";
var p_bands_default = "/assets/p-bands-CSDz4eXZ.jpg";
var p_kettlebell_default = "/assets/p-kettlebell-CEc1BR4J.jpg";
var p_protein_default = "/assets/p-protein-Do3bFeYi.jpg";
var categories = [
	{
		slug: "cardio-equipment",
		name: "Cardio Equipment",
		blurb: "Treadmills, ellipticals and bikes",
		image: p_treadmill_default
	},
	{
		slug: "weight-training",
		name: "Weight Training",
		blurb: "Benches, multi gyms, dumbbells and plates",
		image: p_multigym_default
	},
	{
		slug: "fitness-accessories",
		name: "Fitness Accessories",
		blurb: "Mats, bands, trampolines and more",
		image: p_yogamat_default
	},
	{
		slug: "supplements",
		name: "Supplements",
		blurb: "Protein, gainers and recovery",
		image: p_protein_default
	}
];
var products = [
	{
		slug: "cube-th4011-treadmill",
		name: "Cube TH4011 Motorized Treadmill",
		brand: "FitnessCube Pro",
		price: 135e3,
		oldPrice: 149e3,
		category: "cardio-equipment",
		subcategory: "Treadmills",
		image: p_treadmill_default,
		rating: 4.9,
		reviews: 42,
		inStock: true,
		tags: ["featured", "bestseller"],
		description: "A commercial-grade motorized treadmill built for daily running at home. 3.0 HP motor, 12 preset programmes and a shock-absorbing running deck that protects your knees mile after mile.",
		specs: [
			"3.0 HP DC motor",
			"Speed 1-16 km/h",
			"12 preset programmes",
			"Max user weight 130 kg",
			"Foldable deck"
		]
	},
	{
		slug: "cube-th3000-slimline-treadmill",
		name: "SlimLine TH3000 Treadmill",
		brand: "FitnessCube",
		price: 11e4,
		category: "cardio-equipment",
		subcategory: "Treadmills",
		image: p_treadmill_default,
		rating: 4.8,
		reviews: 31,
		inStock: true,
		tags: ["featured", "bestseller"],
		description: "Slim, foldable and apartment friendly. The TH3000 slides under a bed when you're done and still delivers a proper cardio session with an LCD console and pulse grips.",
		specs: [
			"2.0 HP motor",
			"Speed 1-14 km/h",
			"LCD console",
			"Foldable frame",
			"Max user weight 110 kg"
		]
	},
	{
		slug: "cube-auto-incline-treadmill",
		name: "Cube AutoIncline X9 Treadmill",
		brand: "FitnessCube Pro",
		price: 189e3,
		oldPrice: 205e3,
		category: "cardio-equipment",
		subcategory: "Treadmills",
		image: p_treadmill_default,
		rating: 4.7,
		reviews: 18,
		inStock: true,
		tags: ["new"],
		description: "Motorised incline up to 15%, a wide 52 inch belt and Bluetooth speakers. Built for serious hill training without leaving the house.",
		specs: [
			"3.5 HP motor",
			"Auto incline 0-15%",
			"52\" running belt",
			"Bluetooth audio",
			"Max user weight 150 kg"
		]
	},
	{
		slug: "cube-orbit-elliptical",
		name: "Cube Orbit 8.2-A Elliptical",
		brand: "FitnessCube",
		price: 54e3,
		category: "cardio-equipment",
		subcategory: "Ellipticals",
		image: p_elliptical_default,
		rating: 4.6,
		reviews: 26,
		inStock: true,
		tags: ["featured"],
		description: "Low-impact full body cardio. Smooth magnetic resistance, moving handlebars and a compact footprint that fits any room.",
		specs: [
			"8 resistance levels",
			"Magnetic flywheel",
			"Moving handlebars",
			"Digital monitor"
		]
	},
	{
		slug: "cube-glide-pro-elliptical",
		name: "Cube Glide Pro Elliptical",
		brand: "FitnessCube Pro",
		price: 89e3,
		category: "cardio-equipment",
		subcategory: "Ellipticals",
		image: p_elliptical_default,
		rating: 4.5,
		reviews: 11,
		inStock: true,
		tags: ["new"],
		description: "Heavier flywheel, longer stride and 16 resistance levels for gym-grade cross training at home.",
		specs: [
			"16 resistance levels",
			"18\" stride",
			"9 kg flywheel",
			"Heart rate grips"
		]
	},
	{
		slug: "cube-spin-bike-s500",
		name: "Cube Spin Bike S500",
		brand: "FitnessCube",
		price: 46e3,
		oldPrice: 52e3,
		category: "cardio-equipment",
		subcategory: "Exercise Bikes",
		image: p_bike_default,
		rating: 4.7,
		reviews: 38,
		inStock: true,
		tags: ["bestseller"],
		description: "Belt-driven indoor cycle with a 13 kg flywheel, fully adjustable seat and handlebars, and near silent operation.",
		specs: [
			"13 kg flywheel",
			"Belt drive",
			"Adjustable seat & bars",
			"Cage pedals"
		]
	},
	{
		slug: "cube-air-bike",
		name: "Cube Air Assault Bike",
		brand: "FitnessCube Pro",
		price: 72e3,
		category: "cardio-equipment",
		subcategory: "Exercise Bikes",
		image: p_bike_default,
		rating: 4.4,
		reviews: 9,
		inStock: false,
		tags: ["new"],
		description: "Fan-based unlimited resistance. The harder you push, the harder it pushes back — the fastest way to burn out a conditioning session.",
		specs: [
			"Fan resistance",
			"Steel frame",
			"Console with interval timer"
		]
	},
	{
		slug: "cube-recumbent-bike",
		name: "Cube Recumbent Bike R200",
		brand: "FitnessCube",
		price: 58e3,
		category: "cardio-equipment",
		subcategory: "Exercise Bikes",
		image: p_bike_default,
		rating: 4.3,
		reviews: 14,
		inStock: true,
		tags: [],
		description: "Back-supported seating for comfortable, joint-friendly cardio. Ideal for rehab and longer low-intensity sessions.",
		specs: [
			"8 resistance levels",
			"Padded backrest",
			"Step-through frame"
		]
	},
	{
		slug: "cube-adjustable-bench-1208t",
		name: "Adjustable Bench 1208T",
		brand: "FitnessCube",
		price: 26e3,
		category: "weight-training",
		subcategory: "Benches",
		image: p_bench_default,
		rating: 5,
		reviews: 47,
		inStock: false,
		tags: ["featured", "bestseller"],
		description: "Seven back positions from decline to full upright, thick high-density padding and locking leg rollers for decline work and sit-ups.",
		specs: [
			"7 back positions",
			"Leg support rollers",
			"Max load 250 kg",
			"Powder-coated steel"
		]
	},
	{
		slug: "cube-flat-bench",
		name: "Cube Flat Utility Bench",
		brand: "FitnessCube",
		price: 14500,
		category: "weight-training",
		subcategory: "Benches",
		image: p_bench_default,
		rating: 4.6,
		reviews: 22,
		inStock: true,
		tags: [],
		description: "A no-nonsense flat bench with a wide, stable base for pressing heavy.",
		specs: [
			"Max load 300 kg",
			"Wide stance frame",
			"Non-slip feet"
		]
	},
	{
		slug: "cube-fid-bench-pro",
		name: "Cube FID Bench Pro",
		brand: "FitnessCube Pro",
		price: 39e3,
		oldPrice: 44e3,
		category: "weight-training",
		subcategory: "Benches",
		image: p_bench_default,
		rating: 4.8,
		reviews: 16,
		inStock: true,
		tags: ["new"],
		description: "Flat / incline / decline bench with a ladder adjustment system and commercial vinyl upholstery.",
		specs: [
			"12 positions",
			"Ladder adjustment",
			"Max load 350 kg"
		]
	},
	{
		slug: "cube-home-multi-gym",
		name: "Cube Home Multi Gym 90kg",
		brand: "FitnessCube Pro",
		price: 165e3,
		category: "weight-training",
		subcategory: "Multi Gyms",
		image: p_multigym_default,
		rating: 4.7,
		reviews: 13,
		inStock: true,
		tags: ["featured"],
		description: "A complete strength station: lat pulldown, chest press, pec deck, low row and leg extension with a 90 kg selectorised weight stack.",
		specs: [
			"90 kg weight stack",
			"5 stations",
			"Aircraft-grade cables",
			"Footprint 210 x 120 cm"
		]
	},
	{
		slug: "cube-smith-machine",
		name: "Cube Smith Machine & Rack",
		brand: "FitnessCube Pro",
		price: 245e3,
		category: "weight-training",
		subcategory: "Multi Gyms",
		image: p_multigym_default,
		rating: 4.9,
		reviews: 7,
		inStock: true,
		tags: ["new"],
		description: "Guided barbell track, dual adjustable pulleys, safety catches and integrated plate storage. The centrepiece of a serious home gym.",
		specs: [
			"Guided barbell",
			"Dual pulleys",
			"Safety catches",
			"Plate storage pegs"
		]
	},
	{
		slug: "cube-power-rack",
		name: "Cube Power Rack PR7",
		brand: "FitnessCube Pro",
		price: 132e3,
		category: "weight-training",
		subcategory: "Multi Gyms",
		image: p_multigym_default,
		rating: 4.8,
		reviews: 10,
		inStock: true,
		tags: [],
		description: "Heavy 60 mm uprights, multi-grip pull-up bar and J-hooks rated for maximal squats and presses.",
		specs: [
			"60 mm steel uprights",
			"Multi-grip pull-up bar",
			"J-hooks & safety bars"
		]
	},
	{
		slug: "cube-hex-dumbbells",
		name: "Rubber Hex Dumbbells (Pair)",
		brand: "FitnessCube",
		price: 9500,
		category: "weight-training",
		subcategory: "Dumbbells",
		image: p_dumbbells_default,
		rating: 4.9,
		reviews: 64,
		inStock: true,
		tags: ["featured", "bestseller"],
		description: "Rubber-encased hex heads that won't roll, mark your floor or rattle. Sold as a pair — pick your weight below.",
		specs: [
			"Rubber encased",
			"Knurled chrome handle",
			"Anti-roll hex heads"
		],
		variants: {
			label: "Weight per dumbbell",
			options: [
				{
					name: "5 kg",
					price: 9500
				},
				{
					name: "10 kg",
					price: 17500
				},
				{
					name: "15 kg",
					price: 25500
				},
				{
					name: "20 kg",
					price: 33500
				}
			]
		}
	},
	{
		slug: "cube-adjustable-dumbbell",
		name: "Cube Adjustable Dumbbell 24kg",
		brand: "FitnessCube Pro",
		price: 42e3,
		oldPrice: 48e3,
		category: "weight-training",
		subcategory: "Dumbbells",
		image: p_dumbbells_default,
		rating: 4.6,
		reviews: 19,
		inStock: true,
		tags: ["new"],
		description: "Fifteen dumbbells in one. Twist the dial to jump from 2.5 kg to 24 kg in seconds.",
		specs: [
			"2.5-24 kg range",
			"Dial adjustment",
			"Includes storage tray"
		]
	},
	{
		slug: "cube-olympic-plates",
		name: "Olympic Rubber Weight Plates",
		brand: "FitnessCube",
		price: 8e3,
		category: "weight-training",
		subcategory: "Plates & Bars",
		image: p_plates_default,
		rating: 4.7,
		reviews: 35,
		inStock: true,
		tags: ["bestseller"],
		description: "51 mm Olympic bore, rubber coated to protect your floor and keep the noise down. Price per plate.",
		specs: [
			"51 mm Olympic bore",
			"Rubber coating",
			"Tolerance +/- 2%"
		],
		variants: {
			label: "Plate weight",
			options: [
				{
					name: "5 kg",
					price: 8e3
				},
				{
					name: "10 kg",
					price: 15e3
				},
				{
					name: "15 kg",
					price: 22e3
				},
				{
					name: "20 kg",
					price: 29e3
				}
			]
		}
	},
	{
		slug: "cube-olympic-barbell",
		name: "Olympic Barbell 7ft 20kg",
		brand: "FitnessCube Pro",
		price: 34e3,
		category: "weight-training",
		subcategory: "Plates & Bars",
		image: p_plates_default,
		rating: 4.8,
		reviews: 21,
		inStock: true,
		tags: [],
		description: "20 kg, 700 lb rated bar with dual knurl marks and smooth bronze bushings.",
		specs: [
			"20 kg / 7 ft",
			"700 lb capacity",
			"Dual knurl marks",
			"Bronze bushings"
		]
	},
	{
		slug: "cube-cast-kettlebell",
		name: "Cast Iron Kettlebell",
		brand: "FitnessCube",
		price: 6500,
		category: "weight-training",
		subcategory: "Kettlebells",
		image: p_kettlebell_default,
		rating: 4.7,
		reviews: 29,
		inStock: true,
		tags: ["bestseller"],
		description: "Single-cast iron with a wide, smooth handle for swings, cleans and Turkish get-ups.",
		specs: [
			"Single-cast iron",
			"Flat base",
			"Powder-coated finish"
		],
		variants: {
			label: "Weight",
			options: [
				{
					name: "8 kg",
					price: 6500
				},
				{
					name: "12 kg",
					price: 9e3
				},
				{
					name: "16 kg",
					price: 12e3
				},
				{
					name: "24 kg",
					price: 17500
				}
			]
		}
	},
	{
		slug: "cube-competition-kettlebell",
		name: "Competition Kettlebell 16kg",
		brand: "FitnessCube Pro",
		price: 15500,
		category: "weight-training",
		subcategory: "Kettlebells",
		image: p_kettlebell_default,
		rating: 4.5,
		reviews: 8,
		inStock: true,
		tags: [],
		description: "Uniform dimensions at every weight, so your technique never changes as you go heavier.",
		specs: [
			"Steel competition spec",
			"33 mm handle",
			"Colour coded"
		]
	},
	{
		slug: "cube-yoga-mat",
		name: "Anti-Slip Yoga Mat",
		brand: "FitnessCube",
		price: 2800,
		oldPrice: 3500,
		category: "fitness-accessories",
		subcategory: "Yoga Mats",
		image: p_yogamat_default,
		rating: 4.6,
		reviews: 88,
		inStock: true,
		tags: ["featured", "bestseller"],
		description: "High-density NBR foam with a textured anti-slip surface. Rolls up tight with the included strap.",
		specs: [
			"61 x 183 cm",
			"NBR foam",
			"Anti-slip texture",
			"Carry strap included"
		],
		variants: {
			label: "Thickness",
			options: [
				{
					name: "4 mm",
					price: 2800
				},
				{
					name: "6 mm",
					price: 3400
				},
				{
					name: "8 mm",
					price: 3900
				}
			]
		}
	},
	{
		slug: "cube-outdoor-trampoline",
		name: "Outdoor Trampoline with Net",
		brand: "FitnessCube",
		price: 69e3,
		category: "fitness-accessories",
		subcategory: "Trampolines",
		image: p_trampoline_default,
		rating: 4.5,
		reviews: 17,
		inStock: true,
		tags: ["featured", "new"],
		description: "Galvanised steel frame, UV-resistant jump mat and a full safety enclosure. Assembly guide and tools included.",
		specs: [
			"Galvanised frame",
			"Safety enclosure net",
			"UV-resistant mat",
			"Padded spring cover"
		],
		variants: {
			label: "Size",
			options: [
				{
					name: "8 ft",
					price: 69e3
				},
				{
					name: "10 ft",
					price: 82e3
				},
				{
					name: "12 ft",
					price: 98e3
				}
			]
		}
	},
	{
		slug: "cube-mini-trampoline",
		name: "Mini Fitness Rebounder",
		brand: "FitnessCube",
		price: 12500,
		category: "fitness-accessories",
		subcategory: "Trampolines",
		image: p_trampoline_default,
		rating: 4.2,
		reviews: 12,
		inStock: true,
		tags: [],
		description: "40 inch indoor rebounder with a stability handle for low-impact cardio in a small space.",
		specs: [
			"40 inch diameter",
			"Stability handle",
			"Folding legs"
		]
	},
	{
		slug: "cube-resistance-bands",
		name: "Resistance Band Set (5 pcs)",
		brand: "FitnessCube",
		price: 3200,
		category: "fitness-accessories",
		subcategory: "Resistance Bands",
		image: p_bands_default,
		rating: 4.4,
		reviews: 54,
		inStock: true,
		tags: ["bestseller"],
		description: "Five graded latex tubes with handles, ankle straps and a door anchor. A full gym that fits in a drawer.",
		specs: [
			"5 resistance levels",
			"Handles & ankle straps",
			"Door anchor",
			"Mesh carry bag"
		]
	},
	{
		slug: "cube-loop-bands",
		name: "Fabric Booty Loop Bands",
		brand: "FitnessCube",
		price: 1900,
		category: "fitness-accessories",
		subcategory: "Resistance Bands",
		image: p_bands_default,
		rating: 4.6,
		reviews: 41,
		inStock: true,
		tags: ["new"],
		description: "Non-rolling fabric loops in light, medium and heavy for glute and hip work.",
		specs: [
			"Set of 3",
			"Non-roll fabric",
			"Light / medium / heavy"
		]
	},
	{
		slug: "cube-speed-rope",
		name: "Speed Skipping Rope",
		brand: "FitnessCube",
		price: 1200,
		category: "fitness-accessories",
		subcategory: "Accessories",
		image: p_bands_default,
		rating: 4.3,
		reviews: 33,
		inStock: true,
		tags: [],
		description: "Ball-bearing handles and a coated steel cable for fast, tangle-free double-unders.",
		specs: [
			"Adjustable length",
			"Ball bearing handles",
			"Steel cable"
		]
	},
	{
		slug: "cube-ab-roller",
		name: "Dual Wheel Ab Roller",
		brand: "FitnessCube",
		price: 2400,
		category: "fitness-accessories",
		subcategory: "Accessories",
		image: p_bands_default,
		rating: 4.4,
		reviews: 25,
		inStock: true,
		tags: [],
		description: "Wide dual wheels for stability, with a knee pad included.",
		specs: [
			"Dual wheel",
			"Foam grips",
			"Knee pad included"
		]
	},
	{
		slug: "cube-whey-protein",
		name: "Cube Whey Protein 2kg",
		brand: "FitnessCube Nutrition",
		price: 14500,
		oldPrice: 16e3,
		category: "supplements",
		subcategory: "Protein",
		image: p_protein_default,
		rating: 4.7,
		reviews: 76,
		inStock: true,
		tags: ["featured", "bestseller"],
		description: "24 g of protein per scoop from whey concentrate and isolate. Mixes clean, no clumps.",
		specs: [
			"2 kg tub",
			"24 g protein per serving",
			"66 servings"
		],
		variants: {
			label: "Flavour",
			options: [
				{
					name: "Chocolate",
					price: 14500
				},
				{
					name: "Vanilla",
					price: 14500
				},
				{
					name: "Strawberry",
					price: 14500
				}
			]
		}
	},
	{
		slug: "cube-mass-gainer",
		name: "Cube Mass Gainer 3kg",
		brand: "FitnessCube Nutrition",
		price: 12e3,
		category: "supplements",
		subcategory: "Gainers",
		image: p_protein_default,
		rating: 4.3,
		reviews: 28,
		inStock: true,
		tags: ["new"],
		description: "High-calorie blend of complex carbs and protein for hard gainers.",
		specs: [
			"3 kg tub",
			"1250 kcal per serving",
			"Added creatine"
		]
	},
	{
		slug: "cube-creatine",
		name: "Micronised Creatine 300g",
		brand: "FitnessCube Nutrition",
		price: 4800,
		category: "supplements",
		subcategory: "Performance",
		image: p_protein_default,
		rating: 4.8,
		reviews: 51,
		inStock: true,
		tags: ["bestseller"],
		description: "Pure micronised creatine monohydrate, unflavoured. 5 g per day, no loading needed.",
		specs: [
			"300 g",
			"60 servings",
			"Unflavoured"
		]
	},
	{
		slug: "cube-bcaa",
		name: "BCAA Recovery 400g",
		brand: "FitnessCube Nutrition",
		price: 6200,
		category: "supplements",
		subcategory: "Performance",
		image: p_protein_default,
		rating: 4.1,
		reviews: 15,
		inStock: false,
		tags: [],
		description: "2:1:1 branched-chain amino acids with electrolytes for intra-workout sipping.",
		specs: [
			"400 g",
			"2:1:1 ratio",
			"Added electrolytes"
		]
	}
];
function getProduct(slug) {
	return products.find((p) => p.slug === slug);
}
function getCategory(slug) {
	return categories.find((c) => c.slug === slug);
}
/** Bundled product photography, referenced from the database by key. */
var productImages = {
	treadmill: p_treadmill_default,
	elliptical: p_elliptical_default,
	bike: p_bike_default,
	bench: p_bench_default,
	multigym: p_multigym_default,
	dumbbells: p_dumbbells_default,
	plates: p_plates_default,
	yogamat: p_yogamat_default,
	trampoline: p_trampoline_default,
	bands: p_bands_default,
	kettlebell: p_kettlebell_default,
	protein: p_protein_default
};
var imageKeys = Object.keys(productImages);
function imageFor(key) {
	if (!key) return p_treadmill_default;
	if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("data:")) return key;
	return productImages[key] || "/assets/p-treadmill-Bt62OZ_w.jpg";
}
function productImagesList(key) {
	if (!key) return [p_treadmill_default];
	const list = key.split(/[\n,]+/).map((k) => k.trim()).filter(Boolean);
	if (list.length === 0) return [p_treadmill_default];
	return list.map(imageFor);
}
function rowToProduct(row) {
	return {
		id: row.id,
		slug: row.slug,
		name: row.name,
		brand: row.brand,
		price: row.price,
		...row.old_price != null ? { oldPrice: row.old_price } : {},
		category: row.category,
		subcategory: row.subcategory,
		image: imageFor(row.image_key),
		imageKey: row.image_key,
		rating: Number(row.rating),
		reviews: row.reviews,
		inStock: row.in_stock,
		tags: Array.isArray(row.tags) ? row.tags : [],
		description: row.description,
		specs: Array.isArray(row.specs) ? row.specs : [],
		...row.variants ? { variants: row.variants } : {},
		isActive: row.is_active,
		sortOrder: row.sort_order
	};
}
async function fetchCatalog() {
	const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("sort_order", { ascending: true });
	if (error) throw error;
	return data.map(rowToProduct);
}
/**
* Live storefront catalogue. Renders instantly from the bundled catalogue,
* then swaps in whatever the shop owner has published in the admin area.
*/
function useCatalog() {
	const { data } = useQuery({
		queryKey: ["catalog"],
		queryFn: fetchCatalog,
		initialData: products,
		initialDataUpdatedAt: 0,
		staleTime: 6e4
	});
	return data;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DGC0Z0lz.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-BbylB1vJ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var STORAGE_KEY$1 = "fitnesscube-theme";
var ThemeContext = (0, import_react.createContext)({
	theme: "dark",
	toggle: () => {}
});
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY$1);
		if (stored === "light" || stored === "dark") setTheme(stored);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem(STORAGE_KEY$1, theme);
	}, [theme]);
	const toggle = (0, import_react.useCallback)(() => setTheme((t) => t === "dark" ? "light" : "dark"), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggle
		},
		children
	});
}
var useTheme = () => (0, import_react.useContext)(ThemeContext);
var fitnesscube_logo_trimmed_default = "/assets/fitnesscube-logo-trimmed-C3wwkOzG.png";
function Logo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: `inline-flex items-center rounded-sm bg-foreground/95 px-2 py-1 dark:bg-transparent dark:px-0 dark:py-0 ${className}`,
		"aria-label": "FitnessCube home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: fitnesscube_logo_trimmed_default,
			alt: "FitnessCube — complete exercise & gym solutions",
			width: 777,
			height: 219,
			className: "h-9 w-auto object-contain sm:h-11"
		})
	});
}
var STORAGE_KEY = "fitnesscube.cart.v1";
var CartContext = (0, import_react.createContext)(null);
var sameLine = (a, slug, variant) => a.slug === slug && (a.variant ?? "") === (variant ?? "");
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
	}, [lines, hydrated]);
	const value = (0, import_react.useMemo)(() => {
		return {
			lines,
			count: lines.reduce((n, l) => n + l.quantity, 0),
			subtotal: lines.reduce((n, l) => n + l.quantity * l.price, 0),
			add: (line, quantity = 1) => setLines((current) => {
				if (current.find((l) => sameLine(l, line.slug, line.variant))) return current.map((l) => sameLine(l, line.slug, line.variant) ? {
					...l,
					quantity: l.quantity + quantity
				} : l);
				return [...current, {
					...line,
					quantity
				}];
			}),
			setQuantity: (slug, variant, quantity) => setLines((current) => quantity <= 0 ? current.filter((l) => !sameLine(l, slug, variant)) : current.map((l) => sameLine(l, slug, variant) ? {
				...l,
				quantity
			} : l)),
			remove: (slug, variant) => setLines((current) => current.filter((l) => !sameLine(l, slug, variant))),
			clear: () => setLines([])
		};
	}, [lines]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
var ORDER_STATUSES = [
	"pending",
	"confirmed",
	"shipped",
	"delivered",
	"cancelled"
];
/** True when the signed-in user holds the admin role (verified server-side). */
function useIsAdmin() {
	const { user, loading } = useAuth();
	const query = useQuery({
		queryKey: ["is-admin", user?.id ?? null],
		enabled: Boolean(user),
		staleTime: 6e4,
		queryFn: async () => {
			const { data, error } = await supabase.rpc("has_role", {
				_user_id: user.id,
				_role: "admin"
			});
			if (error) throw error;
			return Boolean(data);
		}
	});
	return {
		isAdmin: Boolean(query.data),
		checking: loading || Boolean(user) && query.isLoading
	};
}
function useAdminExists() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["admin-exists"],
		enabled: Boolean(user),
		queryFn: async () => {
			const { data, error } = await supabase.rpc("admin_exists");
			if (error) throw error;
			return Boolean(data);
		}
	});
}
function useAdminOrders() {
	return useQuery({
		queryKey: ["admin", "orders"],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
}
function useAdminOrderItems() {
	return useQuery({
		queryKey: ["admin", "order-items"],
		queryFn: async () => {
			const { data, error } = await supabase.from("order_items").select("*");
			if (error) throw error;
			return data;
		}
	});
}
function useAdminProducts() {
	return useQuery({
		queryKey: ["admin", "products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });
			if (error) throw error;
			return data.map(rowToProduct);
		}
	});
}
function useAdminCustomers() {
	return useQuery({
		queryKey: ["admin", "customers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
}
function useAdminRoles() {
	return useQuery({
		queryKey: ["admin", "roles"],
		queryFn: async () => {
			const { data, error } = await supabase.from("user_roles").select("*");
			if (error) throw error;
			return data;
		}
	});
}
function ThemeToggle({ className = "" }) {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		className: `grid h-10 w-10 place-items-center hover:text-primary ${className}`,
		"aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
		title: theme === "dark" ? "Light mode" : "Dark mode",
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5" })
	});
}
function Header() {
	const cart = useCart();
	const { user } = useAuth();
	const { isAdmin } = useIsAdmin();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		navigate({
			to: "/shop",
			search: {
				q: q || void 0,
				category: void 0,
				min: 0,
				max: 25e4,
				sort: "featured"
			}
		});
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-secondary/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Free delivery on orders over ₨ 25,000 across Pakistan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "tel:+923372486635",
						className: "hidden items-center gap-1.5 hover:text-foreground sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), " 0337 2486635"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center gap-4 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "lg:hidden",
						onClick: () => setOpen((v) => !v),
						"aria-label": "Toggle menu",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "ml-auto hidden max-w-md flex-1 items-center lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search treadmills, dumbbells, protein...",
							className: "h-10 w-full border border-input bg-secondary/40 px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary",
							"aria-label": "Search products"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "grid h-10 w-11 place-items-center bg-primary text-primary-foreground hover:bg-primary/85",
							"aria-label": "Search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1 lg:ml-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/wishlist",
								className: "hidden h-10 w-10 place-items-center hover:text-primary sm:grid",
								"aria-label": "Wishlist",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
							}),
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "hidden h-10 w-10 place-items-center hover:text-primary sm:grid",
								"aria-label": "Store admin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: user ? "/account" : "/auth",
								className: "grid h-10 w-10 place-items-center hover:text-primary",
								"aria-label": "Account",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								className: "relative grid h-10 w-10 place-items-center hover:text-primary",
								"aria-label": "Cart",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), cart.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground",
									children: cart.count
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "hidden border-t border-border lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center gap-6 px-4 text-xs font-bold uppercase tracking-widest",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "py-3 hover:text-primary",
							activeProps: { className: "py-3 text-primary" },
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								q: void 0,
								category: void 0,
								min: 0,
								max: 25e4,
								sort: "featured"
							},
							className: "py-3 hover:text-primary",
							children: "Shop all"
						}),
						categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/$slug",
							params: { slug: c.slug },
							className: "py-3 hover:text-primary",
							activeProps: { className: "py-3 text-primary" },
							children: c.name
						}, c.slug)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "ml-auto py-3 hover:text-primary",
							children: "Contact"
						})
					]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "mb-3 flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search products",
								className: "h-10 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary",
								"aria-label": "Search products"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "grid h-10 w-11 place-items-center bg-primary text-primary-foreground",
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								q: void 0,
								category: void 0,
								min: 0,
								max: 25e4,
								sort: "featured"
							},
							onClick: () => setOpen(false),
							className: "block py-2 text-sm font-bold uppercase tracking-widest",
							children: "Shop all"
						}),
						categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/$slug",
							params: { slug: c.slug },
							onClick: () => setOpen(false),
							className: "block py-2 text-sm font-bold uppercase tracking-widest",
							children: c.name
						}, c.slug)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							onClick: () => setOpen(false),
							className: "block py-2 text-sm font-bold uppercase tracking-widest",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(false),
							className: "mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Close"]
						})
					]
				})
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 border-t border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Pakistan's home for serious training gear. Treadmills, racks, plates and everything in between — delivered and installed nationwide."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://facebook.com/fitnesscubewarehouse/",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "grid h-9 w-9 place-items-center border border-border hover:border-primary hover:text-primary",
								"aria-label": "Facebook",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.instagram.com/fitnesscubeshop/",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "grid h-9 w-9 place-items-center border border-border hover:border-primary hover:text-primary",
								"aria-label": "Instagram",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-sm tracking-widest",
					children: "Shop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/category/$slug",
						params: { slug: c.slug },
						className: "hover:text-primary",
						children: c.name
					}) }, c.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							q: void 0,
							category: void 0,
							min: 0,
							max: 25e4,
							sort: "featured"
						},
						className: "hover:text-primary",
						children: "All products"
					}) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-sm tracking-widest",
					children: "Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account",
							className: "hover:text-primary",
							children: "My account"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							className: "hover:text-primary",
							children: "Order history"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wishlist",
							className: "hover:text-primary",
							children: "Wishlist"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "hover:text-primary",
							children: "Cart"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-sm tracking-widest",
					children: "Get in touch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), "Ground Floor, al Rehman, House No# 01, Co-Operative Housing Society, Block 10-A, Gulshan-e-Iqbal, Karachi 75300"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+923372486635",
								className: "hover:text-primary",
								children: "0337 2486635"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@fitnesscube.pk",
								className: "hover:text-primary",
								children: "hello@fitnesscube.pk"
							})]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" FitnessCube. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cash on delivery · Bank transfer · Installation available" })]
			})
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FitnessCube — Home Gym & Fitness Equipment in Pakistan" },
			{
				name: "description",
				content: "Buy treadmills, ellipticals, benches, dumbbells and supplements online in Pakistan. Nationwide delivery and installation from FitnessCube."
			},
			{
				name: "author",
				content: "FitnessCube"
			},
			{
				property: "og:title",
				content: "FitnessCube — Home Gym & Fitness Equipment in Pakistan"
			},
			{
				property: "og:description",
				content: "Treadmills, racks, plates and supplements delivered across Pakistan."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })] }) }) })
	});
}
var $$splitComponentImporter$15 = () => import("./routes-uzxLwhoZ.mjs");
var Route$15 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "FitnessCube — Buy Gym & Fitness Equipment Online in Pakistan" },
		{
			name: "description",
			content: "Shop treadmills, ellipticals, exercise bikes, benches, dumbbells and supplements at FitnessCube. Nationwide delivery and installation across Pakistan."
		},
		{
			property: "og:title",
			content: "FitnessCube — Gym & Fitness Equipment in Pakistan"
		},
		{
			property: "og:description",
			content: "Treadmills, racks, plates and supplements delivered across Pakistan."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./account-Bx79r-wt.mjs");
var Route$14 = createFileRoute("/account")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "My Account — FitnessCube" },
		{
			name: "description",
			content: "Manage your FitnessCube profile, delivery address and contact details."
		},
		{
			property: "og:title",
			content: "My Account — FitnessCube"
		},
		{
			property: "og:description",
			content: "Manage your FitnessCube profile."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin-jmcJ18E2.mjs");
var Route$13 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Store Admin — FitnessCube" },
		{
			name: "description",
			content: "Manage FitnessCube orders, products and customers."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
function safeNext(value) {
	if (typeof value !== "string") return void 0;
	return value.startsWith("/") && !value.startsWith("//") ? value : void 0;
}
var $$splitComponentImporter$12 = () => import("./auth-x5STsv3x.mjs");
var Route$12 = createFileRoute("/auth")({
	ssr: false,
	validateSearch: (s) => {
		const next = safeNext(s["next"]);
		return next ? { next } : {};
	},
	head: () => ({ meta: [
		{ title: "Sign In or Create an Account — FitnessCube" },
		{
			name: "description",
			content: "Sign in to your FitnessCube account to track orders, save your wishlist and check out faster."
		},
		{
			property: "og:title",
			content: "Sign In — FitnessCube"
		},
		{
			property: "og:description",
			content: "Access your FitnessCube account."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./cart-DSFfx7DP.mjs");
var Route$11 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Your Cart — FitnessCube" },
		{
			name: "description",
			content: "Review the fitness equipment in your FitnessCube cart before checkout."
		},
		{
			property: "og:title",
			content: "Your Cart — FitnessCube"
		},
		{
			property: "og:description",
			content: "Review your FitnessCube order before checkout."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./checkout-BWrE-Tia.mjs");
var Route$10 = createFileRoute("/checkout")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Checkout — FitnessCube" },
		{
			name: "description",
			content: "Complete your FitnessCube order with cash on delivery or bank transfer."
		},
		{
			property: "og:title",
			content: "Checkout — FitnessCube"
		},
		{
			property: "og:description",
			content: "Complete your FitnessCube order."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./contact-DPHxmugt.mjs");
var Route$9 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact FitnessCube — Gym Equipment Support in Pakistan" },
		{
			name: "description",
			content: "Talk to the FitnessCube team about equipment, delivery, installation or commercial gym packages anywhere in Pakistan."
		},
		{
			property: "og:title",
			content: "Contact FitnessCube"
		},
		{
			property: "og:description",
			content: "Questions about equipment, delivery or installation? Get in touch with FitnessCube."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./orders-DBsEwzJU.mjs");
var Route$8 = createFileRoute("/orders")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Order History — FitnessCube" },
		{
			name: "description",
			content: "Track your FitnessCube orders and see everything you've purchased."
		},
		{
			property: "og:title",
			content: "Order History — FitnessCube"
		},
		{
			property: "og:description",
			content: "Track your FitnessCube orders."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var PRICE_BOUND = 25e4;
var $$splitComponentImporter$7 = () => import("./shop-Dmaf89DF.mjs");
function toNumber(value, fallback) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) && n >= 0 ? n : fallback;
}
var Route$7 = createFileRoute("/shop")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" && search["q"] ? search["q"] : void 0,
		category: typeof search["category"] === "string" && search["category"] ? search["category"] : void 0,
		min: toNumber(search["min"], 0),
		max: toNumber(search["max"], PRICE_BOUND),
		sort: typeof search["sort"] === "string" ? search["sort"] : "featured"
	}),
	head: () => ({ meta: [
		{ title: "Shop All Fitness Equipment — FitnessCube Pakistan" },
		{
			name: "description",
			content: "Browse the full FitnessCube catalogue: treadmills, ellipticals, bikes, benches, racks, dumbbells, plates, accessories and supplements."
		},
		{
			property: "og:title",
			content: "Shop All Fitness Equipment — FitnessCube"
		},
		{
			property: "og:description",
			content: "The full FitnessCube catalogue, with PKR pricing."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./wishlist-DOTPZiHj.mjs");
var Route$6 = createFileRoute("/wishlist")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Wishlist — FitnessCube" },
		{
			name: "description",
			content: "Every piece of kit you've saved for later at FitnessCube."
		},
		{
			property: "og:title",
			content: "Wishlist — FitnessCube"
		},
		{
			property: "og:description",
			content: "Your saved FitnessCube products."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.index-Df8Hattq.mjs");
var Route$5 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.customers-C7aqUN2z.mjs");
var Route$4 = createFileRoute("/admin/customers")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.orders-AhJuAF6L.mjs");
var Route$3 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.products-CUcUeI3j.mjs");
var Route$2 = createFileRoute("/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./category._slug-BKTNYem5.mjs");
var Route$1 = createFileRoute("/category/$slug")({
	loader: ({ params }) => {
		const category = getCategory(params.slug);
		if (!category) throw notFound();
		return { category };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Category not found — FitnessCube" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `${loaderData.category.name} — FitnessCube Pakistan`;
		const description = `${loaderData.category.blurb}. Shop ${loaderData.category.name.toLowerCase()} online in Pakistan with delivery and installation.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./product._slug-UJiiajcu.mjs");
var Route = createFileRoute("/product/$slug")({
	loader: ({ params }) => {
		const product = getProduct(params.slug);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product not found — FitnessCube" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { product } = loaderData;
		const description = product.description.slice(0, 155);
		return { meta: [
			{ title: `${product.name} — FitnessCube` },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: `${product.name} — FitnessCube`
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AccountRoute = Route$14.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$16
});
var AdminRoute = Route$13.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$16
});
var AuthRoute = Route$12.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$16
});
var CartRoute = Route$11.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$16
});
var CheckoutRoute = Route$10.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$16
});
var ContactRoute = Route$9.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$16
});
var OrdersRoute = Route$8.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$16
});
var ShopRoute = Route$7.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$16
});
var WishlistRoute = Route$6.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$16
});
var AdminIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$4.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$3.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminProductsRoute = Route$2.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminRoute
});
var CategorySlugRoute = Route$1.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => Route$16
});
var ProductSlugRoute = Route.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$16
});
var AdminRouteChildren = {
	AdminCustomersRoute,
	AdminOrdersRoute,
	AdminProductsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	AuthRoute,
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	OrdersRoute,
	ShopRoute,
	WishlistRoute,
	CategorySlugRoute,
	ProductSlugRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { categories as _, PRICE_BOUND as a, useCatalog as b, ORDER_STATUSES as c, useAdminOrderItems as d, useAdminOrders as f, useCart as g, useIsAdmin as h, Route$7 as i, useAdminCustomers as l, useAdminRoles as m, Route as n, Route$12 as o, useAdminProducts as p, Route$1 as r, safeNext as s, router_exports as t, useAdminExists as u, imageKeys as v, useAuth as x, productImagesList as y };
