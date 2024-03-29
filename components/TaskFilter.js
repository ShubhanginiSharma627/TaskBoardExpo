import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker



const TaskFilter = ({ onFilter }) => {
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // State for showing start date picker
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // State for showing end date picker
  const [open, setOpen] = useState(false);
  const handleAssigneeFilter = (value) => {
    setAssignee(value);
    handleFilter(value, priority, startDate, endDate);
  };

  const handlePriorityFilter = (value) => {
    setPriority(value);
    handleFilter(assignee, value, startDate, endDate);
  };

  const handleStartDateFilter = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
    if(endDate<currentDate){
        setEndDate(undefined)
    }
    handleFilter(assignee, priority, currentDate, endDate);
  };

  const handleEndDateFilter = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    if(currentDate<startDate){
        setStartDate(undefined);
    }
    handleFilter(assignee, priority, startDate, currentDate);
  };

  const handleFilter = (newAssignee, newPriority, newStartDate, newEndDate) => {
    const filters = {
      assignee: newAssignee.trim() ? newAssignee : undefined,
      priority: newPriority || undefined,
      startDate: newStartDate || undefined,
      endDate: newEndDate || undefined,
    };
    onFilter(filters);
  };

  return (
    <View>
        <Text>Filter By:</Text>
      <View style={styles.row}>
        <TextInput
          label="Assignee"
          placeholder="Assignee"
          value={assignee}
          onChangeText={handleAssigneeFilter}
          style={styles.input}
        />
       
        <Picker
          selectedValue={priority}
          onValueChange={handlePriorityFilter}
          style={styles.picker}
        >
          <Picker.Item label="All Priorities" value="" />
          <Picker.Item label="P0" value="P0" />
          <Picker.Item label="P1" value="P1" />
          <Picker.Item label="P2" value="P2" />
        </Picker>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.datePicker}>{startDate ? startDate.toDateString() : 'Start Date'}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={handleStartDateFilter}
          />
        )}
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.datePicker}>{endDate ? endDate.toDateString() : 'End Date'}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={handleEndDateFilter}
          />
        )}
      </View>
      <View style={{flexDirection:"row",alignItems:"center",marginVertical:20}}>
        <Text style={{ marginRight: 10 }}>Sort By:</Text>
        
        <Picker
          selectedValue={priority}
          onValueChange={handlePriorityFilter}
          style={styles.picker}
          
        >
          <Picker.Item label="All Priorities" value="" style={{paddingBottom:100}}/>
          <Picker.Item label="P0" value="P0" />
          <Picker.Item label="P1" value="P1" />
          <Picker.Item label="P2" value="P2" />
        </Picker>
    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:"center",
    flexWrap:"wrap",
    marginVertical: 10,
    justifyContent:"space-around"
  },
  input: {
   
    height: 40,
    width: 150,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
    paddingHorizontal: 5,
    paddingVertical:0,
    minHeight: 37,
    width: 150,
    backgroundColor: 'whitesmoke',
   
  },
  datePicker: {
    margin: 10,
    height: 40,
    width: 150,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    paddingHorizontal:15,
    textAlignVertical: 'center',
  },
});

export default TaskFilter;
