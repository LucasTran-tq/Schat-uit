import React, { useState, useRef, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons'
const { width, height } = Dimensions.get('window')
import { GiftedChat, Bubble, GiftedAvatar } from 'react-native-gifted-chat'
import moment from 'moment'

const CommentsList = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Er zijn vele variaties van passages van Lorem Ipsum beschikbaar maar het  heeft te lijden gehad van wijzigingen in een of andere vorm, door ingevoegde',
                createdAt: new moment(),
                user: {
                    _id: 2,
                    name: 'Lisa Tran',
                    avatar: require('../../assets/images/ChatSingle/ImgAcc.png'),
                },
            },
            {
                _id: 2,
                text: 'Beschikbaar maar het  heeft te lijden gehad van wijzigingen in een of andere vorm, door ingevoegde',
                createdAt: new moment(),
                user: {
                    _id: 3,
                    name: 'Hoàng Anh',
                    avatar: require('../../assets/images/avt-video.png'),
                },
            },
            {
                _id: 3,
                text: 'Beschikbaar maar het  heeft te lijden gehad van wijzigingen in een of andere vorm, door ingevoegde',
                createdAt: new moment(),
                user: {
                    _id: 3,
                    name: 'Hoàng Anh',
                    avatar: require('../../assets/images/avt-video.png'),
                },
            },
            {
                _id: 4,
                text: 'Er zijn vele variaties van passages van Lorem Ipsum beschikbaar maar het  heeft te lijden gehad van wijzigingen in een of andere vorm, door ingevoegde',
                createdAt: new moment(),
                user: {
                    _id: 4,
                    name: 'Lisa Tran',
                    avatar: require('../../assets/images/ChatSingle/ImgAcc.png'),
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        messages[0].user = {
            _id: 3,
            name: 'Huu Phat',
            avatar: require('../../assets/images/avt.png'),
        }
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages, false)
        )
    }, [])

    const renderBubble = (props) => {
        var sameUserInPrevMessage = false
        if (
            props.previousMessage.user !== undefined &&
            props.previousMessage.user
        ) {
            props.previousMessage.user._id === props.currentMessage.user._id
                ? (sameUserInPrevMessage = true)
                : (sameUserInPrevMessage = false)
        }
        return (
            <View style={styles.commentView}>
                {!sameUserInPrevMessage && (
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>
                            {props.currentMessage.user.name}
                        </Text>
                        <View style={styles.timeView}>
                            <Feather name='check' size={12} color='#27AAE1' />
                            <Text style={styles.timeText}>
                                {moment(props.currentMessage.createdAt)
                                    .locale('vi')
                                    .format('LT')}
                            </Text>
                        </View>
                    </View>
                )}

                <Bubble
                    {...props}
                    position='left'
                    textStyle={{
                        left: {
                            fontSize: 14,
                            fontFamily: 'System',
                        },
                    }}
                    wrapperStyle={{
                        left: {
                            backgroundColor: '#fff',
                            width: 297,
                            borderRadius: 5,
                        },
                    }}
                />
            </View>
        )
    }

    const renderDay = (props) => {
        return <View></View>
    }

    const renderTime = (props) => {
        return <View></View>
    }

    const renderAvt = (props) => {
        console.log(props.currentMessage.user)
        return (
            <Image
                style={styles.avt}
                source={props.currentMessage.user.Avatar}
            />
        )
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            renderBubble={renderBubble}
            showUserAvatar={true}
            renderAvatarOnTop={true}
            inverted={false}
            renderDay={renderDay}
            renderTime={renderTime}
            // renderAvatar = {{selectionColor: '#44CCF0'}}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentView: {
        // maxWidth: "90%",
        // flexDirection: 'row',
        // color: "white",
        marginTop: 10,
    },
    avt: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 12,
    },
    contentView: {
        width: 297,
        marginLeft: 10,
    },
    nameView: {
        width: 297,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        // fontFamily: 'Roboto',
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '500',
        color: '#4B4B4B',
        lineHeight: 16,
    },
    secondView: {
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 4,
        marginBottom: 8,
        position: 'relative',
    },
    thirdView: {
        marginTop: 11,
        marginLeft: 14,
        marginRight: 13,
        marginBottom: 13,
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontFamily: 'System',
        fontWeight: '400',
        fontSize: 9,
        lineHeight: 11,
        color: '#ADADAD',
    },
    imgHeart: {
        position: 'absolute',
        right: 10,
        top: 68,
        // borderStyle: 'solid',
        borderColor: '#F2F1F1',
        borderWidth: 2,
        paddingRight: 6,
        paddingLeft: 6,
        paddingTop: 6,
        paddingBottom: 6,
        backgroundColor: '#fff',
        borderRadius: 20,
        // color: '#606060',
        overflow: 'hidden',
    },
    likeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    likeText: {
        fontFamily: 'System',
        fontSize: 13,
        color: '#1E73B9',
    },
    unlikeText: {
        fontFamily: 'System',
        fontSize: 13,
        color: '#919191',
    },
})

export default CommentsList
