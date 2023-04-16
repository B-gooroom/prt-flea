import React, { useCallback } from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import RNEventSource from "react-native-event-source";
import { auctionsStore, auctionsActions } from "../stores/auctionsStore";
import _ from "lodash";

function Market() {
  const auctionsState = auctionsStore((state) => state);
  console.log("auctions", auctionsState.auctions);

  /**스크롤 영역 #1, 영역 #2 랜덤으로 바꿔줌 */
  const acutionsAreaOne = _.shuffle(auctionsState.auctions);
  const acutionsAreaTwo = _.shuffle(auctionsState.auctions);

  /**스크롤 영역 #1, 영역 #2의 index가 겹칠때 811로 업데이트 해줌 */
  // auctionsState.auctions.forEach((action, index) => {
  //   if (acutionsAreaOne[index].auctionId === acutionsAreaTwo[index].auctionId) {
  //     acutionsAreaOne[index].viewCount = 811;
  //     acutionsAreaTwo[index].viewCount = 811;
  //   }
  // });

  const getData = useCallback(() => {
    try {
      const eventSource = new RNEventSource(
        "https://api.fleaauction.world/v2/sse/event"
      );
      console.log("eventSource", eventSource);

      eventSource.addEventListener("sse.auction_viewed", function (event) {
        console.log("data.one", event.lastEventId);
        // console.log("data.data", event.data);
        auctionsActions.auctionsPush(JSON.parse(event.data));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  /**pull-to-refresh -> 랜덤으로 순서 정렬 */
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      auctionsActions.auctionsPush([]);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.topic}>
              <Text style={styles.innerText}>가로 스크롤 영역 #1</Text>
            </View>
            <ScrollView
              style={styles.contentWrapper}
              horizontal={true}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {acutionsAreaOne.map((auction, index) => (
                <View
                  style={styles.content}
                  key={`one.${auction.auctionId}.${index}`}
                >
                  <Text>작품 ID : {auction.auctionId}</Text>
                  <Text>조회수 {auction.viewCount}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.topic}>
              <Text style={styles.innerText}>가로 스크롤 영역 #2</Text>
            </View>
            <ScrollView
              style={styles.contentWrapper}
              horizontal={true}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {acutionsAreaTwo.map((auction, index) => (
                <View
                  style={styles.content}
                  key={`two.${auction.auctionId}.${index}`}
                >
                  <Text>작품 ID : {auction.auctionId}</Text>
                  <Text>조회수 {auction.viewCount}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  wrapper: {
    width: "100%",
    height: 240,
    color: "mint",
    borderBottomWidth: 1,
    borderBottomColor: "#848B91", //grey-3
  },
  topic: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomColor: "#E8EBED", //grey-1
    borderBottomWidth: 1,
    paddingLeft: 16,
  },
  innerText: {
    color: "skyblue",
  },
  contentWrapper: {
    height: 260,
    display: "flex",
  },
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
export default Market;
