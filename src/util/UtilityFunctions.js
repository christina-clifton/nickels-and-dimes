// Dependencies
import { MONTHS } from '../Components/App/App';

export const convertNumToUSD = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        roundingMode: 'halfExpand'
    });

    return formatter.format(num);
}

const convertUSDtoNum = (currency) => {
    return Math.abs(Number(currency.replace(/[^0-9.-]+/g,"")));
}

const standardizeTransactionDateFormat = (date) => {
    date = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formatter.format(date);
}

export const getMonthIndexFromDate = (date) => {
    const intlDate = new Date(date);
    return intlDate.getUTCMonth();
}

// Merges 2 arrays of objects without duplicates.
export const mergeTwoArraysOfObjects = (arr1, arr2) => {
    for(let i = 0; i < arr1.length; i++) {
        for(let j = arr2.length - 1; j >= 0; j--) {
            if((arr1[i].Date === arr2[j].Date) && (arr1[i].Time === arr2[j].Time)) {
                arr2.splice(j, 1);
            }
        }
    }

    return arr1.concat(arr2);
}

/* Takes in a transaction object and returns a standardized one with properties for Date, Amount, 
Type, Description & Month */
export const standardizeTransactionObject = (transaction) => {
    let standardizedTransactionObject = {};

    if(transaction.Date) {
        standardizedTransactionObject.Date = standardizeTransactionDateFormat(transaction.Date);
    } else if(transaction.PostingDate){
        standardizedTransactionObject.Date = standardizeTransactionDateFormat(transaction.PostingDate);
    } 

    if(transaction.Amount) {
        standardizedTransactionObject.Amount = convertUSDtoNum(transaction.Amount);
    } else if(transaction['Deposit(+)']) {
        standardizedTransactionObject.Amount = convertUSDtoNum(transaction['Deposit(+)']);
        standardizedTransactionObject.Type = 'Deposit'
    
    } else if(transaction['Withdrawal(-)']) {
        standardizedTransactionObject.Amount = convertUSDtoNum(transaction['Withdrawal(-)']);
        standardizedTransactionObject.Type = 'Withdrawal';
    }

    if(transaction.Type === 'Withdrawal' || transaction.Type === 'Deposit') {
        standardizedTransactionObject.Type = transaction.Type;
    } else if(transaction.Details === 'CREDIT' || transaction.Details === 'DEBIT') {
        transaction.Details === 'CREDIT' ? 
            standardizedTransactionObject.Type = 'Deposit' 
        : 
            standardizedTransactionObject.Type = 'Withdrawal';
    } 
    
    standardizedTransactionObject.Description = transaction.Description;
    standardizedTransactionObject.Month = MONTHS[getMonthIndexFromDate(standardizedTransactionObject.Date)];

    return standardizedTransactionObject;
}