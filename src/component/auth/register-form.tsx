import { Text, Button, FormControl, FormLabel, Input, useToast, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { cookieKeys, cookiesTimeout, links, notificationMesage, sessionStorageKeys } from "../../constants";
import { setCookie } from "../../lib";
import useLoading from "../../hooks/loading";
import { getInterchangeById } from "../../services/v1";
import { AppLink } from "../app";
import { CrossDomainOnboardingContext } from "../../providers/cross-domain-onboarding-provider";
import { MotionBox, MotionButton, MotionFlex } from "../framer";

const RegisterForm: FC = () => {

    const router = useRouter()
    const [interChangeId, setInterChangeId] = useState<string>()
    const toast = useToast()
    const [loading, setLoading] = useLoading()

    const { isOnCrossDomain, setInterChangeIdData, removeData, cantVew } = useContext(CrossDomainOnboardingContext)

    const getInterChangebyInterchangeId = async () => {
        try {
          
            setLoading({ isLoading: true, text: "Confirming" })
            const data = await getInterchangeById(interChangeId as string)
            if (typeof data.statusCondition !== "undefined" && +data.statusCondition === 1 && typeof interChangeId !== "undefined") {
              
                setCookie(cookieKeys.interchangeId, interChangeId, cookiesTimeout.interchangeIdTimeout)
                if (isOnCrossDomain) {
                    setInterChangeIdData(interChangeId)
                }
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

    useEffect(() => {
      
        sessionStorage.removeItem(sessionStorageKeys.onboarding)
        removeData()
        return () => {
            // window.removeEventListener("message", readEventMsg)
        }
    }, [])
    return (
        <>
            {!cantVew && (<form method="POST" onSubmit={((e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                getInterChangebyInterchangeId()
            })}>
                <MotionFlex sx={{
                    flexDir: "column",
                    gridGap: "36px",
                    px: "66px",
                    bg: "white",
                    borderRadius: "6px",
                    alignItems: "center",
                    w: "633px",
                    py: "36px"
                }}
                    initial="hide"
                    animate="show"
                    variants={{
                        show: {
                            opacity: 1,
                            transition: {
                                duration: 0.2,
                                delay: 0.2,
                                when: "afterChildren"
                            }
                        },
                        hide: {
                            opacity: 0
                        }
                    }}
                >
                    <Text variant="card-header" size="page-header" >Register</Text>
                    <FormControl id="organizationId">
                        <FormLabel
                            sx={{
                                overflow: "hidden",
                                display: "inline-block"
                            }}>
                            <MotionBox sx={{
                                display: "inline-block"
                            }} 
                            initial="hide"
                            animate="show"
                            variants={{
                                show: {
                                    y: 0,
                                    transition: { duration: 0.85 }
                                },
                                hide: {
                                    y: "200%",
                                    transition: { duration: 0.75 }
                                }
                            }}>
                                Organization ID</MotionBox></FormLabel>
                        <Input placeholder="XYZ1278IO" borderRadius="4px" onInput={(e) => {
                            e.stopPropagation()
                            const ele = e.target as HTMLInputElement
                            setInterChangeId(ele.value)
                        }} />
                    </FormControl>
                    <MotionFlex flexDir="column" gridGap="15px" w="100%" alignItems="center"
                        variants={{
                            open: {
                                opacity: "1",
                                transition: {duration: 0.6}
                            },
                            close: {
                                opacity: "0",
                                transition: {duration: 0.6}
                            }
                        }}
                        animate="open"
                        initial="close"
                    >
                        <MotionButton isLoading={loading.isLoading} loadingText={loading.text} type="submit" variant="primary-button" sx={{
                            w: "100%",
                            py: "12px"
                        }}
                        
                        variants={{
                            hide: {
                                opacity: 0
                            },
                            show: {
                                opacity: 1
                            }
                        }}
                        >
                            Submit
                        </MotionButton>
                        {!isOnCrossDomain && <MotionBox
                            sx={{
                                overflow: "hidden",
                                display: "inline-block"
                            }}
                        >
                            <MotionBox
                                sx={{
                                    display: "inline-block"
                                }}
                                initial="hide"
                                animate="show"
                                variants={{
                                    show: {
                                        y: 0,
                                        transition: { duration: 0.85 }
                                    },
                                    hide: {
                                        y: "200%",
                                        transition: { duration: 0.75 }
                                    }
                                }}
                            >
                                <AppLink href={links.login} color="brand.primary-blue" >Back to Login</AppLink>
                            </MotionBox>
                        </MotionBox>}
                    </MotionFlex>
                </MotionFlex>
            </form>)}
            {cantVew && <Flex flexDir="column" gridGap="36px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="36px"><Text variant="card-header" size="page-header">You can't view This page</Text></Flex>}
        </>
    )
}

export default RegisterForm