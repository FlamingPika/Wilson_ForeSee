import PagerView from "react-native-pager-view";
import React, { useRef, useState } from "react";
import { CreateProfileFrag1, CreateProfileFrag2 } from "./createProfileFrags";
import { useBackHandler } from "../../utils/utils";
//import Api from "../../api/Api";
import { store } from "../../redux/store";
import { View } from "react-native";
import LoadingIndicator from "../../components/LoadingIndicator";
import Popup from "../../components/Popup";

import { useSelector, useDispatch } from "react-redux";
import {
  isFirstSignIn,
  setIsFirstSignin,
  addFamilyMember,
} from "../../action/firebaseActions";
import moment from "moment";
import { addFamilyMemberRedux } from "../../redux/userSlice";
/**
 * Create member screen
 */
export default function CreateProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [p1Data, setP1Data] = useState({});

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };
  const onSkip = () => {
    
    navigation.navigate("FamilyDrawer");
    
  };

  const onSubmit = (p2Data) => {
    setLoading(true);

    const time = moment().unix();
    const newMember = {
      ...p1Data,
      ...p2Data,
      createTime: time,
      modifiedTime: time,
    };

    // firebase & redux & switch to this member
    addFamilyMember(newMember);
    dispatch(
      addFamilyMemberRedux({
        ...newMember,
        eyeDataHistory: {},
        glassesDataHistory: {},
      })
    );
  
  
    setLoading(false);
    navigation.replace("FamilyDrawer");
  };

  return (
    <View style={{ flex: 1 }}>
      {index === 0 ? (
        <CreateProfileFrag1
          onSkip={onSkip}
          onNext={() => setIndex(1)}
          setP1Data={setP1Data}
        />
      ) : (
        <CreateProfileFrag2 onPrev={() => setIndex(0)} onSubmit={onSubmit} />
      )}

      {loading && <LoadingIndicator />}
    </View>
  );
}
