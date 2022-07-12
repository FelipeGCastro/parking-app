type ConstantsType = { [key: string]: any }
type StyleConstants = { constants?: ConstantsType }

type StylesProps =
  | import('react-native').TextStyle
  | import('react-native').ViewStyle
  | (import('react-native').ImageStyle & ConstantsType)

type SpecialKey = { [key: string | 'constants']: StylesProps }

type BreakPointType = 'phonePortrait' | 'tabletPortrait' | 'tabletLandscape'

type StyleSheetTypeHook = SpecialKey
// interface StyleSheetTypeHook extends StyleConstants {
//         [key: string]: StylesProps
// }
interface IStyles {
  common: StyleSheetTypeHook
  phonePortrait?: StyleSheetTypeHook
  tabletPortrait?: StyleSheetTypeHook
  tabletLandscape?: StyleSheetTypeHook
}

type AllVariablesType = typeof import('../../src/styles/variables').allVariables

interface StylesHook {
  (variables: AllVariablesType, variables?: any): IStyles
}

type StyleContext<T> = [
  T,
  T['constants'] | ConstantsType,
  BreakPointType,
  boolean,
]

interface ITrades {
  id: number
  logo: string
  name: string
  symbol: string
  type: string
  qty: number
  orderStatus: string
  orderType: string
  timestamp: string
  side: string
  timeInForce: string
  isin: string
  amount: string | number
}
interface IPosition {
  logo: string
  name: string
  symbol: string
  type: string
  qty: number
  currentPrice: string
  todaysReturn: number
  performanceToday: number
  marketValue: string
  unrealizedPl: string
  unrealizedPlpc: string
}

interface IPagination {
  totalPages: number
  currentPages: number
}
interface ILoading {
  loading: boolean
  loaded: boolean
}
interface IPortfolioSelectors {
  getTrades: () => ITrades[]
  getTradesPagination: () => IPagination
  getTradesLoading: () => ILoading
  getTradesError: () => boolean | string
  getPosition: () => IPosition
  getPositions: () => IPosition[]
  getPositionsError: () => boolean | string
  getPositionsLoading: () => ILoading
  getPositionsPagination: () => IPagination
  getTrade: () => ITrades
  getTradeLoading: () => ILoading
  getTradeError: () => boolean
  getHistory: () => any
  getHistoryLoading: () => ILoading
  getHistoryError: () => boolean
  getProfitLoss: () => any
  getProfitLossLoading: () => ILoading
  getProfitLossError: () => boolean
  getRecurringItem: () => IRecurringTrades
  getRecurring: () => IRecurringTrades[]
  getRecurringLoading: () => ILoading
  getRecurringError: () => boolean
}
declare module 'defiance-core' {
  export const portfolioActions: any
  export const portfolioSelectors: IPortfolioSelectors
  export const PortfolioClient: any
  export const portfolioActionsTypes: any
  export const assetsActionsTypes: any
  export const draftTradesActionsTypes: any
  export const draftTradesActions: any
  export const draftTradesSelectors: any
  export const DraftTradesClient: any
  export const themesActionsTypes: any
  export const themesActions: any
  export const themesSelectors: any
  export const ThemesClient: any
}

interface IInvestmentData {
  accountBlocked: boolean
  accountNumber: string
  accruedFees: string
  buyingPower: string
  cash: string
  cashTransferable: string
  cashWithdrawable: string
  clearingBroker: string
  createdAt: string
  cryptoStatus: string
  currency: string
  daytradeCount: number
  daytradingBuyingPower: string
  equity: string
  id: string
  initialMargin: string
  lastBuyingPower: string
  lastCash: string
  lastDaytradeCount: number
  lastDaytradingBuyingPower: string
  lastEquity: string
  lastInitialMargin: string
  lastLongMarketValue: string
  lastMaintenanceMargin: string
  lastRegtBuyingPower: string
  lastShortMarketValue: string
  longMarketValue: string
  maintenanceMargin: string
  multiplier: string
  nonMarginableBuyingPower: string
  patternDayTrader: boolean
  pendingTransferIn: string
  pendingTransferOut: string
  portfolioValue: string
  previousClose: string
  regtBuyingPower: string
  shortMarketValue: string
  shortingEnabled: boolean
  sma: string
  status: string
  tradeSuspendedByUser: boolean
  tradingBlocked: boolean
  transfersBlocked: boolean
  pendingBuys: string
  totalReturns: string
}

interface IRecurringTrades {
  id: number
  interval: string
  params: {
    notional?: string
    qty?: number
    side: string
    symbol: string
    timeInForce: string
    type: string
  }
  recurrable: {
    assetType: string
    id: number
    isin: string
    logoUrl: string
    name: string
    simpleName: string
    watchlist: false
  }
  nextDate: string
  tradesSum: number
  service: string
  startDate: string
  status: string
  trades?: ITrades[]
  transfers: unknown
}

declare module '*.png' {
  const value: any
  export = value
}
