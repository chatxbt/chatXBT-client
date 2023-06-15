import React, { useState } from "react";
import { assetData } from "./data";

export default () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState();
  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleAssetSearch = (array: any[]) => {
    return (
      array.length > 0 &&
      array.filter((asset) =>
        Object.keys(asset).some((params) =>
          asset[params].toString().toLowerCase().includes(query)
        )
      )
    );
  };
  const filtered: any = handleAssetSearch(assetData);

  return {
    query,
    selected,
    setSelected,
    handleChange,
    filtered,
  };
};
