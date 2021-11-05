import React, { useState } from "react";

import { Alert } from "react-native";
import moment from "moment";

import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const m = moment();

//// newly added function
//store edited member's data to  pro's account
export const proStoredMember = async (UID, name) => {
  const { currentUser } = auth();
  let memberName = [];
  const snapshot = await firestore()
    .collection("pro-users")
    .doc(currentUser.uid)
    .collection("patientData")
    .doc(UID)
    .get();
  if (snapshot.data() === undefined) {
    console.log(memberName);
    await firestore()
      .collection("pro-users")
      .doc(currentUser.uid)
      .collection("patientData")
      .doc(UID)
      .set({ name: [name] });
  } else {
    memberName = snapshot.data().name;
    console.log(memberName);
    await firestore()
      .collection("pro-users")
      .doc(currentUser.uid)
      .collection("patientData")
      .doc(UID)
      .set(
        memberName.length > 0
          ? { name: [name, ...memberName] }
          : { name: [name] }
      );
  }
};

// fetch edited member's data to display on Pro Home screen
export const proFetchMemberList = async (uid) => {
  let tempList = {};
  let memList = {};
  const { currentUser } = auth();
  const snapshot = await firestore()
    .collection("pro-users")
    .doc(currentUser.uid)
    .collection("patientData")
    .get();
  snapshot.forEach((doc) => (tempList = { ...tempList, [doc.id]: doc.data() }));
  let UID = Object.keys(tempList); // <-- UID

  for (var i = 0; i < UID.length; i++) {
    // console.log(UID[i]);
    let name = tempList[UID[i]].name;
    // console.log(name);
    firestore()
      .collection("family-users")
      .doc(UID[i])
      .collection("memberList")
      .get();
    for (var p = 0; p < name.length; p++) {
      let doc = await firestore()
        .collection("family-users")
        .doc(UID[i])
        .collection("memberList")
        .doc(name[p])
        .get();

      memList = { ...memList, [doc.id]: doc.data() };
      let eyeDataHistory = await fetchMemberHistory(
        UID[i],
        name[p],
        "eyeDataHistory"
      );
      memList[name[p]] = { ...memList[name[p]], eyeDataHistory };
      console.log(memList);
      // console.log(name[p]);
    }
  }
  return memList;
};

/**
 * For init the family user profiles on firestore,
 * Calling right after a family user is created.
 */
export const initFamiliyUser = async () => {
  console.log("initializing family user");
  const { currentUser } = auth();
  const time = m.unix();
  const dataObject = {
    isFirstSignin: true,
    userEmail: currentUser.email,
    createTime: time,
    modifiedTime: time,
  };

  await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .set(dataObject)
    .then(() => {
      console.log("firebase initializeing family user success");
      setUserUid(currentUser.uid);
    })
    .catch((error) => {
      console.log("firebase initializeing family user failed", error);
    });
};

/**
 * For init the pro user profiles on firestore,
 * Calling right after a pro user request is send.
 */
export const initProUser = async () => {
  console.log("initializing pro user");
  const { currentUser } = auth();
  const time = m.unix();
  const dataObject = {
    isFirstSignin: true,
    userEmail: currentUser.email,
    createTime: time,
    modifiedTime: time,
  };

  await firestore()
    .collection("pro-users")
    .doc(currentUser.uid)
    .set(dataObject)
    .then(() => {
      console.log("firestore initializeing pro user success");
    })
    .catch((error) => {
      console.log("firestore initializeing pro user failed", error);
    });
};

export const checkPro = async () => {
  const { currentUser } = auth();

  if (currentUser != null) {
    return await currentUser.getIdTokenResult().then((result) => {
      console.log("pro", result.claims.pro != undefined);
      return result.claims.pro != undefined && result.claims.pro != false;
    });
  }
};

// Although userBio and memberList are in the same level
// we can only get userBio and use another method to get memberList
export const fetchUserBio = async () => {
  const { currentUser } = auth();
  const snapshot = await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .get()
    .catch((error) => {
      console.log("firebase fetch userBio failed", error);
    });

  if (snapshot.exists) {
    console.log("firebase fetch userBio success");
    return snapshot.data();
  } else {
    console.log("firebase userBio is empty");
    return null;
  }
};

