import React, { Component, useState } from 'react'
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
} from 'react-native'
import { NewJobBodyTheme } from '../../themes/CreateNewJob/NewJobBodyTheme'
import Slider from '@react-native-community/slider'
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

import { useNavigation } from '@react-navigation/native'

const NAME = [
    {
        item: 'Minh Tiến',
        id: '1',
    },
    {
        item: 'Trần Quốc Phi',
        id: '2',
    },
    {
        item: 'Thái Bình',
        id: '3',
    },
    {
        item: 'Nhật Hào',
        id: '4',
    },
    {
        item: 'Trọng Hiển',
        id: '5',
    },
    {
        item: 'Hữu Phát',
        id: '6',
    },
    {
        item: 'Thế Nghiệp',
        id: '7',
    },
    {
        item: 'Quốc Thắng',
        id: '8',
    },
    {
        item: 'Xuân Vỵ',
        id: '9',
    },
    {
        item: 'Thanh An',
        id: '10',
    },
]

const NewjobBody = () => {
    const navigation = useNavigation()
    const [percent, setPercent] = useState(0)

    const Field = [
        '--Chọn lĩnh vực--',
        'Lập trình viên',
        'Hành Chính',
        'Chính trị',
        'Quân sự',
    ]
    const GroupWork = [
        '--Chọn công việc--',
        'Nhóm Designer',
        'Nhóm Dev',
        'Nhóm BA',
        'Nhóm IT',
    ]

    const [selectedTeam, setSelectedTeam] = useState({})
    const [selectedTeams, setSelectedTeams] = useState([])
    function onMultiChange() {
        return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }
    function onChange() {
        return (val) => setSelectedTeam(val)
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }
    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }
    const handleConfirm = (date) => {
        console.log(
            `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
                date.getMinutes() < 10 ? '0' : ''
            }${date.getMinutes()}  ${
                date.getDate() < 10 ? '0' : ''
            }${date.getDate()}/${date.getMonth() + 1 < 10 ? '0' : ''}${
                date.getMonth() + 1
            }/${date.getFullYear()}`
        )
        setData(
            `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
                date.getMinutes() < 10 ? '0' : ''
            }${date.getMinutes()}  ${
                date.getDate() < 10 ? '0' : ''
            }${date.getDate()}/${date.getMonth() + 1 < 10 ? '0' : ''}${
                date.getMonth() + 1
            }/${date.getFullYear()}`
        )
        hideDatePicker()
    }
    const [data, setData] = useState('--Nhấp chọn thời hạn--')
    const hideButton = () => {
        setText('Không thời hạn')
        setShowButton(false)
    }

    const [enableshift, setenableShift] = useState(false)

    const [showModal, setShowModal] = useState(false)

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' enabled={enableshift}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={NewJobBodyTheme.container}>
                        {/* Tien do */}
                        <View style={NewJobBodyTheme.TienDo}>
                            <Text style={NewJobBodyTheme.txtTiendo}>
                                Tiến độ:
                            </Text>
                            <TextInput
                                style={NewJobBodyTheme.txtinputPer}
                                keyboardType={'number-pad'}
                                maxLength={3}
                                contextMenuHidden={true}
                                onChangeText={(text) => {
                                    if (+text > 100) text = 100
                                    setPercent(Number(text))
                                }}
                                onFocus={() => setenableShift(false)}
                            >
                                {percent}
                            </TextInput>
                            <Text style={NewJobBodyTheme.txtPer}>%</Text>
                        </View>
                        <Slider
                            style={NewJobBodyTheme.percentBar}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor='#27AAE1'
                            maximumTrackTintColor='#D6D6D6'
                            thumbTintColor='#27AAE1'
                            value={percent}
                            step={1}
                            onValueChange={setPercent}
                        />

                        {/* Linh vuc */}
                        <Text style={NewJobBodyTheme.txtLinhvuc}>Lĩnh vực</Text>
                        <SelectDropdown
                            data={Field}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            defaultButtonText='--Chọn lĩnh vực--'
                            buttonStyle={{
                                width: '90%',
                                height: 38,
                                marginTop: 8,
                                borderWidth: 1,
                                borderRadius: 8,
                                backgroundColor: '#FFFFFF',
                                borderColor: '#D6D6D6',
                                marginHorizontal: '5%',
                            }}
                            buttonTextStyle={{
                                textAlign: 'left',
                                fontSize: 12,
                                color: '#909090',
                            }}
                            dropdownStyle={{
                                borderRadius: 8,
                            }}
                            rowTextStyle={{
                                fontSize: 12,
                                color: '#909090',
                            }}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <FontAwesome
                                        name={
                                            isOpened
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        color={'#909090'}
                                        width={'16'}
                                        height={'16'}
                                    />
                                )
                            }}
                            dropdownIconPosition={'right'}
                        />

                        {/* Nhom cong viec */}
                        <Text style={NewJobBodyTheme.txtGroupWork}>
                            Nhóm công việc
                        </Text>
                        <SelectDropdown
                            data={GroupWork}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            defaultButtonText='--Chọn công việc--'
                            buttonStyle={{
                                width: '90%',
                                height: 38,
                                marginTop: 8,
                                borderWidth: 1,
                                borderRadius: 8,
                                backgroundColor: '#FFFFFF',
                                borderColor: '#D6D6D6',
                                marginHorizontal: '5%',
                            }}
                            buttonTextStyle={{
                                textAlign: 'left',
                                fontSize: 12,
                                color: '#909090',
                            }}
                            dropdownStyle={{
                                borderRadius: 8,
                            }}
                            rowTextStyle={{
                                fontSize: 12,
                                color: '#909090',
                            }}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <FontAwesome
                                        name={
                                            isOpened
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        color={'#909090'}
                                        width={'16'}
                                        height={'16'}
                                    />
                                )
                            }}
                            dropdownIconPosition={'right'}
                        />

                        {/* Tieu de */}
                        <Text style={NewJobBodyTheme.txtTitle}>Tiêu đề</Text>
                        <TextInput
                            style={NewJobBodyTheme.txtinputTitle}
                            placeholder='Nhập tiêu đề'
                            onFocus={() => setenableShift(false)}
                        />

                        {/* Noi dung */}
                        <Text style={NewJobBodyTheme.txtContent}>Nội dung</Text>
                        <TextInput
                            style={NewJobBodyTheme.txtinputContent}
                            placeholder='Nội dung khác'
                            onFocus={() => setenableShift(false)}
                            numberOfLines={1}
                            multiline={true}
                        />

                        {/* Tai file dinh kem */}
                        <TouchableOpacity style={NewJobBodyTheme.File}>
                            <Text style={NewJobBodyTheme.txtFile}>
                                Tải file đính kèm
                            </Text>
                        </TouchableOpacity>

                        {/* Giao cho ai */}
                        <Text style={NewJobBodyTheme.txtGiaoChoAi}>
                            Giao cho ai
                        </Text>
                        <View>
                            <Modal
                                animationType={'slide'}
                                transparent={true}
                                visible={showModal}
                                onRequestClose={() => {
                                    console.log('Modal has been closed')
                                }}
                            >
                                {/* day la tat ca view cua modal */}
                                <View style={NewJobBodyTheme.modal}>
                                    <View
                                        style={{ width: 350, marginTop: -95 }}
                                    >
                                        <KeyboardAvoidingView
                                            onFocus={() =>
                                                setenableShift(false)
                                            }
                                        >
                                            <SelectBox
                                                listOptionProps={{
                                                    maxHeight: 235,
                                                }}
                                                label={false}
                                                options={NAME}
                                                selectedValues={selectedTeams}
                                                onMultiSelect={onMultiChange()}
                                                onTapClose={onMultiChange()}
                                                isMulti
                                                inputPlaceholder='Chọn'
                                                toggleIconColor='#27AAE1' // icon + -
                                                searchIconColor='#353535' //icon search
                                                arrowIconColor='#888888' // icon show
                                                multiListEmptyLabelStyle={{
                                                    fontSize: 14,
                                                    color: '#353535',
                                                }} // style lable 'Chon'
                                                multiOptionsLabelStyle={{
                                                    fontSize: 12,
                                                    color: '#ffffff',
                                                }} // style ten da chon
                                                multiOptionContainerStyle={{
                                                    backgroundColor: '#27AAE1',
                                                }} // style btn ten da chon
                                                optionContainerStyle={{}} // style của bang hien chon ten tung nguoi
                                                optionsLabelStyle={{
                                                    fontSize: 14,
                                                }} // style ten trong muc chon
                                                inputFilterStyle={{
                                                    fontSize: 12,
                                                }} // style chon trong muc tim ten
                                                width='100%'
                                            />
                                        </KeyboardAvoidingView>
                                    </View>
                                    <TouchableOpacity
                                        style={NewJobBodyTheme.btnClose}
                                        onPress={() => {
                                            setShowModal(!showModal)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#353535',
                                            }}
                                        >
                                            Đóng
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                style={NewJobBodyTheme.btnChon}
                                onPress={() => {
                                    setShowModal(!showModal)
                                }}
                            >
                                <Text
                                    style={{
                                        paddingLeft: 15,
                                        fontSize: 12,
                                        color: '#909090',
                                        paddingTop: 10,
                                    }}
                                >
                                    --Nhấp để chọn và gỡ tên--
                                </Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginHorizontal: '5%',
                                }}
                            >
                                <ScrollView
                                    style={{
                                        paddingVertical: 5,
                                    }}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={true}
                                >
                                    {selectedTeams.map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    paddingRight: 4,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        marginTop: 4,
                                                        borderRadius: 20,
                                                        backgroundColor:
                                                            '#27AAE1',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowModal(
                                                                !showModal
                                                            )
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: '#fff',
                                                                paddingVertical: 10,
                                                                paddingRight: 15,
                                                                paddingLeft: 15,
                                                                textAlign:
                                                                    'center',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {item.item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            </View>
                        </View>

                        {/* Thoi han */}
                        <Text style={NewJobBodyTheme.txtDuration}>
                            Thời hạn
                        </Text>
                        <TouchableOpacity
                            onPress={showDatePicker}
                            style={NewJobBodyTheme.btnDurationBar}
                        >
                            <Text style={NewJobBodyTheme.txtInputDuration}>
                                {data}
                            </Text>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode='datetime'
                                is24Hour={true}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                locale='Vi'
                                cancelTextIOS='Hủy'
                                confirmTextIOS='Chọn'
                            />
                        </TouchableOpacity>

                        {/* button huy va giao viec */}
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 16,
                                marginLeft: 153,
                            }}
                        >
                            <TouchableOpacity style={NewJobBodyTheme.Cancel}>
                                <Text style={NewJobBodyTheme.btnCancel}>
                                    HỦY
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={NewJobBodyTheme.Assign}
                                onPress={() =>
                                    navigation.navigate('WordDetails')
                                }
                            >
                                <Text style={NewJobBodyTheme.btnAssign}>
                                    GIAO VIỆC
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default NewjobBody
