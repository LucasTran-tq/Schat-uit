import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import MainButton from '../MainButton'
import { FilesTheme } from '../../themes/ChatSetting/FilesTheme'

const Files = () => {
    return (
        <View style={FilesTheme.container}>
            <View style={FilesTheme.infoContainer}>
                <Image
                    source={require('../../assets/images/img2.png')}
                    style={FilesTheme.img}
                />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={FilesTheme.text}>
                        BlockChain_Banner_Final.pdf
                    </Text>
                    <Text style={FilesTheme.paragraph}>
                        189KB - Bởi Trọng Nghĩa
                    </Text>
                </View>
            </View>
            <View style={FilesTheme.infoContainer}>
                <Image
                    source={require('../../assets/images/img2.png')}
                    style={FilesTheme.img}
                />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={FilesTheme.text}>
                        BlockChain_Banner_Final.pdf
                    </Text>
                    <Text style={FilesTheme.paragraph}>
                        189KB - Bởi Trọng Nghĩa
                    </Text>
                </View>
            </View>
            <View style={FilesTheme.infoContainer}>
                <Image
                    source={require('../../assets/images/img2.png')}
                    style={FilesTheme.img}
                />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={FilesTheme.text}>
                        BlockChain_Banner_Final.pdf
                    </Text>
                    <Text style={FilesTheme.paragraph}>
                        189KB - Bởi Trọng Nghĩa
                    </Text>
                </View>
            </View>
            <MainButton />
        </View>
    )
}

export default Files
