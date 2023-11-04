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
    title: 'Quản lý nhân khẩu',
    path: "/demographic",
    icon: <BsIcons.BsFillPersonLinesFill/>,
  },
  {
    title: 'Quản lý hộ khẩu',
    path: '/household',
    icon: <FaIcons.FaAddressBook />,
    // subNav: [
    //   {
    //     title: 'Danh sách hộ khẩu',
    //     path: '/household',
    //     icon: <FaIcons.FaListAlt />
    //   },
    //   {
    //     title: 'Thêm hộ khẩu',
    //     path: '/household-add',
    //     icon: <AiIcons.AiFillPlusCircle />,
    //   }
    // ]
  },
  {
    title: 'Quản lý tạm trú',
    path: '/tabernacle',
    icon: <BsIcons.BsPersonPlusFill/>,

  },
  {
    title: 'Quản lý tạm vắng',
    path: '/absent',
    icon: <BsIcons.BsPersonDashFill />,

  },
  {
    title: 'Quản lý khoản thu',
    path: '/revenue',
    icon: <AiIcons.AiFillMoneyCollect />
  },
  {
    title: 'Quản lý căn hộ',
    path: '/room',
    icon: <AiIcons.AiFillMoneyCollect />
  },
  {
    title: 'About',
    path: '/about',
    icon: <SiIcons.SiAboutdotme />
  },
  
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
