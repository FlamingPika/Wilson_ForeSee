import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import EN from "./translations/en_us";
import TC from "./translations/zh_hk";
import SC from "./translations/zh_cn";

/**
 * simple language resolver using device's preferred locale
 */
function getPreferredLocale() {
  const deviceLocales = RNLocalize.getLocales();

  if (deviceLocales.find((locale) => locale.scriptCode === "Hant")) return "TC";
  else if (deviceLocales.find((locale) => locale.scriptCode === "Hans"))
    return "SC";
  else if (deviceLocales.find((locale) => locale.languageCode === "zh"))
    return "TC";
  else return "EN";
}

/**
 * initialize the I18n object with specified locale.
 * If locale is null, attempt to get preferred locale of the device
 * @param locale locale to init with; optional
 */
export function initLocale(locale) {
  // use locale if not null, else get device's preference
  I18n.locale = locale || getPreferredLocale();
  I18n.fallbacks = true;
  I18n.defaultLocale = "EN";
  I18n.translations = {
    EN,
    TC,
    SC,
  };
}
