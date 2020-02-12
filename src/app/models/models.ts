export interface LoginReq {
        mobileNumber: string;
        password: string;
}

export interface LoginRes {
        statusCode: number;
        doctorId: number;
        doctorName: string;
}


export interface GetSlots {
        statusCode: number;
        message: string;
        slotDetails: SlotList[];
}
export interface SlotList {
        slotId: number;
        slotName: string;
}

export interface PostSlotsReq {
        slotSelected: SlotSelected[];
}

export interface SlotSelected {
        slotName: string;
}


export interface Response {
        statusCode: number;
        message: string;
}


export interface AccountsList {
        accountNumber: number;
        accountType: string;
        currency: string;
        balance: string;
}



export interface TransactionReq {
        fromAccount: number;
        toAccount: number;
        transferAmount: number;
}

export interface TransactionRes {
        statusCode: number;
        message: string;
}

export interface TransactionRes {
        statusCode: number;
        message: string;
}

export interface TransactionHistory {
        statusCode: number;
        transactionDetails: TransactionSummary[];
}

export interface TransactionSummary {
        fromAccount: number;
        toAccount: number;
        transferdAmount: number;
        transactionDate: Date;
        transactionStatus: string;
}
