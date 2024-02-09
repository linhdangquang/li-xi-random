import { AnimatePresence, Variants, motion } from 'framer-motion';
import baolixi1 from '/baolixi-1.png';
import baolixi2 from '/baolixi-2.png';
import baolixi3 from '/baolixi-3.png';
import baolixi4 from '/baolixi-4.png';
import baolixi5 from '/baolixi-5.png';
import baolixi6 from '/baolixi-6.png';
import { useEffect, useState } from 'react';

type LiXi = {
  money: number;
  image: string;
};

const images = [baolixi1, baolixi2, baolixi3, baolixi4, baolixi5, baolixi6];

const HomePage = () => {
  const maxRetry = 3;
  const [retry, setRetry] = useState(0);
  const moneyToRandom = [10000, 20000, 50000, 100000, 200000, 500000];
  const [moneys, setMoneys] = useState<LiXi[]>([]);
  const [selectedMoney, setSelectedMoney] = useState<LiXi | null>(null);

  const getRandomMoney = () => {
    // sort random money array and get 6 random money from moneyToRandom
    const randomMoneys = moneyToRandom
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    // map random money to LiXi object
    const lixis = randomMoneys.map((money, index) => {
      return {
        money: money,
        image: images[index],
      };
    });
    // set moneys state to random money array
    setMoneys(lixis);
  };

  useEffect(() => {
    getRandomMoney();
  }, []);

  const shuffleVariants: Variants = {
    initial: {
      rotate: [0, 90, 180, 270, 360],
      x: [-200, 200, -150, 300, 0],
      scale: [1, 1.2, 1, 1.2, 1],
      transition: { duration: 1 },
    },
    animate: { rotate: 0, x: 0, scale: 1, transition: { duration: 1 } },
  };

  return (
    // i want animation when go to this page so i use motion.div frame motion
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='p-4'
    >
      <div>
        <p className='text-center font-dancing my-4 text-lg'>
          Chọn 1 bao lì xì may mắn để nhận lì xì từ 10.000đ đến 500.000đ
        </p>
      </div>
      <div className='grid sm:grid-cols-6 grid-cols-3 gap-4 items-center justify-between h-full w-full '>
        {moneys.map((money, index) => {
          if (selectedMoney?.money === money.money) {
            return (
              <motion.div
                className={`relative h-full w-full
                bg-ket-qua bg-cover bg-center border-2 border-dashed border-orange-400 min-h-[200px]
               
              `}
                key={money.money}
                // animate flip
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className='flex flex-col items-center justify-center h-full w-full'
                  key={index}
                >
                  <h1 className='text-xl font-dancing font-semibold text-center'>
                    {
                      // to VND currency
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(money.money)
                    }
                  </h1>
                </div>
              </motion.div>
            );
          } else {
            const animationProps = {
              exit: { rotateY: 170, transition: { duration: 3 } },
            };
            if (selectedMoney) {
              return (
                <motion.div
                  className={`relative h-full w-full
                bg-ket-qua bg-cover bg-center min-h-[200px] sm:min-h-[400px]
               
              `}
                  key={money.money}
                  // animate flip
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className='flex flex-col items-center justify-center h-full w-full'
                    key={index}
                  >
                    <h1 className='text-xl font-dancing font-semibold text-center'>
                      {
                        // to VND currency
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(money.money)
                      }
                    </h1>
                  </div>
                </motion.div>
              );
            }

            return (
              <AnimatePresence mode='wait'>
                <motion.img
                  key={index}
                  src={money.image}
                  alt='Lì xì'
                  {...animationProps}
                  variants={shuffleVariants}
                  initial='initial'
                  animate='animate'
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='mx-auto'
                  onClick={() => {
                    if (selectedMoney) {
                      alert('Bạn đã chọn lì xì rồi!');
                      return;
                    }
                    setRetry(retry + 1);
                    setSelectedMoney(money);
                  }}
                />
              </AnimatePresence>
            );
          }
        })}
      </div>
      {
        // if selected money is not null, show ket qua
        selectedMoney && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='text-center font-dancing font-semibold text-xl py-4'
          >
            Chúc mừng bạn nhận được lì xì trị giá:
            {
              // to VND currency
              new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(selectedMoney.money)
            }
          </motion.p>
        )
      }
      {selectedMoney && (
        <div className='flex items-center justify-center p-4'>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={() => {
              if (retry >= maxRetry) {
                alert('Bạn đã hết lượt chọn lì xì!');
                return;
              }
              setSelectedMoney(null);
              getRandomMoney();
            }}
            className='text-white mx-auto font-semibold px-4 py-2 rounded-md
        from-yellow-500 to-red-600 bg-gradient-to-r hover:from-red-600 hover:to-red-700
        animate-pulse
      '
          >
            Chọn lại
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default HomePage;
