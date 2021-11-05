import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";
import { RoundRectangleButton } from "../../components/Buttons";
import I18n from "i18n-js";
import { ScrollView } from "react-native-gesture-handler";
import { setAgreeTerms } from "../../action/firebaseActions";

export default function CreditSceeen({ navigation, route }) {
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
            致谢
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            致谢列表
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            主要内容贡献者：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            香港视光资源中心
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            荣誉顾问：卢廸富先生 Dick Sir
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            后勤及其他支持：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            香港科技大学 视野无界
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            香港青年协会 -- 家长全动网
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            致谢
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            全体 ForeSee
            成员感谢香港视光学资源中心及其工作人员，感谢他们的热情和帮助，他们提供了
            ForeSee 的一些主要内容。
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            我们特别要感谢卢廸富先生，他除了为采访和专业问答等主要内容做出贡献外，还以其他多种方式为
            ForeSee 提供了建议和支持。
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            ForeSee 团队特别感谢香港科技大学的
            SIGHT（全球健康技术学生创新）视野无界项目在 ForeSee
            团队的成立和成功运作过程中给予的支持和宝贵建议。
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            我们还要感谢香港青年联合会 -- 家长全动网在 ForeSee
            应用程序和其他活动的宣传方面提供的帮助。
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            我们也非常感谢在 App 开发的每个阶段为我们提供反馈的所有个人。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            联系方式
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
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
            致謝
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
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            主要內容貢獻者：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            香港視光資源中心
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            榮譽顧問：盧廸富先生 Dick Sir
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            後勤及其他支持：
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            香港科技大學 視野無界
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            香港青年協會 -- 家長全動網
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            致謝
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            {"      "}全體 ForeSee
            成員感謝香港視光學資源中心及其工作人員，感謝他們的熱情和幫助，他們提供了
            ForeSee
            的一些主要內容。我們特別要感謝盧廸富先生，除了為採訪和專業問答等主要內容做出貢獻外，他還以其他多種方式為
            ForeSee 提供了建議和支持。ForeSee 團隊特別感謝香港科技大學的
            SIGHT（全球健康技術學生創新）視野無界項目在 ForeSee
            團隊的成立和日常運營過程中給予的支持和寶貴建議。我們還要感謝香港青年聯合會
            -- 家長全動網在 ForeSee
            應用程序和其他活動的宣傳方面提供的幫助。我們也非常感謝在 App
            開發的每個階段為我們提供反饋的所有人。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            聯繫方式
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
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
            Credits
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.medium },
            ]}
          >
            Credit List
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            Lead content contributors:
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            Hong Kong Optometry Resources Center
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            Honorary Consultant: Mr. Dick Lo 
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            Logistics and Other Support:
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            SIGHT(Student Innovation for Global Health Technology), HKUST
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            The Hong Kong Federation of Youth Groups -- Parent Support Network
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            Acknowledgment
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            The whole ForeSee thanks the Hong Kong Optometry Resources Center
            and their staff for their enthusiasm and helpfulness in providing
            some main content of ForeSee.
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            We are particularly grateful to Mr. Dick Lo, who, in addition to
            contributing to main contents like interviews and professional Q&As,
            also advised and supported ForeSee in many other ways.
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            ForeSee team would like to give special thanks to SIGHT(Student
            Innovation for Global Health Technology) program at HKUST for their
            support and valuable advice throughout the foundation and successful
            operation of ForeSee team.
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            We would also like to thank The Hong Kong Federation of Youth Groups
            -- Parent Support Network for their help in promotional support of
            ForeSee app and other events.
          </Text>
          <Text
            style={[
              s.text.medium,
              s.color.secondary,
              s.text.googleSansMedium,
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
            ]}
          >
            We are also deeply indebted to all of the individuals who provided
            feedback at every stage of the App development.
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
              { marginVertical: Spacing.h.small, alignSelf: "flex-start" },
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
/*
export default function CreditSceeen({ navigation, route }) {
    //showsVerticalScrollIndicator={false}
    const locale = I18n.locale;
    if(I18n.locale=="SC"){
        return(
            <View style={s.screen.normal}>
                <ScrollView>
                <Text
                        style={[
                            s.text.xxlarge,
                            s.text.googleSansBold,
                            s.color.main,
                            {textAlign: "center"}
                        ]}>
                        {I18n.t("SETTINGS_credits")}
                        </Text>
                        <Text
                        style={[
                            s.text.xlarge,
                            s.color.main,
                            s.text.googleSansBold,
                            {textAlign: "center",marginVertical: Spacing.h.xsmall },
                            ]}>
                            特別嗚謝:
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        香港视光资源中心
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        荣誉顾问：卢迪富先生
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        香港科技大学 视野无界
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        香港青年协会 -- 家长全动网
                        </Text>

                </ScrollView>
            </View>
        );
    }
        else if(I18n.locale=="TC"){
            return(
                <View style={s.screen.normal}>
                    <ScrollView>
                    <Text
                        style={[
                            s.text.xxlarge,
                            s.text.googleSansBold,
                            s.color.main,
                            {textAlign: "center"}
                        ]}>
                        {I18n.t("SETTINGS_credits")}
                        </Text>
                        <Text
                        style={[
                            s.text.xlarge,
                            s.color.main,
                            s.text.googleSansBold,
                            {textAlign: "center",marginVertical: Spacing.h.xsmall },
                            ]}>
                            特別嗚謝:
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        香港視光資源中心
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        榮譽顧問：盧迪富先生
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        香港科技大學 視野無界
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        香港青年協會 -- 家長全動網
                        </Text>

                    </ScrollView>
                </View>
            );
        }
        else {
            return(
                <View style={s.screen.normal}>
                    <ScrollView>
                    <Text
                        style={[
                            s.text.xxlarge,
                            s.text.googleSansBold,
                            s.color.main,
                            {textAlign: "center"}
                        ]}>
                        {I18n.t("SETTINGS_credits")}
                        </Text>
                        <Text
                        style={[
                            s.text.xlarge,
                            s.color.main,
                            s.text.googleSansBold,
                            {textAlign: "center",marginVertical: Spacing.h.xsmall },
                            ]}>
                            Special Thanks to:
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        Hong Kong Optometry Resources Center
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        Honorary Consultant: Mr. Dick Lo
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        SIGHT(Student Innovation for Global Health Technology), HKUST
                        </Text>
                        <Text
                        style={[
                            s.text.large,
                            s.color.secondary,
                            s.text.googleSansMedium,
                            {marginVertical: Spacing.h.small, textAlign: "center"},
                            ]}>
                        The Hong Kong Federation of Youth Groups -- Parent Support Network
                        </Text>

                    </ScrollView>
                </View>
            );
        }
    }
*/
