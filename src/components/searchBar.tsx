import Image from 'next/image';

const SearchBar = () => {
  return (
    <div className='flex h-[40px] w-[50%] basis-[2/3] items-center gap-2'>
      <input
        type='text'
        placeholder='🔎 Search your course'
        className='h-full w-full rounded-md bg-white px-4 py-2'
      />
      <button
        className='h-full rounded-md border-2 border-gray-300 p-2 hover:bg-white'
        type='submit'
      >
        <Image
          src='/icons/search-icon.svg'
          alt='search-icon'
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default SearchBar;
