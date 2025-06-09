import React, { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Spinner } from "neetoui";
import { append, isNotNil } from "ramda";
import Carousel from "src/components/Carousel";
// import { IMAGE_URLS } from "src/components/constants";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show();
      setProduct(response.data);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { name, description, mrp, offer_price, image_urls, image_url } =
    product;
  const totalDiscounts = mrp - offer_price;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        <p className="py-2 text-4xl font-semibold">{name}</p>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="mt-16 flex gap-4">
          <div className="w-12/5">
            <div className="flex justify-center gap-16">
              {isNotNil(image_urls) ? (
                <Carousel
                  imageUrls={append(image_url, image_urls)}
                  title={name}
                />
              ) : (
                <img alt={name} className="w-48" src={image_url} />
              )}
            </div>
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offer_price}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
