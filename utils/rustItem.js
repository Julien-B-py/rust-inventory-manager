export const formatPriceFromAPI = price => (price / 100).toFixed(2)

export const formatPrice = price => price.toFixed(2)

export const calcSteamFee = price => ((price / 115) - 0.01).toFixed(2)

export const isProfit = (currentPrice, minSellingPrice) => Number(currentPrice / 100).toFixed(2) > Number(minSellingPrice.toFixed(2))

export const calcProfitability = (currentPrice, purchasePrice) => {
    const rate = ((Number(currentPrice) / 115 * 100) / Number(purchasePrice))
    return (rate - 100).toFixed(2)
}

