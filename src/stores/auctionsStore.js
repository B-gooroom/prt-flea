import { create } from "zustand";
import _ from "lodash";

const auctions = [];
for (let i = 2540; i < 2561; i++) {
  auctions.push({ auctionId: i, viewCount: 0 });
}

const auctionsAreaOne = _.shuffle(auctions);
const auctionsAreaTwo = _.shuffle(auctions);

export const auctionsStore = create(() => ({
  auctionsAreaOne: auctionsAreaOne,
  auctionsAreaTwo: auctionsAreaTwo,
}));

export const auctionsActions = {
  auctionsSet: (auction) => {
    auctionsStore.setState((state) => {
      auctionsAreaOne.forEach((auctionArea, index) => {
        if (auction.auctionId === auctionArea.auctionId) {
          state.auctionsAreaOne[index] = auction;
        }
      });
      auctionsAreaTwo.forEach((auctionArea, index) => {
        if (auction.auctionId === auctionArea.auctionId) {
          state.auctionsAreaTwo[index] = auction;
        }
      });
      return {
        auctionsAreaOne: state.auctionsAreaOne,
        auctionsAreaTwo: state.auctionsAreaTwo,
      };
    });
  },
  auctionsRefresh: () => {
    auctionsStore.setState((state) => {
      const auctionsAreaOne = _.shuffle(state.auctionsAreaOne);
      const auctionsAreaTwo = _.shuffle(state.auctionsAreaTwo);
      return {
        auctionsAreaOne: auctionsAreaOne,
        auctionsAreaTwo: auctionsAreaTwo,
      };
    });
  },
};
