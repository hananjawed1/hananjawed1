
export interface ISearchFileRequestVM {
    tradeLicenceNumber: string;
    phoneNumber: string;
    businessType: number;
    requestType: number
    status: number;
    date?: Date;
    page: number;
    pageSize: number;
    isApproved: number;
    applicationNumber: string;
    isCompleted : number;
    entityName: string;
    employeeId: number;
}


export interface IClientHistorySearchVM {
    status: number;
    date?: Date;
    clientId: number
    page: number;
    pageSize: number;
}


export interface IClientStatus
{
    clientId: number;
    status: number;
    clientNote: string;
    notes: string;
    oldStatusForPrivate: number;

    //Inspection Details, if in IssueCertificate Status
    employeeId?: number;
    inspectionDate?: Date; 

    //in case issue certificate status
    companyName: string;
    partnerName: string;
    issueDate?: string;
    expiryDate?: string;
    privateNote: string;
    typeofLicense: string;

    //in case Upload Payment Voucher
    paymentVoucher: any;
    licenceAmount : number;
    certificateNotesForClient : string;
    certificateNotes : string;
}

