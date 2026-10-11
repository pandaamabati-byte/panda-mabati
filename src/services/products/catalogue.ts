import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/client";
import {
  FALLBACK_PRODUCTS,
  normalizeProduct,
  type Product,
} from "../../features/products/productModel";

export type CatalogueSource = "firestore" | "fallback";

export type CatalogueResult = {
  products: Product[];
  source: CatalogueSource;
  notice?: string;
};

function fallback(notice: string): CatalogueResult {
  return {
    products: FALLBACK_PRODUCTS,
    source: "fallback",
    notice,
  };
}

export async function loadProducts(): Promise<CatalogueResult> {
  if (!db) {
    return fallback(
      "Firebase is not configured. Showing the local product catalogue.",
    );
  }

  try {
    const publishedProducts = query(
      collection(db, "products"),
      where("published", "==", true),
    );
    const snapshot = await getDocs(publishedProducts);

    const products = snapshot.docs
      .map((document) =>
        normalizeProduct(document.id, document.data()),
      )
      .filter((product): product is Product => product !== null);

    if (products.length === 0) {
      return fallback(
        "No valid published products are available yet. Showing the local catalogue.",
      );
    }

    return {
      products,
      source: "firestore",
    };
  } catch {
    return fallback(
      "The live catalogue is currently unavailable. Showing the local catalogue.",
    );
  }
}
