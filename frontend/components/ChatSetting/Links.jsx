import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import MainButton from '../MainButton'

import { LinksTheme } from '../../themes/ChatSetting/LinksTheme'

const Links = () => {
    return (
        <View style={LinksTheme.container}>
            <View style={LinksTheme.infoContainer}>
                <Image
                    source={require('../../assets/images/img6.png')}
                    style={LinksTheme.img}
                />
                <View>
                    <Text style={LinksTheme.text}>
                        https//www.youtube.com/watch/nguoihayquenemdi
                    </Text>
                </View>
            </View>
            <View style={LinksTheme.infoContainer}>
                <Image
                    source={require('../../assets/images/img6.png')}
                    style={LinksTheme.img}
                />
                <View>
                    <Text style={LinksTheme.text}>
                        https://www.freepik.com/search?dates=any&demographic=any-people&format=search&page=14&query=background
                    </Text>
                </View>
            </View>
            <View style={LinksTheme.infoContainer}>
                <Image
                    source={require('../../assets/images/img6.png')}
                    style={LinksTheme.img}
                />
                <View>
                    <Text style={LinksTheme.text}>
                        https://www.freepik.com/search?dates=any&demographic=any-people&format=search&page=14&query=background+technology&sort=popular
                    </Text>
                </View>
            </View>
            <MainButton />
        </View>
    )
}

export default Links
