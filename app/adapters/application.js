import Adapter from '@ember-data/adapter';
import { NotFoundError } from 'ember-data/adapters/errors';
export default class ApplicationAdapter extends Adapter {
  async findRecord(_store, typeClass, id) {
    const result = await window.desktopAPI.dataStore.findRecord(
      typeClass.modelName,
      id,
    );
    if (!result) throw new NotFoundError();
    return result;
  }
  createRecord(_store, typeClass, snapshot) {
    return window.desktopAPI.dataStore.create(
      typeClass.modelName,
      snapshot.serialize(),
    );
  }

  updateRecord(_store, typeClass, snapshot) {
    return window.desktopAPI.dataStore.update(typeClass.modelName, {
      id: snapshot.id,
      ...snapshot.serialize(),
    });
  }

  findAll(_store, typeClass) {
    return window.desktopAPI.dataStore.findAll(typeClass.modelName);
  }

  deleteRecord(_store, typeClass, snapshot) {
    return window.desktopAPI.dataStore.destroy(
      typeClass.modelName,
      snapshot.id,
    );
  }
}
