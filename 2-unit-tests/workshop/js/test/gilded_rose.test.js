const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  // 1 - All items have a SellIn value
  it("should have a SellIn value", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    expect(gildedRose.items[0].sellIn).toBe(10);
  });
  // 2 - All items have a Quality value
  it("should have a Quality value", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    expect(gildedRose.items[0].quality).toBe(20);
  });
  // 3 - At the end of each day our system lowers both values for every item
  //Don't work for special items with special rules
  it("should lower the SellIn and Quality values by 1", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(9);
    expect(gildedRose.items[0].quality).toBe(19);
  });
  // 4 - Once the sell by date has passed, Quality degrades twice as fast
  it("should lower the Quality value by 2 when the sell by date has passed", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(18);
  });
  // 5 - The Quality of an item is never negative
  it("should never have a negative Quality value", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });
  // 6 -"Aged Brie" actually increases in Quality the older it gets
  //Quality increases by 1 when SellIn is greater or equal than 0, and by 2 when SellIn is less than 0
  it("should increase the Quality value by 1 when the item is Aged Brie", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(1);
    expect(gildedRose.items[0].quality).toBe(1);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
    expect(gildedRose.items[0].quality).toBe(2);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(4);
  });
  // 7 - The Quality of an item is never more than 50
  it("should never have a Quality value greater than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(50);
  });
  // 8 - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it("should never has to be sold or decreases in Quality", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
    expect(gildedRose.items[0].quality).toBe(80);
  });
  // 9 - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;

  it("should increases in Quality as its SellIn value approaches", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
    ]);
    //Quality increases by 2 when there are 10 days or less
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(5);
    expect(gildedRose.items[0].quality).toBe(22);
    //Quality increases by 3 when there are 5 days or less
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(4);
    expect(gildedRose.items[0].quality).toBe(25);
    //Quality drops to 0 after the concert
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });
  // 10 - "Conjured" items degrade in Quality twice as fast as normal items
  it("should degrade in Quality twice as fast as normal items", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(18);
  });
});
