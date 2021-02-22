const mongoose = require('mongoose');

const toDomainModel = function toDomainModel(databaseDoc, DomainModel) {
  return new DomainModel(databaseDoc);
};

const toObjectId = function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

module.exports = {
  toDomainModel,
  toObjectId
};
