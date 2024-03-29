import React from 'react';
import { Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

function DeleteTask({ openDialog, handleCloseDialog, handleConfirmDelete, taskId, title }) {
  return (
    <Modal visible={openDialog} onRequestClose={handleCloseDialog} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Delete Task</Text>
            <IconButton icon={() => <MaterialIcons name="cancel" size={24} color="black" />} onPress={handleCloseDialog} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>Are you sure you want to delete this task?</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{title}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title="Yes" onPress={() => handleConfirmDelete(taskId)} color="red" />
            <Button title="No" onPress={handleCloseDialog} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DeleteTask;
