import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WaitScreenConnect from '../screens/CallCenter/WaitScreenConnect'
import VideoScreenConnect from '../screens/CallCenter/VideoScreenConnect'
import ChatScreen from '../screens/ScreenChatSingle/ChatScreen'
import ListChat from '../screens/ListChat/ListChat'
import ChatHeader from '../components/ScreenChatSingle/ChatHeader'

import ChatSetting from '../screens/ChatSetting/ChatSetting'

import WaittingScreen from '../screens/WaittingScreen/WaittingScreen'

import SigninScreen from '../screens/Signin/SigninScreen'
import SigninScreenComponent from '../components/Signin/SigninScreenComponent'

import SignupNameScreen from '../screens/Signup/SignupNameScreen'
import SignupPhoneScreen from '../screens/Signup/SignupPhoneScreen'
import InputOTPSignupScreenComponent from '../components/Signup/InputOTPSignupScreenComponent'
import InputOTPSigninScreenComponent from '../components/Signin/InputOTPSigninScreenComponent'
import SignupSuccessSreen from '../screens/Signup/SignupSuccessScreen'

import Logout from '../components/Logout/Logout'

import WordDetails from '../screens/WordDetails/WordDetails'

import CreateNewJobScreen from '../screens/CreateNewJob/CreateNewJobScreen'
import NewJobHead from '../components/CreateNewJob/NewJobHead'
import NewjobBody from '../components/CreateNewJob/NewjobBody'

import HomeScreen from '../screens/HomeScreen/HomeScreen.jsx'
import Action from '../components/Home/Action'
import MenuScreen from '../screens/Menu/MenuScreen.jsx'
import NotificationsScreen from '../screens/Notifications/NotificationsScreen.jsx'
import NotificationSetting from '../screens/NotificationSetting/NotificationSetting.jsx'

import CreateGroup from '../screens/CreateGroup/CreateGroup'

const Stack = createNativeStackNavigator()

export default function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='WaittingScreen'
                screenOptions={{ headerShown: false }}
            >
                {/* <Stack.Screen name='HomeScreen' component={HomeScreen} /> */}

                <Stack.Screen
                    name='CreateNewJobScreen'
                    component={CreateNewJobScreen}
                />

                <Stack.Screen name='WordDetails' component={WordDetails} />
                <Stack.Screen name='Logout' component={Logout} />

                <Stack.Screen
                    name='WaittingScreen'
                    component={WaittingScreen}
                />

                <Stack.Screen name='SigninScreen' component={SigninScreen} />

                <Stack.Screen
                    name='SigninScreenComponent'
                    component={SigninScreenComponent}
                />

                <Stack.Screen
                    name='SignupNameScreen'
                    component={SignupNameScreen}
                />

                <Stack.Screen
                    name='SignupPhoneScreen'
                    component={SignupPhoneScreen}
                />

                <Stack.Screen
                    name='SignupSuccessSreen'
                    component={SignupSuccessSreen}
                />

                <Stack.Screen name='ListChat' component={ListChat} />

                <Stack.Screen name='CreateGroup' component={CreateGroup} />

                <Stack.Screen name='ChatScreen' component={ChatScreen} />

                <Stack.Screen
                    name='WaitScreenConnect'
                    component={WaitScreenConnect}
                />

                <Stack.Screen
                    name='VideoScreenConnect'
                    component={VideoScreenConnect}
                />

                <Stack.Screen
                    name='InputOTPSignupScreenComponent'
                    component={InputOTPSignupScreenComponent}
                />
                <Stack.Screen
                    name='InputOTPSigninScreenComponent'
                    component={InputOTPSigninScreenComponent}
                />
                <Stack.Screen name='ChatSetting' component={ChatSetting} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='Action' component={Action} />
                <Stack.Screen name='MenuScreen' component={MenuScreen} />
                <Stack.Screen
                    name='NotificationsScreen'
                    component={NotificationsScreen}
                />
                <Stack.Screen
                    name='NotificationSetting'
                    component={NotificationSetting}
                />
                <Stack.Screen name='NewjobBody' component={NewjobBody} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
