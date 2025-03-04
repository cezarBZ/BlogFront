"use client";
import SaveIcon from "@/icons/SaveIcon";
import UnsaveIcon from "@/icons/UnsaveIcon";
import React from "react";
interface FavoriteProps {
  isFavorite: boolean;
  favorite: () => void;
  unfavorite: () => void;
}
const Favorite = ({ isFavorite, favorite, unfavorite }: FavoriteProps) => {
  return isFavorite ? (
    <button onClick={unfavorite}>
      <UnsaveIcon />
    </button>
  ) : (
    <button onClick={favorite}>
      <SaveIcon />
    </button>
  );
};

export default Favorite;
