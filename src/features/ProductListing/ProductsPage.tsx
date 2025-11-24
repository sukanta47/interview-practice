import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProductFetch } from "./useProductFetch";

const Products = () => {
  // const [products, setProducts] = useState([]);
  const [isHighlight, setIsHighlight] = useState(false);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const navigate = useNavigate();
  const products = useProductFetch();

  const highlightTable = () => {
    const tableNode = tableRef.current;
    // const str = JSON.stringify(tableNode.innerHTML);
    // const tbody = str.split("<tbody>");
    // const trs = tbody[1].replace("<tr>","<tr style='background-color:yellow;'")

    // console.log( trs);
    // tableRef.current.innerHTML = trs;
    // setIsHighlight(true);
  };

  return (
    <div className="flex flex-col h-full w-full p-10 items-center justifycenter">
      <h2 className="text-2xl font-bold">Products</h2>
      <button
        className={`flex self-end mb-4 p-2 border border-purple-600 rounded-md ${
          isHighlight ? "text-white bg-purple-600" : "text-purple-600 bg-white"
        } duration-200 ease-in-out`}
        onClick={() => setIsHighlight(!isHighlight)}
      >
        Highlight
      </button>
      <table className="h-screen" ref={tableRef}>
        <thead>
          <tr className="flex justify-between gap-4 text-burgundy-600 font-semibold">
            <th className="w-1/12">Id</th>
            <th className="w-3/12">Title</th>
            <th className="w-8/12">Description</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-2 overflow-y-auto h-[80vh]">
          {products?.map((prod, i) => (
            <tr
              key={prod.id}
              className={`flex justify-between justify-center gap-4 cursor-pointer ${
                isHighlight && i % 2 === 0 ? "bg-yellow-200" : ""
              }`}
              onClick={() =>
                navigate(
                  `/products/${prod.id}/details?query=example&prodId=${prod.id}`
                )
              }
            >
              <td className="w-1/12 flex justify-center">{prod.id}</td>
              <td className="w-3/12">{prod.title}</td>
              <td className="w-8/12">{prod.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
