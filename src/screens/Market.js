import React from "react";
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
import Auction from "../components/Auction";

function Market() {
  const auctionsState = auctionsStore((state) => state);
  // console.log("auctions", auctionsState.auctionsAreaOne);

  const auctionsAreaOne = auctionsState.auctionsAreaOne;
  const auctionsAreaTwo = auctionsState.auctionsAreaTwo;

  const getData = () => {
    try {
      const eventSource = new RNEventSource(
        "https://api.fleaauction.world/v2/sse/event"
      );

      eventSource.addEventListener("sse.auction_viewed", function (event) {
        auctionsActions.auctionsSet(JSON.parse(event.data));
        // console.log("auctionsSet", JSON.parse(event.data));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      auctionsActions.auctionsRefresh();
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
              {auctionsAreaOne.map((auction, index) => (
                <Auction key={index} auction={auction} />
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
              {auctionsAreaTwo.map((auction, index) => (
                <Auction key={index} auction={auction} />
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
});
export default Market;
