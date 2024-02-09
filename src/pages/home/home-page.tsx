import { AnimatePresence, motion } from 'framer-motion';
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
      <div className='grid sm:grid-cols-6 grid-cols-3 gap-4 items-center justify-between h-full w-full '
      >
        {moneys.map((money, index) => {
          if (selectedMoney?.money === money.money) {
            return (
              <motion.div
                className={`relative h-full w-full
                bg-ket-qua bg-cover border-2 border-dashed border-orange-400 min-h-40
               
              `}
                key={money.money}
                // animate flip
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className='flex flex-col items-center justify-center h-full w-full'
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
            return (
              <AnimatePresence mode='wait'>
                <motion.img
                  key={index}
                  src={money.image}
                  alt='Lì xì'
                  {...animationProps}
                  className='mx-auto'
                  onClick={() => {
                    if (selectedMoney) {
                      alert('Bạn đã chọn lì xì rồi!');
                      return;
                    }
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
            className='text-center font-dancing font-semibold text-xl'
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
    </motion.div>
  );
};

export default HomePage;