export const setIsFirstSignin = async () => {
  const { currentUser } = auth();
  await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .update({ isFirstSignin: false })
    .then(() => {
      console.log("firebase set isFirstSignin success");
    })
    .catch((error) => {
      console.log("firebase set isFirstSignin failed", error);
    });
};

export const addFamilyMember = async (newMember) => {
  console.log("FB: adding member", newMember.name);
  const { currentUser } = auth();

  await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(newMember.name)
    .set(newMember)
    .then(async () => {
      console.log("FB: add member success");
      await firestore()
        .collection("family-users")
        .doc(currentUser.uid)
        .update({ modifiedTime: newMember.modifiedTime })
        .catch((error) => {
          console.log("FB: add member change modified time failed", error);
        });
    })
    .catch((error) => {
      console.log("FB: add member failed", error);
    });
};

// Fetch member list of current user
// also fetch the histories of every member
export const fetchMemberList = async (userUid = null) => {
  console.log("FB: Fetch member list");
  const { currentUser } = auth();
  const snapshot = await firestore()
    .collection("family-users")
    .doc(userUid == null ? currentUser.uid : userUid)
    .collection("memberList")
    .get()
    .catch((error) => {
      console.log("fetch member list failed", error);
    });

  if (!snapshot.empty) {
    console.log("firebase fetch member list success");
    let tempList = {};

    snapshot.forEach(
      (doc) => (tempList = { ...tempList, [doc.id]: doc.data() })
    );

    // If no member, go back directly.
    if (tempList === {}) return {};

    for (const memberName of Object.keys(tempList)) {
      let eyeDataHistory = await fetchMemberHistory(
        userUid == null ? currentUser.uid : userUid,
        memberName,
        "eyeDataHistory"
      );
      let glassesDataHistory = await fetchMemberHistory(
        userUid == null ? currentUser.uid : userUid,
        memberName,
        "glassesDataHistory"
      );
      tempList[memberName] = {
        ...tempList[memberName],
        eyeDataHistory,
        glassesDataHistory,
      };
    }
    console.log("final tempList", tempList);
    return tempList;
  } else {
    console.log("firebase member list is empty");
    return {};
  }
};

export const syncFirebaseAndRedux = async (reduxMemberList) => {
  for (const memberName of Object.keys(reduxMemberList)) {
    let reduxModifiedTime = reduxMemberList[memberName].modifiedTime;
    let firebaseModifiedTime;
    const snapshot = await firestore()
      .collection("family-users")
      .doc(currentUser.uid)
      .collection("memberList")
      .doc(memberName)
      .get()
      .catch((error) => {
        console.log("FB: fetch memberBio failed", error);
      });

    if (snapshot.exists) firebaseModifiedTime = snapshot.data();
  }
};

// Add eyeData or glassesData
export const addData = async (data, userUid = null) => {
  console.log("Adding new eye data", data.checkTime);
  const { currentUser } = auth();

  await firestore()
    .collection("family-users")
    .doc(userUid == null ? currentUser.uid : userUid)
    .collection("memberList")
    .doc(data.name)
    .collection(data.type === "eye" ? "eyeDataHistory" : "glassesDataHistory")
    .doc(data.checkTime.toString())
    .set(data)
    .then(async () => {
      console.log("FB: add data success");
      await updateMemberBio(data.name, { modifiedTime: data.modifiedTime });
    })
    .catch((error) => {
      console.log("FB: add data failed", error);
    });
};

export const removeData = async (data, userUid = null) => {
  console.log("firebase removing eyedata", data.checkTime);
  const { currentUser } = auth();
  await firestore()
    .collection("family-users")
    .doc(userUid == null ? currentUser.uid : userUid)
    .collection("memberList")
    .doc(data.name)
    .collection(data.type === "eye" ? "eyeDataHistory" : "glassesDataHistory")
    .doc(data.checkTime.toString())
    .delete()
    .then(async () => {
      console.log("FB: remove data success");
      await updateMemberBio(data.name, { modifiedTime: data.modifiedTime });
    })
    .catch((error) => {
      console.log("FB: remove data failed", error);
    });
};

// When modifed member's info, such as histories
const updateMemberBio = async (memberName, data) => {
  const { currentUser } = auth();
  await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(memberName)
    .update(data)
    .catch((error) => {
      console.log("FB: update memberBio failed", error);
    });
};

// return an array, not a dict
// Fetch the eyeData and glassesData of a member
const fetchMemberHistory = async (userUid, memberName, collectionName) => {
  const snapshot = await firestore()
    .collection("family-users")
    .doc(userUid)
    .collection("memberList")
    .doc(memberName)
    .collection(collectionName)
    .get()
    .catch((error) => {
      console.log("FB: fetch", memberName, collectionName, "failed", error);
    });

  let tempList = {};

  if (!snapshot.empty) {
    console.log("firebase fetch", memberName, collectionName, "success");
    snapshot.forEach(
      (doc) => (tempList = { ...tempList, [doc.id]: doc.data() })
    );
  } else console.log("firebase", memberName, collectionName, "is empty");

  /* Code for return an array
  if (!snapshot.empty) {
    console.log("firebase fetch", memberName, collectionName, "success");
    snapshot.forEach((doc) => tempList.push(doc.data()));
  } else console.log("firebase", memberName, collectionName, "is empty")
  */

  return tempList;
};

//-------------------fetch data for Articles--------------------------
export const fetchArticles = async (queryType, userLanguage) => {
  console.log("this is lang", userLanguage);
  console.log("Fetching new articles", queryType);
  const snapshot = await firestore()
    .collection("public-articles")
    .where("type", "==", queryType)
    .where("lang", "==", userLanguage)
    .get()
    .catch((error) => Alert.alert("Unable to access network", error));

  if (!snapshot.empty) {
    console.log("new articles fetched");
    let tempList = [];
    snapshot.forEach((doc) => tempList.push({ key: doc.id, ...doc.data() }));
    console.log(tempList);
    return tempList;
  } else {
    console.log("snapshot is empty");
    return [];
  }
};

//-------------------fetch and manipulate data for QnA--------------------------
//Updated on 21-08-2021 by Alpha

//to fectch the answer from collection for member
//ie.the final version of the qna with question and answer all authorized and submitted
//based upon previous function with name changed and collection changed
export const fetchAnsweredQnA = async () => {
  console.log("Fetching new QnA");
  const snapshot = await firestore()
    .collection("QNA-Auth-ASubmitted")
    .get()
    .catch((error) => Alert.alert("Unable to access network", error));

  if (!snapshot.empty) {
    console.log("new QnA fetched");
    let tempList = [];
    snapshot.forEach((doc) => {
      if (doc.data().QnA.tags.length == 0) {
        doc.data().QnA.tags = ["All"];
      }
      tempList.push({ key: doc.id, ...doc.data() });
    });

    return tempList;
  } else {
    console.log("snapshot is empty");
    return "empty";
  }
};

export const fetchAuthQuestion = async () => {
  console.log("Fetching new authorized question");
  const snapshot = await firestore()
    .collection("QNA-Auth-QSubmitted")
    .get()
    .catch((error) => Alert.alert("Unable to access network", error));

  if (!snapshot.empty) {
    console.log("new authorized Question fetched");
    let tempList = [];
    snapshot.forEach((doc) => {
      console.log("doc", doc);
      tempList.push({ key: doc.id, ...doc.data() });
    });
    return tempList;
  } else {
    console.log("snapshot is empty");
    return "empty";
  }
};

