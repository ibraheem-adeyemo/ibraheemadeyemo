import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail, Column, TransactionMonitoringTableProps, Record, TransactionPropObject, RealTimeObject } from "../../models";
import { PaginatorProvider, PaginatorContext,channelsMonitoringContext, StatsContext, AuthContext } from "../../providers";
import { appRoles, appTableElements } from "../../constants";
import { useToast } from "@chakra-ui/react";


export const TransactionsMonitoringTableSetup: FC<TransactionMonitoringTableProps> = (props: TransactionMonitoringTableProps) => {
    // console.log({pageNumber})
    const {token, userDetail} = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { selectedTenantCode } = useContext(StatsContext)
    const { tabs } = useContext(channelsMonitoringContext);
    // console.log({tabs})
    // let url = props.url? props.url : (tabs.findIndex((x) => x.isSelected) > -1 ? tabs.find((x) => x.isSelected)?.url : "") as string
    // if (userDetail && ( userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && ( userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
    //     if(userDetail.role.name !== appRoles.superAdmin){
    //         url = `${url}${userDetail.tenant.code}/`
    //       } else if(userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0")  {
    //         url = `${url}${selectedTenantCode}/`
    //       }
    // }
    // url += `details/`
    // url = token && userDetail?`${url}?page=${(pageNumber - 1)}&size=${countPerPage}`: "";
    const transactionMonitoringData = props
    const toast = useToast()
    const data = useMemo(() => {
        return {
            columns: [
                {
                    name: "Date",
                    key: '',
                    ele: appTableElements.dateTime
                }, {
                    name: "Pan",
                    key: "pan"
                }, {
                    name: "Transaction type",
                    key: "transactionType"
                }, {
                    name: "Ref code",
                    key: "refCode"
                }, {
                    name: "Stan",
                    key: "stan"
                }, {
                    name: "Amount",
                    key: "amount",
                }, {
                    name: "Terminal Status",
                    key: "terminalStatus",
                    ele: appTableElements.status,
                    lookUp: ["Not Active", "Active"]
                }
            ] as Column[],
            data:transactionMonitoringData
        }
    }, [transactionMonitoringData])

    // useEffect(() => {
    //     if (typeof error !== "undefined") {
    //         toast({
    //             status: "error",
    //             title: typeof error.message === "undefined" ? error : error.message,
    //             variant: "left-accent",
    //             isClosable: true
    //         })
    //     }
    // }, [error])
    // useEffect(() => {
    //     // debugger
    //     if (typeof atmCountDetail !== "undefined" && typeof atmCountDetail.totalElements !== "undefined" && typeof atmCountDetail.totalPages !== "undefined" && atmCountDetail.totalPages > 1) {
    //         setPaginationProps(atmCountDetail.totalElements)
    //     } else {
    //         setPaginationProps(0)
    //     }
    // }, [atmCountDetail])


    return (<AppTable<TransactionPropObject> columns={data?.columns} rows={data.data.records as TransactionPropObject[]} showNumbering />)

}

const TransactionsMonitoringTable = ({transactiondata}:{transactiondata:TransactionPropObject[]}) => {
    console.log(transactiondata, 'cooooonsssssss=====ole')
    const transactionMonitoringData = [
        {
            date: new Date().getDate().toLocaleString(),
            MSSType: '02.00',
            transactionType: '01',
            pan: 'Lagos',
            amount: 3000.00,
            refCode: 'aproved',
            stan: 'bills'
        },
        {
            date: new Date().getDate().toLocaleString(),
            MSSType: '02.00',
            transactionType: '01',
            pan: 'Lagos',
            amount: 5000.00,
            refCode: 'system failure',
            stan: 'data'
        },
        {
            date: new Date().getDate().toLocaleString(),
            MSSType: '02.00',
            transactionType: '01',
            pan: 'Lagos',
            amount: 6000.00,
            refCode: 'user failure',
            stan: 'bills'
        },
    ]
    return (
        <PaginatorProvider>
            <TransactionsMonitoringTableSetup records={transactionMonitoringData} />
        </PaginatorProvider>
    )
}

export default TransactionsMonitoringTable