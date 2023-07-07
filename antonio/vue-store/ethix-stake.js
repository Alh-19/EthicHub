import {
  QUERY_STAKE_ETHIX_TOTALS,
  QUERY_STAKE_ETHIX_HOLDERS_CURRENT,
  QUERY_STAKE_ETHIX_HOLDERS_CURRENT_ZERO,
} from '@/utils/queries'
import {
  getTimestampToday,
  getTimestampFirstDayCurrentMonth,
  getDayTimestampsSinceFirstStakeContractEth,
  getDayTimestampsSinceFirstStakeContractCelo,
} from '@/utils/dates'

export default {
  async getTotalsStaked({ commit }) {
    commit('SET_LOADING', ['totals', true])
    const query = QUERY_STAKE_ETHIX_TOTALS
    const { clientEth, clientCelo, gql } = this.$apollo
    const { data: dataEth } = await clientEth.query({ query: gql(query) })
    const { data: dataCelo } = await clientCelo.query({ query: gql(query) })
    commit('SET_STAKED_TOTALS', ['eth', dataEth.factoryEthixes[0]])
    commit('SET_STAKED_TOTALS', ['celo', dataCelo.factoryEthixes[0]])
    commit('SET_LOADING', ['totals', false])
  },
  async getHoldersCurrent({ commit }, minAmount) {
    commit('SET_LOADING', ['current', true])
    const query =
      minAmount === 0 ? QUERY_STAKE_ETHIX_HOLDERS_CURRENT_ZERO : QUERY_STAKE_ETHIX_HOLDERS_CURRENT
    const { clientEth, clientCelo, gql } = this.$apollo
    const { data: dataEth } = await clientEth.query({
      query: gql(query),
      variables: {
        totalAmount: minAmount,
      },
    })
    const { data: dataCelo } = await clientCelo.query({
      query: gql(query),
      variables: {
        totalAmount: minAmount,
      },
    })
    commit('SET_HOLDERS_CURRENT', ['eth', dataEth.stakeEthixHolders])
    commit('SET_HOLDERS_CURRENT', ['celo', dataCelo.stakeEthixHolders])
    commit('SET_LOADING', ['current', false])
  },
  async getHoldersCompareInit({ dispatch }, minAmount) {
    const timestamps = [getTimestampFirstDayCurrentMonth() - 1, getTimestampToday() - 1]
    await dispatch('getHoldersCompare', { minAmount, timestamps })
  },
  async getHoldersCompare({ commit }, { minAmount, timestamps }) {
    commit('SET_LOADING', ['compare', true])
    const { clientEth, clientCelo, clientBlocksEth, clientBlocksCelo, gql } = this.$apollo
    let queryBlocksEth = '{'
    let queryBlocksCelo = '{'

    timestamps.forEach((t) => {
      queryBlocksEth += `
        t${t}:blocks(
          first: 1,
          orderBy: timestamp,
          orderDirection: asc,
          where: {
            timestamp_gte: ${t}, 
            timestamp_lt: ${t + 600}
          }
        ) {
            number
          }
      `
    })
    timestamps.forEach((t) => {
      queryBlocksCelo += `
        t${t}:blocks(
          first: 1,
          orderBy: timestamp,
          orderDirection: asc,
          where: {
            timestamp_gte: ${t}
          }
        ) {
            number
          }
      `
    })

    queryBlocksEth += '}'
    queryBlocksCelo += '}'

    let blocksEth = await clientBlocksEth.query({ query: gql(queryBlocksEth) })
    blocksEth = blocksEth.data

    let blocksCelo = await clientBlocksCelo.query({ query: gql(queryBlocksCelo) })
    blocksCelo = blocksCelo.data

    let queryEth = '{'
    let queryCelo = '{'

    for (const key in blocksEth) {
      const blockNumber = blocksEth[key][0].number
      queryEth += `
        ${key}:stakeEthixHolders(
          first: 1000,
          orderBy: totalAmount, orderDirection: desc,
          where: {
            ${minAmount === 0 ? 'totalAmount_gt' : 'totalAmount_gte'}: ${minAmount}
          }
          block: {
            number: ${blockNumber}
          }
        ) {
          id
          totalAmount
        }
      `
    }
    for (const key in blocksCelo) {
      const blockNumber = blocksCelo[key][0].number
      queryCelo += `
        ${key}:stakeEthixHolders(
          first: 1000,
          orderBy: totalAmount, orderDirection: desc,
          where: {
            ${minAmount === 0 ? 'totalAmount_gt' : 'totalAmount_gte'}: ${minAmount}
          }
          block: {
            number: ${blockNumber}
          }
        ) {
          id
          totalAmount
        }
      `
    }

    queryEth += '}'
    queryCelo += '}'

    let holdersEth = await clientEth.query({ query: gql(queryEth) })
    holdersEth = holdersEth.data

    let holdersCelo = await clientCelo.query({ query: gql(queryCelo) })
    holdersCelo = holdersCelo.data

    const { [`t${timestamps[0]}`]: prevEth } = holdersEth
    const { [`t${timestamps[1]}`]: nextEth } = holdersEth

    const { [`t${timestamps[0]}`]: prevCelo } = holdersCelo
    const { [`t${timestamps[1]}`]: nextCelo } = holdersCelo

    commit('SET_HOLDERS_COMPARE', ['prev', 'eth', prevEth])
    commit('SET_HOLDERS_COMPARE', ['prev', 'celo', prevCelo])
    commit('SET_HOLDERS_COMPARE', ['next', 'eth', nextEth])
    commit('SET_HOLDERS_COMPARE', ['next', 'celo', nextCelo])
    commit('SET_HOLDERS_COMPARE_TIMESTAMPS', timestamps)

    const queryNewStakeEthixHoldersNoRecurrentEth = `
      query NewStakeEthixHoldersNoRecurrent($dateJoinedFirst: BigInt!, $minAmount: BigDecimal!) {
        stakeEthixHolders(
          first: 1000, orderBy: totalAmount, orderDirection: desc,
          where: { 
            dateJoinedFirst_gte: $dateJoinedFirst,
            ${minAmount === 0 ? 'totalAmount_gt' : 'totalAmount_gte'}: $minAmount
          },
          block: {
            number: ${blocksEth[`t${timestamps[1]}`][0].number}
          }
        ) {
          id
          totalAmount
        }
      }
    `

    const queryNewStakeEthixHoldersNoRecurrentCelo = `
      query NewStakeEthixHoldersNoRecurrent($dateJoinedFirst: BigInt!, $minAmount: BigDecimal!) {
        stakeEthixHolders(
          first: 1000, orderBy: totalAmount, orderDirection: desc,
          where: {
            dateJoinedFirst_gte: $dateJoinedFirst,
            ${minAmount === 0 ? 'totalAmount_gt' : 'totalAmount_gte'}: $minAmount
          },
          block: {
            number: ${blocksCelo[`t${timestamps[1]}`][0].number}
          }
        ) {
          id
          totalAmount
        }
      }
    `

    const { data: joinedNewEth } = await clientEth.query({
      query: gql(queryNewStakeEthixHoldersNoRecurrentEth),
      variables: {
        minAmount: minAmount,
        dateJoinedFirst: timestamps[0] + 1,
      },
    })

    const { data: joinedNewCelo } = await clientCelo.query({
      query: gql(queryNewStakeEthixHoldersNoRecurrentCelo),
      variables: {
        minAmount: minAmount,
        dateJoinedFirst: timestamps[0] + 1,
      },
    })

    commit('SET_HOLDERS_COMPARE_JOINED_NEW', ['eth', joinedNewEth.stakeEthixHolders])
    commit('SET_HOLDERS_COMPARE_JOINED_NEW', ['celo', joinedNewCelo.stakeEthixHolders])
    commit('SET_LOADING', ['compare', false])
  },
  async getHoldersDayCount({ state, dispatch, commit }, minAmount) {
    commit('SET_LOADING', ['dayCount', true])
    const promiseEth = dispatch('getHoldersDayCountEth', minAmount)
    const promiseCelo = dispatch('getHoldersDayCountCelo', minAmount)
    const [eth, celo] = await Promise.all([promiseEth, promiseCelo])
    commit('SET_HOLDERS_DAY_COUNT', ['eth', eth])
    commit('SET_HOLDERS_DAY_COUNT', ['celo', celo])
    commit('SET_LOADING', ['dayCount', false])
  },
  async getHoldersDayCountEth({ dispatch }, minAmount) {
    const { clientEth, clientBlocksEth, gql } = this.$apollo
    const timestamps = getDayTimestampsSinceFirstStakeContractEth()
    const data = await dispatch('getHoldersDayCountHelper', {
      minAmount,
      timestamps,
      client: clientEth,
      clientBlocks: clientBlocksEth,
      gql,
      isSpeedQuery: true,
    })
    return data
  },
  async getHoldersDayCountCelo({ dispatch }, minAmount) {
    const { clientCelo, clientBlocksCelo, gql } = this.$apollo
    const timestamps = getDayTimestampsSinceFirstStakeContractCelo()
    const data = await dispatch('getHoldersDayCountHelper', {
      minAmount,
      timestamps,
      client: clientCelo,
      clientBlocks: clientBlocksCelo,
      gql,
      isSpeedQuery: false,
    })
    return data
  },
  async getHoldersDayCountHelper(
    {},
    { minAmount, timestamps, client, clientBlocks, gql, isSpeedQuery }
  ) {
    let dataCount = {}
    let dataCountKeys = []
    let dataFormatted = []
    const chunkSize = 250

    for (let i = 0; i < timestamps.length; i += chunkSize) {
      const chunk = timestamps.slice(i, i + chunkSize)
      let queryBlocks = '{'
      if (isSpeedQuery) {
        chunk.forEach((t) => {
          queryBlocks += `
            t${t}:blocks(
              first: 1,
              orderBy: timestamp, orderDirection: asc,
              where: { timestamp_gte: ${t}, timestamp_lt: ${t + 600} }
            ) {
                number
              }
          `
        })
      } else {
        chunk.forEach((t) => {
          queryBlocks += `
            t${t}:blocks(
              first: 1,
              orderBy: timestamp, orderDirection: asc,
              where: { timestamp_gte: ${t} }
            ) {
                number
              }
          `
        })
      }
      queryBlocks += '}'
      const { data: blocks } = await clientBlocks.query({ query: gql(queryBlocks) })

      let queryData = '{'
      for (const key in blocks) {
        const blockNumber = blocks[key][0].number
        queryData += `
          ${key}:stakeEthixHolders(
            first: 1000,
            where: {
              ${minAmount === 0 ? 'totalAmount_gt' : 'totalAmount_gte'}: ${minAmount}
            }
            block: {
              number: ${blockNumber}
            }
          ) {
            id
          }
        `
      }
      queryData += '}'
      const { data } = await client.query({ query: gql(queryData) })

      dataCount = { ...dataCount, ...data }
      dataCountKeys = dataCountKeys.concat(Object.keys(data))
    }

    dataFormatted = dataCountKeys.map((key) => {
      const obj = dataCount[key]
      return {
        date: parseInt(key.slice(1)) + 1 - 86400,
        count: obj.length,
      }
    })

    return dataFormatted
  },
}
