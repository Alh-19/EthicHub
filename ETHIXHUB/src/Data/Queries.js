import { gql } from '@apollo/client';

export const QUERY1 = gql`
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
`;

export const QUERY2 = gql`
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
      redeemDate
      interest
    }
  }
}
`;

export const QUERY3 = gql`
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
`;
