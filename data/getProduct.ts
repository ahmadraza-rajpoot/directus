import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Product } from "@/lib/types";

export async function getProductData() {
  return await directus.request(
    readItems("products")
  ) as Product[];
}