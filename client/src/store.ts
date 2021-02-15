import { createStore, action } from 'easy-peasy';

export const store = createStore({
  machines: [],
  addSensor: action((state, payload) => {
    const { machineId, sensor } = payload;
    // Find machine if id
    const machine = state.machines.find(machine => machine.id == machineId);
    if(machine != undefined){
      // add sensor to sensor array
      machine.sensors.push(sensor);
      // delete old machine 
      state.machines.splice(state.machines.findIndex(machine => machine.id == machineId), 1);
      // add new machine
      state.machines.push(machine);
    }else{
      // no specific machine was found - alert

    }
  }),
  addMachine: action((state, payload) => {
    const machine = payload;
    state.machines.push(machine);
  }),
  alert: "",
  loading: false
});

// // Create typed hooks
// const typedHooks = createTypedHooks<StoreModel>();

// export const useStoreActions = typedHooks.useStoreActions;
// export const useStoreDispatch = typedHooks.useStoreDispatch;
// export const useStoreState = typedHooks.useStoreState;