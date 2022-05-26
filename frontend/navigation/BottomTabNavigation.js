import * as React from 'react';
import {
    StyleSheet
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import component
import Action from '../components/Home/Action';
import Conversation from '../components/Home/Conversation';
import Menu from '../components/Home/Menu';
import News from '../components/Home/News';
import Notify from '../components/Home/Notify';

import { FontAwesome, Fontisto, Ionicons, AntDesign, Feather } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName='Tác vụ'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#27aae1',
                tabBarStyle: { display: 'none' }
            }}
            >
                <Tab.Screen 
                    name="Trò chuyện" 
                    component={Conversation} 
                    options= {{
                        tabBarIcon: ({color}) => (
                            <Ionicons name="md-chatbox-ellipses-outline" size={24} color= {color} />
                        ),
                    }}/>
                <Tab.Screen 
                    name="Tin tức" 
                    component={News} 
                    options= {{
                        tabBarIcon: ({color}) => (
                            <FontAwesome name="newspaper-o" size={24} color= {color} />
                        ),
                    }}/>
                <Tab.Screen 
                    name="Tác vụ" 
                    component={Action} 
                        options= {{
                            tabBarIcon: ({color}) => (
                                <Feather name="list" size={24} color= {color} />
                            ),
                    }}/>
                <Tab.Screen 
                    name="Thông báo" 
                    component={Notify} 
                    options= {{
                        tabBarIcon: ({color}) => (
                            <Fontisto name="bell" size={24} color= {color} />        
                        ),
                    }}/>
                <Tab.Screen 
                    name="Menu" 
                    component={Menu} 
                    options= {{
                        tabBarIcon: ({color}) => (
                            <AntDesign name="appstore-o" size={24} color= {color} />
                        ),
                    }}/>
        </Tab.Navigator>

    );
}
const styles = StyleSheet.create({
    conversation: {
        width: 20,
        height: 20,
    },
    news: {
        width: 24,
        height: 24
    },
    action: {
        width: 20,
        height: 20,
    },
    notify: {
        width: 17,
        height: 22
    },
    menu: {
        width: 20,
        height: 20
    }

})
