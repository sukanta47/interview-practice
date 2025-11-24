import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { type Product, useProductFetch } from "./useProductFetch";

const ProductDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const _id = searchParams.get("prodId");
  console.log("query params=", { query, _id });
  const products = useProductFetch();
  console.log("Outside", { products });

  useEffect(() => {
    setSelectedProduct(products?.find((p) => p.id === Number(id)));
  }, [products, id]);

  if (!selectedProduct)
    return (
      <div className="flex flex-col items-center justify-center m-auto">
        loading...
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full p-10 items-center justifycenter">
      <h2 className="text-2xl font-bold">Product Details Page</h2>
      {selectedProduct ? (
        <div className="flex flex-col">
          <div className="mb-4">
            <label className="text-lg font-semibold">Title:</label>{" "}
            {selectedProduct.title}
          </div>
          <div className="mb-4">
            <label className="text-lg font-semibold">Description:</label>{" "}
            {selectedProduct.description}
          </div>
        </div>
      ) : (
        "No Product Found"
      )}
    </div>
  );
};
export default ProductDetails;
