import { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Pagination, Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const { t } = useTranslation();

  const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header
          shouldShowBackButton={false}
          title={t("title")}
          actionBlock={
            <Input
              placeholder={t("searchProducts")}
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={event => {
                setSearchKey(event.target.value);
                setCurrentPage(DEFAULT_PAGE_INDEX);
              }}
            />
          }
        />
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title={t("noData")} />
        ) : (
          <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 pb-20 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductListItem key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
      <div className="absolute sticky bottom-auto left-0 right-0 flex items-center justify-center p-4">
        <Pagination
          className="neeto-ui-border-blue neeto-ui-rounded-lg neeto-ui-border-gray-300 neeto-ui-bg-white neeto-ui-shadow-md"
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default withTitle(ProductList);
