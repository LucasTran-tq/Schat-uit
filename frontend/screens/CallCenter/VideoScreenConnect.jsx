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
import { LinearGradient } from 'expo-linear-gradient'

import {
    AntDesign,
    Feather,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons'

import Pulse from 'react-native-pulse'

import { VideoTheme } from '../../themes/CallCenter/VideoTheme'

const WaitScreenConnect = () => {
    const navigation = useNavigation()

    const [changeVolume, setChangeVolume] = useState(true)
    const [changeMicro, setChangeMicro] = useState(true)
    const [changeEvent, setChangeEvent] = useState(true)
    const [changePhone, setChangePhone] = useState(true)
    const [changeImg, setChangeImg] = useState(true)
    const [changeName, setChangeName] = useState(true)
    const [changeBackground, setChangeBackground] = useState(true)
    const [footerChange, setFooterChange] = useState(true)
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
        <SafeAreaView style={VideoTheme.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={VideoTheme.zoomButton}>
                    <AntDesign name='arrowsalt' size={24} color='white' />
                </View>
            </TouchableOpacity>

            <View style={VideoTheme.headerContainer}>
                {changeImg ? (
                    <Image
                        source={require('../../assets/images/CallCenter/avt.png')}
                        style={VideoTheme.avatar}
                    />
                ) : (
                    <Image
                        source={require('../../assets/images/avt-video.png')}
                        style={VideoTheme.avatarVideo}
                    />
                )}

                {changeName ? (
                    <Text style={VideoTheme.textHeader}>Gsoft Group</Text>
                ) : null}

                <View style={VideoTheme.bodyContainer}>
                    <View>
                        {changeEvent ? (
                            <View>
                                <View style={VideoTheme.iconContainerLeft}>
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
                                <Text style={VideoTheme.textBody}>
                                    Đang kết nối với máy chủ
                                </Text>
                                <View style={VideoTheme.iconContainerRight}>
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
                            <Text style={VideoTheme.textBodyChange}>
                                {time}
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            {footerChange ? (
                <View style={VideoTheme.footerContainer}>
                    <TouchableOpacity onPress={onPressChangeVolume}>
                        {changeVolume ? (
                            <MaterialCommunityIcons
                                name='volume-variant-off'
                                size={24}
                                style={VideoTheme.volume}
                            />
                        ) : (
                            <Feather
                                name='volume-2'
                                size={24}
                                style={VideoTheme.volume}
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressChangeMicrophone}>
                        {changeMicro ? (
                            <FontAwesome
                                name='microphone-slash'
                                size={24}
                                style={VideoTheme.microphone}
                            />
                        ) : (
                            <FontAwesome5
                                name='microphone'
                                size={24}
                                color='black'
                                style={VideoTheme.microphone}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <LinearGradient
                    colors={['rgba(39, 170, 225, 0)', '#27AAE1']}
                    style={VideoTheme.linearGradient}
                >
                    <View style={VideoTheme.footerChangeContainer}>
                        <TouchableOpacity onPress={onPressChangeVolume}>
                            {changeVolume ? (
                                <MaterialCommunityIcons
                                    name='volume-variant-off'
                                    size={24}
                                    style={VideoTheme.volume}
                                />
                            ) : (
                                <Feather
                                    name='volume-2'
                                    size={24}
                                    style={VideoTheme.volume}
                                />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onPressChangeMicrophone}>
                            {changeMicro ? (
                                <FontAwesome
                                    name='microphone-slash'
                                    size={24}
                                    style={VideoTheme.microphone}
                                />
                            ) : (
                                <FontAwesome5
                                    name='microphone'
                                    size={24}
                                    color='black'
                                    style={VideoTheme.microphone}
                                />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {}}>
                            <MaterialCommunityIcons
                                name='phone-hangup'
                                size={24}
                                style={VideoTheme.phoneHangup}
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            )}

            <View style={VideoTheme.phoneContainer}>
                {changePhone ? (
                    <View>
                        <Pulse
                            color='#fff'
                            numPulses={3}
                            diameter={200}
                            speed={10}
                            duration={500}
                        />
                        <TouchableOpacity onPress={() => {}}>
                            <FontAwesome5
                                name='video'
                                size={24}
                                style={VideoTheme.phone}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    )
}

export default WaitScreenConnect