//to add question to collection "QNA-UnAuth-QSubmitted and form record in "QNA-QAwerQnerCollection"
export const addQuestion = async (question) => {
  const { currentUser } = auth(); //to get the uid of the questioner

  await firestore() // to add the question to the collection
    .collection("QNA-UnAuth-QSubmitted")
    .add({ ...question, createProblemTime: Date.now() })
    .then((data) => {
      let UserID = data.id;
      console.log("add question success", UserID);
      firestore() // to form record in  "QNA-QAwerQnerCollection" with the questioner uid and question id
        .collection("QNA-QAwerQnerCollection")
        .doc(UserID)
        .set({ Questioner: currentUser.uid, Answerer: null })
        .then(console.log("add questioner detail passed"))
        .catch((err) => {
          console.log("add questioner detail failed", err);
        });
      return true;
    })
    .catch((error) => {
      console.log("add question failed", error);
      return false;
    });
};

export const addAnswer = async (answerTitle, answerContent, question) => {
  const { currentUser } = auth();
  console.log(answerTitle, answerContent, question);
  await firestore()
    .collection("QNA-UnAuth-ASubmitted") //add the answer to the "QNA-UnAuth-ASubmitted"
    .add({
      questionTitle: question.QnA.questionTitle,
      questionContent: question.QnA.questionContent,
      answerContent: answerContent,
      answerTitle: answerTitle,
      questionID: question.QnA.key,
      createAnswerTime: Date.now(),
      createProblemTime: question.QnA.createProblemTime,
      tags: question.QnA.tags,
    })
    .then(async () => {
      let data = question.QnA;
      let useruid = currentUser.uid;
      console.log("added answer to QNA-UnAuth-ASubmitted", useruid, data);
      await firestore()
        .collection("QNA-QAwerQnerCollection") //add the pro id to the "QNA-QAwerQnerCollection" to the question
        .doc(data.key)
        .set({ Answerer: useruid }, { merge: true })
        .then(console.log("add answerer detail passed"))
        .catch((err) => {
          console.log("add answerer detail failed", err);
        });

      await firestore()
        .collection("QNA-Auth-QSubmitted") //check if the question still exist in QNA-Auth-QSubmitted
        .doc(data.key)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            await firestore()
              .collection("QNA-Auth-QSubmitted") //delete the question if exist
              .doc(data.key)
              .delete()
              .then(() =>
                console.log("question in QNA-Auth-QSubmitted removed")
              )
              .catch((err) =>
                console.log(
                  "remove question in QNA-Auth-QSubmitted failed",
                  err
                )
              );
          } else {
            console.log("new answer to answered question added"); //do nothing if does exist
          }
        });

      return true;
    })
    .catch((error) => {
      console.log("add answer failed", error);
      return false;
    });
  return true;
};
//-------------------------------------------------------------------------------------
//-------------------find the interval of range difining how severe the problem is-------
//done on 28/7/2021 for graph description by Alpha

//Output: GraphDetailScreen.js ./src/screen/Graph/GraphDetailScreen.js
//Input: GraphDetailScreen.js ./src/screen/Graph/GraphDetailScreen.js

//get array with the range of value of different eye problems
export const getArrayOfRange = async (name) => {
  if (name == "Sample_Data") {
    return name;
  }
  let rangeArrayData = await firestore()
    .collection("In-depth-report-description")
    .doc("Range-Array")
    .get()
    .catch((err) => {
      console.log("get array range failed", err);
    });
  //get the array within the object rangeArrayData
  let desireArray = rangeArrayData._data[name];
  //return the array of intervals
  return desireArray;
};

//get the description from the corresponding name of problem and interval
export const getDescription = async (name, number, lang) => {
  let insertNumber = number.toString();
  console.log("In getDescription", name, insertNumber, lang);

  let description = await firestore()
    .collection("In-depth-report-description")
    .doc(lang)
    .collection(name)
    .doc(insertNumber)
    .get()
    .catch((err) => {
      console.log("get description failed", err);
    });
  //get the string of the desciption

  let descFetech = await description._data.string;
  //return the description
  return descFetech;
};
//--------------------------------------------------------

