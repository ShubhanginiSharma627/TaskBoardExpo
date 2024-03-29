import React, { useRef, useState } from 'react';
import { Button, Dialog, Portal, Text, TextInput, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const taskPriorities = [
    { value: 'P0', label: 'P0' },
    { value: 'P1', label: 'P1' },
    { value: 'P2', label: 'P2' },
];
const generateRandomId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const taskStatuses = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Deployed", label: "Deployed" },
    { value: "Deferred", label: "Deferred" },
];

const TaskForm = ({ visible, onClose, onSubmit, onUpdateTask, initialTask }) => {
    const [formData, setFormData] = useState(initialTask || {
        id: generateRandomId(),
        title: '',
        description: '',
        startDate: new Date(), // Default to current date
        status: "Pending",
        team: '', // Add if you want to track team
        assignee: '',
        priority: 'P2',
    });

    const handleReset = () => {
        setFormData({
            id: generateRandomId(),
            title: '',
            description: '',
            startDate: new Date(), // Default to current date
            status: "Pending",
            team: '', // Add if you want to track team
            assignee: '',
            priority: 'P2',
        });
    };
    console.log("initial task", initialTask)
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        if (initialTask) {
            const updatedTask = { ...initialTask, [name]: value };
            setFormData(updatedTask);
        }
    };

    const handleSubmit = () => {
        if (initialTask) {
            console.log("formdta", formData);
            onUpdateTask(formData);
        } else {
            onSubmit(formData);
        }
        setFormData({
            id: generateRandomId(),
            title: '',
            description: '',
            startDate: new Date(), // Default to current date
            status: "Pending",
            team: '', // Add if you want to track team
            assignee: '',
            priority: 'P2',
        });
        onClose(); // Close the dialog after submit
    };

    const [openStatusMenu, setOpenStatusMenu] = useState(false);
    const handleStatusChange = (newStatus) => {
        handleChange('status', newStatus);
        setOpenStatusMenu(false);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>{initialTask ? 'Edit Task' : 'Create Task'}</Text>
                    <IconButton icon={() => <MaterialIcons name="cancel" size={24} color="black" />} onPress={onClose} />
                </View>
                <LinearGradient
                    colors={['rgba(223,203,230,1)', 'rgba(155,192,248,1)']}
                    style={{ paddingTop: 10 }}
                >
                    <Dialog.Content>
                        <TextInput
                            label={"Title"}
                            value={formData.title}
                            onChangeText={(text) => handleChange('title', text)}
                            disabled={initialTask ? true : false}
                            style={{ backgroundColor: initialTask ? "whitesmoke" : "#d5d5d5", marginVertical: 10 }}
                        />
                        <TextInput
                            label={"Description"}
                            value={formData.description}
                            onChangeText={(text) => handleChange('description', text)}
                            multiline
                            disabled={initialTask ? true : false}
                            style={{ backgroundColor: initialTask ? "whitesmoke" : "#d5d5d5", marginVertical: 10 }}
                        />
                        <TextInput
                            label={"Team"}
                            value={formData.team}
                            onChangeText={(text) => handleChange('team', text)}
                            disabled={initialTask ? true : false}
                            style={{ backgroundColor: initialTask ? "whitesmoke" : "#d5d5d5", marginVertical: 10 }}
                        />
                        <TextInput
                            label={"Assignee"}
                            value={formData.assignee}
                            onChangeText={(text) => handleChange('assignee', text)}
                            disabled={initialTask ? true : false}
                            style={{ backgroundColor: initialTask ? "whitesmoke" : "#d5d5d5", marginVertical: 10 }}
                        />
                        <View style={{ flexDirection: initialTask ? "row" : "column", justifyContent: 'space-between', alignItems: initialTask ? "center" : "flex-start", marginVertical: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ marginRight: 3 }}> Priority:</Text>
                                <Picker
                                    selectedValue={formData.priority}
                                    onValueChange={(value) => handleChange('priority', value)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="P0" value="P0" />
                                    <Picker.Item label="P1" value="P1" />
                                    <Picker.Item label="P2" value="P2" />
                                </Picker>
                            </View>
                            {initialTask && (
                                <Menu
                                    visible={openStatusMenu}
                                    onDismiss={() => setOpenStatusMenu(false)}
                                    anchor={<Button onPress={() => setOpenStatusMenu(true)} mode="contained-tonal" >{formData.status}</Button>}
                                >
                                    {taskStatuses.map((status) => (
                                        <Menu.Item key={status.value} onPress={() => handleStatusChange(status.value)} title={status.label} />
                                    ))}
                                </Menu>
                            )}
                        </View>
                    </Dialog.Content>
                </LinearGradient>
                <Dialog.Actions style={{paddingVertical:10}}>
                    {!initialTask && (
                        <Button onPress={handleReset} mode="contained" style={{paddingHorizontal:10}}>Reset</Button>
                    )}
                    <Button onPress={handleSubmit} mode="contained" style={{paddingHorizontal:10}}>Submit</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default TaskForm;

const styles = StyleSheet.create({
    picker: {
        height: 10,
        width: 100,
        backgroundColor: 'whitesmoke',
        borderRadius: 25,
    },
})