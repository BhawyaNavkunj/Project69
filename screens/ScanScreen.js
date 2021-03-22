import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState: "clicked",
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCameraPermissions) {
            return (
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanner}/>
            );
        } else if(buttonState === 'normal'){
            return (
                <View style = {styles.container}>
                <Text style = {styles.title}>Bar Code Scanner</Text>
                <Image style = {styles.imageIcon} 
                source={require('../assets/scanner.jpg')}/>
                <Text style = {styles.title}>{hasCameraPermissions === true ? this.state.scannedData : "Requesting for Camera Permission"}</Text>
                <TouchableOpacity style = {styles.scanButton}
                 onPress = {this.getCameraPermission} 
                 title = "Bar Code Scanner">
                <Text style = {styles.title}>Scan Bar Code</Text>
                </TouchableOpacity>
                </View>
            );
        }
    }
    }

    const styles = StyleSheet.create({
        container:{
            alignItems: "center",
            justifyContent: "center",
            flex:1,
        },
        title:{
            fontSize:17,
            fontFamily: "serif",
            textAlign:"center",
            margin:10
        },
        imageIcon:{
            width:170,
            height:170
        },
        scanButton:{
            width:170,
            height:50,
            borderWidth:1,
            marginTop:20
        }
    })
