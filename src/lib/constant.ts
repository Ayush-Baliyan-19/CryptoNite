import { ChartConfig } from "@/components/ui/chart";

export const siteConfig = {
  title: "CryptoNite - Cryptocurrency Dashboard",
  description:
    "CryptoNite is a cryptocurrency dashboard that provides real-time data for over 1000 cryptocurrencies.",
  keywords: [
    "cryptonite",
    "cryptocurrency",
    "dashboard",
    "bitcoin",
    "ethereum",
    "litecoin",
    "dogecoin",
    "ripple",
    "cardano",
    "polkadot",
    "solana",
    "uniswap",
    "chainlink",
    "binance",
    "coinbase",
    "kraken",
    "bitfinex",
    "bitstamp",
    "gemini",
    "kucoin",
    "Crypto Tracker",
    "Real-Time Updates",
    "Market Analysis",
    "Historical Data",
    "Cryptocurrency Prices",
    "Next.js",
    "Crypto Trends",
    "Digital Currency",
    "Crypto Market",
  ],
};

export const chartData = [
  { month: "January", desktop: 186, mobile: 80, Tablet: 100 },
  { month: "February", desktop: 305, mobile: 200, Tablet: 150 },
  { month: "March", desktop: 237, mobile: 120, Tablet: 200 },
  { month: "April", desktop: 73, mobile: 190, Tablet: 100 },
  { month: "May", desktop: 209, mobile: 130, Tablet: 150 },
  { month: "June", desktop: 214, mobile: 140, Tablet: 200 },
];

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  Tablet: {
    label: "Tablet",
    color: "#93c5fd",
  },
} satisfies ChartConfig;

export const searchDatabase = [
  {
    image: "/tokenImages/bitcoin.webp",
    endPoint:"bitcoin",
    name:"Bitcoin"
  },
  {
    image:"/tokenImages/ethereum.webp",
    endPoint:"Ethereum",
    name:"Ethereum"
  },
  {
    image:"/tokenImages/litecoin.webp",
    endPoint:"Litecoin",
    name:"Litecoin"
  },
  {
    image:"/tokenImages/dogecoin.webp",
    endPoint:"Dogecoin",
    name:"Dogecoin"
  },
  {
    image:"/tokenImages/tether.webp",
    endPoint:"tether",
    name:"Tether"
  },
  {
    image:"/tokenImages/polkadot.webp",
    endPoint:"Polkadot",
    name:"Polkadot"
  },
  {
    image:"/tokenImages/solana.webp",
    endPoint:"Solana",
    name:"Solana"
  },
  {
    image:"/tokenImages/uniswap.webp",
    endPoint:"Uniswap",
    name:"Uniswap"
  },
  // "Chainlink":{
  //   image:"/tokenImages/chainlink.webp",
  //   endPoint:"Chainlink"
  // },
  {
    image:"/tokenImages/bnb.webp",
    endPoint:"binancecoin",
    name:"Binance"
  },
  // "Kraken":{
  //   image:"/tokenImages/kraken.webp",
  //   endPoint:"Kraken"
  // },
  // "Bitfinex":{
  //   image:"/tokenImages/bitfinex.webp",
  //   endPoint:"Bitfinex"
  // },
  // "Bitstamp":{
  //   image:"/tokenImages/bitstamp.webp",
  //   endPoint:"Bitstamp"
  // },
  // "Gemini":{
  //   image:"/tokenImages/gemini.webp",
  //   endPoint:"Gemini"
  // },
]