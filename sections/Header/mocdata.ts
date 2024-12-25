import TokenIcon from "/public/svg/mobile-menu/token.svg";
import WhitepaperIcon from "/public/svg/mobile-menu/whitepaper.svg";
import MyAccountIcon from "/public/svg/mobile-menu/my-account.svg";
import TeamIcon from '/public/svg/mobile-menu/team-icon.svg';
import AntixIcon from '/public/svg/mobile-menu/antix.svg';

type linksType = {
    label: string;
    href: string;
    disabled?: boolean;
};

export const links: linksType[] = [
    {
        label: "Token",
        href: "ANTIXTokens",
    },
    {
        label: "Whitepaper",
        href: "https://antix.gitbook.io/antix-white-paper",
    },
    {
        label: "Team",
        href: "Team",
    },
    {
        label: "Main",
        href: "https://antix.in/",
    },
];

export const linksDashboard: linksType[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        disabled: false,
    },
    {
        label: "Referral",
        href: "/dashboard/referral",
        disabled: false,
    },
    {
        label: "Claim",
        href: "",
        disabled: false,
    },
    {
        label: "Main",
        href: "https://antix.in/",
        disabled: false,
    },
];

type mobileLinksType = {
    label: string;
    href: string;
    icon?: string;
    disabled?: boolean;
};

export const mobileLinks: mobileLinksType[] = [
    {
        label: "Token",
        href: "ANTIXTokens",
        icon: TokenIcon,
    },
    {
        label: "Whitepaper",
        href: "https://antix.gitbook.io/antix-white-paper",
        icon: WhitepaperIcon,
    },
    {
        label: "Team",
        href: "Team1",
        icon: TeamIcon,
    },
    {
        label: "Main",
        href: "https://antix.in/",
        icon: AntixIcon
    },
    {
        label: "My Account",
        href: "/dashboard",
        icon: MyAccountIcon,
    },
];

export const mobileLinksDashboard: mobileLinksType[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        disabled: false,
    },
    {
        label: "Claim",
        href: "",
        disabled: true,
    },
    {
        label: "Referral",
        href: "/dashboard/referral",
        disabled: false,
    },
    {
        label: "Main",
        href: "https://antix.in/",
        disabled: false
    },
    {
        label: "Back to the Main Page",
        href: "/",
        disabled: false,
    },
];
