// Dependencies
import React from 'react';
import './Transactions.css';

// Utility functions
import { convertNumToUSD } from '../../util/UtilityFunctions';

export const Transactions = (props) => {
    const { transactions } = props;

    return (
        <div className="transactions">
            <h3>Transactions</h3> 
            <div className="transactions-list">
                {transactions.map((transaction, i) => {
                    return(
                        <div className={transaction.Type === 'Deposit' ? 'transaction deposit' : 'transaction withdrawal'} key={i}>
                            <div className="transaction-date">{transaction.Date}</div>
                            <div className="transaction-value">{convertNumToUSD(transaction.Amount)}</div>
                            <input className="transaction-description" placeholder={transaction.Description}></input>
                        </div>
                    )
                })}
            </div>
            <ul className="transactions-legend">
                <li><div className="legend-key" id="withdrawal"></div>Withdrawals</li>
                <li><div className="legend-key" id="deposit"></div>Deposits</li>
            </ul> 
        </div> 
            
    )
}