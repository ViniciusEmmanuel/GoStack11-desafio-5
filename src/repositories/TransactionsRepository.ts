import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc, transaction): Omit<Balance, 'total'> => {
        switch (transaction.type) {
          case 'income':
            acc.income += transaction.value;
            return acc;

          case 'outcome':
            acc.outcome += transaction.value;
            return acc;

          default:
            return acc;
        }
      },
      { income: 0, outcome: 0 },
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
