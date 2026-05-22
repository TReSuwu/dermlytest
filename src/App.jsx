import { useEffect, useMemo, useState } from "react";

const CONCERN_INFO = {
  acne: { emoji: "🔴", title: "Acne", explanation: "Acne happens when pores get clogged with excess oil and dead skin cells. The right cleanser and a non-comedogenic moisturizer can make a huge difference — no harsh scrubbing needed." },
  dark_spots: { emoji: "🟤", title: "Dark Spots / PIH", explanation: "Post-inflammatory hyperpigmentation is the dark mark left after a pimple heals. Niacinamide, kojic acid, and daily sunscreen are your best weapons." },
  open_pores: { emoji: "🕳️", title: "Open Pores", explanation: "You can't shrink pores permanently, but keeping them clean and using niacinamide visibly minimizes their appearance over time." },
  dullness: { emoji: "😐", title: "Dullness", explanation: "Dull skin usually means dead skin cells are building up on the surface. Gentle cleansing, hydration, and Vitamin C bring back the glow." },
  whiteheads: { emoji: "⚪", title: "Whiteheads", explanation: "Whiteheads are clogged pores sealed under the skin. Salicylic acid cleansers and lightweight moisturizers help. Don't squeeze — they'll leave marks." },
  sensitivity: { emoji: "🌸", title: "Sensitivity", explanation: "Keep your routine simple — minimal ingredients, fragrance-free products, and always patch test before adding anything new." },
};

