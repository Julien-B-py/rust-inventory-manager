// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  const { steamId } = req.body;
  const profileSummaryResponse = await fetch(`https://rust.scmm.app/api/profile/${steamId}/summary`);
  const profileSummaryData = await profileSummaryResponse.json();

  const rustInventoryResponse = await fetch(`https://rust.scmm.app/api/profile/${profileSummaryData.steamId}/inventory/items?currency=eur`)
  const rustInventoryData = await rustInventoryResponse.json();

  res.json(rustInventoryData)
}
