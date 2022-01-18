import { Text, Button, FormControl, FormLabel, Input, useToast, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { cookieKeys, cookiesTimeout, links, notificationMesage } from "../../constants";
import { setCookie } from "../../lib";
import useLoading from "../../hooks/loading";
import { getInterchangeById } from "../../services/v1";
import { AppLink } from "../app";

const RegisterForm:FC = () => {

    const router = useRouter()
    const [interChangeId, setInterChangeId] = useState<string>()
    const toast = useToast()
    const [loading, setLoading] = useLoading()
    const getInterChangebyInterchangeId = async () => {
        try {
            // debugger
            setLoading({ isLoading: true, text: "Confirming" })
            const data = await getInterchangeById(interChangeId as string)
            if (typeof data.statusCondition !== "undefined" && +data.statusCondition === 1 && typeof interChangeId !== "undefined") {
                // debugger
                setCookie(cookieKeys.interchangeId, interChangeId, cookiesTimeout.interchangeIdTimeout)
                toast({
                    status: "success",
                    title: notificationMesage.SuccessfulLogin,
                    isClosable: true,
                    variant: "left-accent"
                })
                router.push(links.onboarding)
                return
            } else if (typeof data.statusCondition !== "undefined") {
                throw {
                    data
                }
            } else {
                throw new Error(notificationMesage.AnErrorOccurred)
            }
        } catch (error: any) {
            console.error({ getInterChangebyInterchangeIdError: error })
            if (typeof error.message !== "undefined" || typeof error !== "undefined") {
                toast({
                    status: "error",
                    title: typeof error.message === "undefined" ? error : error.message,
                    isClosable: true,
                    variant: "left-accent"
                })
            }
            setLoading({ isLoading: false, text: "" })
        }
    }
    return (
        <form method="POST" onSubmit={((e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(), getInterChangebyInterchangeId()
        })}>
            <Flex flexDir="column" gridGap="36px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="36px">
                <Text variant="card-header" size="page-header" >Register</Text>
                <FormControl id="organizationId">
                    <FormLabel>Organization ID</FormLabel>
                    <Input placeholder="XYZ1278IO" borderRadius="4px" onInput={(e) => {
                        e.stopPropagation()
                        const ele = e.target as HTMLInputElement
                        setInterChangeId(ele.value)
                    }} />
                </FormControl>
                <Flex flexDir="column" gridGap="15px" w="100%" alignItems="center">
                    <Button isLoading={loading.isLoading} loadingText={loading.text} type="submit" variant="primary-button" w="100%" py="12px">
                        Submit
                    </Button>
                    <AppLink href={links.login} color="brand.primary-blue" >Back to Login</AppLink>
                </Flex>
            </Flex>
        </form>)
}

export default RegisterForm