import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail, Column } from "../../models";
import { PaginatorProvider, PaginatorContext,channelsMonitoringContext, StatsContext, AuthContext } from "../../providers";
import { appRoles, appTableElements } from "../../constants";
import { useToast } from "@chakra-ui/react";

interface ChannelsMonitoringTableSetupProps {
    url?: string
}

export const ChannelsMonitoringTableSetup: FC<ChannelsMonitoringTableSetupProps> = (props: ChannelsMonitoringTableSetupProps) => {
    const {token, userDetail} = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { selectedTenantCode } = useContext(StatsContext)
    const { tabs } = useContext(channelsMonitoringContext)
    let url = props.url? props.url : (tabs.findIndex((x) => x.isSelected) > -1 ? tabs.find((x) => x.isSelected)?.url : "") as string
    if (userDetail && ( userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && ( userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
        if(userDetail.role.name !== appRoles.superAdmin){
            url = `${url}${userDetail.tenant.code}/`
          } else if(userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0")  {
            url = `${url}${selectedTenantCode}/`
          }
    }
    url += `details/`
    url = token && userDetail?`${url}?page=${(pageNumber - 1)}&size=${countPerPage}`: "";
    const { data: atmCountDetail, mutate: _mutate, error } = useSWR<Paginate<ATMCountDetail>>(url === "" ? null : url)
    const toast = useToast()
    const data = useMemo(() => {
        const rowData = url === "" ? [] : typeof atmCountDetail !== "undefined" && typeof error === "undefined" ? atmCountDetail?.content as ATMCountDetail[] : typeof error !== "undefined" ? [] : undefined
        return {
            columns: [
                {
                    name: "Tenant",
                    key: "tenantName"
                }, {
                    name: "Terminal ID",
                    key: "terminalId"
                }, {
                    name: "Channel IP",
                    key: "externalIP"
                }, {
                    name: "Location",
                    key: "location"
                }, {
                    name: "State",
                    key: "state"
                }, {
                    name: "Last Transaction Time",
                    key: "lastTranTime",
                    ele: appTableElements.dateTime
                }, {
                    name: "Terminal Status",
                    key: "terminalStatus",
                    ele: appTableElements.status,
                    lookUp: ["Not Active", "Active"]
                }
            ] as Column[],
            data: rowData
        }
    }, [atmCountDetail, error])

    useEffect(() => {
        if (typeof error !== "undefined") {
            toast({
                status: "error",
                title: typeof error.message === "undefined" ? error : error.message,
                variant: "left-accent",
                isClosable: true
            })
        }
    }, [error])
    useEffect(() => {
        // debugger
        if (typeof atmCountDetail !== "undefined" && typeof atmCountDetail.totalElements !== "undefined" && typeof atmCountDetail.totalPages !== "undefined" && atmCountDetail.totalPages > 1) {
            setPaginationProps(atmCountDetail.totalElements)
        } else {
            setPaginationProps(0)
        }
    }, [atmCountDetail])


    return (<AppTable<ATMCountDetail> columns={data?.columns} rows={data.data as ATMCountDetail[]} showNumbering />)

}

const ChannelsMonitoringTable: FC = () => {
    return (

        <PaginatorProvider>
            <ChannelsMonitoringTableSetup />
        </PaginatorProvider>
    )
}

export default ChannelsMonitoringTable