export const ToggleABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "toggleUpdate",
        type: "event",
    },
    {
        inputs: [],
        name: "get",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "toggle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "trueOrFalse",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

export const ToggleContractAddress =
    "0x9284775226F035a17CCa4799d7A60195019764c8";
