import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const { width, height } = Dimensions.get('window')
import SelectDropdown from 'react-native-select-dropdown'

const ItemList = () => {
    const [jobs, setJobs] = useState([])
    const [teams, setTeams] = useState([])
    const status = [
        'Được giao',
        'Cần thực hiện',
        'Đang thực hiện',
        'Đã hoàn thành',
        'Đã phê duyệt',
        'Việc giao cho tôi',
        'Việc tôi giao',
    ]

    const jobsDropdownRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            setJobs([
                {
                    title: 'Lập trình viên',
                    teams: [
                        { title: 'Nhóm Design' },
                        { title: 'Nhóm DEV' },
                        { title: 'Nhóm BA' },
                        { title: 'Nhóm IT' },
                    ],
                },
                {
                    title: 'Hành chính',
                    teams: [
                        { title: 'Nhóm Design' },
                        { title: 'Nhóm DEV' },
                        { title: 'Nhóm BA' },
                        { title: 'Nhóm IT' },
                    ],
                },
                {
                    title: 'Chính trị',
                    teams: [
                        { title: 'Nhóm Design' },
                        { title: 'Nhóm DEV' },
                        { title: 'Nhóm BA' },
                        { title: 'Nhóm IT' },
                    ],
                },
                {
                    title: 'Quân sự',
                    teams: [
                        { title: 'Nhóm Design' },
                        { title: 'Nhóm DEV' },
                        { title: 'Nhóm BA' },
                        { title: 'Nhóm IT' },
                    ],
                },
            ])
        }, 1000)
    }, [])

    return (
        <SafeAreaView style={styles.saveAreaViewContainer}>
            <StatusBar backgroundColor='#000' barStyle='light-content' />
            <View style={styles.viewContainer}>
                <ScrollView horizontal={true}>
                    <View style={styles.dropdownsRow}>
                        {/* select job */}
                        <SelectDropdown
                            data={jobs}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                jobsDropdownRef.current.reset()
                                setTeams([])
                                setTeams(selectedItem.teams)
                            }}
                            defaultButtonText={'Lĩnh vực'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.title
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.title
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <FontAwesome
                                        name={
                                            isOpened
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        color={'white'}
                                        size={18}
                                    />
                                )
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />

                        {/* select teams  */}
                        <View style={{ width: 12 }} />
                        <SelectDropdown
                            ref={jobsDropdownRef}
                            data={teams}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                //
                            }}
                            defaultButtonText={'Nhóm'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.title
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.title
                            }}
                            buttonStyle={styles.dropdown2BtnStyle}
                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <FontAwesome
                                        name={
                                            isOpened
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        color={'white'}
                                        size={16}
                                    />
                                )
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown2DropdownStyle}
                            rowStyle={styles.dropdown2RowStyle}
                            rowTextStyle={styles.dropdown2RowTxtStyle}
                        />

                        {/* select status  */}
                        <View style={{ width: 12 }} />
                        <SelectDropdown
                            data={status}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            defaultButtonText={'Trạng thái'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <FontAwesome
                                        name={
                                            isOpened
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        color={'white'}
                                        size={16}
                                    />
                                )
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    saveAreaViewContainer: {
        height: '8%',
    },
    viewContainer: {
        height: '100%',
    },
    dropdownsRow: {
        width: '100%',
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },

    dropdown1BtnStyle: {
        width: width * 0.4,
        height: height * 0.043,
        backgroundColor: '#27AAE1',
        borderRadius: 35,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {
        color: 'white',
        textAlign: 'left',
        fontSize: height * 0.02,
    },
    dropdown1DropdownStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
    },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown1RowTxtStyle: {
        color: '#27AAE1',
        textAlign: 'left',
        fontSize: 14,
    },

    dropdown2BtnStyle: {
        width: width * 0.4,
        height: height * 0.043,
        backgroundColor: '#27AAE1',
        borderRadius: 35,
        borderColor: '#444',
    },
    dropdown2BtnTxtStyle: {
        color: 'white',
        textAlign: 'left',
        fontSize: height * 0.02,
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
    },
    dropdown2RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown2RowTxtStyle: {
        color: '#27AAE1',
        textAlign: 'left',
        fontSize: 14,
    },
})

export default ItemList
