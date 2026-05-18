// Client-safe Shopify Storefront API helpers.
// Uses NEXT_PUBLIC_ env vars so they are available in the browser bundle.
// The Storefront Access Token is intentionally public — Shopify designed it
// to be used client-side for headless storefronts.

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_URL = DOMAIN
  ? `https://${DOMAIN}/api/2024-01/graphql.json`
  : null;

async function clientFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!API_URL || !TOKEN) {
    throw new Error("Shopify client credentials not configured (NEXT_PUBLIC_)");
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0]?.message ?? "Shopify GraphQL error");
  return data;
}

// ─── Cart helpers ─────────────────────────────────────────────────────────────

export interface ShopifyCartSummary {
  id: string;
  checkoutUrl: string;
}

const CART_FIELDS = `
  id
  checkoutUrl
`;

export async function createShopifyCart(
  variantId: string,
  quantity = 1
): Promise<ShopifyCartSummary> {
  const data = await clientFetch<{ cartCreate: { cart: ShopifyCartSummary } }>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
       cartCreate(input: { lines: $lines }) {
         cart { ${CART_FIELDS} }
       }
     }`,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );
  return data.cartCreate.cart;
}

export async function addLineToShopifyCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<ShopifyCartSummary> {
  const data = await clientFetch<{ cartLinesAdd: { cart: ShopifyCartSummary } }>(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
       cartLinesAdd(cartId: $cartId, lines: $lines) {
         cart { ${CART_FIELDS} }
       }
     }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  );
  return data.cartLinesAdd.cart;
}
