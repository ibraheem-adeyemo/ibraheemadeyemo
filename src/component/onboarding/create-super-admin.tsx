import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/accordion";
import { Avatar, useToast, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { horizontalPositionWithOpacity, staggerChildrenWithDuration } from "../../animations";
import { notificationMesage, TickIcon } from "../../constants";
import { Tenant, Onboarding, stepsProps, tenantAdmin } from "../../models";
import { OnboardingContext } from "../../providers";
import { MotionAccordion, MotionAccordionItem } from "../framer";

interface CreateSuperAdminProps extends stepsProps {

}

const CreateSuperAdminWithExistingSuperAdminAccount = dynamic(() => import('./creat-super-admin-with-existing-passport-account'), {ssr:false})
const CreateSuperAdminWithoutExistingSuperAdminAccount = dynamic(() => import('./creat-super-admin-without-existing-passport-account'), {ssr:false})
const SigninWithPassport = dynamic(() => import('./signin-with-passport'), {ssr:false})



const CreateSuperAdmin:React.FC<CreateSuperAdminProps> = (props: CreateSuperAdminProps) => {
    
    const { steps, onboarding, refresh, resetForm, previousState } = useContext(OnboardingContext)
    const router = useRouter()
    const [authenticatedUser] = useState<tenantAdmin>()
    const [accordionindex, setAccordionindex] = useState<number>()
    const [openModal, setOpenModal] = useState<boolean>()
    const toast = useToast()
    
    const setUserAuthority = (user: tenantAdmin) => {
      
        // setAuthenticatedUser(user)
        onCloseModal()
        resetForm("tenantAdmin", user)
        toast({
            title: notificationMesage.AccountVerified,
            status: "success",
            variant: "left-accent",
            isClosable: true
        })
    }
    const onCloseModal = () => {
        // debbuger
        setOpenModal(false)
    }

    useEffect(() => {
        refresh("tenantAdmin", 1)
    }, [])
    useEffect(() => {
        if (typeof onboarding?.tenantAdmin !== "undefined") {
            if (onboarding.tenantAdmin.access_token !== "") {
                setAccordionindex(0)
            } else if(onboarding.tenantAdmin.confirmPassword !== "") {
                setAccordionindex(1)
            }
        } else {

            setAccordionindex(-1)
        }
    }, [onboarding?.tenantAdmin])
    useEffect(() => {
        if (typeof onboarding !== "undefined" && typeof steps !== "undefined" && typeof props.step !== "undefined") {
          
            let step = steps[props.step]
            if (props.step - 1 > -1) {
                step = steps[props.step - 1]
            }
            if ((onboarding[step.key as keyof Onboarding] as Tenant).completed === false) {
                previousState()
                router.push(step.url)
            }
        }
    }, [steps])

    useEffect(() => {
        if (typeof authenticatedUser !== "undefined") {
            if (!openModal && Object.values(authenticatedUser).length === 0) {
                setAccordionindex(-1)
            }
        } else {
            if (!openModal) {
                setAccordionindex(-1)
            }
        }
    }, [openModal])

    return (
        <>
            <MotionAccordion d="flex" flexDir="column" gap="24px" w="100%" index={accordionindex} onChange={(n) => setAccordionindex(n as number)} animate="show" initial="hide" variants={staggerChildrenWithDuration}>
                <MotionAccordionItem w="100%" bgColor="white" animate="show" initial="hide" variants={horizontalPositionWithOpacity()}>
                    {({ isExpanded }) => {
                        return <>
                            <AccordionButton onClick={() => setOpenModal(() => isExpanded ? false : true)}  py="34px" >
                                <Flex gap="17px" alignItems="center" justifyContent="flex-start" w="100%">
                                    {isExpanded ? (
                                        <Avatar boxSize="26px" bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
                                    ) : (
                                        <Avatar boxSize="26px" showBorder borderColor="var(--chakra-colors-brand-muted)" name=" " bgColor="white"></Avatar>
                                    )}
                                    <Text textAlign="right" variant="card-header">
                                        Create Bank admin with an exisiting Interswitch Passport account
                                    </Text>
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel>
                                {accordionindex === 0 && <CreateSuperAdminWithExistingSuperAdminAccount />}
                                {accordionindex === 1 && <></>}
                            </AccordionPanel>
                        </>
                    }}
                </MotionAccordionItem>

                <MotionAccordionItem w="100%" bgColor="white" animate="show" initial="hide" variants={horizontalPositionWithOpacity(1)}>
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton w="100%"  py="34px">
                                <Flex gap="17px" alignItems="center" justifyContent="flex-start" w="100%">
                                    {isExpanded ? (
                                        <Avatar boxSize="26px" bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
                                    ) : (
                                        <Avatar boxSize="26px" showBorder borderColor="var(--chakra-colors-brand-muted)" name=" " bgColor="white"></Avatar>
                                    )}
                                    <Text textAlign="right" variant="card-header">
                                        Create Bank admin with a new account
                                    </Text>
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel>

                                {accordionindex === 1 && <CreateSuperAdminWithoutExistingSuperAdminAccount />}
                                {accordionindex === 0 && <></>}
                            </AccordionPanel>
                        </>
                    )}
                </MotionAccordionItem>
            </MotionAccordion>
            { openModal && <SigninWithPassport openModal={openModal as boolean} onCloseModal={onCloseModal} setUserAuthority={setUserAuthority} />}
        </>
    )
}

export default CreateSuperAdmin