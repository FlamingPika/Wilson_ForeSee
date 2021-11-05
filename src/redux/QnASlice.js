import { createSlice } from "@reduxjs/toolkit";
import I18n from "i18n-js";

const dummyQuestions = [
  {
    id: "1",
    questionTitle: "this is questionTitle",
    questionContent: "this is questionContent",
    tags: ["Tips"],
    answered: true,
    answerTitle: "this is answerTitle",
    answerContent: "this is answerContent",
  },
  {
    id: "2",
    questionTitle: "this is questionTitle 2",
    questionContent: "this is questionContent 2",
    tags: ["Tips", "Eye Check"],
    answered: true,
    answerTitle: "this is answerTitle 2",
    answerContent: "this is answerContent 2",
  },
  {
    id: "3",
    questionTitle: "this is questionTitle 3",
    questionContent: "this is questionContent 3",
    tags: ["Tips", "Eye Check", "Screen Time"],
    answered: true,
    answerTitle: "this is answerTitle 3",
    answerContent: "this is answerContent 3",
  },
];

/**
 * Slice for Question objects used in QnA
 */
export const QnASlice = createSlice({
  name: "questions",

  initialState: dummyQuestions,

  reducers: {
    addQuestion: (state, action) => {
      state.push(action.payload);
    },
    removeQuestion: (state, action) => {},
    resetQuestionList: (state) => {
      state = dummyQuestions;
    },
  },
});

export const { addQuestion, removeQuestion, resetQuestionList } =
  QnASlice.actions;

export default QnASlice.reducer;
