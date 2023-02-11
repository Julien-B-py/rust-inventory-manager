import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LayersIcon from '@mui/icons-material/Layers';

import { calcProfitability, formatPrice, formatPriceFromAPI, calcSteamFee, isProfit } from '@/utils/rustItem';

import styles from './RustItem.module.css'

export default function RustItem({ item }) {
    return (
        <a className={styles.item__container} href={item.buyNowUrl}>
            <div className={styles.item} style={{ backgroundImage: `linear-gradient(45deg, ${item.iconAccentColour}1A 5%, transparent 55%, transparent 75%, ${item.iconAccentColour}1A 100%)` }}>
                <img src={item.iconUrl} />
                <p className={styles.item__name} style={{ color: item.foregroundColour }} >{item.name}</p>

                <p className={styles.item__price}>{formatPriceFromAPI(item.buyNowPrice)}€ ({calcSteamFee(item.buyNowPrice)}€)</p>

                <div>
                    {item.stacks.map((stack, index) =>
                    (<div key={index}>
                        {!stack.minGrossSellingPrice
                            ? <p>Absent du fichier Excel</p>
                            : <p className={isProfit(item.buyNowPrice, stack.minGrossSellingPrice) ? styles.yes : styles.no}>
                                {stack.purchasePrice.toFixed(2)}€ ({formatPrice(stack.minGrossSellingPrice)}€) {calcProfitability(item.buyNowPrice, stack.purchasePrice)}%
                            </p>}
                    </div>)
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "auto" }}>
                    <div
                        className={styles.item__qty}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.25rem", filter: `drop-shadow(0 1px 0px ${item.iconAccentColour})`
                        }}
                    >
                        <LayersIcon />{item.tradableamount}</div>
                    <div>{item.stacks.length - item.tradableamount}</div>
                    {item.quantity - item.tradableamount > 0 &&
                        <div
                            className={styles.item__qty}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.25rem", filter: `drop-shadow(0 1px 0px ${item.iconAccentColour})`
                            }}
                        >
                            <AccessTimeIcon fontSize="small" />{item.quantity - item.tradableamount} en attente
                        </div>}
                </div>

            </div>
        </a>
    )
}