import { apiUrlsv1, cookieKeys, cookiesTimeout, Names, notificationMesage, sessionStorageKeys } from "../../constants"
import { fetchJson, getCookie, getRandomInt, setCookie } from "../../lib"
import { Onboarding } from "../../models"

export const createAccountAsync = async (onboarding: Onboarding) => {
  
    try {
        const interchangeId1 = getCookie(cookieKeys.interchangeId)
        const interchangeId2 = window.sessionStorage.getItem(sessionStorageKeys.interchangeId)
        if (interchangeId1 !== "" || interchangeId2) {
            const body = onboarding

            const requestBody = JSON.stringify({
                tenant: {
                    name: body.tenant?.name,
                    code: body.tenant?.tenantCode,
                    domain: `www.${Names[getRandomInt(Names.length)].firstName}-${Names[getRandomInt(Names.length)].lastName}.${Names[getRandomInt(Names.length)].lastName}`,
                    slogan: "",
                    logo: body.tenant.logo.split(",")[1],
                    address: body.tenant.address,
                    location: body.tenant.location,
                    branch: body.tenant.branch,
                    color: {
                        headerColor: body.institutionColorInfo.headerColor,
                        sidebarColour: body.institutionColorInfo.sidebarColor,
                        buttonColor: body.institutionColorInfo.buttonColor
                    }
                },
                tenantAdmin: {
                    firstName: body.tenantAdmin.firstName,
                    lastName: body.tenantAdmin.lastName,
                    email: body.tenantAdmin.email,
                    password: body.tenantAdmin.password,
                    mobileNo: body.tenantAdmin.mobileNo,
                    tenantCode: body.tenant?.tenantCode,
                    username: body.tenantAdmin.email
                }
                // ...body.institutionColorInfo,
            })
            const data = await fetchJson<any>(apiUrlsv1.createTenantAdmin, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestBody
            })
            // const response = {
            //     ok: true,
            //     status: 200,
            //     json: async () => JSON.parse(requestBody)
            // }
            // const data = await response.json()
            // if (response.ok || response.status === 200) {
            if(typeof data !== "undefined"){
                setCookie(cookieKeys.createdAccount, "done", cookiesTimeout.createdAccountTimeout)
                return data
            } else {
                throw new Error(notificationMesage.AnErrorOccurred)
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }
    } catch (error: any) {
      
        throw error
    }
}