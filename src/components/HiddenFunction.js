import React from "react";
import {View, Text, StyleSheet, Modal, Image, TouchableOpacity} from "react-native";
import I18n from "i18n-js"
import s from "../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../styles/size";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";


/* For convenience copying
import React, { useState } from "react";
import HiddenFunction from "../../components/HiddenFunction";
  const [warning, setWarning] = useState(false);
  <HiddenFunction on={warning} setOn={setWarning}/>
*/

// use to pop up "Coming Soon" notice for unfinished functions
// method to use: <HiddenFunction />
// const [warning, setWarning] = useState(false); to control the warning pop up or not
// considering to add different params for the notice: e.g. name for the specific function, progress update etc.
// props should have on and setOn, which is used to control on signal from other screen with using useState(), 
// signal is transferred between this function and the screen you use the function

export default HiddenFunction = (props) =>{
    return(
        <View >
            <Modal 
            visible={props.on}
            animationType='slide'
            transparent>
                <View style={styles.centeredView}>
                    <Modal 
                        visible={props.on}
                        animationType='fade'
                        transparent>
                        <View style={styles.centeredViewBackground}></View>
                    </Modal>
                    <View style={[s.backgroundColor.light, styles.warningModal]}>
                        <View>
                            <View style={[s.backgroundColor.secondary, styles.warningTitle]}>
                                    <Text style={[styles.titleText, s.text.googleSansBold, s.text.xlarge, s.color.light]}>{I18n.t("appName")}</Text>
                                    <Image source={require("../assets/ApplicationLogo.png")}  
                                    style={{
                                    width: Size.h.medium,
                                    height: Size.h.medium,
                                    borderRadius: scale(20),
                                    }}/>
                            </View>
                        </View>            
                        <View style={styles.warningBody}>
                            <Text style={[s.text.xlarge, s.text.googleSansBold, s.color.main, {textAlign: "center"}]}>
                                {I18n.t("COMINGSOON")}
                            </Text>
                        </View>    
                        <TouchableOpacity style={[s.backgroundColor.main, styles.touchable]} onPress={()=>{props.setOn(false);}}>
                            <Text style={[s.text.medium, s.text.googleSansBold, s.color.light, {textAlign: "center"}]}>{I18n.t("confirm")}</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </Modal>
        </View>
    );
};

HiddenFunction.defaultProps = {
    on: false,
};

const styles = StyleSheet.create({
    warningModal: {
        width: wp(80),
        height: hp(40),
        borderRadius: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredViewBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000086",
    },
    titleText: {
        paddingRight: scale(8),
    },
    warningTitle:{
        flexDirection: "row", 
        alignItems:"center", 
        borderTopLeftRadius:25, 
        borderTopRightRadius:25,  
        paddingVertical:scale(12),
        paddingLeft: wp(20),
    },
    warningBody:{
        height: hp(25),
        alignItems: "center",
        justifyContent: "center",
    },
    touchable:{
        flex:1, 
        justifyContent:"center", 
        alignItems:"center",
        borderBottomLeftRadius:15, 
        borderBottomRightRadius:15,
    },
});