import React from 'react';
import { Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import { Dialog, IconButton, Portal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function DeleteTask({ openDialog, handleCloseDialog, handleConfirmDelete, taskId, title }) {
  return (
    <Portal>
    <Dialog visible={openDialog} onRequestClose={handleCloseDialog} animationType="slide">
     
        
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,paddingHorizontal:20}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Delete Task</Text>
            <IconButton icon={() => <MaterialIcons name="cancel" size={24} color="black" />} onPress={handleCloseDialog} />
          </View>
          <LinearGradient
                    colors={['rgba(223,203,230,1)', 'rgba(155,192,248,1)']}
                    style={{ paddingTop: 10 }}
                >
          <Dialog.Content style={{ marginTop: 10 }}>
            <Text>Are you sure you want to delete this task?</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{title}</Text>
          </Dialog.Content>
          </LinearGradient>
          <Dialog.Actions style={{ flexDirection: 'row', alignItems:"flex-end", marginTop: 20 }}>
            <Button title="Yes" onPress={() => handleConfirmDelete(taskId)}  />
            <View style={{width:20}}></View>
            <Button title="No" onPress={handleCloseDialog}  />
          </Dialog.Actions>
        
    </Dialog>
    </Portal>
  );
}

export default DeleteTask;
