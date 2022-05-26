import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import {
    MaterialCommunityIcons,
    Ionicons,
    MaterialIcons,
    FontAwesome,
    FontAwesome5,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

import { useDispatch, useSelector } from 'react-redux'
import { LoadSocket } from '../../store/actions/socket.action'

const Body = () => {
    const navigation = useNavigation()

    const { socket } = useSelector((state) => state.socketReducer)
    const dispatch = useDispatch()

    const removeData = async () => {
        try {
            await SecureStore.deleteItemAsync('accessToken')
            // await socket.disconnect()
            // await dispatch(LoadSocket(null))
            console.log('log out')
            navigation.navigate('WaittingScreen')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.title1}>
                    <Text style={styles.txt}>Cài đặt & Bảo mật</Text>
                </View>

                <View style={styles.title1Container}>
                    <TouchableOpacity style={styles.btnSystem}>
                        <View>
                            <View style={styles.cycleSystem}>
                                <MaterialCommunityIcons
                                    style={styles.innerCycleSystem}
                                    name='account'
                                    size={16}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Tài khoản và bảo mật</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSetting}>
                        <View style={styles.cycleSetting}>
                            <Ionicons
                                style={styles.innerCycleSetting}
                                name='settings-sharp'
                                size={12}
                                color='white'
                            />
                        </View>
                        <Text>Cài đặt</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.title2}>
                    <Text style={styles.txt}>Tính năng quản lý</Text>
                </View>

                <View style={styles.title2Container}>
                    <TouchableOpacity style={styles.btnSystemManage}>
                        <View>
                            <View style={styles.cycleSystemManage}>
                                <MaterialIcons
                                    style={styles.innerCycleSystemManage}
                                    name='settings-system-daydream'
                                    size={12}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Quản lý hệ thống</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnNews}>
                        <View>
                            <View style={styles.cycleNewsManage}>
                                <FontAwesome
                                    style={styles.innerCycleNewsManage}
                                    name='newspaper-o'
                                    size={12}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Quản lý tin tức</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnWorkAssignment}
                        onPress={() =>
                            navigation.navigate('CreateNewJobScreen')
                        }
                    >
                        <View>
                            <View style={styles.cycleWorkAssignment}>
                                <FontAwesome5
                                    style={styles.innerCycleWorkAssignment}
                                    name='briefcase'
                                    size={12}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Phân công công việc</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnReports}>
                        <View>
                            <View style={styles.cycleReports}>
                                <FontAwesome5
                                    style={styles.innerCycleReports}
                                    name='poll-h'
                                    size={12}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Báo cáo công tác</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCalender}>
                        <View>
                            <View style={styles.cycleCalender}>
                                <Ionicons
                                    style={styles.innerCycleCalender}
                                    name='today-sharp'
                                    size={12}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Lịch công tác</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.title3container}>
                    <TouchableOpacity style={styles.btnChangeAcc}>
                        <View>
                            <View style={styles.cycleChangeAcc}>
                                <MaterialCommunityIcons
                                    style={styles.innerCycleChangeAcc}
                                    name='account-convert-outline'
                                    size={13}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Chuyển tài khoản</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnSignOut}
                        onPress={removeData}
                    >
                        <View>
                            <View style={styles.cycleSignOut}>
                                <Ionicons
                                    style={styles.innerCycleSignOut}
                                    name='power'
                                    size={13}
                                    color='white'
                                />
                            </View>
                        </View>
                        <Text>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title1: {
        height: 28,
        marginTop: '3%',
        marginLeft: '5%',
        justifyContent: 'center',
    },
    title2: {
        height: 28,
        marginTop: '3%',
        marginLeft: '5%',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
        color: '#919191',
    },
    title1Container: {
        backgroundColor: 'white',
    },
    title2Container: {
        backgroundColor: 'white',
    },
    title3container: {
        marginTop: '3%',
        backgroundColor: 'white',
    },
    btnItems: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    btnSystem: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleSystem: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#27AAE1',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleSystem: {
        position: 'absolute',
    },
    btnSetting: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleSetting: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#07A3A3',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleSetting: {
        position: 'absolute',
    },
    btnSystemManage: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleSystemManage: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#07A3A3',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleSystemManage: {
        position: 'absolute',
    },
    btnNews: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    btnNewsManage: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleNewsManage: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#F3B166',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleNewsManage: {
        position: 'absolute',
    },
    btnWorkAssignment: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    btnWorkAssignment: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleWorkAssignment: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#60CDE4',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleWorkAssignment: {
        position: 'absolute',
    },
    btnReports: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleReports: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#7EDBDE',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleReports: {
        position: 'absolute',
    },
    btnCalender: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleCalender: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#9D9D9D',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleCalender: {
        position: 'absolute',
    },
    btnChangeAcc: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleChangeAcc: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#9B5DB0',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleChangeAcc: {
        position: 'absolute',
    },
    btnSignOut: {
        height: 44,
        borderBottomWidth: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F3',
    },
    cycleSignOut: {
        width: 24,
        height: 24,
        marginRight: 8,
        backgroundColor: '#1E73B9',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCycleSignOut: {
        position: 'absolute',
    },
})

export default Body