const PRODUCTS = {
  cleanser: [
    { name: "Himalaya Purifying Neem Face Wash", brand: "Himalaya", price: 140, budget: "low", skin_types: ["oily", "combination"], concerns: ["acne", "whiteheads", "open_pores"], benefit: "Gentle pH 5.5 cleanser, clears excess oil without stripping", buy_url: "https://www.nykaa.com/search/result/?q=himalaya+neem+face+wash", platform: "Nykaa" },
    { name: "Cetaphil Gentle Skin Cleanser", brand: "Cetaphil", price: 280, budget: "low", skin_types: ["dry", "sensitive", "normal", "all"], concerns: ["sensitivity", "dullness"], benefit: "Non-stripping, dermat-recommended for dry and sensitive skin", buy_url: "https://www.nykaa.com/search/result/?q=cetaphil+gentle+cleanser", platform: "Nykaa" },
    { name: "Simple Refreshing Facial Wash", brand: "Simple", price: 325, budget: "low", skin_types: ["oily", "combination", "normal"], concerns: ["acne", "dullness", "sensitivity"], benefit: "No fragrance, no harsh chemicals — gentle but effective", buy_url: "https://www.nykaa.com/search/result/?q=simple+refreshing+face+wash", platform: "Nykaa" },
    { name: "Re'equil Oil Control Face Wash", brand: "Re'equil", price: 375, budget: "low", skin_types: ["oily", "combination"], concerns: ["acne", "open_pores", "whiteheads"], benefit: "Controls sebum without over-drying, low pH formula", buy_url: "https://www.nykaa.com/search/result/?q=reequil+oil+control+face+wash", platform: "Nykaa" },
    { name: "Minimalist Salicylic Acid 0.3% Face Wash", brand: "Minimalist", price: 299, budget: "low", skin_types: ["oily", "combination"], concerns: ["acne", "whiteheads", "open_pores"], benefit: "BHA exfoliant cleanser, unclogs pores with regular use", buy_url: "https://www.nykaa.com/search/result/?q=minimalist+salicylic+face+wash", platform: "Nykaa" },
    { name: "Sebamed Clear Face Foaming Cleanser", brand: "Sebamed", price: 580, budget: "mid", skin_types: ["oily", "combination", "sensitive"], concerns: ["acne", "sensitivity", "whiteheads"], benefit: "pH 5.5 medical-grade cleanser, dermat-recommended", buy_url: "https://www.nykaa.com/search/result/?q=sebamed+clear+face+foaming+cleanser", platform: "Nykaa" },
    { name: "Neutrogena Extra Gentle Cleanser", brand: "Neutrogena", price: 600, budget: "mid", skin_types: ["dry", "sensitive", "normal"], concerns: ["sensitivity", "dullness"], benefit: "Ultra-mild formula, safe for reactive and dry skin", buy_url: "https://www.nykaa.com/search/result/?q=neutrogena+extra+gentle+cleanser", platform: "Nykaa" },
  ],
  moisturizer: [
    { name: "Emolene Moisturizing Cream", brand: "Emolene", price: 274, budget: "low", skin_types: ["oily", "combination"], concerns: ["acne", "sensitivity", "open_pores"], benefit: "Lightweight pharmacy-grade ceramide moisturizer", buy_url: "https://www.1mg.com/search/all?name=emolene+cream", platform: "1mg" },
    { name: "Himalaya Nourishing Skin Cream", brand: "Himalaya", price: 220, budget: "low", skin_types: ["oily", "combination", "normal"], concerns: ["dullness", "sensitivity"], benefit: "Budget-friendly, widely available, good for beginners", buy_url: "https://www.nykaa.com/search/result/?q=himalaya+nourishing+skin+cream", platform: "Nykaa" },
    { name: "Cetaphil Moisturising Lotion", brand: "Cetaphil", price: 375, budget: "low", skin_types: ["dry", "sensitive", "normal"], concerns: ["sensitivity", "dullness"], benefit: "Classic dermat-recommended hydrator for dry and sensitive skin", buy_url: "https://www.nykaa.com/search/result/?q=cetaphil+moisturising+lotion", platform: "Nykaa" },
    { name: "Sebamed Clear Face Care Gel", brand: "Sebamed", price: 476, budget: "mid", skin_types: ["oily"], concerns: ["acne", "whiteheads", "open_pores"], benefit: "pH 5.5 gel moisturizer, fungal acne safe, oil control", buy_url: "https://www.1mg.com/search/all?name=sebamed+clear+face+gel", platform: "1mg" },
    { name: "Cetaphil DAM Daily Advanced Ultra Hydrating Lotion", brand: "Cetaphil", price: 400, budget: "mid", skin_types: ["dry", "combination", "sensitive"], concerns: ["sensitivity", "dullness"], benefit: "Deep hydration for dry-combo skin without heaviness", buy_url: "https://www.nykaa.com/search/result/?q=cetaphil+DAM+lotion", platform: "Nykaa" },
    { name: "Minimalist Multi-Peptide + HA Moisturizer", brand: "Minimalist", price: 599, budget: "mid", skin_types: ["oily", "combination", "normal"], concerns: ["dullness", "open_pores", "dark_spots"], benefit: "Lightweight gel cream with hyaluronic acid, great for glow", buy_url: "https://www.nykaa.com/search/result/?q=minimalist+moisturizer", platform: "Nykaa" },
    { name: "Dot & Key Watermelon Hyaluronic Cooling Moisturizer", brand: "Dot & Key", price: 595, budget: "mid", skin_types: ["oily", "combination"], concerns: ["dullness", "open_pores"], benefit: "Light gel texture, intense hydration, great Indian weather pick", buy_url: "https://www.nykaa.com/search/result/?q=dot+and+key+watermelon+moisturizer", platform: "Nykaa" },
    { name: "Plum E-Luminence Simply Supple Moisturizer", brand: "Plum", price: 695, budget: "mid", skin_types: ["dry", "normal", "combination"], concerns: ["dullness", "dark_spots"], benefit: "Vitamin E rich, brightening, good for dull and dry skin", buy_url: "https://www.nykaa.com/search/result/?q=plum+e-luminence+moisturizer", platform: "Nykaa" },
  ],
  serum: [
    { name: "Minimalist Niacinamide 10% + Zinc 1%", brand: "Minimalist", price: 599, budget: "mid", skin_types: ["oily", "combination"], concerns: ["acne", "open_pores", "dark_spots", "dullness"], benefit: "Controls oil, minimizes pores, fades dark spots — all in one", buy_url: "https://www.nykaa.com/search/result/?q=minimalist+niacinamide", platform: "Nykaa" },
    { name: "Minimalist Alpha Arbutin 2% + HA", brand: "Minimalist", price: 599, budget: "mid", skin_types: ["all"], concerns: ["dark_spots", "dullness"], benefit: "Fades PIH and hyperpigmentation, safe for Indian skin tones", buy_url: "https://www.nykaa.com/search/result/?q=minimalist+alpha+arbutin", platform: "Nykaa" },
    { name: "Minimalist Hyaluronic Acid 2% + PGA", brand: "Minimalist", price: 599, budget: "mid", skin_types: ["dry", "normal", "combination"], concerns: ["dullness", "sensitivity"], benefit: "Deep hydration booster, plumps skin, works under moisturizer", buy_url: "https://www.nykaa.com/search/result/?q=minimalist+hyaluronic+acid", platform: "Nykaa" },
    { name: "The Derma Co 10% Vitamin C Face Serum", brand: "The Derma Co", price: 799, budget: "mid", skin_types: ["all"], concerns: ["dark_spots", "dullness"], benefit: "Brightens skin tone, fades dark spots, antioxidant protection", buy_url: "https://www.nykaa.com/search/result/?q=the+derma+co+vitamin+c+serum", platform: "Nykaa" },
    { name: "Some By Mi AHA BHA PHA 30 Days Miracle Serum", brand: "Some By Mi", price: 1200, budget: "high", skin_types: ["oily", "combination"], concerns: ["acne", "dark_spots", "dullness", "whiteheads"], benefit: "Triple exfoliant serum, visible results in 30 days", buy_url: "https://www.nykaa.com/search/result/?q=some+by+mi+aha+bha+pha+serum", platform: "Nykaa" },
  ],
  sunscreen: [
    { name: "Ponds Sun Protect Non-Oily Sunscreen SPF 50", brand: "Ponds", price: 280, budget: "low", skin_types: ["oily", "combination"], concerns: ["acne", "dark_spots", "dullness"], benefit: "Lightweight, non-greasy SPF 50, great for daily wear", buy_url: "https://www.nykaa.com/search/result/?q=ponds+sun+protect+spf+50", platform: "Nykaa" },
    { name: "Episoft AC Moisturizer SPF 30", brand: "Episoft", price: 450, budget: "low", skin_types: ["oily", "combination", "sensitive"], concerns: ["acne", "sensitivity"], benefit: "Moisturizer + SPF combo, perfect for minimalist routines", buy_url: "https://www.1mg.com/search/all?name=episoft+AC+moisturizer", platform: "1mg" },
    { name: "Bello Photostable Emulgel SPF 40+ PA+++", brand: "Bello", price: 570, budget: "mid", skin_types: ["oily", "combination"], concerns: ["acne", "open_pores"], benefit: "Broad spectrum, matte finish, widely available at pharmacies", buy_url: "https://www.1mg.com/search/all?name=bello+photostable+emulgel", platform: "1mg" },
    { name: "Minimalist Sunscreen SPF 50 PA++++", brand: "Minimalist", price: 599, budget: "mid", skin_types: ["oily", "combination", "normal"], concerns: ["dark_spots", "dullness", "open_pores"], benefit: "Lightweight, no white cast on Indian skin tones", buy_url: "https://www.nykaa.com/search/result/?q=minimalist+sunscreen+spf+50", platform: "Nykaa" },
    { name: "Re'equil Ultra Matte Dry Touch Sunscreen SPF 50 PA++++", brand: "Re'equil", price: 695, budget: "mid", skin_types: ["oily", "combination"], concerns: ["acne", "open_pores", "dark_spots"], benefit: "Matte finish, no white cast, high PA rating for Indian sun", buy_url: "https://www.nykaa.com/search/result/?q=reequil+ultra+matte+sunscreen", platform: "Nykaa" },
    { name: "Dot & Key UV Invisible Sunscreen SPF 50 PA++++", brand: "Dot & Key", price: 895, budget: "mid", skin_types: ["all"], concerns: ["dullness", "dark_spots", "sensitivity"], benefit: "Invisible finish, no white cast, works under makeup", buy_url: "https://www.nykaa.com/search/result/?q=dot+and+key+uv+sunscreen", platform: "Nykaa" },
    { name: "Acne UV Gel SPF 50", brand: "Cipla", price: 700, budget: "mid", skin_types: ["oily", "combination"], concerns: ["acne", "whiteheads", "open_pores"], benefit: "Specifically formulated for acne-prone skin, no breakouts", buy_url: "https://www.1mg.com/search/all?name=acne+uv+gel+spf+50", platform: "1mg" },
  ],
};

