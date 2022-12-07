// Dependencies
import { MONTHS } from '../Components/App/App';

//Utility Functions
import { getMonthIndexFromDate } from '../util/UtilityFunctions';

// Constants
const transactionDescriptions = ['Target', 'Petco', 'Amazon', 'Trader Joe\'s', 'Mahan Indian Restaurant', 'Veggie Grill', 
                                'Mijares Mexican Restaurant', 'Vroman\'s Bookstore', 'Whole Foods', 'Home Depot',
                                'REI', 'Madewell'];

const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const SampleData = () => {
    let dataArray = [];
    for(let i = 0; i < 1000; i++) {
        const withdrawalObject = {};
        withdrawalObject.Date = `${generateRandomDate(new Date(2022, 0, 1), new Date(2022, 11, 32))}`;
        withdrawalObject.Month = `${MONTHS[getMonthIndexFromDate(withdrawalObject.Date)]}`;
        withdrawalObject.Amount = `${Math.round((Math.random() * 100) * 100) / 100}`;
        withdrawalObject.Type = `Withdrawal`;
        withdrawalObject.Description = `${transactionDescriptions[Math.floor(Math.random() * transactionDescriptions.length)]}`;
        dataArray.push(withdrawalObject);
    }

    for(let i = 0; i < 12; i++) {
        const depositObject = {};
        depositObject.Date = `${new Date(2022, i, 1)}`;
        depositObject.Month = `${MONTHS[i]}`;
        depositObject.Amount = `2500`;
        depositObject.Type = `Deposit`;
        depositObject.Description = `Paycheck`;
        dataArray.push(depositObject);
    }

    console.log(dataArray);
    return dataArray;
}