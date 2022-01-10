import { PASSPORT_AUTHORIZE_URL, CLIENT_ID, SCOPE, RESPONSE_TYPE, API_BASE_URL, CURRENT_API_VERSION } from ".";
import { apiUrlsv1Model } from "../models";

export enum links {
    index="/",
    registerOrganization = "/register",
    dashboard="/dashboard",
    login="/login",
    userManagement="/user-management",
    createBank="/onboarding/craate-bank",
    createSuperAdmin="/onboarding/create-super-admin",
    institutionColors="/onboarding/institution-colors",
    onboarding="/onboarding",
    onboardingSuccessPage="/onboarding/success-page",
    notFound="/404",
    channelsMonitoring="/channels-monitoring",
    transactionMonitoring="/transaction-monitoring",
    audit="/audit"

}

export const apiUrlsv1: Readonly<apiUrlsv1Model> = {
    atmCount: `${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/count`,
    atmCountDetails: `${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/count/details/`,
    atmInService:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/in-service`,
    atmInServiceDetails:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/in-service/details/`,
    atmInSupervisor:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/supervisor`,
    atmInSupervisorDetails:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/supervisor/details/`,
    atmOutOfService:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/offline`,
    atmOutOfServiceDetails:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/offline/details/`,
    atmStats:`${API_BASE_URL}/${CURRENT_API_VERSION}/monitor/atm/`,
    audit: `${API_BASE_URL}/${CURRENT_API_VERSION}/audit/`,
    auditByUser:`${API_BASE_URL}/${CURRENT_API_VERSION}/audit/user`,
    createTenantAdmin:`${API_BASE_URL}/${CURRENT_API_VERSION}/user/tenant-admin`,
    interChange:`${API_BASE_URL}/${CURRENT_API_VERSION}/interchange`,
    iswAdmin:`/api/get-isw-admins`,
    passportUrl:`${PASSPORT_AUTHORIZE_URL}?client_id=${CLIENT_ID}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&redirect_uri=`,
    states:`${API_BASE_URL}/${CURRENT_API_VERSION}/location/states`,
    tenant:`${API_BASE_URL}/${CURRENT_API_VERSION}/tenant`,
    tenantAdmin:`${API_BASE_URL}/${CURRENT_API_VERSION}/user/admins`,
}