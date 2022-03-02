import { ButtonGroup, Button } from "@chakra-ui/react";
import React, { FC, useContext, useEffect } from "react";
import { InterchangeDisconnectionContext } from "../../providers/interchange-disconnection-provider";

const InterchangeDisconnectionTabs: FC = () => {
    const { tabs, modifyTab } = useContext(InterchangeDisconnectionContext)
    const handleTabSelection = (i: number) => {
      
        modifyTab({ ...tabs[i], isSelected: true }, i)
    }
    useEffect(() => {
      // console.log({tabs})
    }, [tabs])
    return <ButtonGroup spacing="0">
            {tabs.map((x, i, arr) => <Button isActive={x.isSelected} key={i} px="20px" py="11px" borderTopLeftRadius={i === 0 ? "4px" : "0px"} borderBottomLeftRadius={i === 0 ? "4px" : "0px"} borderTopRightRadius={(i + 1) === arr.length ? "4px" : "0px"} borderBottomRightRadius={(i + 1) === arr.length ? "4px" : "0px"} colorScheme="blue" variant="outline" onClick={(e) => handleTabSelection(i)}>{x.name}</Button>)}
        </ButtonGroup>
}
export default InterchangeDisconnectionTabs
