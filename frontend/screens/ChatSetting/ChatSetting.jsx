import React from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabNavigation from '../../navigation/TabNavigation.js'
import SwitchMain from '../../components/SwitchMain'
import { useNavigation } from '@react-navigation/native'
import { ChatSettingTheme } from '../../themes/ChatSetting/ChatSettingTheme'

const { width, height } = Dimensions.get('window')

const ChatSetting = () => {
    const navigation = useNavigation()
    return (
        <View>
            {/* <View>
                <ImageBackground
                source={require("../../assets/images/ListChat/MaskGroup.png")}
                style={ChatSettingTheme.backgroundImage}
                resizeMode='cover'
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={ChatSettingTheme.imgBackgroundContainer}
                >
                    <AntDesign name='left' size={24} color='#fff' />
                    <Text style={ChatSettingTheme.textProfile}>Tin nhắn</Text>
                </TouchableOpacity>
            </ImageBackground>
            </View> */}

            <View >
            <ImageBackground
          source={require("../../assets/images/ListChat/MaskGroup.png")}
          style={ChatSettingTheme.backgroundImage}
        >
          <View style={ChatSettingTheme.BoxTop}>
            <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        // style={ChatHeaderTheme.imgBackgroundContainer}
                    >
                        <AntDesign name='left' size={24} color='#fff' />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        
          </View>
            
            <ScrollView>
            {/* <StatusBar style='light' /> */}
            

            <SafeAreaView style={ChatSettingTheme.container}>
                <View style={ChatSettingTheme.headerContainer}>
                    <Image
                        source={require('../../assets/images/avt.png')}
                        style={ChatSettingTheme.avatar}
                    />
                    <FontAwesome
                        name='camera'
                        size={18}
                        color='black'
                        style={ChatSettingTheme.imgCamera}
                    />
                    <View style={ChatSettingTheme.textContainer}>
                        <Text style={ChatSettingTheme.textInfo}>
                            Gsoft Group
                        </Text>
                        <AntDesign name='edit' size={22} color='black' />
                    </View>
                </View>

                <View style={{ height: 300 }}>
                    <TabNavigation />
                </View>

                <View style={ChatSettingTheme.empty}></View>

                <View style={ChatSettingTheme.otherContainer}>
                    <Text style={ChatSettingTheme.setupOther}>
                        Cài đặt khác
                    </Text>

                    <View style={ChatSettingTheme.hideContainer}>
                        <Text style={ChatSettingTheme.hideText}>
                            Ẩn trò chuyện
                        </Text>
                        <SwitchMain />
                    </View>
                    <View style={ChatSettingTheme.showContainer}>
                        <Text style={ChatSettingTheme.showText}>
                            Hiện thông báo
                        </Text>
                        <SwitchMain />
                    </View>
                    <Text style={ChatSettingTheme.changeImg}>
                        Thay đổi ảnh nền
                    </Text>
                    <Text style={ChatSettingTheme.outGroup}>Rời nhóm</Text>
                </View>
            </SafeAreaView>
        </ScrollView>
        </View>
        
    )
}

export default ChatSetting
