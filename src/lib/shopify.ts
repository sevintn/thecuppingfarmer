export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }>;
  };
  tags: string[];
  metafields?: Array<{
    key: string;
    value: string;
  }>;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string; handle: string };
          price: { amount: string; currencyCode: string };
        };
      };
    }>;
  };
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
}

// ─── Shopify Storefront API Client ───────────────────────────────────────────
// Fill in your credentials in .env.local:
//   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const SHOPIFY_API_URL = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
  : null;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!SHOPIFY_API_URL || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error(
      "Shopify credentials not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local"
    );
  }

  const response = await fetch(SHOPIFY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0]?.message ?? "Shopify GraphQL error");
  return data;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  tags
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 5) {
    edges { node { url altText } }
  }
  variants(first: 10) {
    edges {
      node {
        id title availableForSale
        price { amount currencyCode }
      }
    }
  }
`;

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(`
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  `, { first });

  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    product: ShopifyProduct | null;
  }>(`
    query GetProduct($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }
  `, { handle });

  return data.product;
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(`
    mutation CartCreate {
      cartCreate {
        cart {
          id checkoutUrl
          lines(first: 20) {
            edges {
              node {
                id quantity
                merchandise {
                  ... on ProductVariant {
                    id title
                    price { amount currencyCode }
                    product { title handle }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  `);
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id checkoutUrl
          lines(first: 20) {
            edges {
              node {
                id quantity
                merchandise {
                  ... on ProductVariant {
                    id title
                    price { amount currencyCode }
                    product { title handle }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity }] });
  return data.cartLinesAdd.cart;
}
