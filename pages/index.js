import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './index.module.css'

import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ steamId }) {

  const [currentSteamId, setCurrentSteamId] = useState(steamId)
  const [rustInventory, setRustInventory] = useState();

  const handleChange = e => setCurrentSteamId(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/hello",
      {
        body: JSON.stringify({ steamId: currentSteamId }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
      }
    );
    const data = await response.json()
    console.log(data)
    setRustInventory(data)
    console.log(rustInventory)
  }

  // const DUMMY_DATA = [{
  //   "quantity": 1,
  //   "stacks": [
  //     {
  //       "steamId": "4006543796305807811",
  //       "quantity": 1,
  //       "tradableAndMarketable": true
  //     }
  //   ],
  //   "averageBuyPrice": 0,
  //   "originalPrice": 89,
  //   "buyNowFrom": "SteamCommunityMarket",
  //   "buyNowPrice": 1790,
  //   "buyNowUrl": "https://steamcommunity.com/market/listings/252490/Blackout%20Hoodie",
  //   "subscriptions": 31016,
  //   "supplyTotalEstimated": 33287,
  //   "supply": 45,
  //   "demand": 29,
  //   "actions": [
  //     {
  //       "icon": "fa-tools",
  //       "name": "View Workshop",
  //       "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=2080975449"
  //     },
  //     {
  //       "icon": "fa-balance-scale-left",
  //       "name": "View Market",
  //       "url": "https://steamcommunity.com/market/listings/252490/Blackout%20Hoodie"
  //     },
  //     {
  //       "icon": "fa-shopping-cart",
  //       "name": "View Store",
  //       "url": "/store/2020-05-08-1835"
  //     }
  //   ],
  //   "priceMovement": 1701,
  //   "id": 3809161299,
  //   "appId": 252490,
  //   "name": "Blackout Hoodie",
  //   "itemType": "Hoodie",
  //   "hasGlow": false,
  //   "backgroundColour": "#42413e",
  //   "foregroundColour": "#a7ec2e",
  //   "iconAccentColour": "#666666",
  //   "iconUrl": "https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835BZ4WLGfCk4nReh8DEiv5dQOa0_rLY3QP5UgG1iqQ",
  //   "timeCreated": "2020-05-01T21:19:39+12:00",
  //   "timeAccepted": "2020-05-08T18:34:07+00:00"
  // },
  // {
  //   "quantity": 16,
  //   "stacks": [
  //     {
  //       "steamId": "4577332744578051421",
  //       "quantity": 14,
  //       "tradableAndMarketable": true
  //     },
  //     {
  //       "steamId": "5555742936964020929",
  //       "quantity": 1,
  //       "tradableAndMarketable": true
  //     },
  //     {
  //       "steamId": "5555742936970052055",
  //       "quantity": 1,
  //       "tradableAndMarketable": true
  //     }
  //   ],
  //   "averageBuyPrice": 0,
  //   "originalPrice": 210,
  //   "buyNowFrom": "SteamCommunityMarket",
  //   "buyNowPrice": 1396,
  //   "buyNowUrl": "https://steamcommunity.com/market/listings/252490/Forest%20Raiders%20Pants",
  //   "subscriptions": 27928,
  //   "supplyTotalEstimated": 29761,
  //   "supply": 49,
  //   "demand": 33,
  //   "actions": [
  //     {
  //       "icon": "fa-tools",
  //       "name": "View Workshop",
  //       "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=2563935722"
  //     },
  //     {
  //       "icon": "fa-balance-scale-left",
  //       "name": "View Market",
  //       "url": "https://steamcommunity.com/market/listings/252490/Forest%20Raiders%20Pants"
  //     },
  //     {
  //       "icon": "fa-shopping-cart",
  //       "name": "View Store",
  //       "url": "/store/2021-08-12-2033"
  //     }
  //   ],
  //   "priceMovement": 1186,
  //   "id": 4532464795,
  //   "appId": 252490,
  //   "name": "Forest Raiders Pants",
  //   "itemType": "Pants",
  //   "hasGlow": false,
  //   "backgroundColour": "#42413e",
  //   "foregroundColour": "#a7ec2e",
  //   "iconAccentColour": "#797C4F",
  //   "iconUrl": "https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835da5WLEfCk4nReh8DEiv5daOqA7qLIwQPy8bbn-G7A",
  //   "timeCreated": "2021-08-02T09:55:37+12:00",
  //   "timeAccepted": "2021-08-12T20:32:01.8085788+00:00"
  // }]

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form>
          <h1>Check your Steam inventory</h1>
          <label htmlFor='steamId'>SteamID64</label>
          <input type="text" id="steamId" name="steamId" required value={currentSteamId || ""} onChange={handleChange} />
          <input type="submit" name="search" value="Search" onClick={handleSubmit} />
        </form>

        <div className='container'>
          <div className={styles.inventory}>
            {rustInventory?.map(item => (
              <a href={item.buyNowUrl}>
                <div className={styles.item} style={{ backgroundImage: `linear-gradient(45deg, ${item.iconAccentColour}1A 5%, transparent 55%, transparent 75%, ${item.iconAccentColour}1A 100%)` }}>
                  <img src={item.iconUrl} />
                  <p className={styles.item__name} style={{ color: item.foregroundColour }} >{item.name}</p>
                  <p className={styles.item__qty}>{item.quantity}</p>
                  <p></p>
                  <p className={styles.item__price}>{(item.buyNowPrice / 100).toFixed(2)}€</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}

export async function getServerSideProps() {
  const steamId = process.env.STEAM_ID;
  return {
    props: { steamId: steamId }
  }
}