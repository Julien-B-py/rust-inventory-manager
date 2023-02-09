import { readExcelData } from "@/utils/readExcel";

export default async function handler(req, res) {

  const { steamId } = req.body;

  const syncInventoryResponse = await fetch(`https://rust.scmm.app/api/profile/${steamId}/inventory/sync`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
    }
  );
  const syncInventoryData = await syncInventoryResponse.text()

  const profileSummaryResponse = await fetch(`https://rust.scmm.app/api/profile/${steamId}/summary`);
  const profileSummaryData = await profileSummaryResponse.json();

  const rustInventoryResponse = await fetch(`https://rust.scmm.app/api/profile/${profileSummaryData.steamId}/inventory/items?currency=eur`)
  const rustInventoryData = await rustInventoryResponse.json();

  const stonkingItemsResponse = await fetch('https://scmm.app/api/stats/items/allTimeHigh?start=0&count=20&currency=eur');
  let stonkingItemsData = await stonkingItemsResponse.json();

  const inventoryTotalResponse = await fetch(`https://rust.scmm.app/api/profile/${profileSummaryData.steamId}/inventory/total?currency=eur`)
  const inventoryTotalData = await inventoryTotalResponse.json();

  for (const item of rustInventoryData) {
    const { stacks } = item;
    let tradable = 0;
    for (const stack of stacks) {
      if (stack.tradableAndMarketable) tradable += stack.quantity
    }
    item.tradableamount = tradable
  }

  const cleanedStonking = []
  for (const item of stonkingItemsData.items) {
    const stokingItem = rustInventoryData.find(x => x.id === item.id)
    if (stokingItem) cleanedStonking.push(stokingItem)
  }

  stonkingItemsData = cleanedStonking;

  const groupedArray = readExcelData();

  res.json({ profil: profileSummaryData, inventory: rustInventoryData, stonking: stonkingItemsData, stats: inventoryTotalData, itemsToSell: groupedArray })
}
