module.exports = model => {
  model.findOrFail = async function(query = {}, response) {
    const record = await this.findOne(query);
    if (!record) {
      return response.status(404).json({
        message: "Data not found"
      });
    }
    return record;
  };
};
