const toDomainModel = function toDomainModel(databaseDoc, DomainModel) {
  return new DomainModel(databaseDoc);
};

module.exports = {
  toDomainModel,
};
