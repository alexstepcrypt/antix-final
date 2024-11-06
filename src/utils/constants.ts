export const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const ETH_CONTRACT_ADDRESS = "0x0610FB7da1D8509B0bBF3f8372Af47781cDED6fB";

export const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address _owner, address _spender) view returns (uint256)"
];