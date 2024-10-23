import TokenIcon from "/public/svg/mobile-menu/token.svg";
import WhitepaperIcon from "/public/svg/mobile-menu/whitepaper.svg";
import BuyNowIcon from "/public/svg/mobile-menu/buy-now.svg";
import MyAccountIcon from "/public/svg/mobile-menu/my-account.svg";

export const links = [
    {
        title: "Token",
        href: "ANTIXTokens",
    },
    {
        title: "Whitepaper",
        href: "https://antix.gitbook.io/antix-white-paper",
    },
    {
        title: "Buy Now",
        href: "Hero",
    },
];

export const linksDashboard = [
    {
        title: "Dashboard",
        href: "",
    },
    {
        title: "Claim",
        href: "",
    },
    {
        title: "Referral",
        href: "",
    },
];

type mobileLinksType = {
    label: string;
    href: string;
    icon?: string;
}

export const mobileLinks:mobileLinksType[] = [
    {
        label: "Token",
        href: "ANTIXTokens",
        icon: TokenIcon,
    },
    {
        label: "Whitepaper",
        href: "https://antix.io/whitepaper",
        icon: WhitepaperIcon,
    },
    {
        label: "Buy Now",
        href: "Hero",
        icon: BuyNowIcon,
    },
    {
        label: "My Account",
        href: "#",
        icon: MyAccountIcon,
    },
];

export const mobileLinksDashboard:mobileLinksType[] = [
    {
        label: "Dashboard",
        href: "",
    },
    {
        label: "Claim",
        href: "",
    },
    {
        label: "Referral",
        href: "",
    },
    {
        label: "Back to the Main Page",
        href: "/",
    },
];