import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";
import { RoundRectangleButton } from "../../components/Buttons";
import I18n from "i18n-js";
import { ScrollView } from "react-native-gesture-handler";

export default function AboutUsSceeen({ navigation, route }) {
  //showsVerticalScrollIndicator={false}
  const locale = I18n.locale;
  if (I18n.locale == "SC") {
    return (
        <View style={s.screen.normal}>
        <ScrollView>
        <Text
            style={[
              s.text.xlarge,
              s.text.googleSansBold,
              s.color.main,
              { textAlign: "center" },
            ]}
          >
            我們的團隊
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            致謝列表
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xxsmall, alignSelf: "flex-start" },
            ]}
          >
            （本列表按姓氏首字母排序）
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            提供持續更新與支持的軟件開發團隊：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall, alignSelf: "center" },
            ]}
          >
            陳胤彤 Morris
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall, alignSelf:"center"},
            ]}
          >
            Dogu
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Hayden
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            許力行 Alpha
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Tom
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            謝智軒 Jimmy
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Jaman
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            運營及後勤管理團隊：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            龔修怡 Joyce
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            NASRIN, Humyra
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            彭心音 Kiara
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Polly
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            譚宸宜 Coco
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            聯繫方式:
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            sightforesee@ust.hk
          </Text>
          <Image
              source= {require("../../assets/ApplicationLogo.png")}
              style={{
                width: Size.h.xxlarge,
                height: Size.h.xxlarge,
                borderRadius: scale(20),
                alignSelf: "center",
              }}
              />
        </ScrollView>
      </View>
    );
  } else if (I18n.locale == "TC") {
    return (
      <View style={s.screen.normal}>
        <ScrollView>
        <Text
            style={[
              s.text.xlarge,
              s.text.googleSansBold,
              s.color.main,
              { textAlign: "center" },
            ]}
          >
            我們的團隊
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            致謝列表
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xxsmall, alignSelf: "flex-start" },
            ]}
          >
            （本列表按姓氏首字母排序）
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            提供持續更新與支持的軟件開發團隊：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall, alignSelf: "center" },
            ]}
          >
            陳胤彤 Morris
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall, alignSelf:"center"},
            ]}
          >
            Dogu
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Hayden
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            許力行 Alpha
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Tom
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            謝智軒 Jimmy
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Jaman
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            運營及後勤管理團隊：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            龔修怡 Joyce
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            NASRIN, Humyra
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            彭心音 Kiara
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Polly
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            譚宸宜 Coco
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            聯繫方式:
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            sightforesee@ust.hk
          </Text>
          <Image
              source= {require("../../assets/ApplicationLogo.png")}
              style={{
                width: Size.h.xxlarge,
                height: Size.h.xxlarge,
                borderRadius: scale(20),
                alignSelf: "center",
              }}
              />
        </ScrollView>
      </View>
    );
  } else {
    return (
        <View style={s.screen.normal}>
        <ScrollView>
        <Text
            style={[
              s.text.xlarge,
              s.text.googleSansBold,
              s.color.main,
              { textAlign: "center" },
            ]}
          >
            About Us
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            Credit List
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xxsmall,  alignSelf:"flex-start" },
            ]}
          >
            (This list is sorted by the first letter of the surname, in no particular order)
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            Coding team providing ongoing updates and support:
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Chan Yan Tung, Morris
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Dogu
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Hui Lik Hang, Alpha
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Tse Chi Hin, Jimmy
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Tom
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Jaman
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Hayden
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"flex-start" },
            ]}
          >
            Operation and logistics management team:
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            Polly
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            TAN Chen-yi, Coco
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            GONG Xiuyi, Joyce
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            NASRIN, Humyra
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            PENG Xinyin, Kiara
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
              Contact
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.xsmall,  alignSelf:"center" },
            ]}
          >
            sightforesee@ust.hk
          </Text>
          <Image
              source= {require("../../assets/ApplicationLogo.png")}
              style={{
                width: Size.h.xxlarge,
                height: Size.h.xxlarge,
                borderRadius: scale(20),
                alignSelf: "center",
              }}
              />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {},
  content: {},
  subtitle: {},
});
