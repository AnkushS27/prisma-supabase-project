import Image from 'next/image';
import SearchBar from './searchBar';

const Header = () => {
  return (
    <header className='flex items-center justify-between gap-4 rounded-xl'>
      <SearchBar />
      <div className='flex basis-[1/3] items-center gap-4'>
        <Image
          src='/icons/help-icon.svg' // Replace with appropriate user image
          alt='User Avatar'
          width={24}
          height={24}
          className='rounded-full'
        />
        <Image
          src='/icons/messages-icon.svg' // Replace with appropriate user image
          alt='User Avatar'
          width={24}
          height={24}
          className='rounded-full'
        />
        <Image
          src='/icons/settings-top-icon.svg' // Replace with appropriate user image
          alt='User Avatar'
          width={24}
          height={24}
          className='rounded-full'
        />
        <Image
          src='/icons/notifications-icon.svg' // Replace with appropriate user image
          alt='User Avatar'
          width={24}
          height={24}
          className='rounded-full'
        />
        <Image
          src='/user-avatar.svg' // Replace with appropriate user image
          alt='User Avatar'
          width={50}
          height={50}
          className='rounded-md'
        />
        <span className='text-sm font-semibold'>Adeline H. Dancy</span>
      </div>
    </header>
  );
};

export default Header;
