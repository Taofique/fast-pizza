import React from "react";
import { Link } from "react-router-dom";
import SearchOder from "../features/order/SearchOder";

export default function Header() {
  return (
    <header>
      <Link to="/">Fast Pizza Co.</Link>
      <SearchOder />
    </header>
  );
}
