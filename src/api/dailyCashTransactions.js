// Packages:
import axios from 'axios'


// Constants:
import { AUTH_HEADERS, DAILY_CASH_TRANSACTIONS } from './endpoints'


// Exports:
export const getAllDailyCashTransactions = async () => {
  try {
    const response = await axios.get(DAILY_CASH_TRANSACTIONS.ALL, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
    return { result: true, payload: response.data.data }
  } catch(e) {
    if (e.name === 'AxiosError') {
      const data = e.response.data
      if (data.errors) {
        const errorEntries = Object.entries(data.errors)[0]
        return { result: false, payload: `${ errorEntries[0] } - ${ errorEntries[1] }` }
      } else if (data.message) {
        return { result: false, payload: data.message }
      } else if (data.title) {
        return { result: false, payload: data.title }
      }
    }
    return { result: false, payload: e }
  }
}

export const addDailyCashTransactions = async ({
  id,
  description,
  notes,
  amount,
  transactionDate,
  dailyCashId,
  dailyCash
}) => {
  try {
    await axios.post(DAILY_CASH_TRANSACTIONS.ALL, {
      id,
      description,
      notes,
      amount,
      transactionDate,
      dailyCashId,
      dailyCash
    }, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
    return { result: true, payload: null }
  } catch(e) {
    if (e.name === 'AxiosError') {
      const data = e.response.data
      if (data.errors) {
        const errorEntries = Object.entries(data.errors)[0]
        return { result: false, payload: `${ errorEntries[0] } - ${ errorEntries[1] }` }
      } else if (data.message) {
        return { result: false, payload: data.message }
      } else if (data.title) {
        return { result: false, payload: data.title }
      }
    }
    return { result: false, payload: e }
  }
}
