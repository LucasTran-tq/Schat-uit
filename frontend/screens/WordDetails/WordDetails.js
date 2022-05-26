import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { WordDetailsNavigation } from '../../navigation/TabNavigation.js'

// import { ChatSettingTheme } from '../../themes/ChatSetting/ChatSettingTheme'
const { width, height } = Dimensions.get('window')

const WordDetails = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <ImageBackground
                source={require('../../assets/images/bg-image.jpg')}
                style={styles.backgroundImage}
                resizeMode='cover'
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={styles.imgBackgroundContainer}
                >
                    <AntDesign name='left' size={24} color='#fff' />
                    <Text style={styles.textProfile}>Chi tiết công việc</Text>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => {}}>
                        <AntDesign
                            name='search1'
                            size={24}
                            color='white'
                            style={styles.search}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}}>
                        <FontAwesome5
                            name='ellipsis-v'
                            size={24}
                            color='white'
                            style={styles.ellipsis}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <WordDetailsNavigation />
        </View>
    )
}

export default WordDetails

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    backgroundImage: {
        position: 'relative',
        backgroundColor: '#0D76C1',
        // flexDirection: 'row',
    },
    imgBackgroundContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: width * 0.0426666666666667,
        marginBottom: height * 0.0246305418719212,
    },
    textProfile: {
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 19,
        color: '#fff',
        marginLeft: width * 0.032,
        marginTop: height * 0.0036945812807882,
    },
    iconContainer: {
        position: 'absolute',
        top: 45,
        right: 10,
        flex: 1,
        flexDirection: 'row',
    },
    search: { marginRight: 20 },
    ellipsis: {
        marginRight: 40,
        marginLeft: 10,
    },
})
