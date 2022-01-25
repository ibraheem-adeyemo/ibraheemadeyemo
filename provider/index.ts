import auditProvider from "./audit-provider";
import authProvider from "./auth-provider";
import channelsMonitoringProvider from "./channels-monitoring-provider";
import statsProvider from "./stats-provider";
import paginatorProvider from "./paginator-provider";
import userManagementTabProvider from "./user-management-tab-provider";
import interchangeDisconnectionProvider from "./interchange-disconnection-provider";
import crossDomainOnboardingProvider from "./cross-domain-onboarding-provider";
import onboardingProvider from "./onboarding-provider";

export const AuditProvider = auditProvider
export const AuthProvider = authProvider
export const ChannelsMonitoringProvider = channelsMonitoringProvider
export const StatsProvider = statsProvider
export const PaginatorProvider = paginatorProvider
export const UserManagementTabProvider = userManagementTabProvider
export const InterchangeDisconnectionProvider = interchangeDisconnectionProvider
export const CrossDomainOnboardingProvider = crossDomainOnboardingProvider
export const OnboardingProvider = onboardingProvider