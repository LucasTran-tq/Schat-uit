import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Modal,
} from 'react-native'
import * as Progress from 'react-native-progress'
import Checkbox from 'expo-checkbox'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')
const Body = () => {
    const navigation = useNavigation()

    const [isChecked, setChecked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity
                    style={styles.innerContainer}
                    onLongPress={() => setModalVisible(true)}
                    delayLongPress='700'
                    onPress={() => navigation.navigate('WordDetails')}
                >
                    <View style={styles.item}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt}>
                                        <Text style={styles.txt}>2 tuần</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.8}
                                        width={width * 0.32}
                                        color='#07A3A3'
                                    />
                                </View>
                                <Text style={styles.percent}>80%</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.item1}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt1}>
                                        <Text style={styles.txt}>3 ngày</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.1}
                                        width={width * 0.32}
                                        color='red'
                                    />
                                </View>
                                <Text style={styles.percent1}>10%</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.item2}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt2}>
                                        <Text style={styles.txt}>1 tuần</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.5}
                                        width={width * 0.32}
                                        color='#F3B166'
                                    />
                                </View>
                                <Text style={styles.percent}>50%</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.item}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt}>
                                        <Text style={styles.txt}>2 tuần</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.1}
                                        width={width * 0.32}
                                        color='red'
                                    />
                                </View>
                                <Text style={{ color: 'red', fontSize: 9 }}>
                                    10%
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.item}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt}>
                                        <Text style={styles.txt}>2 tuần</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.7}
                                        width={width * 0.32}
                                        color='#07A3A3'
                                    />
                                </View>
                                <Text style={styles.percent}>70%</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.item}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt}>
                                        <Text style={styles.txt}>2 tuần</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.7}
                                        width={width * 0.32}
                                        color='#07A3A3'
                                    />
                                </View>
                                <Text style={styles.percent}>70%</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.item}>
                        <View style={{ marginTop: 16 }}>
                            <View style={styles.innerTop}>
                                <View style={styles.innerTopLeft}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={
                                            isChecked ? '#27AAE1' : undefined
                                        }
                                    />

                                    <Text style={styles.innerTopTxt}>
                                        Thiết kế CSDL Ver.1
                                    </Text>
                                </View>

                                <Text style={styles.innerTime}>08/02/2022</Text>
                            </View>

                            <View style={styles.innerBottom}>
                                <View style={styles.imgContainer}>
                                    <Image
                                        style={styles.innerImg}
                                        source={require('../../assets/images/Action/ImgAcc1.png')}
                                        resizeMode='stretch'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={10}
                                        color='#919191'
                                    />
                                    <Image
                                        style={styles.innerImg2}
                                        source={require('../../assets/images/Action/ImgAcc2.png')}
                                        resizeMode='stretch'
                                    />
                                </View>

                                <View>
                                    <View style={styles.innerTxt}>
                                        <Text style={styles.txt}>2 tuần</Text>
                                    </View>
                                </View>

                                <View>
                                    <Progress.Bar
                                        progress={0.7}
                                        width={width * 0.32}
                                        color='#07A3A3'
                                    />
                                </View>
                                <Text style={styles.percent}>70%</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.btnEdit}>
                                <Feather name='edit' size={18} color='black' />
                                <Text style={styles.txtEdit}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnDelete}>
                                <Feather name='x' size={18} color='black' />
                                <Text style={styles.txtDelete}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.txtCancel}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        marginHorizontal: 16,
    },
    item: {
        height: 91,
        borderRadius: 8,
        marginBottom: 8,
        borderBottomWidth: 4,
        borderBottomColor: '#07A3A3',
        backgroundColor: 'white',
    },
    item1: {
        height: 91,
        borderRadius: 8,
        marginBottom: 8,
        borderBottomWidth: 4,
        borderBottomColor: 'red',
        backgroundColor: 'white',
    },
    item2: {
        height: 91,
        borderRadius: 8,
        marginBottom: 8,
        borderBottomWidth: 4,
        borderBottomColor: '#F3B166',
        backgroundColor: 'white',
    },
    innerTop: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerTopLeft: {
        flexDirection: 'row',
    },
    innerTime: {
        fontSize: 10,
        color: '#27AAE1',
    },
    innerBottom: {
        marginLeft: 50,
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerImg: {
        width: 28,
        height: 28,
    },
    innerImg2: {
        width: 28,
        height: 28,
    },
    innerTxt: {
        width: width * 0.144,
        height: height * 0.03,
        backgroundColor: '#07A3A3',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerTxt1: {
        width: width * 0.144,
        height: height * 0.03,
        backgroundColor: 'red',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerTxt2: {
        width: width * 0.144,
        height: height * 0.03,
        backgroundColor: '#F3B166',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: height * 0.013,
        color: 'white',
        fontWeight: '500',
    },
    innerTopTxt: {
        marginLeft: 16,
        fontSize: 14,
        fontWeight: '400',
    },

    percent: {
        fontSize: 9,
        paddingLeft: 5,
        color: '#07A3A3',
    },
    percent1: {
        fontSize: 9,
        paddingLeft: 5,
        color: 'red',
    },
    modalView: {
        width: '100%',
        height: '20%',
        marginTop: height * 0.8,
        justifyContent: 'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'space-around',
    },
    btnEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    btnDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    buttonCancel: {
        height: height * 0.046,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#27AAE1',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    txtEdit: {
        marginLeft: 16,
        fontSize: height * 0.02,
        fontWeight: '400',
    },
    txtDelete: {
        marginLeft: 16,
        fontSize: height * 0.02,
    },
    txtCancel: {
        color: '#27AAE1',
        fontSize: height * 0.02,
        fontSize: 14,
    },
})

export default Body
