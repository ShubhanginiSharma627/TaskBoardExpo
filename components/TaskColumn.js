import React, { useState, useRef } from 'react';
import { View, Text, Button,  TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardContent, Divider,  Menu,  Popover } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskForm from './TaskForm';
import DeleteTask from './DeleteTask';


const TaskColumn = ({ status, tasks, onUpdateTask, bgcolor, onDeleteTask }) => {
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(status || '');
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openStatusMenu, setOpenStatusMenu] = useState(false);
    const handleMenuClick = (taskId) => {
        setAnchorEl(taskId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {
        setOpenStatusMenu(true);
    };
    const handleStatusMenuClose = () => {
        setOpenStatusMenu(false);
    };
    const handleStatusChange = (task, newStatus) => {
        const updatedTask = { ...task, status: newStatus };
        onUpdateTask(updatedTask);
        setOpenStatusMenu(false);
    };

    const handleDeleteClick = () => {
        setAnchorEl(null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = (taskId) => {
        onDeleteTask(taskId);
        setOpenDialog(false);
    };

    return (
        <View style={styles.taskColumn}>

            <View style={{ backgroundColor: bgcolor, padding: 5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Text style={[styles.status]}>{status}</Text>
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:10}}>
            { tasks && tasks.map((task) => (
                <Card key={task.id} style={styles.taskCard}>
                    <Card.Content>
                    <View style={styles.cardContent}>
                            <Text style={styles.title}>{task.title}</Text>
                            <Text style={styles.priority}>{task.priority}</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <Text style={styles.description}>{task.description}</Text>
                        <View style={styles.cardContent}>
                            <Text style={styles.assignee}>@{task.assignee}</Text>
                            
                  
                          <Menu
                            visible={anchorEl && anchorEl === task.id}
                            anchor={<TouchableOpacity onPress={()=>handleMenuClick(task.id)}>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                         </TouchableOpacity>}
                            onDismiss={handleMenuClose}
                            anchorStyle={styles.popover}
                            >
                            <Menu.Item onPress={() => {setOpenTaskForm(true); setAnchorEl(false);}} title={"Edit"} />
                           {task.status!=="Completed" &&  <Menu.Item onPress={handleDeleteClick} title={"Delete"} />}
                        </Menu>
                        </View>
                        <TaskForm visible={openTaskForm} onClose={() => setOpenTaskForm(false)} onUpdateTask={onUpdateTask} initialTask={task} />
                        <DeleteTask
                            openDialog={openDialog}
                            handleCloseDialog={handleCloseDialog}
                            handleConfirmDelete={handleConfirmDelete}
                            taskId={task.id}
                            title={task.title}
                        />
                        <View style={styles.statusButtonContainer}>
                            <Menu
                                visible={openStatusMenu}
                                onDismiss={handleStatusMenuClose}
                                anchor={<Button onPress={handleClick} title={selectedStatus ==="Pending" ? "Assign" :selectedStatus }/>}
                            >
                                <Menu.Item onPress={() => handleStatusChange(task, "Pending")} title={"Assign"}  />
                                <Menu.Item onPress={() => handleStatusChange(task, "In Progress")} title={"In Progress"}  />
                                <Menu.Item onPress={() => handleStatusChange(task, "Completed")}title={"Completed"}  />
                                <Menu.Item onPress={() => handleStatusChange(task, "Deployed")} title={"Deployed"}  />
                                <Menu.Item onPress={() => handleStatusChange(task, "Deferred")} title={"Deferred"}  />
                            </Menu>
                        </View>
                    </Card.Content>
                </Card>

            ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskColumn: {
        marginBottom: 20,
        marginHorizontal: 20,
        flex: 1,
        borderRadius: 10,
        minHeight: 500,
        width: 300,
        backgroundColor: "#fff",
        
    },

    status: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: "800",
        color: "#fff"
    },
    taskCard: {
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: '#f5f5f5',

    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
    },
    priority: {
        backgroundColor: '#1976d2',
        padding: 5,
        borderRadius: 3,
        color: '#fff',
    },
    divider: {
        marginVertical: 10,
    },
    description: {
        marginBottom: 10,
    },
    assignee: {
        fontWeight: 'bold',
    },
    statusButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    popover: {
        marginTop: 5,
        marginLeft: 150,
    },
});

export default TaskColumn;