// increment the streakNumber and add the number at the same time
export const incrementStreakNumber = async (currentMember) => {
  const { currentUser } = auth();
  const time = m.unix();
  let userinfo = await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(currentMember)
    .get();
  let num = userinfo._data;
  let arr = Object.keys(num);
  // to show whether the streakNumber string exist or not
  let valid = false;
  for (const x in arr) {
    if (arr[x] == "streakNumber") {
      valid = true;
    }
  }
  // if not exist(not valid), create the streaknumber, according to the EyeExerciseDetailScreen, it should be initialize as 0 at there, so we directly set to 1 here, if exist(valid), +1
  if (valid) {
    let streakNumber = num.streakNumber;
    firestore()
      .collection("family-users")
      .doc(currentUser.uid)
      .collection("memberList")
      .doc(currentMember)
      .set({ streakNumber: streakNumber + 1 }, { merge: true });
  } else {
    firestore()
      .collection("family-users")
      .doc(currentUser.uid)
      .collection("memberList")
      .doc(currentMember)
      .set({ streakNumber: 1 }, { merge: true });
  }
  //to ensure fetching the newest data after updated
  userinfo = await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(currentMember)
    .get();
  num = await userinfo._data;
  //testing code below
  //console.log("aaaaaaaaaa", num.streakNumber);
  //console.log("cccccccccccc", currentMember);
  return num.streakNumber;
};

//to send out the streakNumber to ProfileScreen.js
export const getStreakNumber = async (currentMember) => {
  const { currentUser } = auth();
  const time = m.unix();
  let userinfo = await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(currentMember.name)
    .get(); //don't move .name here
  let num = userinfo._data;
  let arr = Object.keys(num);
  // to show whether the streakNumber string exist or not

  let valid = false;
  for (const x in arr) {
    if (arr[x] == "streakNumber") {
      valid = true;
    }
  }

  if (valid) {
    let streakNumber = num.streakNumber;
    //console.log("bbbbbbbbbbb", streakNumber);
    return streakNumber;
  } else {
    //console.log("bbbbbbbbbbb");
    return 0;
  }
};

export const setAgreeTerms = async (currentMember) => {
  const { currentUser } = auth();
  const time = m.unix();
  firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(currentMember.name)
    .set({ agreeTerms: true }, { merge: true });
};

export const getAge = async (currentMember) => {
  const { currentUser } = auth();
  const time = m.unix();
  let userinfo = await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("memberList")
    .doc(currentMember.name)
    .get();
    return userinfo;
};
/*
    await firestore()
    .collection("family-users")
    .doc(currentUser.uid)
    .collection("eyeExercise")
    .doc(memberName)
    .update(data)
    .catch((error) => {
      console.log("FB: update memberBio failed", error);
    });
*/
/*

export const fetchCuisineListAsync = async () => {
  return await fetchData({ path: "/cuisineList" });
};

export const updateCuisineList = ({ cuisineType, change }) => {
  updateNumericalData({ path: "/cuisineList", key: cuisineType, change });
};

export const fetchFavListAsync = async () => {
  return await fetchData({ path: "/profile/favList" });
};

export const updateFavList = (recipeId) => {
  updateData({ path: "/profile/favList", data: { [recipeId]: 1 } });
};

// General functions

const fetchData = async ({ path }) => {
  let data;
  const { currentUser } = firebase.auth();
  await firebase
    .database()
    .ref(`/users/${currentUser.uid}${path}`)
    .once("value", (snapshot) => {
      data = snapshot.val();
    });
  return data;
};

const appendData = async ({ path, data }) => {
  const { currentUser } = firebase.auth();
  await firebase
    .database()
    .ref(`/users/${currentUser.uid}${path}`)
    .update(data)
    .catch((err) => {
      console.log(err);
    });
};

const setData = async ({ path, data }) => {
  const { currentUser } = firebase.auth();
  await firebase
    .database()
    .ref(`/users/${currentUser.uid}${path}`)
    .set(data)
    .catch((err) => {
      console.log(err);
    });
};

const updateNumericalData = async ({ path, key, change }) => {
  const value = await fetchData({ path: `${path}/${key}` });
  const newData = { [key]: value ? value + change : 10 };
  appendData({ path, data: newData });
};

*/
