/**
 * list of question tags and its corresponding color
 */
import I18n from "i18n-js";
// modify the tags here instead of I18n file
const bigList = () => {
  if (I18n.locale == "SC") {
    return {
      title: ["全部", "眼部健康", "眼部检查", "小贴士", "新生儿", "屏幕时间"],
      color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
    };
  } else if (I18n.locale == "TC") {
    return {
      title: ["全部", "眼部健康", "眼部檢查", "小貼士", "新生兒", "屏幕時間"],
      color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
    };
  } else {
    return {
      title: [
        "All",
        "Eye Health",
        "Eye Check",
        "Tips",
        "New Born",
        "Screen Time",
      ],
      color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
    };
  }
};
export const tagList = bigList();
/*
const titleList = {
  QNA_all: I18n.t("QNA_all"),
  QNA_eyeHealth: I18n.t("QNA_eyeHealth"),
  QNA_eyecheck: I18n.t("QNA_eyecheck"),
  QNA_tips: I18n.t("QNA_tips"),
  QNA_newBorn: I18n.t("QNA_newBorn"),
  QNA_screenTime: I18n.t("QNA_screenTime"),
};
export const tagList = {
    title: [titleList.QNA_all, titleList.QNA_eyeHealth, titleList.QNA_eyecheck, titleList.QNA_newBorn, titleList.QNA_screenTime, titleList.QNA_tips ],
    color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
};
*/
/*
export const tagList = {

  title: ["All", "Eye Health", "Eye Check", "Tips", "New Born", "Screen Time"],
  color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
};

export const tagList = ()=> {
  if(I18n.locale=="SC"){    
    return{
      title: ["全部", "眼部健康", "眼部检查", "小贴士", "新生儿", "屏幕时间"],
    color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
  };}
  else if(I18n.locale=="TC"){    
    return{
      title: ["全部", "眼部健康", "眼部檢查", "小貼士", "新生兒", "屏幕時間"],
    color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
  };}
  else {
    return{
      title: ["All", "Eye Health", "Eye Check", "Tips", "New Born", "Screen Time"],
      color: ["#F7D379", "#F7AABD", "#7FCFA4", "#F9C578", "#A5B8E9", "#DCBDF3"],
    };
  } 
};
*/
//  title: [I18n.t("QNA_all"), I18n.t("QNA_eyeHealth"), I18n.t("QNA_eyecheck"), I18n.t("QNA_tips"), I18n.t("QNA_newBorn"), I18n.t("QNA_screenTime")],
//
