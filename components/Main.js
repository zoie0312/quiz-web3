import {
    useContractRead,
    useEnsName,
    useAccount,
    useBalance,
    useContractWrite,
    usePrepareContractWrite,
    useContractEvent,
} from "wagmi";
import { useEffect, useState } from "react";
import { Center, VStack, HStack, Box, Button } from "@chakra-ui/react";

import { ToggleABI, ToggleContractAddress } from "../abi/Toggle";

const Main = () => {
    const { address } = useAccount();
    const {
        data: ensData,
        isError,
        isLoading,
        refetch: refetchENS,
    } = useEnsName({
        address: address,
        onError: (err) => {
            console.log(err);
        },
    });
    //console.log("ens data ", JSON.stringify(ret, null, 2));
    const { data: balanceData } = useBalance({
        addressOrName: address,
    });
    //console.log("user balance ", balanceData);

    const { data: toggleStatus, refetch: refetchToggle } = useContractRead({
        addressOrName: ToggleContractAddress,
        contractInterface: ToggleABI,
        functionName: "get",
    });
    //console.log("toggleStatus: ", toggleStatus);
    const { config } = usePrepareContractWrite({
        addressOrName: ToggleContractAddress,
        contractInterface: ToggleABI,
        functionName: "toggle",
        //args: [address, metadataUri],
        chainId: 5,
        // overrides: {
        //     value: ethers.utils.parseUnits('1', 'gwei')
        // }
    });
    const { write: toggle } = useContractWrite(config);
    useContractEvent({
        addressOrName: ToggleContractAddress,
        contractInterface: ToggleABI,
        eventName: "toggleUpdate",
        listener: (event) => {
            //console.log("toggleUpdate", event);
            refetchToggle();
        },
    });

    const onButtonClick = async () => {
        const ret = await refetchENS();
        console.log("ret ", ret);
    };
    const toggleHandler = () => {
        toggle();
    };
    return (
        <VStack alignItems="flex-start">
            {/* <div>address: {address}</div> */}
            <HStack>
                <div>ENS: {ensData}</div>
                <Button onClick={onButtonClick}>Fetch ENS Name</Button>
            </HStack>
            <Box>
                Balance: {balanceData?.formatted} {balanceData?.symbol}
            </Box>
            <HStack>
                <Box>Current Toggle Status:</Box>
                <Box color="red.300">{toggleStatus?.toString()}</Box>
            </HStack>
            <Button onClick={toggleHandler}>Click to toggle</Button>
        </VStack>
    );
};

export default Main;
