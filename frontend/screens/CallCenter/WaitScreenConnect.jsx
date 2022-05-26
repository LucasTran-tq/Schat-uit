import {
    Text,
    View,
    Image,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    AntDesign,
    Feather,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons'

import Pulse from 'react-native-pulse'

import { WaitScreen } from '../../themes/CallCenter/WaitScreen'

const { width, height } = Dimensions.get('window')

const WaitScreenConnect = () => {
    const navigation = useNavigation()

    const [changeVolume, setChangeVolume] = useState(true)
    const [changeMicro, setChangeMicro] = useState(true)
    const [changeEvent, setChangeEvent] = useState(true)
    const [changePhone, setChangePhone] = useState(true)
    const [time, setTime] = useState('00:00')

    const onPressChangeVolume = () => {
        if (changeVolume) {
            setChangeVolume(false)
        } else {
            setChangeVolume(true)
        }
    }

    const onPressChangeMicrophone = () => {
        if (changeMicro) {
            setChangeMicro(false)
        } else {
            setChangeMicro(true)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setChangeEvent(false)
            setChangeMicro(false)
            setChangeVolume(false)
            setChangePhone(false)
            // setInterval(() => {
            //     setTime((preState) => preState + '00:01')
            // }, 1000)
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <SafeAreaView style={WaitScreen.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={WaitScreen.zoomButton}>
                    <AntDesign name='arrowsalt' size={24} color='white' />
                </View>
            </TouchableOpacity>

            <View style={WaitScreen.headerContainer}>
                <Image
                    source={require('../../assets/images/CallCenter/avt.png')}
                    style={WaitScreen.avatar}
                />
                <Text style={WaitScreen.textHeader}>Gsoft Group</Text>
                <View style={WaitScreen.bodyContainer}>
                    <View>
                        {changeEvent ? (
                            <View>
                                <View style={WaitScreen.iconContainerLeft}>
                                    <AntDesign
                                        name='left'
                                        size={15}
                                        color='#C0F7FF'
                                        style={{ opacity: 0.15 }}
                                    />
                                    <AntDesign
                                        name='left'
                                        size={15}
                                        color='#C0F7FF'
                                        style={{ opacity: 0.5 }}
                                    />
                                    <AntDesign
                                        name='left'
                                        size={15}
                                        color='#C0F7FF'
                                    />
                                </View>
                                <Text style={WaitScreen.textBody}>
                                    Đang kết nối với máy chủ
                                </Text>
                                <View style={WaitScreen.iconContainerRight}>
                                    <AntDesign
                                        name='right'
                                        size={15}
                                        color='#C0F7FF'
                                    />
                                    <AntDesign
                                        name='right'
                                        size={15}
                                        color='#C0F7FF'
                                        style={{ opacity: 0.5 }}
                                    />
                                    <AntDesign
                                        name='right'
                                        size={15}
                                        color='#C0F7FF'
                                        style={{ opacity: 0.15 }}
                                    />
                                </View>
                            </View>
                        ) : (
                            <Text style={WaitScreen.textBody}>{time}</Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={WaitScreen.footerContainer}>
                <TouchableOpacity onPress={onPressChangeVolume}>
                    {changeVolume ? (
                        <Feather
                            name='volume-2'
                            size={24}
                            style={WaitScreen.volume}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name='volume-variant-off'
                            size={24}
                            style={WaitScreen.volume}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('VideoScreenConnect')}
                >
                    <FontAwesome5
                        name='video'
                        size={24}
                        style={WaitScreen.volume}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressChangeMicrophone}>
                    {changeMicro ? (
                        <FontAwesome5
                            name='microphone'
                            size={24}
                            style={WaitScreen.microphone}
                        />
                    ) : (
                        <FontAwesome
                            name='microphone-slash'
                            size={24}
                            style={WaitScreen.microphone}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={WaitScreen.phoneContainer}>
                {changePhone ? (
                    <View>
                        <Pulse
                            color='#fff'
                            numPulses={3}
                            diameter={200}
                            speed={10}
                            duration={500}
                        />
                        <MaterialCommunityIcons
                            name='phone-in-talk'
                            size={24}
                            style={WaitScreen.phone}
                        />
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => {}}>
                        <MaterialCommunityIcons
                            name='phone-hangup'
                            size={24}
                            style={WaitScreen.phoneHangup}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}

export default WaitScreenConnect
