import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { NewJobHeadTheme } from '../../themes/CreateNewJob/NewJobHeadTheme'
import { useNavigation } from '@react-navigation/native'

const NewJobHead = () => {
    const navigation = useNavigation()

    return (
        <View style={NewJobHeadTheme.container}>
            <Image
                style={{ width: '100%', height: 74 }}
                source={require('../../assets/CreateNewJob/bghead.png')}
            />
            <View style={{ flexDirection: 'row', position: 'absolute' }}>
                <TouchableOpacity
                    style={NewJobHeadTheme.iconBack}
                    onPress={() => navigation.navigate('MenuScreen')}
                >
                    <Image
                        style={{ width: 6, height: 10.99 }}
                        source={require('../../assets/CreateNewJob/iconBack.png')}
                    />
                </TouchableOpacity>
                <Text style={NewJobHeadTheme.txtTaoCongViecMoi}>
                    Tạo công việc mới
                </Text>
                <TouchableOpacity style={NewJobHeadTheme.iconSearch}>
                    <Image
                        style={{ width: 16, height: 16 }}
                        source={require('../../assets/CreateNewJob/iconsearch.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={NewJobHeadTheme.iconOption}>
                    <Image
                        style={{ width: 16, height: 16 }}
                        source={require('../../assets/CreateNewJob/iconoption.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NewJobHead
