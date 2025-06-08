import Carousel from "src/components/Carousel";
import { IMAGE_URLS } from "src/components/constants";

const Product = () => (
  <div className="px-6 pb-6">
    <div>
      <p className="py-2 text-4xl font-semibold">Infinix INBOOK</p>
      <hr className="border-2 border-black" />
    </div>
    <div className="mt-6 flex gap-4">
      <div className="w-2/5">
        {/* <img
                    alt="Product"
                    src="https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg"
                    className="w-10/12 h-64"
                /> */}
        <Carousel imageUrls={IMAGE_URLS} title="Infinix Inbook" />
      </div>
      <div className="w-3/5 space-y-4">
        <p>
          Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year Warranty.
        </p>
        <p>MRP: $395.97</p>
        <p className="font-semibold">Offer price: $374.43</p>
        <p className="font-semibold text-green-600">6% off</p>
      </div>
    </div>
  </div>
);

export default Product;
