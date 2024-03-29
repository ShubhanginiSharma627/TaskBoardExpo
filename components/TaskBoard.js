import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Avatar, Button, Text } from 'react-native-paper';
import TaskForm from './TaskForm';
import TaskColumn from './TaskColumn';
import TaskFilter from './TaskFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskBoard = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [taskColumns, setTaskColumns] = useState([
    { status: "Pending", tasks: [] },
    { status: "In Progress", tasks: [] },
    { status: "Completed", tasks: [] },
    { status: "Deployed", tasks: [] },
    { status: "Deferred", tasks: [] },
  ]);
  const [filters, setFilters] = useState({
    assignee: undefined,
    priority: '',
    startDate: '',
    endDate: '',
  });

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  useEffect(() => {
    // Retrieve tasks from AsyncStorage when the component mounts

    retrieveTasks();
  }, []);

  
  useEffect(() => {
    filterTasks(filters);
  }, [allTasks]);

  useEffect(() => {
    console.log("filteredTasks are updated",filteredTasks)
    const updateColumnsTasks = () => {
      setTaskColumns((prevColumns) => {
        return prevColumns.map((column) => ({
          ...column,
          tasks: filteredTasks.filter((task) => task.status === column.status),
        }));
      });
    };
    updateColumnsTasks();

  }, [filteredTasks]);

  const handleOpenTaskForm = () => {
    setOpenTaskForm(true);
  };

  const retrieveTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setAllTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error retrieving tasks:', error);
    }
  };

  const storeTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error storing tasks:', error);
    }
  };

  const deleteTask = (taskId) => {
    const updatedAllTasks = allTasks.filter((task) => task.id !== taskId);
    const updatedFilteredTasks = filteredTasks.filter((task) => task.id !== taskId);
    setAllTasks(updatedAllTasks);
    setFilteredTasks(updatedFilteredTasks);
    storeTasks(updatedAllTasks);
  };

  const addTask = (newTask) => {
    setAllTasks([...allTasks, newTask]);
    storeTasks([...allTasks, newTask])
  };

  const updateTask = (updatedTask) => {
    console.log("task updated",updatedTask);
    const updatedAllTasks = allTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    const updatedFilteredTasks = filteredTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
   
    setAllTasks(updatedAllTasks);
    storeTasks(updatedAllTasks);
  };

  const filterTasks = (filters) => {
    const filteredTasks = allTasks.filter((task) => {
      // Check if the task matches the filter criteria
      const assigneeMatch = !filters.assignee || task.assignee.toLowerCase().includes(filters.assignee.toLowerCase());
      const priorityMatch = !filters.priority || task.priority === filters.priority;
      const startDateMatch = !filters.startDate || new Date(task.startDate) >= new Date(filters.startDate);
      const endDateMatch = !filters.endDate || new Date(task.startDate) <= new Date(filters.endDate);
  
      // Return true only if all filter criteria are met
      return assigneeMatch && priorityMatch && startDateMatch && endDateMatch;
    });
    setFilters(filters);
    setFilteredTasks(filteredTasks);
  };
  

  const handleDrop = (item, columnStatus) => {
    const { id, sourceStatus } = item;
    if (sourceStatus !== columnStatus) {
      onUpdateTask(id, columnStatus);
    }
  };

  const onUpdateTask = (taskId, newStatus) => {
    setAllTasks((prevAllTasks) => {
      const updatedAllTasks = prevAllTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        } else {
          return task;
        }
      });
      storeTasks(updatedAllTasks);
      return updatedAllTasks;
    });
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ fontSize: 24 }}>Task Board</Text>
          <Avatar.Icon icon="account-circle" size={48} />
        </View>
        <ScrollView>
          <View>
            <TaskFilter onFilter={filterTasks} />
            <Button mode="contained" onPress={handleOpenTaskForm} style={{ marginVertical: 20 }}>
              Add New Task
            </Button>
          </View>
          <TaskForm visible={openTaskForm} onClose={() => setOpenTaskForm(false)} onSubmit={addTask} />
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            {taskColumns.map(({ status, tasks }) => (
              <TaskColumn key={status} bgcolor={status === "Pending" ? "#D3D3D3" : status === "In Progress" ? "#fda63a" : status === "Completed" ? "#74c365" : status === "Deployed" ? "#000435" : "#f88379"} status={status} tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask}  />
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default TaskBoard;
