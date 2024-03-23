import * as GrIcons from "react-icons/gr";
import * as VsIcons from "react-icons/vsc";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";


export const chatLinks = [
    {
        href: '/dashboard/chat',
        title: 'Chat',
        icon: <IoIcons.IoStatsChart/>
    },
    {
        href: '/dashboard/wallet',
        title: 'Wallet',
        icon: <BiIcons.BiWallet/>
    },
    {
        href: '/dashboard/activity',
        title: 'Activity',
        icon: <BsIcons.BsHourglassSplit/>
    },
    {
        href: '/dashboard/settings',
        title: 'Settings',
        icon: <RiIcons.RiSettingsLine/>
    },
    
];

export const socials = [
    {
        icon: <FaIcons.FaTwitter />,
        href: ''
    },
    {
        icon: <FaIcons.FaTelegram />,
        href: ''
    },
    {
        icon: <FaIcons.FaDiscord />,
        href: ''
    }
];

export const nav = [
    // {
    //     name: 'Tools',
    //     href: ''
    // },
    {
        name: 'Docs',
        href: 'https://docs.chatxbt.com/chatxbt-protocol/'
    },
    {
        name: 'Whitepaper',
        href: 'https://drive.google.com/file/d/1ZYVwRWUXiN9K0z63W70LnYNqqjEsU2NM/view?usp=sharing'
    },
]