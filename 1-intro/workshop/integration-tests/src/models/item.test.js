const { it } = require("@jest/globals");
const Item = require("./item");
const mongoose = require("mongoose");
/* const {
    createItem,
    listItems,
  } = require("../services/itemService"); */

const itemData = {
  name: "My item",
};

beforeAll(async () => {
  await mongoose
    .connect("mongodb://mongo:27017/docker-node-mongo", {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
});

afterAll(async () => {
  await Item.deleteMany({}, (err) => {
    if (err) console.log(`error: ${err}`);
  });
});

it("Get items if not empty", async () => {
  const item = new Item({ name: "item1" });
  const item2 = new Item({ name: "item2" });

  await item.save();
  await item2.save();

  const items = await Item.find({}, (err, docs) => {
    if (err) console.log(`error: ${err}`);
    else return docs;
  });
  expect(items.length).toBe(2);
});

it("Get items if empty", async () => {
  await Item.deleteMany({}, (err) => {
    if (err) console.log(`error: ${err}`);
  });
  const items = Item.find({});
  expect(items.length).toBeUndefined();
});

it("Create item", async () => {
  const item = new Item(itemData);
  await item.save();

  const items = await Item.find(
    { name: { $eq: itemData.name } },
    (err, docs) => {
      if (err) console.log(`error: ${err}`);
    }
  );

  expect(items[0].name).toBe(itemData.name);
  expect(items.length).toBe(1);
  expect(items[0].date).not.toBe(undefined);
});

it("Update item", async () => {
  await Item.deleteMany({}, (err) => {
    if (err) console.log(`error: ${err}`);
  });

  const item = new Item(itemData);
  await item.save();

  const item2 = "new name";
  await Item.updateOne(
    { name: { $eq: item.name } },
    { name: String(item2) },
    (err) => {
      if (err) console.log(`error: ${err}`);
    }
  );

  const items = await Item.find({ name: { $eq: item2 } }, (err, docs) => {
    if (err) console.log(`error: ${err}`);
  });
  expect(items.length).toBe(1);
  expect(items[0].name).toBe(item2);
});

it("Delete items", async () => {
  await Item.deleteMany({}, (err) => {
    if (err) console.log(`error: ${err}`);
  });
  const items = Item.find({});
  expect(items.length).toBeUndefined();
});

it("Delete item", async () => {
  const item = new Item(itemData);
  await item.save();

  const items = await Item.find(
    { name: { $eq: itemData.name } },
    (err, docs) => {
      if (err) console.log(`error: ${err}`);
    }
  );

  expect(items.length).toBe(1);

  await Item.deleteOne({ name: { $eq: itemData.name } }, (err) => {
    if (err) console.log(`error: ${err}`);
  });

  const items2 = await Item.find(
    { name: { $eq: itemData.name } },
    (err, docs) => {
      if (err) console.log(`error: ${err}`);
    }
  );

  expect(items2.length).toBe(0);
});
