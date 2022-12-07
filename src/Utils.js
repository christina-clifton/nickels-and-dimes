import { Transactions } from "./Transactions";

export const getTransactionAmountsArray = () => {
    const transactions = Transactions();
    const transactionAmounts = transactions.map(transaction => transaction.Amount);   

    return transactionAmounts;
}

export const getTotalExpenses = () => {
    const transactionNums = getTransactionAmountsArray().map(amount => {
        return convertToNum(amount);
    })
    let totalExpenses = transactionNums.reduce((a , b) => a + b);
    return totalExpenses;
}

export const convertToNum = (str) => {
    return Number(str.replace(/[^0-9.-]+/g,""));
}