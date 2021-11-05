import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Icon, Divider } from "react-native-elements";

// style
import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing, hp, wp } from "../../styles/size";
import Color from "../../styles/color";
// import YouTubePlayer from "react-native-youtube-sdk";
import YoutubePlayer from "react-native-youtube-iframe";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";

/**
 * Shows the image, title, and the full content of the selected article
 */
export default function ArticlesDetailScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const item = route.params?.item;
  const source = {
    html: route.params?.item.articleContent,
  };
  const color = Color.main;
  const fontsize = 15;
  // const [item, setItem] = useState(null);
  const [like, setLike] = useState(false);

  const _toggleLike = () => {
    setLike(!like);
  };

  useEffect(() => {
    console.log(color);
  }, [route.params?.item]);

  return (
    <View style={[s.screen.LRFullSceeen, s.backgroundColor.light]}>
      {item.type == "Video" ? (
        <ScrollView>
          <View>
            <YoutubePlayer videoId={item.videoID} height={250} />
          </View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              margin: Spacing.h.medium,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                s.text.medium,
                s.color.main,
                s.text.googleSansBold,
                { width: "85%", right: 20 },
              ]}
            >
              {item.articleTitle}
            </Text>
            {/* <Icon
              type="ionicon"
              name={like ? "heart" : "heart-outline"}
              size={35}
              color="#F97D75"
              onPress={_toggleLike}
              Component={TouchableOpacity}
            /> */}
          </View>
          <Divider />

          <View
            style={{
              paddingHorizontal: Spacing.h.medium,
              marginTop: Spacing.h.small,
            }}
          >
            <RenderHTML
              contentWidth={width}
              source={source}
              baseStyle={{
                color: color,
                fontSize: fontsize,
              }}
              // tagsStyles={{
              //   b: {
              //     fontWeight: "900",
              //     color: color,
              //     fontSize: fontsize,
              //   },
              //   p: { color: color, fontSize: fontsize, fontWeight: "500" },
              //   li: { color: color, fontSize: fontsize },
              // }}
            />
            {/* <Text
              style={[
                s.text.small,
                s.color.main,
                s.text.googleSansRegular,
                { fontSize: 18 },
              ]}
            >
              {item.articleContent}
            </Text> */}
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <Image
            source={{ uri: item.imageURL }}
            style={{
              width: wp(100),
              height: hp(25),
              marginTop: 20,
            }}
          />

          <Divider />
          <View
            style={{
              flexDirection: "row",
              margin: Spacing.h.medium,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                s.text.medium,
                s.color.main,
                s.text.googleSansBold,
                { width: "85%", right: 20 },
              ]}
            >
              {item.articleTitle}
            </Text>
            {/* <Icon
              type="ionicon"
              name={like ? "heart" : "heart-outline"}
              size={35}
              color="#F97D75"
              onPress={_toggleLike}
              Component={TouchableOpacity}
            /> */}
          </View>
          <Divider />

          <View
            style={{
              paddingHorizontal: Spacing.h.medium,
              marginTop: Spacing.h.small,
              width: "100%",
              right: 10,
            }}
          >
            <RenderHTML
              contentWidth={width}
              source={source}
              baseStyle={{
                color: color,
                fontSize: fontsize,
              }}
            />
            {/* <Text
              style={[
                s.text.small,
                s.color.main,
                s.text.googleSansRegular,
                { fontSize: 18 },
              ]}
            >
              {item.articleContent}
            </Text> */}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background_color,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
});
