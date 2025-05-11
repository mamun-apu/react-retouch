import { useEffect, useState } from "react";
import "./styles.css";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const skip = count * 20;
        const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);
        const result = await response.json();

        if (result?.products?.length) {
          setProducts((prev) => [...prev, ...result.products]);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products.length >= 100) {
      setDisableButton(true);
    }
  }, [products]);

  return (
    <div className="load-more-container">
      {loading && <div>Loading data! Please wait.</div>}

      <div className="product-container">
        {products.map((item) => (
          <div className="product" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount((prev) => prev + 1)}>
          Load More Products
        </button>
        {disableButton && <p>You have reached 100 products</p>}
      </div>
    </div>
  );
}
