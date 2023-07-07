// ethix
export const QUERY_ETHIX_HOLDERS_CURRENT = `
  query EthixHoldersCurrent($totalAmount: BigDecimal!) {
    ethixHolders(
      first: 1000,
      orderBy: totalAmount, orderDirection: desc,
      where: { totalAmount_gte: $totalAmount }
    ) {
      id
      totalAmount
    }
  }
`

export const QUERY_ETHIX_HOLDERS_CURRENT_ZERO = `
  query EthixHoldersCurrentZero($totalAmount: BigDecimal!) {
    ethixHolders(
      first: 1000,
      orderBy: totalAmount, orderDirection: desc,
      where: { totalAmount_gt: $totalAmount }
    ) {
      id
      totalAmount
    }
  }
`

/**
 * prevIdEth:  '18617' => 18617 * 86400 = 1.608.508.800 timestamp = 22 DEC 2020 00:00:00 (UTC)
 * prevIdCelo: '19162' => 19162 * 86400 = 1.655.596.800 timestamp = 20 JUN 2022 00:00:00 (UTC)
 */
export const QUERY_ETHIX_HOLDERS_DAY_COUNT = `
  query EthixHoldersDayCount($prevId: ID!) {
    dayCountEthixHolders(first: 1000, where: { id_gt: $prevId }) {
      id
      date
      count
    }
  }
`

// stake
export const QUERY_STAKE_ETHIX_HOLDERS_CURRENT = `
  query StakeEthixHoldersCurrent($totalAmount: BigDecimal!) {
    stakeEthixHolders(
      first: 1000,
      orderBy: totalAmount, orderDirection: desc,
      where: { totalAmount_gte: $totalAmount }
    ) {
      id
      type
      totalAmount
    }
  }
`

export const QUERY_STAKE_ETHIX_HOLDERS_CURRENT_ZERO = `
  query StakeEthixHoldersCurrentZero($totalAmount: BigDecimal!) {
    stakeEthixHolders(
      first: 1000,
      orderBy: totalAmount, orderDirection: desc,
      where: { totalAmount_gt: $totalAmount }
    ) {
      id
      type
      totalAmount
    }
  }
`

export const QUERY_STAKE_ETHIX_TOTALS = `
  query StakeEthixTotals {
    factoryEthixes(first: 1) {
      id
      totalStaked
      totalStakedGeneral
      totalStakedHonduras
      totalStakedBrasil
      totalStakedMexico
      totalStakedMexico2
      totalStakedEcuador
      totalStakedPeru
    }
  }
`

// bonds
export const QUERY_BONDS_FACTORY = `
  query BondsFactory {
    factoryBonds(first: 1) {
      id
      totalSupply
      totalActive
      totalRedeemed
      totalPrincipal
      totalCollateralized
      totalCollateralizedLocked
    }
  }
`

export const QUERY_BONDS = `
  query Bonds {
    bonds(first: 1000, orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      size
      principalType
      collateralAssigned
      maturity
      interest
      imageCID
      principal
      withdrawn
      mintingDate
      maturityDate
      redeemDate
      cooldownStartDate
      cooldownEndDate
      buyer
      redeemer
      holder {
        id
      }
    }
  }
`

export const QUERY_BONDS_HOLDERS = `
  query BondsHolders {
    bondHolders(orderBy: totalBonds, orderDirection: desc) {
      id
      totalBonds
      totalActive
      totalRedeemed
      dateJoined
      bonds(orderBy: tokenId, orderDirection: asc) {
        id
        principal
        mintingDate
        size
      }
    }
  }
`
