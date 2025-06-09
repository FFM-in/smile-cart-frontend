import React, { useEffect, useState } from "react";

import productsApi from "apis/products";
import PageNotFound from "components/commons/PageNotFound";
import { Spinner, Button } from "neetoui";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import { Header, AddToCart } from "src/components/commons";
import useSelectedQuantity from "src/components/hooks/useSelectedQuantity";
import routes from "src/routes";

import Carousel from "./Carousel";

// import { IMAGE_URLS } from "src/components/constants";

export const Product = () => {
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
      console.log(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isError) return <PageNotFound />;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-23/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrl) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offerPrice}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
