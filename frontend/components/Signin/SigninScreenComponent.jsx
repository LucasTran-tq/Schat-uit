import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SigninScreenThemeComponent } from '../../themes/Signin/SigninScreenThemeComponent'

const SigninScreenComponent = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={SigninScreenThemeComponent.text}>Đăng ký</Text>
            <View style={SigninScreenThemeComponent.wrapper}>
                <Text style={SigninScreenThemeComponent.paragraph}>
                    Bạn đã có tài khoản Schat?
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SigninScreen')
                    }}
                >
                    <Text style={SigninScreenThemeComponent.signin}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SigninScreenComponent
