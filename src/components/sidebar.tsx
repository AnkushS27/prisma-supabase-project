'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setActiveItem } from '@/lib/features/sidebarSlice';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeItem = useAppSelector((state) => state.sidebar.activeItem);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '/icons/dashboard-icon.svg' },
    { name: 'Students', path: '/students', icon: '/icons/students-icon.svg' },
    { name: 'Chapter', path: '/chapters', icon: '/icons/chapters-icon.svg' },
    { name: 'Help', path: '/help', icon: '/icons/help-icon.svg' },
    { name: 'Reports', path: '/reports', icon: '/icons/reports-icon.svg' },
    {
      name: 'Settings',
      path: '/settings',
      icon: '/icons/settings-left-icon.svg',
    },
  ];

  const handleNavigation = (path: string) => {
    dispatch(setActiveItem(path));
    router.push(path);
  };

  return (
    <nav className='relative h-screen w-80 bg-white'>
      <div className='fixed flex w-64 flex-col gap-6 p-4'>
        <Image src='/logo.svg' alt='logo' priority width={120} height={90} />
        <ul className='space-y-4'>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex cursor-pointer items-center gap-4 rounded-md p-2 text-gray-700 hover:bg-[#E9EDF1] hover:text-black ${
                activeItem === item.path
                  ? 'bg-[#E9EDF1] text-black'
                  : 'text-gray-500'
              }`}
            >
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={24}
                height={24}
              />
              <span className='font-semibold'>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
