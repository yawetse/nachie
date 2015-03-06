module.exports = {
	"_batches": [{
		"_entries": [{
			"fields": {
				"recordTypeCode": {
					"name": "Record Type Code",
					"width": 1,
					"position": 1,
					"required": true,
					"type": "numeric",
					"value": "6"
				},
				"transactionCode": {
					"name": "Transaction Code",
					"width": 2,
					"position": 2,
					"required": true,
					"type": "numeric",
					"value": "22"
				},
				"receivingDFI": {
					"name": "Receiving DFI Identification",
					"width": 8,
					"position": 3,
					"required": true,
					"type": "numeric",
					"value": "021200025"
				},
				"checkDigit": {
					"name": "Check Digit",
					"width": 1,
					"position": 4,
					"required": true,
					"type": "numeric",
					"value": "0"
				},
				"DFIAccount": {
					"name": "DFI Account Number",
					"width": 17,
					"position": 5,
					"required": true,
					"type": "alphanumeric",
					"value": "12345678901234567"
				},
				"amount": {
					"name": "Amount",
					"width": 10,
					"position": 6,
					"required": true,
					"type": "numeric",
					"value": 35.23,
					"number": true
				},
				"idNumber": {
					"name": "Individual Identification Number",
					"width": 15,
					"position": 7,
					"required": false,
					"type": "alphanumeric",
					"value": "RAJ##23920RJF31"
				},
				"individualName": {
					"name": "Individual Name",
					"width": 22,
					"position": 8,
					"required": true,
					"type": "alphanumeric",
					"value": "GLEN SELLE"
				},
				"discretionaryData": {
					"name": "Discretionary Data",
					"width": 2,
					"position": 9,
					"required": false,
					"type": "alphanumeric",
					"value": "A1"
				},
				"addendaId": {
					"name": "Addenda Record Indicator",
					"width": 1,
					"position": 10,
					"required": true,
					"type": "numeric",
					"value": "0"
				},
				"traceNumber": {
					"name": "Trace Number",
					"width": 15,
					"position": 11,
					"required": false,
					"type": "numeric",
					"blank": true,
					"value": "123456780000000"
				}
			}
		}],
		"header": {
			"recordTypeCode": {
				"name": "Record Type Code",
				"width": 1,
				"position": 1,
				"required": true,
				"type": "numeric",
				"value": "5"
			},
			"serviceClassCode": {
				"name": "Service Class Code",
				"width": 3,
				"position": 2,
				"required": true,
				"type": "numeric",
				"value": "220"
			},
			"companyName": {
				"name": "Company Name",
				"width": 16,
				"position": 3,
				"required": true,
				"type": "alphanumeric",
				"value": "ACME INC"
			},
			"companyDiscretionaryData": {
				"name": "Company Discretionary Data",
				"width": 20,
				"position": 4,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": " "
			},
			"companyIdentification": {
				"name": "Company Identification",
				"width": 10,
				"position": 5,
				"required": true,
				"type": "numeric",
				"value": "471934319"
			},
			"standardEntryClassCode": {
				"name": "Standard Entry Class Code",
				"width": 3,
				"position": 6,
				"required": true,
				"type": "alpha",
				"value": "PPD"
			},
			"companyEntryDescription": {
				"name": "Company Entry Description",
				"width": 10,
				"position": 7,
				"required": true,
				"type": "alphanumeric",
				"value": "AS PAYMENT"
			},
			"companyDescriptiveDate": {
				"name": "Company Descriptive Date",
				"width": 6,
				"position": 8,
				"required": false,
				"type": "alphanumeric",
				"value": " "
			},
			"effectiveEntryDate": {
				"name": "Effective Entry Date",
				"width": 6,
				"position": 9,
				"required": true,
				"type": "numeric",
				"value": "150410"
			},
			"settlementDate": {
				"name": "Settlement Date",
				"width": 3,
				"position": 10,
				"required": false,
				"type": "numeric",
				"blank": true,
				"value": ""
			},
			"originatorStatusCode": {
				"name": "Originator Status Code",
				"width": 1,
				"position": 11,
				"required": true,
				"type": "numeric",
				"value": "1"
			},
			"originatingDFI": {
				"name": "Originating DFI",
				"width": 8,
				"position": 12,
				"required": true,
				"type": "numeric",
				"value": "021200025"
			},
			"batchNumber": {
				"name": "Batch Number",
				"width": 7,
				"position": 13,
				"required": false,
				"type": "numeric",
				"value": 456
			}
		},
		"control": {
			"recordTypeCode": {
				"name": "Record Type Code",
				"width": 1,
				"position": 1,
				"required": true,
				"type": "numeric",
				"value": "8"
			},
			"serviceClassCode": {
				"name": "Service Class Code",
				"width": 3,
				"position": 2,
				"required": true,
				"type": "numeric",
				"value": "220"
			},
			"addendaCount": {
				"name": "Addenda Count",
				"width": 6,
				"position": 3,
				"required": true,
				"type": "numeric",
				"value": 1
			},
			"entryHash": {
				"name": "Entry Hash",
				"width": 10,
				"position": 4,
				"required": true,
				"type": "numeric",
				"value": "8100021"
			},
			"totalDebit": {
				"name": "Total Debit Entry Dollar Amount",
				"width": 12,
				"position": 5,
				"required": true,
				"type": "numeric",
				"value": 0,
				"number": true
			},
			"totalCredit": {
				"name": "Total Credit Entry Dollar Amount",
				"width": 12,
				"position": 6,
				"required": true,
				"type": "numeric",
				"value": 35.23,
				"number": true
			},
			"companyIdentification": {
				"name": "Company Identification",
				"width": 10,
				"position": 7,
				"required": true,
				"type": "numeric",
				"value": "471934319"
			},
			"messageAuthenticationCode": {
				"name": "Message Authentication Code",
				"width": 19,
				"position": 8,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": ""
			},
			"reserved": {
				"name": "Reserved",
				"width": 6,
				"position": 9,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": ""
			},
			"originatingDFI": {
				"name": "Originating DFI",
				"width": 8,
				"position": 10,
				"required": true,
				"type": "numeric",
				"value": "021200025"
			},
			"batchNumber": {
				"name": "Batch Number",
				"width": 7,
				"position": 11,
				"required": false,
				"type": "numeric",
				"value": 456
			}
		}
	}, {
		"_entries": [],
		"header": {
			"recordTypeCode": {
				"name": "Record Type Code",
				"width": 1,
				"position": 1,
				"required": true,
				"type": "numeric",
				"value": "5"
			},
			"serviceClassCode": {
				"name": "Service Class Code",
				"width": 3,
				"position": 2,
				"required": true,
				"type": "numeric",
				"value": "220"
			},
			"companyName": {
				"name": "Company Name",
				"width": 16,
				"position": 3,
				"required": true,
				"type": "alphanumeric",
				"value": "AACMEASDFINC"
			},
			"companyDiscretionaryData": {
				"name": "Company Discretionary Data",
				"width": 20,
				"position": 4,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": " "
			},
			"companyIdentification": {
				"name": "Company Identification",
				"width": 10,
				"position": 5,
				"required": true,
				"type": "numeric",
				"value": "471934319"
			},
			"standardEntryClassCode": {
				"name": "Standard Entry Class Code",
				"width": 3,
				"position": 6,
				"required": true,
				"type": "alpha",
				"value": "PPD"
			},
			"companyEntryDescription": {
				"name": "Company Entry Description",
				"width": 10,
				"position": 7,
				"required": true,
				"type": "alphanumeric",
				"value": "NEW ASDF"
			},
			"companyDescriptiveDate": {
				"name": "Company Descriptive Date",
				"width": 6,
				"position": 8,
				"required": false,
				"type": "alphanumeric",
				"value": " "
			},
			"effectiveEntryDate": {
				"name": "Effective Entry Date",
				"width": 6,
				"position": 9,
				"required": true,
				"type": "numeric",
				"value": "150410"
			},
			"settlementDate": {
				"name": "Settlement Date",
				"width": 3,
				"position": 10,
				"required": false,
				"type": "numeric",
				"blank": true,
				"value": ""
			},
			"originatorStatusCode": {
				"name": "Originator Status Code",
				"width": 1,
				"position": 11,
				"required": true,
				"type": "numeric",
				"value": "1"
			},
			"originatingDFI": {
				"name": "Originating DFI",
				"width": 8,
				"position": 12,
				"required": true,
				"type": "numeric",
				"value": "021200025"
			},
			"batchNumber": {
				"name": "Batch Number",
				"width": 7,
				"position": 13,
				"required": false,
				"type": "numeric",
				"value": 457
			}
		},
		"control": {
			"recordTypeCode": {
				"name": "Record Type Code",
				"width": 1,
				"position": 1,
				"required": true,
				"type": "numeric",
				"value": "8"
			},
			"serviceClassCode": {
				"name": "Service Class Code",
				"width": 3,
				"position": 2,
				"required": true,
				"type": "numeric",
				"value": "220"
			},
			"addendaCount": {
				"name": "Addenda Count",
				"width": 6,
				"position": 3,
				"required": true,
				"type": "numeric",
				"value": 0
			},
			"entryHash": {
				"name": "Entry Hash",
				"width": 10,
				"position": 4,
				"required": true,
				"type": "numeric",
				"value": 0
			},
			"totalDebit": {
				"name": "Total Debit Entry Dollar Amount",
				"width": 12,
				"position": 5,
				"required": true,
				"type": "numeric",
				"value": 0,
				"number": true
			},
			"totalCredit": {
				"name": "Total Credit Entry Dollar Amount",
				"width": 12,
				"position": 6,
				"required": true,
				"type": "numeric",
				"value": 0,
				"number": true
			},
			"companyIdentification": {
				"name": "Company Identification",
				"width": 10,
				"position": 7,
				"required": true,
				"type": "numeric",
				"value": "471934319"
			},
			"messageAuthenticationCode": {
				"name": "Message Authentication Code",
				"width": 19,
				"position": 8,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": ""
			},
			"reserved": {
				"name": "Reserved",
				"width": 6,
				"position": 9,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": ""
			},
			"originatingDFI": {
				"name": "Originating DFI",
				"width": 8,
				"position": 10,
				"required": true,
				"type": "numeric",
				"value": "021200025"
			},
			"batchNumber": {
				"name": "Batch Number",
				"width": 7,
				"position": 11,
				"required": false,
				"type": "numeric",
				"value": 457
			}
		}
	}, {
		"_entries": [{
			"fields": {
				"recordTypeCode": {
					"name": "Record Type Code",
					"width": 1,
					"position": 1,
					"required": true,
					"type": "numeric",
					"value": "6"
				},
				"transactionCode": {
					"name": "Transaction Code",
					"width": 2,
					"position": 2,
					"required": true,
					"type": "numeric",
					"value": "22"
				},
				"receivingDFI": {
					"name": "Receiving DFI Identification",
					"width": 8,
					"position": 3,
					"required": true,
					"type": "numeric",
					"value": "021200025"
				},
				"checkDigit": {
					"name": "Check Digit",
					"width": 1,
					"position": 4,
					"required": true,
					"type": "numeric",
					"value": "0"
				},
				"DFIAccount": {
					"name": "DFI Account Number",
					"width": 17,
					"position": 5,
					"required": true,
					"type": "alphanumeric",
					"value": "12345678901234567"
				},
				"amount": {
					"name": "Amount",
					"width": 10,
					"position": 6,
					"required": true,
					"type": "numeric",
					"value": 35.23,
					"number": true
				},
				"idNumber": {
					"name": "Individual Identification Number",
					"width": 15,
					"position": 7,
					"required": false,
					"type": "alphanumeric",
					"value": "ASDFDSAF"
				},
				"individualName": {
					"name": "Individual Name",
					"width": 22,
					"position": 8,
					"required": true,
					"type": "alphanumeric",
					"value": "JOSH JER"
				},
				"discretionaryData": {
					"name": "Discretionary Data",
					"width": 2,
					"position": 9,
					"required": false,
					"type": "alphanumeric",
					"value": "A1"
				},
				"addendaId": {
					"name": "Addenda Record Indicator",
					"width": 1,
					"position": 10,
					"required": true,
					"type": "numeric",
					"value": "0"
				},
				"traceNumber": {
					"name": "Trace Number",
					"width": 15,
					"position": 11,
					"required": false,
					"type": "numeric",
					"blank": true,
					"value": "123456780000001"
				}
			}
		}],
		"header": {
			"recordTypeCode": {
				"name": "Record Type Code",
				"width": 1,
				"position": 1,
				"required": true,
				"type": "numeric",
				"value": "5"
			},
			"serviceClassCode": {
				"name": "Service Class Code",
				"width": 3,
				"position": 2,
				"required": true,
				"type": "numeric",
				"value": "220"
			},
			"companyName": {
				"name": "Company Name",
				"width": 16,
				"position": 3,
				"required": true,
				"type": "alphanumeric",
				"value": "ACME INC"
			},
			"companyDiscretionaryData": {
				"name": "Company Discretionary Data",
				"width": 20,
				"position": 4,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": " "
			},
			"companyIdentification": {
				"name": "Company Identification",
				"width": 10,
				"position": 5,
				"required": true,
				"type": "numeric",
				"value": "471934319"
			},
			"standardEntryClassCode": {
				"name": "Standard Entry Class Code",
				"width": 3,
				"position": 6,
				"required": true,
				"type": "alpha",
				"value": "PPD"
			},
			"companyEntryDescription": {
				"name": "Company Entry Description",
				"width": 10,
				"position": 7,
				"required": true,
				"type": "alphanumeric",
				"value": "NEW PAYMEN"
			},
			"companyDescriptiveDate": {
				"name": "Company Descriptive Date",
				"width": 6,
				"position": 8,
				"required": false,
				"type": "alphanumeric",
				"value": " "
			},
			"effectiveEntryDate": {
				"name": "Effective Entry Date",
				"width": 6,
				"position": 9,
				"required": true,
				"type": "numeric",
				"value": "150410"
			},
			"settlementDate": {
				"name": "Settlement Date",
				"width": 3,
				"position": 10,
				"required": false,
				"type": "numeric",
				"blank": true,
				"value": ""
			},
			"originatorStatusCode": {
				"name": "Originator Status Code",
				"width": 1,
				"position": 11,
				"required": true,
				"type": "numeric",
				"value": "1"
			},
			"originatingDFI": {
				"name": "Originating DFI",
				"width": 8,
				"position": 12,
				"required": true,
				"type": "numeric",
				"value": "021200025"
			},
			"batchNumber": {
				"name": "Batch Number",
				"width": 7,
				"position": 13,
				"required": false,
				"type": "numeric",
				"value": 458
			}
		},
		"control": {
			"recordTypeCode": {
				"name": "Record Type Code",
				"width": 1,
				"position": 1,
				"required": true,
				"type": "numeric",
				"value": "8"
			},
			"serviceClassCode": {
				"name": "Service Class Code",
				"width": 3,
				"position": 2,
				"required": true,
				"type": "numeric",
				"value": "220"
			},
			"addendaCount": {
				"name": "Addenda Count",
				"width": 6,
				"position": 3,
				"required": true,
				"type": "numeric",
				"value": 1
			},
			"entryHash": {
				"name": "Entry Hash",
				"width": 10,
				"position": 4,
				"required": true,
				"type": "numeric",
				"value": "8100021"
			},
			"totalDebit": {
				"name": "Total Debit Entry Dollar Amount",
				"width": 12,
				"position": 5,
				"required": true,
				"type": "numeric",
				"value": 0,
				"number": true
			},
			"totalCredit": {
				"name": "Total Credit Entry Dollar Amount",
				"width": 12,
				"position": 6,
				"required": true,
				"type": "numeric",
				"value": 35.23,
				"number": true
			},
			"companyIdentification": {
				"name": "Company Identification",
				"width": 10,
				"position": 7,
				"required": true,
				"type": "numeric",
				"value": "471934319"
			},
			"messageAuthenticationCode": {
				"name": "Message Authentication Code",
				"width": 19,
				"position": 8,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": ""
			},
			"reserved": {
				"name": "Reserved",
				"width": 6,
				"position": 9,
				"required": false,
				"type": "alphanumeric",
				"blank": true,
				"value": ""
			},
			"originatingDFI": {
				"name": "Originating DFI",
				"width": 8,
				"position": 10,
				"required": true,
				"type": "numeric",
				"value": "021200025"
			},
			"batchNumber": {
				"name": "Batch Number",
				"width": 7,
				"position": 11,
				"required": false,
				"type": "numeric",
				"value": 458
			}
		}
	}],
	"header": {
		"recordTypeCode": {
			"name": "Record Type Code",
			"width": 1,
			"position": 1,
			"required": true,
			"type": "numeric",
			"value": "1"
		},
		"priorityCode": {
			"name": "Priority Code",
			"width": 2,
			"position": 2,
			"required": true,
			"type": "numeric",
			"value": "01"
		},
		"immediateDestination": {
			"name": "Immediate Destination",
			"width": 10,
			"position": 3,
			"required": true,
			"type": "ABA",
			"paddingChar": " ",
			"value": "123456789"
		},
		"immediateOrigin": {
			"name": "Immediate Origin",
			"width": 10,
			"position": 4,
			"required": true,
			"type": "numeric",
			"paddingChar": " ",
			"value": "123456789"
		},
		"fileCreationDate": {
			"name": "File Creation Date",
			"width": 6,
			"position": 5,
			"required": true,
			"type": "numeric",
			"value": "150306"
		},
		"fileCreationTime": {
			"name": "File Creation Time",
			"width": 4,
			"position": 6,
			"required": true,
			"type": "numeric",
			"value": "0109"
		},
		"fileIdModifier": {
			"name": "File Modifier",
			"width": 1,
			"position": 7,
			"required": true,
			"type": "alphanumeric",
			"value": "A"
		},
		"recordSize": {
			"name": "Record Size",
			"width": 3,
			"position": 8,
			"type": "numeric",
			"required": true,
			"value": "094"
		},
		"blockingFactor": {
			"name": "Blocking Factor",
			"width": 2,
			"position": 9,
			"type": "numeric",
			"required": true,
			"value": "10"
		},
		"formatCode": {
			"name": "Format Code",
			"width": 1,
			"position": 10,
			"required": true,
			"type": "numeric",
			"value": "1"
		},
		"immediateDestinationName": {
			"name": "Immediate Destination Name",
			"width": 23,
			"position": 11,
			"required": true,
			"type": "alphanumeric",
			"value": "ACME ASDF DESTINATION"
		},
		"immediateOriginName": {
			"name": "Immediate Origin Name",
			"width": 23,
			"position": 12,
			"required": true,
			"type": "alphanumeric",
			"value": "ACME SDAF ORIGIN"
		},
		"referenceCode": {
			"name": "Reference Code",
			"width": 8,
			"position": 13,
			"required": true,
			"type": "alphanumeric",
			"value": "00000000"
		}
	},
	"control": {
		"recordTypeCode": {
			"name": "Record Type Code",
			"width": 1,
			"position": 1,
			"type": "numeric",
			"value": "9"
		},
		"batchCount": {
			"name": "Batch Count",
			"width": 6,
			"position": 2,
			"type": "numeric",
			"value": 2
		},
		"blockCount": {
			"name": "Block Count",
			"width": 6,
			"position": 3,
			"type": "numeric",
			"value": 1
		},
		"addendaCount": {
			"name": "Addenda Count",
			"width": 8,
			"position": 4,
			"type": "numeric",
			"value": 2
		},
		"entryHash": {
			"name": "Entry Hash",
			"width": 10,
			"position": 5,
			"type": "numeric",
			"value": "16200042"
		},
		"totalDebit": {
			"name": "Total Debit Entry Dollar Amount in File",
			"width": 12,
			"position": 6,
			"type": "numeric",
			"value": 0,
			"number": true
		},
		"totalCredit": {
			"name": "Total Credit Entry Dollar Amount in File",
			"width": 12,
			"position": 7,
			"type": "numeric",
			"value": 70.46,
			"number": true
		},
		"reserved": {
			"name": "Reserved",
			"width": 39,
			"position": 8,
			"type": "alphanumeric",
			"blank": true,
			"value": ""
		}
	}
};
