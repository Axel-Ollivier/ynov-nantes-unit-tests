const { it } = require("@jest/globals");
const { item } = require("./item");
const mongoose = require("mongoose");
const {
    createItem,
    listItems,
  } = require("../services/itemService");

const itemData = {
    name: "My item",
};

it("should item schema be valid", () => {
  const schema = {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  };

  const valid = mongoose.Schema.Types.Mixed.checkSchema(schema);

  expect(valid).toBeTruthy();
});

it('test get items', () => {
    const items = listItems();
    expect(items).toBeTruthy();
});

it('test create item', async () => {
    const validItem = new item(itemData);
    const savedItem = await createItem(itemData);
    expect(savedItem.name).toEqual(itemData.name);
});

it('test upd item', () => {

});

it('test delete item', () => {

});