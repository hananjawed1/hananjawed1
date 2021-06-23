
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    employeeNumber: string;
    status: number;
    imageLogo: string;
    statusStrings: string;
}

export interface Creator {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    employeeNumber: string;
    status: number;
    imageLogo: string;
    statusStrings: string;
}

export interface Groups {
    groupId: number;
    name: string;
    createdOn: Date;
    updatedOn: Date;
    updatedBy: string;
    createdBy: string;
    creationDateString: string;
    updatedOnString: string;
}

export interface HotelServices {
    hoteServicesId: number;
    name: string;
}
  

export interface Employee {
    employeeId: number;
    userId: string;
    user: User;
    employeeNumber: string;
}

export interface IClientDetails {
    clientId: number;
    userId: string;
    user: User;
    creator: Creator;
    tradeLicenceNumber: string;
    liquorLicenseNumber: string;
    parentLicenceNumber: string;
    businessType: number;
    groupId: number;
    groups: Groups;
    requestType: number;
    status: number;
    ownerShip: number;
    businessLocation: string;
    businessContactNumber: string;
    tourismCertificate: string;
    municipalityCertificate: string;
    otherCertificate: string;
    otherCertificateName: string;
    star: number;
    statusString: string;
    statusColor: string;
    requestTypeString: string;
    businessTypeString: string;
    description: string;
    employeeId: number;
    inspectionDate: Date;
    inspectionDateString: string;
    privateNote: string;
    clientNote: string;
    companyName: string;
    partnerName: string;
    issueDate: Date;
    issueDateString: string;
    expiryDate: Date;
    expiryDateString: string;
    paymentVoucher: string;
    clientHotelServices: ClientHotelService[];
    employee: Employee;
    typeofLicense: string;
    createdOn: Date;
    updatedOn: Date;
    updatedBy: string;
    createdBy: string;
    creationDateString: string;
    updatedOnString: string;
    receipt: string;
    isAssignedOnce: boolean;
    categoryType: number;
    name: string;
    applicationNumber: string;
    requestBy: number;
    emiratesIDNumber: string;
    entityName: string;
    authorizationPerson: string;
    licenceAmount : number;
    tradeLicenseCopy: string;
    liquorLimitPerMonth : number;
    requestLetterToServeAlcoholicBeverages: string;
    noObjectionFromTheOwner: string;
    monthlyConsumption: string;
    nationalIdentityForCommercialLicense: string;
    nationalIdentityOfThePerson: string;
    memorandumOfTheEstablishment: string;
    ownershipCertificate: string;
    leaseAgreement: string;
    classificationCertificate: string;
    interiorAndExteriorPictures: string;
    floorplan: string;
    noObjectionLetter: string;
    goodConductCertificate: string;
    certificateNotes: string;
    hotelNoObjectionLetter: string;
    hotelOwnershipCertificate: string;
    hotelLeaseAgreement: string;
    hotelEstablishmentContract: string;
    hotelTouristLicense: string;
    hotelClassificationCertificate: string;
    hotelPassports: string;
    hotelFacilityManagementLetter: string;
    hotelCriminalInvestigation: string;
    hotelPhotos: string;
    restaurantNoObjectionLetter : string;
    restaurantOwnershipCertificate : string;
    restaurantLeaseAgreement : string;
    restaurantEstablishmentContract : string;
    restaurantCommercialLicense : string;
    restaurantClassificationCertificate : string;
    restaurantPassports : string;
    restaurantFacilityManagementLetter : string;
    restaurantCriminalInvestigation : string;
    restaurantPhotos : string;
    hotelApartmentNoObjectionLetter : string;
    hotelApartmentOwnershipCertificate : string;
    hotelApartmentLeaseAgreement : string;
    hotelApartmentEstablishmentContract : string;
    hotelApartmentTouristLicense : string;
    hotelApartmentClassificationCertificate : string;
    hotelApartmentPassports : string;
    hotelApartmentFacilityManagementLetter : string;
    hotelApartmentCriminalInvestigation : string;
    hotelApartmentPhotos : string;
    clubNoObjectionLetter : string;
    clubOwnershipCertificate : string;
    clubRentalContract : string;
    clubArticles : string;
    clubCommercialLicense : string;
    clubRegistrationCertificate : string;
    clubPassports : string;
    clubAdministration : string;
    clubCriminalInvestigation : string;
    clubPhotos: string;
    reExportNoObjectionLetter : string;
    reExportTradeLicense : string;
    reExportPassport : string;
    reExportStorageStandards : string;
    reExportWarehouseCertificate : string;
    reExportSketchLocation : string;
    reExportPermitCertificate : string;
    reExportCriminalInvestigation : string;
    reExportOwnershipCertificate : string;
    reExportConformityCertificate :string;
    reExportCompanyContract: string;
    floatingCommercialLicense : string;
    floatingPassport : string;
    floatingLeaseContract : string;
    floatingNoObjection : string;
    floatingOwnership : string;
    floatingInsuranceCertificate : string;
    floatingManningCertificate : string;
    floatingVessel : string;
    floatingClassificationCertificate : string;
    floatingPermitLetter : string;
    floatingAlcoholicPermit : string;
    floatingCriminalInvestigation : string;
    floatingPhotos : string;
    floatingCompanyContract : string;
    shopsCommercialLicense : string;
    shopsLeaseContract : string;
    shopsSketchSite : string;
    importExportNoObjectionCertificate : string;
    importExportTradeLicense : string;
    importExportPassport : string;
    importExportCertificateOfCriminal : string;
    importExportManagementLetter : string;
    importExportSketchLocation : string;
    importExportWarehouseCertificate : string;
    importExportCertificateOfFood : string;
    importExportConformityCertificate : string;
    importExportLeaseContract : string;
    importExportCompanyContract: string;
    campNoObjectionCertificate : string;
    campOwnershipCertificate : string;
    campRentalContract : string;
    campEstablishmentContract : string;
    campCommercialLicense : string;
    campClassificationCertificate : string;
    campPassport : string;
    campPermitLetter : string;
    campAdministration : string;
    campCriminalInvestigation : string;
    campPhotos: string;
}

export interface ClientHotelService {
    clientHotelServicesId: number;
    hoteServicesId: number;
    hotelServices: HotelServices;
    clientId: number;
    ownerShip: number;
    name: string;
    document: string;
    documentMimeType: string;    
}
