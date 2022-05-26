import React, { useState } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native'
import {
    Feather,
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    Entypo,
} from '@expo/vector-icons'
// responsive giao diện
const { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Image
                style={styles.imgBackground}
                source={require('../../assets/HeaderBackground.png')}
                resizeMode='cover'
            />
            <View style={styles.buttonContainer}>
                <View style={styles.leftBtnContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ListChat')}
                    >
                        <Ionicons
                            name='chevron-back-outline'
                            size={26}
                            color='white'
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>Phân công công tác</Text>
                </View>

                <View style={styles.rightBtnContainer}>
                    <TouchableOpacity>
                        <Feather
                            name='search'
                            size={22}
                            color='white'
                            style={{ padding: 5 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Entypo
                            name='dots-three-vertical'
                            size={22}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.manageView}>
                    <View style={styles.manageModalView}>
                        <TouchableOpacity style={styles.btnEdit}>
                            <MaterialIcons
                                name='folder-shared'
                                size={18}
                                color='black'
                            />
                            <Text style={styles.txtEdit}>Quản lý danh mục</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDelete}>
                            <MaterialCommunityIcons
                                name='account-multiple'
                                size={18}
                                color='black'
                            />
                            <Text style={styles.txtDelete}>
                                Quản lý thành viên
                            </Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        backgroundColor: '#27AAE1',
    },
    imgBackground: {
        width: '100%',
        height: 74,
        position: 'absolute',
    },
    buttonContainer: {
        marginTop: 15,
        marginHorizontal: '3%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    searchIcon: {
        width: 16,
        height: 16,
    },
    dotIcon: {
        width: 5,
        height: 16,
    },
    centeredView: {
        flex: 1,
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
    manageView: {
        flex: 1,
    },
    manageModalView: {
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
})

export default Header
