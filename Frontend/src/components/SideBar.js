import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as SiIcons from "react-icons/si";
import * as BsIcons from "react-icons/bs";


export const SidebarDataAdmin =  [
  {
    title: 'Home',
    path: "/",
    icon: <AiIcons.AiFillHome/>
  },
  {
    title: 'Quản lý hộ gia đình',
    icon: <FaIcons.FaAddressBook />,
    subNav: [
      {
        title: 'Hộ khẩu',
        path: '/household',
        icon: <FaIcons.FaListAlt />
      },
      {
        title: 'Căn hộ',
        path: '/room',
        icon: <AiIcons.AiFillPlusCircle />,
      }
    ]
  },
  {
    title: 'Quản lý nhân dân',
    icon: <FaIcons.FaAddressBook />,
    subNav: [
      {
        title: 'Nhân khẩu',
        path: '/demographic',
        icon: <FaIcons.FaListAlt />
      },
      {
        title: 'Tạm trú',
        path: '/tabernacle',
        icon: <AiIcons.AiFillPlusCircle />,
      },
      {
        title: 'Tạm vắng',
        path: '/absent',
        icon: <BsIcons.BsPersonDashFill />,
    
      }
    ]
  },
  {
    title: 'Quản lý khoản thu',
    path: '/revenue',
    icon: <AiIcons.AiFillMoneyCollect />
  }
];

export const SidebarDataKeToan =  [
  {
    title: 'Home',
    path: "/",
    icon: <AiIcons.AiFillHome/>
  },
  {
    title: 'Quản lý khoản thu',
    path: '/revenue',
    icon: <AiIcons.AiFillMoneyCollect />
  },
  {
    title: 'About',
    path: '/about',
    icon: <SiIcons.SiAboutdotme />
  },
  
];
