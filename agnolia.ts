// Default version (all methods)
import algoliasearch from "algoliasearch";

// Search-only version
// import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch("9HPWH7L3DV", "22c1df07ad58656478a1771519881920");
const index = client.initIndex("shopify_products");

export { client, index };
