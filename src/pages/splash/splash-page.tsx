import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import dragonImg from '../../../public/dragon.png';
const SplashPage = () => {
  return (
    <main className='p-4'>
      <p className='text-center my-4'>
        <Typewriter
          options={{
            strings: ['Chúc mừng năm mới!,Happy New Year!'],
            autoStart: true,
            loop: true,
            wrapperClassName:
              'text-center font-dancing font-semibold  text-xl mx-auto',
            cursorClassName: 'text-red-500',
          }}
        />
      </p>
      <motion.img
        key={dragonImg}
        src={dragonImg}
        alt='Dragon'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}

        className='mx-auto'
      />
      <motion.div
        className='flex w-full flex-col items-center mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className='text-center font-dancing font-semibold text-xl animate-bounce'>
          Nhấn nút để nhận lì xì!
        </p>
        <Link
          to='/home'
          className=' text-white font-semibold px-4 py-2 rounded-md
          from-yellow-500 to-red-600 bg-gradient-to-r hover:from-red-600 hover:to-red-700
          animate-pulse
        '
        >
          Lấy luôn!
        </Link>
      </motion.div>
    </main>
  );
};

export default SplashPage;
