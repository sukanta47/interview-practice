import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useState } from "react";

const tropicalFruits = ["Mango", "Pineapple", "Papaya", "Banana", "Coconut"];
const temperateFruits = ["Apple", "Pear", "Peach", "Plum", "Cherry"];

type SOURCE_TYPE = "BKT-A" | "BKT-B";

const ListSwapping = () => {
  const [basketA, setBasketA] = useState<string[]>([...tropicalFruits]);
  const [basketB, setBasketB] = useState<string[]>([...temperateFruits]);
  const [selectedItem, setSelectedItem] = useState<{
    fruit: string;
    index: number;
    source: SOURCE_TYPE;
  } | null>();

  const handleSelectItem = (f: string, i: number, src: SOURCE_TYPE) => {
    if (selectedItem?.fruit === "f") {
      setSelectedItem(null);
    } else {
      setSelectedItem({
        fruit: f,
        index: i,
        source: src,
      });
    }
  };

  const swapItem = () => {
    console.log("Swap triggered", selectedItem);
    if (selectedItem?.source === "BKT-A") {
      setBasketB((prev) => [...prev, selectedItem.fruit]);
      basketA.splice(selectedItem.index, 1);
    } else if (selectedItem?.source === "BKT-B") {
      setBasketA((prev) => [...prev, selectedItem.fruit]);
      basketB.splice(selectedItem.index, 1);
    }
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Swap Fruits
      </h1>
      <div className="grid grid-cols-3 gap-5 mt-10 justify-center h-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-pink-900">Basket A</h2>
          {basketA.map((_fruit, index) => (
            <div
              key={`trop-${index}`}
              className={`cursor-pointer px-4 py-2 hover:bg-pink-400 transition-all hover:text-white hover-animate-wiggle
                duration-300 ease-in-out ${
                  selectedItem?.fruit === _fruit
                    ? "bg-pink-400 text-white"
                    : "text-pink-600"
                }`}
              onClick={() => handleSelectItem(_fruit, index, "BKT-A")}
            >
              {_fruit}
            </div>
          ))}
        </div>
        <button
          className="border-md border-pink-400 flex self-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
          onClick={swapItem}
          disabled={Boolean(!selectedItem)}
        >
          {selectedItem?.source === "BKT-B" ? (
            <ArrowBigLeft />
          ) : selectedItem?.source === "BKT-A" ? (
            <ArrowBigRight />
          ) : (
            "Swap"
          )}
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-pink-900">Basket B</h2>
          {basketB.map((_fruit, index) => (
            <div
              key={`temp-${index}`}
              className={`cursor-pointer px-4 py-2 hover:bg-pink-400 hover:text-white transition-all hover:text-white hover-animate-wiggle
                duration-300 ease-in-out ${
                  selectedItem?.fruit === _fruit
                    ? "bg-pink-400 text-white"
                    : "text-pink-600 border-pink-400"
                }`}
              onClick={() => handleSelectItem(_fruit, index, "BKT-B")}
            >
              {_fruit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSwapping;
