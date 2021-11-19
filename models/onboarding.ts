export interface Tenant {
    name: string,
    tenantCode: string,
    branch: string,
    location: string,
    address: string,
    logo: string,
    completed: boolean,
}

export interface InstitutionColorInfo {
    headerColor: string,
    sidebarColor: string,
    buttonColor: string,
    completed: boolean,
}

export interface tenantAdmin {
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    password: string,
    confirmPassword: string,
    access_token: string,
    completed: boolean
}


export interface Onboarding {
    state: number,
    tenant: Tenant,
    tenantAdmin: tenantAdmin,
    institutionColorInfo: InstitutionColorInfo,
    url: string

}

export type Step = {
    name: string,
    description: string,
    url: string,
    key: string
}

export interface stepsProps {
    step: number
}

export interface PassportLoginCredentials {
    email: string,
    password: string
}