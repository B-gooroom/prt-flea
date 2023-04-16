import { create } from "zustand";

export const auctionsStore = create(() => ({
  auctions: [],
}));

export const auctionsActions = {
  auctionsPush: (auction) => {
    auctionsStore.setState((state) => {
      return {
        auctions: [].concat(state.auctions, auction),
      };
    });
  },
};
