import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";
import { RoundRectangleButton } from "../../components/Buttons";
import I18n from "i18n-js";
import { ScrollView } from "react-native-gesture-handler";
import { setAgreeTerms } from "../../action/firebaseActions";
import TermOfUse from "../../components/TermsOfUse";
export default function DocDetailSceeen({ navigation, route }) {
  const { currentMember } = useSelector((state) => state.user);
  const locale = I18n.locale;
  //showsVerticalScrollIndicator={false}
  if (I18n.locale == "SC") {
    const { currentMember } = useSelector((state) => state.user);
    const locale = I18n.locale;
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
            使用條款
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            親愛的用戶，
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            感謝您註冊ForeSee帳戶！ForeSee在此特別提示您，在您使用我們提供的服務前，請您認真閱讀並充分理解以下使用條款。當您點擊"同意"本條款，或您於下載、安裝及使用本應用程式時，代表您同意接受以下全部條款約束。若對使用條款有任何疑問，歡迎及時與我們聯繫。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            1. 本條款的範圍
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            本使用條款是用戶（您）與 ForeSee 之間關於使用
            ForeSee提供的產品和服務所訂立的協議，本協議條款的效力及於ForeSee所提供的一切產品和服務，用戶在享受ForeSee任何單項服務時，應當受本協議的約束。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            2. ForeSee應用程式及服務簡介
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            "ForeSee"行動裝置應用程式（下稱「本應用程式」）是由香港科技大學ForeSee團隊（下稱「本團隊」）所開發之非營利應用程式，旨在提升香港大眾的護眼意識。本應用程式提供的服務包括但不限於視力圖譜分析、專家解答、護眼祕笈、護眼操等。您有權通過本應用程式使用ForeSee提供的產品和服務，我們有權對您在使用應用程式期間的行為進行約束和管控。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            3. 隱私權
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 本應用程式將會蒐集、處理及利用您的個人資料用於以下目的：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. 建立及維護您的使用者帳號；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. 為提供服務進行必要的資料分析，以及
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii. 其他本團隊應用程式所揭示的目的。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            於下載、安裝及使用本應用程式時，代表您同意本團隊依據隱私權政策及上述目的蒐集、處理及利用您的個人資料。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            4. 知識產權
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 您可於Google Play商店與Apple App
            Store下載本應用程式。本團隊授權予您得依據本條款下載、安裝、存取與使用本應用程式及其服務。本團隊並非將本應用程式、其服務或任何軟體的權利出售或移轉予您，本團隊保留一切與本應用程式相關之權利（包括但不限於知識產權）。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 本應用程式使用過程中收集所得資料，均屬本團隊的財產。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            本應用程式受著作權保護，您不得違反本條款或未經本團隊書面同意前重製或散布本應用程式或其中任何部分。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) 未經本團隊明確書面允許，您不得從事以下行為：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i.
            對本應用程式及其服務進行重製、散布、公開展示或演出、轉授權、反編譯、反組譯、改編、公開操作、公開使用、改寫、處理、編譯、翻譯、出售、出借、出租、逆向工程、與其他軟體結合、修改或創造衍生作品；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. 移除、規避或妨礙本應用程式的安全性相關功能；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii.
            使用本應用程式及其服務，用以開發或修改類似或具競爭性的應用程式；及
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. 刪除本應用程式及其內容所展示的商標、著作權或其他權利標示。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5)
            本應用程式及其服務上的商標、標誌、圖案、設計、頁面標題、圖標、文字、商號與服務名稱（以上合稱「本團隊商標」）皆屬本團隊財產，本團隊保留本團隊商標的權利。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6)
            未經本團隊事前同意，您不得使用任何本團隊商標（包含用於廣告或宣傳），或將其作為超連結。您不得改編或使用任何與本團隊商標相同、相似或有混淆之虞的名稱、標誌或圖示。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (7)
            本團隊可隨時發布本應用程式的更新版本，且得自動更新您的裝置所使用的本應用程式版本。您同意以上形式的自動更新且本條款亦適用於更新後的版本。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            5. 使用者帳號
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 為使用本應用程式，您將需要建立使用者帳號，並以個人密碼來登入。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            您應負責維護個人帳號資訊及個人密碼的安全。您同意不向任何第三人揭露您的帳號及個人密碼。您必須採取一切適當措施（包含但不限於不定時變更個人密碼）確保帳號、個人密碼或其他安全性資訊的安全性。若因任何非法、不當或詐騙行為導致您帳號資訊外洩，本團隊恕不負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            若您認為您的帳號或個人密碼遭盜用或洩露，應立即通知本團隊。於本團隊收到通知及停止您的帳號前，本團隊恕不對帳號或個人密碼遭盜用的結果負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) 本團隊保留拒絕、變更或刪除您使用者帳號及個人密碼的權利。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5)
            您同意不將個人帳號轉讓或出借予他人，且本團隊對您違反本款義務而致生的任何損害恕無法負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6)
            本團隊並無義務確認使用者帳號所為的行為是否確實取得使用者的同意或授權。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            6. 使用政策
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 您同意不進行以下行為：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. 非法使用本應用程式或服務，或使用於違反法令的行為；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii.
            非法或未經授權侵入本應用程式或服務、本團隊網路或透過本應用程式直接或間接取得或連結之任何第三方設備、帳號、系統或網絡；對本團隊或服務供應商的服務器或網路進行系統滲透的活動；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii.
            從事任何產生不正常網路流量、網路雍塞或影響其他使用者使用本應用程式或服務的行為；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. 未經他人同意蒐集或散布個人資料；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            v. 移除、規避、損害或妨礙本應用程式或服務的安全性功能；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vi. 違反本條款使用本應用程式或服務；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vii.
            上傳或使用任何病毒、惡意軟體，或任何意圖破壞或妨礙本應用程式運作，或非經許可自本應用程式擷取內容、資料或個人資訊的程式；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            viii.
            上傳、張貼或傳輸違反法令、侵權或含有不實、侮辱、威脅、騷擾、褻瀆、猥褻、具冒犯性、誹謗、誤導或詐欺的內容。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            未經本團隊事前書面同意，您不得將本應用程式或服務用於商業目的，包含但不限於將本應用程式或服務轉售，或與其他產品或服務結合後銷售予第三人。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) 使用本應用程式需要網路連線，您應自行負擔因而產生的網路費用。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            7. 免責聲明
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1)
            本團隊按現狀提供本應用程式及其服務，您應自行承擔下載、安裝及使用本應用程式或其服務的風險。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            本團隊將盡合理之努力使本應用程式及服務正常運作，惟仍可能受到其他因素或超出本團隊的合理控制範圍的影響。本團隊不保證本應用程式或服務將正確、完整、滿足您的要求、不受惡意軟體破壞、不遭受中斷或延誤提供服務，或所有瑕疵或錯誤皆能改正。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            本團隊得隨時修正本條款，並將修正後的版本公佈於本應用程式。繼續用本應用程式代表您同意修正後之本條款；若您不同意，請停止使用本應用程式，並將本應用程式自您的設備中移除。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) 第三方網站連結:
            本應用程式可能含有其他第三方網站或應用程式的連結。本團隊並未擁有、經營或監視該網站或應用程式的內容，亦不對其正確性、真實性、有效性、完整性或合法性作任何保證。本團隊對第三方網站或應用程式所造成的任何損害恕無法負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5) 不擔保資訊之正確性:
            儘管本團隊將盡合理的努力確保本應用程式上內容的正確性，本團隊並不擔保其沒有任何瑕疵，因此不就本應用程式內容向您或任何第三方負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6)
            脫離平台聯繫：本團隊僅對任何個人及組織在本應用程式上的言論及行動的專業性、合法性負責，本團隊對您私自脫離平台與任何個人及組織聯繫並產生糾紛所造成的任何損害恕無法負責。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            8. 賠償
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            若您違反本使用條款導致第三方對本組織提出任何主張或訴訟，您同意賠償本團隊因此產生之任何損失損害、費用或責任（包含但不限於合理律師費用）。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            9. 停止服務
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1)
            本團隊得隨時停止本應用程式或服務。一旦停止，您存取及使用本應用程式或服務的權利將立即停止。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 您同意本團隊不為停止本應用程式或服務所生的資料損失負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            若您未遵守本條款，或未經許可使用本應用程式或服務，均將視為重大違反本條款，本團隊得立即停止您使用本應用程式或服務的權利。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            10.相關法律
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            下載此應用程序，即表示您同意香港特別行政區的法律（不考慮衝突法原則）將約束和管轄這些條款和條件，或
            ForeSee 與您或其業務合作夥伴和員工之間可能發生的任何類型的爭議。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            11. 聯繫方式
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            我們的電子郵件信箱: sightforesee@ust.hk
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            12. Google Play之附加條款
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 若本應用程式係從Google
            Play下載，您同意遵守其使用條款，包含但不限於「Google
            Play服務條款」。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 您同意不以任何可能導致本應用程式或本團隊違反Google
            Play條款的方式使用本應用程式，包含但不限於載於以下網頁之「Google
            Play開發人員政策」、「Google Play 開發人員發佈協議」
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            13. Apple 商店之附加條款
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 若本應用程式係從Apple
            Store或iTunes下載，您同意遵守其使用條款，包括但不限於載於以下網頁的「iTunes
            Store條款」：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            您同意不以任何可能導致本應用程式或本組織違反Apple
            Store或iTunes條款的方式使用本應用程式，包含但不限於載於以下網頁的「Apple
            Store審查條款」與「開發者終端使用授權協議基本條款」
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 若本應用程式係自Apple
            Store或iTunes下載，且於Apple之iOS系統設備上使用，應適用下列附加條款及條件：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. 本條款僅約束您與本團隊，與Apple,
            Inc.或其各地關係企業（以下合稱「Apple」）無涉。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii.
            本團隊（而非Apple）獨自對本應用程式或其服務負責任。Apple無義務提供任何維修及支援服務，且於法律允許的範圍內不為本應用程式或服務提供任何擔保。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii.本團隊（而非Apple）負責處理您或第三人對本應用程式或服務提出的主張。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv.
            本團隊（而非Apple）負責處理本應用程式或服務對於任何第三人的智慧財產權侵權行為。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            v.
            您保證：（1）您在所在國家並非屬美國政府禁運或被美國政府列為支持恐怖主義的國家；及（2）您並非任何被美國政府列為禁止或限制交易之人。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vi.
            您同意於使用本應用程式或服務時遵守所有應適用的第三方合約條款，例如於使用本應用程式或服務時不得違反網路服務提供商的合約條款。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vii.
            雙方同意Apple因本應用程式或服務的授權而為本條款之第三方受益人。您接受本條款後，Apple有權以第三方受益人身分向您主張本條款。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            若本條款與Apple「開發者終端使用授權協議基本條款」有不一致之處，應優先適用Apple的「開發者終端使用授權協議基本條款」。
          </Text>
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
            使用條款
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            親愛的用戶，
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            感謝您註冊ForeSee帳戶！ForeSee在此特別提示您，在您使用我們提供的服務前，請您認真閱讀並充分理解以下使用條款。當您點擊"同意"本條款，或您於下載、安裝及使用本應用程式時，代表您同意接受以下全部條款約束。若對使用條款有任何疑問，歡迎及時與我們聯繫。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            1. 本條款的範圍
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            本使用條款是用戶（您）與 ForeSee 之間關於使用
            ForeSee提供的產品和服務所訂立的協議，本協議條款的效力及於ForeSee所提供的一切產品和服務，用戶在享受ForeSee任何單項服務時，應當受本協議的約束。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            2. ForeSee應用程式及服務簡介
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            "ForeSee"行動裝置應用程式（下稱「本應用程式」）是由香港科技大學ForeSee團隊（下稱「本團隊」）所開發之非營利應用程式，旨在提升香港大眾的護眼意識。本應用程式提供的服務包括但不限於視力圖譜分析、專家解答、護眼祕笈、護眼操等。您有權通過本應用程式使用ForeSee提供的產品和服務，我們有權對您在使用應用程式期間的行為進行約束和管控。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            3. 隱私權
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 本應用程式將會蒐集、處理及利用您的個人資料用於以下目的：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. 建立及維護您的使用者帳號；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. 為提供服務進行必要的資料分析，以及
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii. 其他本團隊應用程式所揭示的目的。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            於下載、安裝及使用本應用程式時，代表您同意本團隊依據隱私權政策及上述目的蒐集、處理及利用您的個人資料。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            4. 知識產權
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 您可於Google Play商店與Apple App
            Store下載本應用程式。本團隊授權予您得依據本條款下載、安裝、存取與使用本應用程式及其服務。本團隊並非將本應用程式、其服務或任何軟體的權利出售或移轉予您，本團隊保留一切與本應用程式相關之權利（包括但不限於知識產權）。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 本應用程式使用過程中收集所得資料，均屬本團隊的財產。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            本應用程式受著作權保護，您不得違反本條款或未經本團隊書面同意前重製或散布本應用程式或其中任何部分。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) 未經本團隊明確書面允許，您不得從事以下行為：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i.
            對本應用程式及其服務進行重製、散布、公開展示或演出、轉授權、反編譯、反組譯、改編、公開操作、公開使用、改寫、處理、編譯、翻譯、出售、出借、出租、逆向工程、與其他軟體結合、修改或創造衍生作品；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. 移除、規避或妨礙本應用程式的安全性相關功能；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii.
            使用本應用程式及其服務，用以開發或修改類似或具競爭性的應用程式；及
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. 刪除本應用程式及其內容所展示的商標、著作權或其他權利標示。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5)
            本應用程式及其服務上的商標、標誌、圖案、設計、頁面標題、圖標、文字、商號與服務名稱（以上合稱「本團隊商標」）皆屬本團隊財產，本團隊保留本團隊商標的權利。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6)
            未經本團隊事前同意，您不得使用任何本團隊商標（包含用於廣告或宣傳），或將其作為超連結。您不得改編或使用任何與本團隊商標相同、相似或有混淆之虞的名稱、標誌或圖示。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (7)
            本團隊可隨時發布本應用程式的更新版本，且得自動更新您的裝置所使用的本應用程式版本。您同意以上形式的自動更新且本條款亦適用於更新後的版本。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            5. 使用者帳號
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 為使用本應用程式，您將需要建立使用者帳號，並以個人密碼來登入。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            您應負責維護個人帳號資訊及個人密碼的安全。您同意不向任何第三人揭露您的帳號及個人密碼。您必須採取一切適當措施（包含但不限於不定時變更個人密碼）確保帳號、個人密碼或其他安全性資訊的安全性。若因任何非法、不當或詐騙行為導致您帳號資訊外洩，本團隊恕不負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            若您認為您的帳號或個人密碼遭盜用或洩露，應立即通知本團隊。於本團隊收到通知及停止您的帳號前，本團隊恕不對帳號或個人密碼遭盜用的結果負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) 本團隊保留拒絕、變更或刪除您使用者帳號及個人密碼的權利。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5)
            您同意不將個人帳號轉讓或出借予他人，且本團隊對您違反本款義務而致生的任何損害恕無法負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6)
            本團隊並無義務確認使用者帳號所為的行為是否確實取得使用者的同意或授權。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            6. 使用政策
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 您同意不進行以下行為：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. 非法使用本應用程式或服務，或使用於違反法令的行為；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii.
            非法或未經授權侵入本應用程式或服務、本團隊網路或透過本應用程式直接或間接取得或連結之任何第三方設備、帳號、系統或網絡；對本團隊或服務供應商的服務器或網路進行系統滲透的活動；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii.
            從事任何產生不正常網路流量、網路雍塞或影響其他使用者使用本應用程式或服務的行為；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. 未經他人同意蒐集或散布個人資料；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            v. 移除、規避、損害或妨礙本應用程式或服務的安全性功能；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vi. 違反本條款使用本應用程式或服務；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vii.
            上傳或使用任何病毒、惡意軟體，或任何意圖破壞或妨礙本應用程式運作，或非經許可自本應用程式擷取內容、資料或個人資訊的程式；
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            viii.
            上傳、張貼或傳輸違反法令、侵權或含有不實、侮辱、威脅、騷擾、褻瀆、猥褻、具冒犯性、誹謗、誤導或詐欺的內容。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            未經本團隊事前書面同意，您不得將本應用程式或服務用於商業目的，包含但不限於將本應用程式或服務轉售，或與其他產品或服務結合後銷售予第三人。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) 使用本應用程式需要網路連線，您應自行負擔因而產生的網路費用。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            7. 免責聲明
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1)
            本團隊按現狀提供本應用程式及其服務，您應自行承擔下載、安裝及使用本應用程式或其服務的風險。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2)
            本團隊將盡合理之努力使本應用程式及服務正常運作，惟仍可能受到其他因素或超出本團隊的合理控制範圍的影響。本團隊不保證本應用程式或服務將正確、完整、滿足您的要求、不受惡意軟體破壞、不遭受中斷或延誤提供服務，或所有瑕疵或錯誤皆能改正。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            本團隊得隨時修正本條款，並將修正後的版本公佈於本應用程式。繼續用本應用程式代表您同意修正後之本條款；若您不同意，請停止使用本應用程式，並將本應用程式自您的設備中移除。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) 第三方網站連結:
            本應用程式可能含有其他第三方網站或應用程式的連結。本團隊並未擁有、經營或監視該網站或應用程式的內容，亦不對其正確性、真實性、有效性、完整性或合法性作任何保證。本團隊對第三方網站或應用程式所造成的任何損害恕無法負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5) 不擔保資訊之正確性:
            儘管本團隊將盡合理的努力確保本應用程式上內容的正確性，本團隊並不擔保其沒有任何瑕疵，因此不就本應用程式內容向您或任何第三方負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6)
            脫離平台聯繫：本團隊僅對任何個人及組織在本應用程式上的言論及行動的專業性、合法性負責，本團隊對您私自脫離平台與任何個人及組織聯繫並產生糾紛所造成的任何損害恕無法負責。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            8. 賠償
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            若您違反本使用條款導致第三方對本組織提出任何主張或訴訟，您同意賠償本團隊因此產生之任何損失損害、費用或責任（包含但不限於合理律師費用）。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            9. 停止服務
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1)
            本團隊得隨時停止本應用程式或服務。一旦停止，您存取及使用本應用程式或服務的權利將立即停止。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 您同意本團隊不為停止本應用程式或服務所生的資料損失負責。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            若您未遵守本條款，或未經許可使用本應用程式或服務，均將視為重大違反本條款，本團隊得立即停止您使用本應用程式或服務的權利。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            10.相關法律
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            下載此應用程序，即表示您同意香港特別行政區的法律（不考慮衝突法原則）將約束和管轄這些條款和條件，或
            ForeSee 與您或其業務合作夥伴和員工之間可能發生的任何類型的爭議。
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            11. 聯繫方式
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            我們的電子郵件信箱: sightforesee@ust.hk
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            12. Google Play之附加條款
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 若本應用程式係從Google
            Play下載，您同意遵守其使用條款，包含但不限於「Google
            Play服務條款」。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 您同意不以任何可能導致本應用程式或本團隊違反Google
            Play條款的方式使用本應用程式，包含但不限於載於以下網頁之「Google
            Play開發人員政策」、「Google Play 開發人員發佈協議」
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            13. Apple 商店之附加條款
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) 若本應用程式係從Apple
            Store或iTunes下載，您同意遵守其使用條款，包括但不限於載於以下網頁的「iTunes
            Store條款」：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            您同意不以任何可能導致本應用程式或本組織違反Apple
            Store或iTunes條款的方式使用本應用程式，包含但不限於載於以下網頁的「Apple
            Store審查條款」與「開發者終端使用授權協議基本條款」
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) 若本應用程式係自Apple
            Store或iTunes下載，且於Apple之iOS系統設備上使用，應適用下列附加條款及條件：
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. 本條款僅約束您與本團隊，與Apple,
            Inc.或其各地關係企業（以下合稱「Apple」）無涉。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii.
            本團隊（而非Apple）獨自對本應用程式或其服務負責任。Apple無義務提供任何維修及支援服務，且於法律允許的範圍內不為本應用程式或服務提供任何擔保。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii.本團隊（而非Apple）負責處理您或第三人對本應用程式或服務提出的主張。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv.
            本團隊（而非Apple）負責處理本應用程式或服務對於任何第三人的智慧財產權侵權行為。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            v.
            您保證：（1）您在所在國家並非屬美國政府禁運或被美國政府列為支持恐怖主義的國家；及（2）您並非任何被美國政府列為禁止或限制交易之人。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vi.
            您同意於使用本應用程式或服務時遵守所有應適用的第三方合約條款，例如於使用本應用程式或服務時不得違反網路服務提供商的合約條款。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vii.
            雙方同意Apple因本應用程式或服務的授權而為本條款之第三方受益人。您接受本條款後，Apple有權以第三方受益人身分向您主張本條款。
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3)
            若本條款與Apple「開發者終端使用授權協議基本條款」有不一致之處，應優先適用Apple的「開發者終端使用授權協議基本條款」。
          </Text>
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
            Terms of Use
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            Dear Users,
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            Thank you for registering an account on ForeSee. Please be kindly
            reminded to read these terms of use carefully and ensure a thorough
            understanding before accepting the service of ForeSee App. If you
            are a registered user, pressing the “I Accept Above Terms” button
            will be regarded as an agreement to be bound by all the terms stated
            below. If you have any inquiry about the Terms of Use, please
            contact us.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            1. Scope of Terms of Use
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            These terms of use are a contract between the user (you) and ForeSee
            regarding the use of the products and services provided by ForeSee.
            The terms of this contract are valid for all products and services
            provided by ForeSee. When the user enjoys any single service of
            ForeSee, should be bound by this contract.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            2. Introduction to ForeSee Apps and Services
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            The "ForeSee" mobile device application (hereinafter referred to as
            the "this application") is a non-profit application developed by the
            ForeSee team of the Hong Kong University of Science and Technology,
            which aims to enhance the eye protection awareness of the Hong Kong
            public. We provide services including but are not limited to, vision
            atlas analysis, expert answers, eye protection tips, eye protection
            exercises, etc. You have the right to use the products and services
            provided by ForeSee through this application, and we have the right
            to restrict and monitor your behavior during the use of the
            application.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            3. Privacy Policy
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) This app will collect, process, and optimize your personal
            information for the following purposes:
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. Creating and maintaining your user account;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. Conducting information analysis for the service we provided, and
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii. Other purposes disclosed in this application.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) By downloading and using the ForeSee app and service, you agree
            to let this app collect, process, and optimize your personal
            information according to this privacy policy.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            4. Intellectual property
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) You may download ForeSee from Google Play or Apple App Store.
            ForeSee team grants you to download, store and use ForeSee App and
            our service under the restriction of this Terms of Use. We do not
            sell or transfer this app or any related rights to you, the ForeSee
            team reserves all the rights attached to this application.
            (including but not limited to intellectual property)
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) The information collected during the functioning of this app is
            the property of the ForeSee team.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) This app is under the Copyright Protection of HKSAR, you are not
            allowed to act against this Terms of Use or reproduce and
            redistribute this app or any part of it without the official
            permission of ForeSee team
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) Without the official permission of ForeSee team, the following
            actions are not allowed:
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. Reproduction, distribution, public display or performance,
            sublicense, decompilation, decompilation, adaptation, public
            operation, public use, rewriting, processing, compilation,
            translation, sale, lending, renting, reverse engineering, combining
            with other software, Modify or create derivative works of this app
            and its service;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. Remove, circumvent or obstruct the security functions of this
            app;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii. Referring to this app and its service to create or modify
            similar or competing applications
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. Delete the trademark, copyright, or other rights indication in
            this app and its contents
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5) The trademarks, logos, patterns, designs, page titles, icons,
            text, trade names, and service names (collectively referred to as
            the "Trademarks of ForeSee team") on this application and its
            services are the property of ForeSee team and ForeSee team reserves
            all the rights of the trademarks.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6) Without the prior consent of the ForeSee team, you may not use
            any of the organization's trademarks (including for advertising or
            publicity), or transfer them to hyperlinks. You may not adapt or use
            any names, logos, or icons that are identical, similar, or likely to
            be confused with the trademarks of the ForeSee team.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (7) The ForeSee team may release updated versions of this
            application at any time, and may automatically update the version of
            this application on your device. You agree that the previous
            disclosure will automatically update and these terms will also apply
            to the updated version.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            5. User Account
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) In order to use this application, you will need to create a user
            account and log in with a personal password.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) You are responsible for the security of your personal account
            information and personal password. You agree not to disclose your
            account number and personal password to any third party. You must
            take all appropriate measures (including but not limited to changing
            your personal password from time to time) to ensure your account,
            personal password, and other security information are secure. If any
            illegal, improper, or fraudulent behavior causes your account
            information to leak, the ForeSee team will not be responsible.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) If you believe that your account or personal password has been
            stolen or leaked, you should notify the ForeSee team immediately.
            Until we receive notification and terminate your account, the
            organization shall not be responsible for the result of the stolen
            account or personal password.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) The ForeSee team reserves the right to refuse, change or delete
            your user account and personal password.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5) You agree not to transfer or lend your personal account to
            others, and the ForeSee team cannot be held responsible for any
            damages caused by your action.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6) The ForeSee team is not obliged to confirm whether the behavior
            of the user's account has indeed obtained the user's consent or
            authorization.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            6. Conditions of Use
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) You agree not to do the following:
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. Illegal use of this application or service, or use in violation
            of regulations;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. Illegal or unauthorized intrusion into this application or
            service, the organization’s network, or any third-party equipment,
            account, system, or network directly or indirectly obtained or
            connected through this application; conducts system penetration
            activities to the organization’s or service provider’s server or the
            network;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii. Engage in any behavior generating abnormal network traffic,
            network congestion, or affects other users' use of this application
            or service;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. Collect or distribute personal information without the consent
            of others;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            v. Remove, circumvent, damage, or hinder the security functions of
            this application or service;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vi. Use this application or service in violation of these terms;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vii. Upload or use any virus, malicious software, or any program
            that intends to destroy or hinder the operation of this application,
            or retrieve content, data, or personal information from this
            application without permission;
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            viii. Upload, post or transmit content that violates laws,
            infringements, or contains false, insulting, threatening, harassing,
            profane, obscene, offensive, defamatory, misleading, or deceptive
            content.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) Without the prior official permission of the organization, you
            may not use this application or service for commercial purposes,
            including but not limited to reselling this application or service,
            or combining it with other products or services, and selling it to a
            third party.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) Internet connection is required to use this application, and you
            should bear the resulting network costs.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            7. Disclaimer
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) The ForeSee team provides this application and its services as
            is, and you shall bear the risk of downloading, installing, and
            using this application or its services.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) The ForeSee team will make reasonable efforts to make this
            application and service operate normally, but it may still be
            affected by other factors or beyond the control of the ForeSee team.
            ForeSee team does not guarantee that this application or service
            will be correct, complete, meet your requirements, free from malware
            damage, uninterrupted or delayed in providing services, or that all
            defects or errors can be corrected.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) The ForeSee team may amend these terms at any time and publish
            the revised version on this application. Continuing to use this
            application means that you agree to the revised terms; if you do not
            agree, please stop using this application and remove this
            application from your device.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (4) Links to third-party websites: This application may contain
            links to other third-party websites or applications. ForeSee team
            does not own, operate or monitor the content of the website or
            application, and does not make any guarantees for its correctness,
            authenticity, validity, completeness, or legality. The ForeSee team
            cannot be held responsible for any damages caused by third-party
            websites or applications.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (5) The correctness of the information is not guaranteed: Although
            the ForeSee team will make reasonable efforts to ensure the
            correctness of the content on this application, ForeSee team does
            not guarantee that it is free of any defects and therefore is not
            responsible to you or any third party for the content of this
            application.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (6) Private contact beyond the platform: The team is only
            responsible for the professionalism and legality of the speech and
            actions of any individual and organization within this application.
            The team can’t be held responsible for any damage or loss caused by
            your private contact beyond the platform with any individual or
            organization.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            8. Compensation
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            If your violation of Terms of Use causes a third party to file any
            claims or litigation against ForeSee team, you agree to compensate
            ForeSee team for any losses, expenses, or liabilities (including but
            not limited to reasonable attorneys’ fees).
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            9. Stop service
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) The ForeSee team may stop this application or service at any
            time. Once stopped, your right to access and use this application or
            service will stop immediately.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) You agree that the ForeSee team is not responsible for data loss
            caused by stopping this application or service.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) If you fail to abide by these terms, or use this application or
            service without permission, it will be regarded as a major violation
            of these terms, and the team may immediately stop your right to use
            this application or service.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            10.Related Laws
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            By downloading this app, you agree that the laws of the HKSAR,
            without regard to principles of conflict laws, will govern these
            terms and conditions, or any dispute of any sort that might come
            between ForeSee and you, or its business partners and associates.
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            11. Contact
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            Our email address: sightforesee@ust.hk
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            12. Additional Terms of Google Play
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) If this application is downloaded from Google Play, you agree to
            abide by its terms of use, including but not limited to "Google Play
            Terms of Service."
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) You agree not to use this application in any way that may cause
            this application or the team to violate the terms of Google Play,
            including but not limited to the "Google Play Developer Policy" and
            "Google Play Developer Distribution Agreement" on the following
            pages
          </Text>
          <Text
            style={[
              s.text.large,
              s.color.main,
              s.text.googleSansBold,
              { alignSelf: "flex-start", marginVertical: Spacing.h.xsmall },
            ]}
          >
            13. Additional Terms for Apple Store
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (1) If this application is downloaded from the Apple Store or
            iTunes, you agree to abide by its terms of use, including but not
            limited to the "iTunes Store Terms" on the following webpage:
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            You agree not to use this application in any way that may cause this
            application or the organization to violate the terms of the Apple
            Store or iTunes, including but not limited to the "Apple Store
            Review Terms" and "Basic Developer Terminal License Agreement" on
            the following webpages Terms
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (2) If this application is downloaded from the Apple Store or iTunes
            and used on Apple's iOS system devices, the following additional
            terms and conditions shall apply:
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            i. These terms only bind you and the team, and have nothing to do
            with Apple, Inc. or its affiliates (hereinafter collectively
            referred to as "Apple").
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            ii. This team (not Apple) is solely responsible for this application
            or its services. Apple is not obligated to provide any maintenance
            and support services, and does not provide any warranty for this
            application or service to the extent permitted by law.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iii. This team (not Apple) is responsible for handling claims made
            by you or a third person regarding this application or service.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            iv. This team (not Apple) is responsible for handling the
            infringement of intellectual property rights of any third party by
            this application or service.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            v. You warrant that: (1) You are not in a country embargoed by the
            US government or listed as a country supporting terrorism by the US
            government; and (2) You are not any person listed by the US
            government as prohibiting or restricting transactions.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vi. You agree to abide by all applicable third-party contract terms
            when using this application or service, for example, you must not
            violate the contract terms of the network service provider when
            using this application or service.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start" },
            ]}
          >
            vii. Both parties agree that Apple will be the third-party
            beneficiary of these terms as a result of the authorization of this
            application or service. After you accept these terms, Apple has the
            right to claim these terms against you as a third-party beneficiary.
          </Text>
          <Text
            style={[
              s.text.small,
              s.color.secondary,
              s.text.googleSansMedium,
              { alignSelf: "flex-start", marginVertical: Spacing.h.small },
            ]}
          >
            (3) If there is any inconsistency between these terms and Apple's
            "Basic Terms of Developer's Terminal License Agreement", Apple's
            "Basic Terms of Developer's Terminal License Agreement" shall
            prevail.
          </Text>    
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
  hold it up, later handle
            <RoundRectangleButton
            title={I18n.t("TERMS_agree")}
            align="center"
            onPress={() => {
              navigation.goBack();
              setAgreeTerms(currentMember);
            }}
          /> 
 */