import { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/queries";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const {
    data: productsData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProducts();
  const { data: productData } = useProduct(selectedProductId);

  return (
    <>
      {productsData?.pages.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.map((product) => {
              return (
                <div key={product.id}>
                  <button
                    style={{ backgroundColor: "ButtonShadow", margin: "1rem" }}
                    onClick={() => setSelectedProductId(product.id)}>
                    {product.name}
                  </button>
                </div>
              );
            })}
          </Fragment>
        );
      })}
      <br />
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more"
            : hasNextPage
            ? "Load more"
            : "No more products"}
        </button>
      </div>
      <div>Selected product:</div>
      {JSON.stringify(productData)}
    </>
  );
};

export default Products;
