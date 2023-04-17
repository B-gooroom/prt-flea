import React, { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";

function Auction({ auction }) {
  return useMemo(() => {
    return (
      <View style={styles.content}>
        <Text>작품 ID ({auction.auctionId})</Text>
        <Text>조회수 {auction.viewCount}</Text>
      </View>
    );
  }, [auction]);
}

const styles = StyleSheet.create({
  content: {
    width: 160,
    height: 160,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#B3B8BD", //grey-5
    borderWidth: 1,
    borderRadius: 8,
    margin: 8,
    marginLeft: 16,
  },
});
export default Auction;