const PRODUCT_METADATA = {
  "Himalaya Purifying Neem Face Wash": { ingredientTags: ["neem", "oil_control", "foaming"], activeIngredients: ["neem"], irritationRisk: 3, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate"], avoidFor: ["dry", "sensitive"], textureType: "gel cleanser", barrierFriendly: false, fungalAcneSafe: false, routineComplexity: 1 },
  "Cetaphil Gentle Skin Cleanser": { ingredientTags: ["non_stripping", "fragrance_free", "barrier_support"], activeIngredients: ["glycerin"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "cream cleanser", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Simple Refreshing Facial Wash": { ingredientTags: ["fragrance_free", "non_stripping", "light_foam"], activeIngredients: ["panthenol"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "gel cleanser", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Re'equil Oil Control Face Wash": { ingredientTags: ["low_ph", "oil_control", "foaming"], activeIngredients: ["zinc_pca"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["dry"], textureType: "gel cleanser", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Minimalist Salicylic Acid 0.3% Face Wash": { ingredientTags: ["bha", "exfoliating_cleanser", "oil_control"], activeIngredients: ["salicylic_acid"], irritationRisk: 3, beginnerSafe: false, experienceCompatibility: ["intermediate", "advanced"], avoidFor: ["dry", "sensitive"], textureType: "active cleanser", barrierFriendly: false, fungalAcneSafe: true, routineComplexity: 2 },
  "Sebamed Clear Face Foaming Cleanser": { ingredientTags: ["ph_5_5", "foaming", "acne_safe"], activeIngredients: ["panthenol"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["very_dry"], textureType: "foam cleanser", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Neutrogena Extra Gentle Cleanser": { ingredientTags: ["non_stripping", "barrier_support", "low_irritation"], activeIngredients: ["glycerin"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "lotion cleanser", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Emolene Moisturizing Cream": { ingredientTags: ["humectant", "lightweight", "pharmacy"], activeIngredients: ["propylene_glycol"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "light cream", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Himalaya Nourishing Skin Cream": { ingredientTags: ["basic_moisturizer", "budget", "occlusive"], activeIngredients: ["aloe"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner"], avoidFor: ["very_oily", "fungal_acne"], textureType: "cream", barrierFriendly: true, fungalAcneSafe: false, routineComplexity: 1 },
  "Cetaphil Moisturising Lotion": { ingredientTags: ["barrier_support", "fragrance_free", "classic"], activeIngredients: ["glycerin", "niacinamide"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "lotion", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Sebamed Clear Face Care Gel": { ingredientTags: ["gel", "oil_free", "fungal_acne_safe"], activeIngredients: ["hyaluronic_acid", "panthenol"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["dry"], textureType: "gel", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Cetaphil DAM Daily Advanced Ultra Hydrating Lotion": { ingredientTags: ["barrier_repair", "deep_hydration", "fragrance_free"], activeIngredients: ["glycerin", "shea_butter"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["very_oily"], textureType: "rich lotion", barrierFriendly: true, fungalAcneSafe: false, routineComplexity: 1 },
  "Minimalist Multi-Peptide + HA Moisturizer": { ingredientTags: ["peptides", "hyaluronic_acid", "gel_cream"], activeIngredients: ["peptides", "hyaluronic_acid"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "gel cream", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Dot & Key Watermelon Hyaluronic Cooling Moisturizer": { ingredientTags: ["hyaluronic_acid", "gel", "fragrance"], activeIngredients: ["hyaluronic_acid"], irritationRisk: 3, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate"], avoidFor: ["sensitive"], textureType: "cooling gel", barrierFriendly: false, fungalAcneSafe: false, routineComplexity: 1 },
  "Plum E-Luminence Simply Supple Moisturizer": { ingredientTags: ["vitamin_e", "nourishing", "cream"], activeIngredients: ["vitamin_e"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate"], avoidFor: ["oily", "fungal_acne"], textureType: "cream", barrierFriendly: true, fungalAcneSafe: false, routineComplexity: 1 },
  "Minimalist Niacinamide 10% + Zinc 1%": { ingredientTags: ["niacinamide", "zinc", "oil_control"], activeIngredients: ["niacinamide", "zinc"], irritationRisk: 2, beginnerSafe: false, experienceCompatibility: ["intermediate", "advanced"], avoidFor: ["very_sensitive"], textureType: "water serum", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 2 },
  "Minimalist Alpha Arbutin 2% + HA": { ingredientTags: ["alpha_arbutin", "hyaluronic_acid", "pigmentation"], activeIngredients: ["alpha_arbutin", "hyaluronic_acid"], irritationRisk: 1, beginnerSafe: false, experienceCompatibility: ["intermediate", "advanced"], avoidFor: [], textureType: "water serum", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 2 },
  "Minimalist Hyaluronic Acid 2% + PGA": { ingredientTags: ["hyaluronic_acid", "hydration", "barrier_support"], activeIngredients: ["hyaluronic_acid", "pga"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "hydrating serum", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "The Derma Co 10% Vitamin C Face Serum": { ingredientTags: ["vitamin_c", "antioxidant", "brightening"], activeIngredients: ["vitamin_c"], irritationRisk: 3, beginnerSafe: false, experienceCompatibility: ["intermediate", "advanced"], avoidFor: ["sensitive"], textureType: "active serum", barrierFriendly: false, fungalAcneSafe: true, routineComplexity: 2 },
  "Some By Mi AHA BHA PHA 30 Days Miracle Serum": { ingredientTags: ["aha", "bha", "pha", "strong_exfoliant"], activeIngredients: ["aha", "bha", "pha"], irritationRisk: 5, beginnerSafe: false, experienceCompatibility: ["advanced"], avoidFor: ["dry", "sensitive", "barrier_damage"], textureType: "exfoliating serum", barrierFriendly: false, fungalAcneSafe: false, routineComplexity: 3 },
  "Ponds Sun Protect Non-Oily Sunscreen SPF 50": { ingredientTags: ["spf_50", "lightweight", "budget"], activeIngredients: ["uv_filters"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["sensitive"], textureType: "lotion sunscreen", barrierFriendly: true, fungalAcneSafe: false, routineComplexity: 1 },
  "Episoft AC Moisturizer SPF 30": { ingredientTags: ["spf_30", "moisturizing_spf", "minimal_routine"], activeIngredients: ["uv_filters", "glycerin"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "moisturizer sunscreen", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Bello Photostable Emulgel SPF 40+ PA+++": { ingredientTags: ["broad_spectrum", "matte", "pharmacy"], activeIngredients: ["uv_filters"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["dry"], textureType: "emulgel sunscreen", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Minimalist Sunscreen SPF 50 PA++++": { ingredientTags: ["spf_50", "pa++++", "no_white_cast"], activeIngredients: ["uv_filters"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: [], textureType: "fluid sunscreen", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Re'equil Ultra Matte Dry Touch Sunscreen SPF 50 PA++++": { ingredientTags: ["spf_50", "matte", "silicone_base"], activeIngredients: ["uv_filters"], irritationRisk: 2, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["dry"], textureType: "matte sunscreen", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
  "Dot & Key UV Invisible Sunscreen SPF 50 PA++++": { ingredientTags: ["spf_50", "invisible_finish", "fragrance"], activeIngredients: ["uv_filters"], irritationRisk: 3, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["sensitive"], textureType: "gel sunscreen", barrierFriendly: false, fungalAcneSafe: false, routineComplexity: 1 },
  "Acne UV Gel SPF 50": { ingredientTags: ["spf_50", "acne_safe", "gel"], activeIngredients: ["uv_filters"], irritationRisk: 1, beginnerSafe: true, experienceCompatibility: ["beginner", "intermediate", "advanced"], avoidFor: ["dry"], textureType: "gel sunscreen", barrierFriendly: true, fungalAcneSafe: true, routineComplexity: 1 },
};

const EXPERIENCE_BY_ROUTINE = { none: "beginner", basic: "beginner", moderate: "intermediate", full: "advanced" };
const CONCERN_PRIORITY = { sensitivity: 100, acne: 80, whiteheads: 75, dark_spots: 55, open_pores: 45, dullness: 35 };
const ACTIVE_CONFLICTS = [
  ["retinoid", "aha"],
  ["retinoid", "bha"],
  ["retinoid", "strong_exfoliant"],
  ["vitamin_c", "aha"],
  ["vitamin_c", "bha"],
  ["aha", "bha"],
];

const getBudgetTier = (b) => b === "under_500" ? ["low"] : b === "500_1500" ? ["low", "mid"] : ["low", "mid", "high"];
const normalizeSkin = (s) => s === "no_idea" || !s ? "combination" : s;
const unique = (items) => [...new Set(items.filter(Boolean))];

const buildProductCatalog = () => Object.fromEntries(
  Object.entries(PRODUCTS).map(([category, items]) => [
    category,
    items.map((product) => {
      const metadata = PRODUCT_METADATA[product.name] || {};
      return {
        ...product,
        category,
        ingredientTags: metadata.ingredientTags || [],
        activeIngredients: metadata.activeIngredients || [],
        irritationRisk: metadata.irritationRisk || 2,
        beginnerSafe: metadata.beginnerSafe !== false,
        experienceCompatibility: metadata.experienceCompatibility || ["beginner", "intermediate", "advanced"],
        avoidFor: metadata.avoidFor || [],
        textureType: metadata.textureType || category,
        barrierFriendly: Boolean(metadata.barrierFriendly),
        fungalAcneSafe: metadata.fungalAcneSafe !== false,
        routineComplexity: metadata.routineComplexity || 1,
        skinCompatibility: unique([...(product.skin_types || []), ...(metadata.skinCompatibility || [])]),
        concerns: unique([...(product.concerns || []), ...(metadata.concerns || [])]),
      };
    }),
  ])
);

const CATALOG = buildProductCatalog();

const buildUserProfile = ({ skinType, concerns = [], routine, budget }) => {
  const skin = normalizeSkin(skinType);
  const selectedConcerns = unique(concerns);
  const experienceLevel = EXPERIENCE_BY_ROUTINE[routine] || "beginner";
  const barrierSensitivity = selectedConcerns.includes("sensitivity") ? "high" : skin === "dry" ? "moderate" : "low";
  const routineComplexityTolerance = experienceLevel === "advanced" ? 3 : experienceLevel === "intermediate" ? 2 : 1;

  return {
    skinType: skin,
    experienceLevel,
    concerns: selectedConcerns,
    budgetTier: budget,
    budgetTiers: getBudgetTier(budget),
    barrierSensitivity,
    routineComplexityTolerance,
    isBeginner: experienceLevel === "beginner",
    isSensitive: barrierSensitivity === "high",
    fungalAcneFocused: selectedConcerns.includes("fungal_acne"),
    prioritizedConcerns: [...selectedConcerns].sort((a, b) => (CONCERN_PRIORITY[b] || 10) - (CONCERN_PRIORITY[a] || 10)),
  };
};

const buildRestrictions = (profile) => {
  const disallowedActives = [];
  const disallowedTags = [];
  const avoidFlags = [];
  let maxIrritationRisk = profile.isBeginner ? 2 : profile.experienceLevel === "intermediate" ? 3 : 5;
  let maxTreatmentCount = profile.isBeginner ? 0 : profile.experienceLevel === "intermediate" ? 1 : 2;

  if (profile.isSensitive) {
    maxIrritationRisk = Math.min(maxIrritationRisk, 2);
    maxTreatmentCount = Math.min(maxTreatmentCount, 1);
    disallowedActives.push("aha", "bha", "pha", "salicylic_acid", "vitamin_c", "retinoid");
    disallowedTags.push("strong_exfoliant", "exfoliating_cleanser", "fragrance");
    avoidFlags.push("sensitive", "very_sensitive", "barrier_damage");
  }

  if (profile.isBeginner) {
    disallowedActives.push("aha", "bha", "pha", "retinoid");
    disallowedTags.push("strong_exfoliant");
  }

  if (profile.skinType === "dry") {
    avoidFlags.push("dry", "very_dry");
    disallowedTags.push("oil_control");
  }

  if (profile.skinType === "oily") {
    avoidFlags.push("very_oily");
  }

  if (profile.fungalAcneFocused) {
    avoidFlags.push("fungal_acne");
  }

  const allowGentleBeginnerTreatment = profile.isBeginner && !profile.isSensitive && profile.prioritizedConcerns.some((c) => ["dark_spots", "dullness"].includes(c));

  return {
    maxIrritationRisk,
    maxTreatmentCount: allowGentleBeginnerTreatment ? 1 : maxTreatmentCount,
    disallowedActives: unique(disallowedActives),
    disallowedTags: unique(disallowedTags),
    avoidFlags: unique(avoidFlags),
    requireFungalAcneSafe: profile.fungalAcneFocused,
    allowGentleBeginnerTreatment,
  };
};

const isCompatible = (product, profile, restrictions, slot) => {
  if (!profile.budgetTiers.includes(product.budget)) return false;
  if (restrictions.requireFungalAcneSafe && !product.fungalAcneSafe) return false;
  if (product.irritationRisk > restrictions.maxIrritationRisk) return false;
  if (!product.experienceCompatibility.includes(profile.experienceLevel)) return false;
  if (product.routineComplexity > profile.routineComplexityTolerance) return false;
  if (product.avoidFor.some((flag) => restrictions.avoidFlags.includes(flag) || flag === profile.skinType)) return false;
  if (product.activeIngredients.some((active) => restrictions.disallowedActives.includes(active))) return false;
  if (product.ingredientTags.some((tag) => restrictions.disallowedTags.includes(tag))) return false;
  if (profile.isBeginner && slot === "serum" && !restrictions.allowGentleBeginnerTreatment) return false;
  if (profile.isBeginner && slot === "serum" && !product.beginnerSafe) return false;
  return true;
};

const getRoutineSkeleton = (profile, restrictions) => {
  const skeleton = ["cleanser", "moisturizer", "sunscreen"];
  const needsTreatment = !profile.isBeginner && profile.prioritizedConcerns.some((c) => ["acne", "whiteheads", "dark_spots", "open_pores", "dullness"].includes(c));

  if (needsTreatment || restrictions.allowGentleBeginnerTreatment) {
    skeleton.splice(2, 0, "serum");
  }

  return skeleton;
};

const scoreProduct = (product, profile, selectedProducts) => {
  let score = 0;
  const skinMatch = product.skinCompatibility.includes(profile.skinType) || product.skinCompatibility.includes("all");

  if (skinMatch) score += 28;
  if (product.budget === profile.budgetTiers[profile.budgetTiers.length - 1]) score += 5;
  if (product.barrierFriendly) score += profile.barrierSensitivity === "high" ? 22 : 10;
  if (product.beginnerSafe && profile.isBeginner) score += 16;
  if (product.irritationRisk <= 1) score += profile.isSensitive ? 16 : 6;
  if (profile.skinType === "oily" && ["gel", "gel cream", "water serum", "fluid sunscreen", "matte sunscreen", "gel sunscreen"].includes(product.textureType)) score += 10;
  if (profile.skinType === "dry" && ["cream cleanser", "lotion cleanser", "lotion", "rich lotion", "cream"].includes(product.textureType)) score += 10;

  profile.prioritizedConcerns.forEach((concern, index) => {
    if (product.concerns.includes(concern)) score += Math.max(12, (CONCERN_PRIORITY[concern] || 20) / (index + 2));
  });

  if (selectedProducts.some((selected) => selected.brand === product.brand)) score -= 14;
  if (product.ingredientTags.includes("strong_exfoliant")) score -= profile.isSensitive ? 80 : 15;
  if (product.category === "sunscreen") score += 18;
  if (product.category === "moisturizer" && profile.barrierSensitivity !== "low") score += 18;

  return score;
};

const hasActiveConflict = (candidate, selectedProducts) => {
  const selectedActives = selectedProducts.flatMap((product) => [...product.activeIngredients, ...product.ingredientTags]);
  const candidateActives = [...candidate.activeIngredients, ...candidate.ingredientTags];

  return ACTIVE_CONFLICTS.some(([a, b]) => (
    (candidateActives.includes(a) && selectedActives.includes(b)) ||
    (candidateActives.includes(b) && selectedActives.includes(a))
  ));
};

const selectForSlot = (slot, profile, restrictions, selectedProducts) => {
  const compatible = (CATALOG[slot] || [])
    .filter((product) => isCompatible(product, profile, restrictions, slot))
    .filter((product) => !hasActiveConflict(product, selectedProducts))
    .map((product) => ({ product, score: scoreProduct(product, profile, selectedProducts) }))
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);

  return compatible.slice(0, profile.isBeginner ? 1 : 2);
};

const validateRoutine = (routine, profile, restrictions) => {
  const selected = Object.values(routine).flat();
  const activeLoad = selected.filter((product) => product.category === "serum" || product.routineComplexity > 1).length;
  const hasConflict = selected.some((product, index) => hasActiveConflict(product, selected.slice(0, index)));

  if (activeLoad > restrictions.maxTreatmentCount || hasConflict) {
    const saferRoutine = { ...routine };
    delete saferRoutine.serum;
    return saferRoutine;
  }

  if (profile.isBeginner) {
    return Object.fromEntries(Object.entries(routine).filter(([category]) => ["cleanser", "moisturizer", "sunscreen"].includes(category)));
  }

  return routine;
};

const getSafetyReason = (product, profile) => {
  if (profile.isSensitive && product.barrierFriendly) return "It keeps irritation risk low and supports a calmer skin barrier.";
  if (profile.isBeginner) return "It fits a starter routine without pushing strong actives too early.";
  if (product.category === "sunscreen") return "Daily SPF protects against tanning, PIH, and irritation from treatment routines.";
  if (product.barrierFriendly) return "It helps keep the routine supportive instead of overly active.";
  return "It stays compatible with the rest of the routine.";
};

const getTargetReason = (product, profile) => {
  const matchedConcern = profile.prioritizedConcerns.find((concern) => product.concerns.includes(concern));
  if (matchedConcern === "acne") return "acne and excess-oil control";
  if (matchedConcern === "whiteheads") return "clogged pores and whiteheads";
  if (matchedConcern === "dark_spots") return "dark spots and post-acne marks";
  if (matchedConcern === "open_pores") return "visible pores and oil balance";
  if (matchedConcern === "dullness") return "dullness and hydration";
  if (matchedConcern === "sensitivity") return "sensitivity and barrier comfort";
  return "daily barrier maintenance";
};

const addRecommendationReasoning = (product, profile) => {
  const skinPhrase = profile.skinType === "combination" ? "combination skin" : `${profile.skinType} skin`;
  return {
    ...product,
    benefit: `Recommended for ${skinPhrase}: targets ${getTargetReason(product, profile)}. ${getSafetyReason(product, profile)} Patch test and introduce slowly.`,
  };
};

const getRecommendations = (answers) => {
  const profile = buildUserProfile(answers);
  const restrictions = buildRestrictions(profile);
  const selectedProducts = [];
  const routine = {};

  getRoutineSkeleton(profile, restrictions).forEach((slot) => {
    const products = selectForSlot(slot, profile, restrictions, selectedProducts);
    if (products.length) {
      routine[slot] = products;
      selectedProducts.push(...products);
    }
  });

  const safeRoutine = validateRoutine(routine, profile, restrictions);

  return Object.fromEntries(
    Object.entries(safeRoutine).map(([category, products]) => [
      category,
      products.map((product) => addRecommendationReasoning(product, profile)),
    ])
  );
};

const loadingLines = ["reading your skin profile", "matching concern patterns", "building your routine", "almost there"];

export default function App() {
  const [screen, setScreen] = useState(1);
  const [questionStep, setQuestionStep] = useState(1);
  const [visible, setVisible] = useState(true);
  const [toast, setToast] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({ skinType: "", concerns: [], routine: "", budget: "" });

  const recommendations = useMemo(() => getRecommendations(answers), [answers]);

  const transitionTo = (next) => {
    setVisible(false);
    setTimeout(() => {
      setScreen(next);
      setVisible(true);
    }, 200);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  useEffect(() => {
    if (screen !== 3) return;
    const line = setInterval(() => setLoadingIndex((i) => (i + 1) % loadingLines.length), 900);
    const move = setTimeout(() => transitionTo(4), 2800);
    return () => {
      clearInterval(line);
      clearTimeout(move);
    };
  }, [screen]);

  const goBack = () => {
    if (screen === 2 && questionStep > 1) setQuestionStep((s) => s - 1);
    if (screen === 2 && questionStep === 1) transitionTo(1);
    if (screen > 2) transitionTo(screen - 1);
  };

  const goQuiz = () => {
    setQuestionStep(1);
    transitionTo(2);
  };

  const chooseSingle = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (questionStep < 4) setQuestionStep((s) => s + 1);
      else transitionTo(3);
    }, 220);
  };

  const toggleConcern = (value) => {
    setAnswers((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(value) ? prev.concerns.filter((c) => c !== value) : [...prev.concerns, value],
    }));
  };

  const optionClass = "w-full py-4 px-5 rounded-xl border text-left font-normal text-[#f0e6d3]";

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="bg-[#1a1a1a] min-h-screen text-[#f0e6d3]">
      <div className="max-w-[420px] mx-auto min-h-screen px-6 py-12 relative">
        <div className={`transition-opacity duration-400 ${visible ? "opacity-100" : "opacity-0"}`}>
          {screen === 1 && (
            <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-between">
              <div className="pt-20">
                <p className="text-xs uppercase tracking-[0.15em] text-[#6b5f52]">skincare, finally honest.</p>
                <h1 className="text-6xl font-light tracking-tight mt-3">dermly</h1>
                <p className="text-sm text-[#6b5f52] mt-2">your routine, built for your skin.</p>
              </div>
              <div className="pb-12">
                <button onClick={() => showToast("coming soon 👀 face scan launching soon")} className="w-full py-4 border border-[#c9a96e] text-[#c9a96e] bg-transparent rounded-full font-medium lowercase">scan my face</button>
                <button onClick={goQuiz} className="w-full mt-3 bg-[#c9a96e] text-[#1a1a1a] rounded-full py-4 font-medium lowercase">take the quiz →</button>
              </div>
            </div>
          )}

          {screen === 2 && (
            <div>
              <button onClick={goBack} className={`text-2xl ${questionStep === 1 ? "text-[#3a3028]" : "text-[#6b5f52]"}`} disabled={false}>‹</button>
              <div className="w-full bg-[#2a2520] h-[1px] mt-4"><div className="bg-[#c9a96e] h-[1px]" style={{ width: `${questionStep * 25}%` }} /></div>
              <p className="text-xs text-[#6b5f52] mt-4">step {questionStep} of 4</p>

              {questionStep === 1 && <div className="mt-12"><h2 className="font-light text-3xl tracking-tight">what&apos;s your skin type?</h2><div className="mt-6 space-y-4">{[["oily", "oily"], ["dry", "dry"], ["combination", "combination"], ["normal", "normal"], ["i have no idea", "no_idea"]].map(([label, value]) => <button key={value} onClick={() => chooseSingle("skinType", value)} className={`${optionClass} ${answers.skinType === value ? "border-[#c9a96e] bg-[#1f1c19]" : "border-[#2a2520] bg-transparent"}`}>{label}</button>)}</div></div>}

              {questionStep === 2 && <div className="mt-12"><h2 className="font-light text-3xl tracking-tight">what&apos;s bothering your skin?</h2><div className="mt-6 flex flex-wrap gap-3">{[["acne", "acne"], ["dark spots", "dark_spots"], ["open pores", "open_pores"], ["dullness", "dullness"], ["whiteheads", "whiteheads"], ["sensitivity", "sensitivity"]].map(([label, value]) => <button key={value} onClick={() => toggleConcern(value)} className={`rounded-full py-2 px-4 border ${answers.concerns.includes(value) ? "border-[#c9a96e] text-[#f0e6d3] bg-[#1f1c19]" : "border-[#2a2520] text-[#6b5f52] bg-transparent"}`}>{label}</button>)}</div><button onClick={() => answers.concerns.length && setQuestionStep(3)} className={`w-full py-4 mt-6 border border-[#c9a96e] text-[#c9a96e] bg-transparent rounded-full font-medium lowercase ${answers.concerns.length ? "opacity-100" : "opacity-30"}`}>continue →</button></div>}

              {questionStep === 3 && <div className="mt-12"><h2 className="font-light text-3xl tracking-tight">what&apos;s your current routine like?</h2><div className="mt-6 space-y-4">{[["i use nothing", "none"], ["just face wash", "basic"], ["a few products", "moderate"], ["a full routine", "full"]].map(([label, value]) => <button key={value} onClick={() => chooseSingle("routine", value)} className={`${optionClass} ${answers.routine === value ? "border-[#c9a96e] bg-[#1f1c19]" : "border-[#2a2520] bg-transparent"}`}>{label}</button>)}</div></div>}

              {questionStep === 4 && <div className="mt-12"><h2 className="font-light text-3xl tracking-tight">what&apos;s your monthly budget?</h2><div className="mt-6 space-y-4">{[["under ₹500", "under_500"], ["₹500 – ₹1500", "500_1500"], ["₹1500+", "1500_plus"]].map(([label, value]) => <button key={value} onClick={() => chooseSingle("budget", value)} className={`${optionClass} ${answers.budget === value ? "border-[#c9a96e] bg-[#1f1c19]" : "border-[#2a2520] bg-transparent"}`}>{label}</button>)}</div></div>}
            </div>
          )}

          {screen === 3 && <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center"><div className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" /><div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse [animation-delay:200ms]" /><div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse [animation-delay:400ms]" /></div><p className="text-[#6b5f52] text-sm mt-6">{loadingLines[loadingIndex]}</p></div>}

          {screen === 4 && <div><p className="font-medium text-xs uppercase tracking-[0.15em] text-[#6b5f52]">your results</p><h2 className="font-light text-3xl tracking-tight mt-6">here&apos;s what we found.</h2><div className="mt-12 space-y-6">{answers.concerns.map((c, i) => <div key={c}><div className="flex items-center gap-2"><span>{CONCERN_INFO[c].emoji}</span><p className="font-medium text-[#f0e6d3]">{CONCERN_INFO[c].title}</p></div><p className="text-sm text-[#6b5f52] mt-1">{CONCERN_INFO[c].explanation}</p>{i < answers.concerns.length - 1 && <div className="border-b border-[#2a2520] mt-6" />}</div>)}</div><button onClick={() => transitionTo(5)} className="w-full mt-12 bg-[#c9a96e] text-[#1a1a1a] rounded-full py-4 font-medium lowercase">see my routine →</button></div>}

          {screen === 5 && <div><p className="font-medium text-xs uppercase tracking-[0.15em] text-[#6b5f52]">your routine</p><h2 className="font-light text-3xl tracking-tight mt-6">built for your skin.</h2><p className="text-xs text-[#6b5f52] mt-1">vetted by the indian skincare community.</p>{Object.entries(recommendations).map(([cat, items]) => <div key={cat} className="mt-10"><p className="text-xs uppercase tracking-[0.15em] text-[#6b5f52]">{cat}</p><div className="border-b border-[#2a2520] mt-2" />{items.map((p) => <div key={p.name} className="border-l border-[#c9a96e] pl-4 mt-4"><p className="font-medium text-[#f0e6d3]">{p.name}</p><p className="text-xs text-[#6b5f52]">{p.brand}</p><p className="text-xs text-[#6b5f52] mt-1">{p.benefit}</p><div className="mt-2 flex items-center justify-between gap-3"><p className="text-sm text-[#f0e6d3]">₹{p.price}</p><a href={p.buy_url} target="_blank" rel="noreferrer" className="text-xs text-[#c9a96e] underline underline-offset-2">buy on {p.platform} →</a></div></div>)}</div>)}<button onClick={() => transitionTo(6)} className="w-full mt-12 bg-[#c9a96e] text-[#1a1a1a] rounded-full py-4 font-medium lowercase">save my routine →</button></div>}

          {screen === 6 && <div><p className="font-medium text-xs uppercase tracking-[0.15em] text-[#6b5f52]">you&apos;re done</p><h2 className="font-light text-3xl tracking-tight mt-6">save your routine.</h2><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" className="w-full bg-transparent border-b border-[#2a2520] mt-8 pb-3 outline-none text-[#f0e6d3] placeholder:text-[#6b5f52]" /><button onClick={() => showToast("routine saved ✅") } className="w-full mt-4 bg-[#c9a96e] text-[#1a1a1a] rounded-full py-4 font-medium lowercase">save my routine</button><div className="my-6 flex items-center gap-4"><div className="h-[1px] bg-[#2a2520] flex-1" /><p className="text-xs text-[#6b5f52]">or</p><div className="h-[1px] bg-[#2a2520] flex-1" /></div><button onClick={async () => { await navigator.clipboard.writeText("https://dermly.app/share"); showToast("link copied 🎉"); }} className="w-full py-4 border border-[#c9a96e] text-[#c9a96e] bg-transparent rounded-full font-medium lowercase">share with a friend →</button><p className="text-xs text-[#6b5f52] mt-8 text-center">no spam. just your skin, sorted.</p><p className="text-[10px] text-[#3a3028] mt-4 text-center">dermly is not a medical service. consult a dermatologist for serious skin concerns.</p></div>}
        </div>
      </div>
      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1f1c19] border border-[#2a2520] text-[#f0e6d3] px-5 py-3 rounded-full text-sm backdrop-blur-sm transition-opacity duration-400">{toast}</div>}
    </div>
  );
}
