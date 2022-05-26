import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SignupScreenComponentTheme } from '../../themes/Signup/SignupScreenComponentTheme'

const SignupScreenComponent = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={SignupScreenComponentTheme.text}>Đăng Nhập</Text>
            <View style={SignupScreenComponentTheme.wrapper}>
                <Text style={SignupScreenComponentTheme.paragraph}>
                    Bạn mới dùng Schat?
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SignupNameScreen')
                    }}
                >
                    <Text style={SignupScreenComponentTheme.signup}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreenComponent
