// // import { Button, useToast, Box, Center, NativeBaseProvider } from "native-base";
// // import {render} from "react-dom";
// //
// // const Toast = () => {
// //     const toast = useToast();
// //     return <Center>
// //             toast.show({
// //                 render: () => {
// //                     return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
// //                         Hello! Have a nice day
// //                     </Box>;
// //                 }
// //             });
// //         }}>
// //             Custom Toast
// //     </Center>;
// // };
//
// // App.js
// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             resourcePath: {},
//         };
//     }
//     const selectFile = () => {
//
//         ImagePicker.showImagePicker(res => {
//             console.log('Response = ', res);
//             if (res.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (res.error) {
//                 console.log('ImagePicker Error: ', res.error);
//             } else if (res.customButton) {
//                 console.log('User tapped custom button: ', res.customButton);
//                 alert(res.customButton);
//             } else {
//                 let source = res;
//                 this.setState({
//                     resourcePath: source,
//                 });
//             }
//         });
//     };
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.container}>
//                     <Image
//                         source={{
//                             uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
//                         }}
//                         style={{ width: 100, height: 100 }}
//                     />
//                     <Image
//                         source={{ uri: this.state.resourcePath.uri }}
//                         style={{ width: 200, height: 200 }}
//                     />
//                     <Text style={{ alignItems: 'center' }}>
//                         {this.state.resourcePath.uri}
//                     </Text>
//                     <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
//                         <Text style={styles.buttonText}>Select File</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     },
//     button: {
//         width: 250,
//         height: 60,
//         backgroundColor: '#3740ff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 4,
//         marginBottom:12
//     },
//     buttonText: {
//         textAlign: 'center',
//         fontSize: 15,
//         color: '#fff'
//     }
// });