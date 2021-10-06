import Adapter from '@ember-data/adapter';

export default Adapter.extend({
  findRecord(store, typeClass, id){
    return window.desktopAPI.dataStore.findRecord(typeClass.modelName, id)
  }
  createRecord(){
    window.desktopAPI.dataStore.save
  }
  updateRecord() {
   window.desktopAPI.dataStore.save
  }
  findAll() {
    window.desktopAPI.dataStore.findAll
  }
});
