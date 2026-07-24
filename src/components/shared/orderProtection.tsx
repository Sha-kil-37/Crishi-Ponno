import { motion } from "framer-motion";
//
export default function OrderProtection() {
  //
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      transition={{
        duration: 0.2,
      }}
      className="absolute left-0 top-full  w-full bg-white"
    >
      <div className="w-7xl mx-auto">
        <h2>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
          dolorem aut vel illo, corrupti quam at tenetur saepe, incidunt quia
          distinctio dolore voluptatem, sapiente veritatis et perferendis!
          Culpa, dolorum sed eaque aperiam ad officia impedit itaque autem
          magnam veniam. Nisi atque maiores similique provident iste at culpa
          eveniet, corporis repellat!
        </h2>
      </div>
    </motion.div>
  );
}
